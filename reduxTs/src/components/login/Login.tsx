import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    try {
      const userInfo = await login(email, password);
      console.log(userInfo.user.email);
      setSuccess("Login Successful");
      setError("");
      setLoading(true);

      setTimeout(() => {
        navigate("/boards");
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
            <p>Redirecting to home page</p>
          </div>
        </div>
      )}
      <div className={styles.loginBox}>
        <div className={styles.title}>
          <h1>Sign in to your account:</h1>
          {/* {success && <h3>{success}</h3>} */}
          {error && <h3>{error}</h3>}
        </div>
        <div className={styles.loginForm}>
          <div className={styles.userPassBox}>
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
            <button className={styles.submit} onClick={handleLogin}>
              Sign in
            </button>
            <div className={styles.already}>
              <p>Don't have an account? </p>
              <button className={styles.createAccount} onClick={handleNavigate}>
                create account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
