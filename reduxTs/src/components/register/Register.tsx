import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.registerBox}>
        <h1>Register your account:</h1>
        <div className={styles.email}>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" required />
        </div>
        <div className={styles.userPassBox}>
          <div className={styles.username}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" required />
          </div>
          <div className={styles.password}>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" required />
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
      </div>
    </div>
  );
};

export default Register;
