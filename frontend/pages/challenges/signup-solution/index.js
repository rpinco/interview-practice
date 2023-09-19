import { useState } from 'react';
import styles from './login.module.css'

export default function SignupSolution () {

  const [username, setUsername] = useState('');
  const [userError, setuserError] = useState('');
  const [password, setPassword] = useState('');
  const [passError, setpassError] = useState('');

  const validateLogin = () => {

  }

  return (
  <>
  <div className={styles.loginContainer}>
    <div className={styles.loginForm}>
      <span className={styles.loginTitle}>React login form</span>
      
    <div className={styles.loginField} >
      <label htmlFor='username'>Username</label>
      <input id="username" className={styles.loginInput} type="text" onInput={(e)=> setUsername(e.target.value)} placeholder='Enter here...' />
      <span className="usernameError">{userError}</span>
    </div>
    <div className={styles.loginField} >
      <label htmlFor='password'>Password</label>
      <input id="password" className={styles.loginInput} type="password" onInput={(e)=> setPassword(e.target.value)} placeholder='Enter here...'/>
      <span className="passwordError">{passError}</span>
    </div>
  <button className={styles.loginButton} onClick={()=>validateLogin()}>LOGIN</button>
  </div>
  

  </div>
  </>
  );
}