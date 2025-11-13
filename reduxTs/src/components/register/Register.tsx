import { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { register } from "../../firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    navigate("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      setSuccess("Registered successfully");
      setError("");
      setLoading(true);

      setTimeout(() => {
        navigate("/login");
        setLoading(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message);
      console.log(error);
      setSuccess("");
    }
  };

  return (
    <div className={styles.wrapper}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.loadingBox}>
            <p>{success}</p>
            <p>Redirecting to login page</p>
          </div>
        </div>
      )}
      <div className={styles.registerBox}>
        <h1>Register your account:</h1>
        {success && <h3>{success}</h3>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.email}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.userPassBox}>
            <div className={styles.username}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.password}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.btnWrapper}>
            <button className={styles.submit}>Submit</button>
            <div className={styles.already}>
              <p>Already have an account? </p>
              <button className={styles.signIn} onClick={handleNavigate}>
                sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
