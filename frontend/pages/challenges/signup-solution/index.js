import { useState } from 'react';
import styles from './login.module.css'

export default function SignupSolution () {

  const [username, setUsername] = useState('');
  const [userError, setuserError] = useState('');
  const [password, setPassword] = useState('');
  const [passError, setpassError] = useState('');
  const [showPass, setshowPass] = useState(false);
  const [message, setMessage] = useState('');

  const validateLogin = async () => {
    setuserError('')
    setpassError('')
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = pattern.test(username);

    if (!validEmail) {
      setuserError('username must be a valid email address')
    }

    const passwordPattern = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-])(?=.*\d).{8,}$/;
    const validPass =  passwordPattern.test(password);

    if (!validPass) {
      setpassError('Password must have 8 characters, one symbol and at least one number')
    }

    await fetch ('http://localhost:3000/api/login', {method: "POST", body: JSON.stringify({
      username: username, password: password
    })})
    .then(response=> response.text().then(textResponse=> {
      setMessage(textResponse)
    }).catch(error=> {
      setMessage(error);
    })
    
    
    )


  }

  return (
  <>
  <div className={styles.loginContainer}>
    <div className={styles.loginForm}>
      <span className={styles.loginTitle}>React login form</span>
      <div>use "test@test.com" as username to see server validation</div>
      
    <div className={styles.loginField} >
      <label htmlFor='username'>Email</label>
      <input id="username" className={styles.loginInput} type="text" onInput={(e)=> setUsername(e.target.value)} placeholder='Enter your email' />
      <span className={styles.fieldError}>{userError}</span>
    </div>
    <div className={styles.loginField} >
      <label htmlFor='password'>Password</label>
      <span className={styles.passwordField}>
        <input id="password" className={styles.loginInput} type={showPass? 'text': 'password'} onInput={(e)=> setPassword(e.target.value)} placeholder='Enter your password'/>
        <span className={styles.passShow} onClick={()=>{setshowPass(!showPass)}}>{showPass? 'hide': 'show'}</span>  
      </span>
      
      <span className={styles.fieldError}>{passError}</span>
    </div>
  <button className={styles.loginButton} onClick={()=>validateLogin()}>LOGIN</button>
    <div className={styles.response}>{message}</div>
  </div>
  

  </div>
  </>
  );
}