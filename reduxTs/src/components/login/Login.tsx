import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/register");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.loginBox}>
        <div className={styles.title}>
          <h1>Sign in to your account:</h1>
        </div>
        <div className={styles.loginForm}>
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
            <button className={styles.submit}>Sign in</button>
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
