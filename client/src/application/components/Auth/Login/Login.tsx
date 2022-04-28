import { ChangeEvent, useState } from 'react';
import apiRoutes from 'configs/api-routes';
import style from './Login.module.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.length || !password.length) {
      return;
    }

    sendRequest();
  }

  async function sendRequest() {
    const options = apiRoutes.AUTH_LOGIN;
    const url = process.env.REACT_APP_API_DOMAIN + options.url;
    console.log({
      url,
      'process.env.REACT_APP_API_DOMAIN': process.env.REACT_APP_API_DOMAIN,
    });
    const result = await fetch(url, {
      method: options.method,
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    console.log(result);
  }

  function onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setEmail(value);
  }

  function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPassword(value);
  }

  return (
    <div className={style.loginContiner}>
      <h3>Sign In</h3>

      <form onSubmit={onSubmit} className={style.loginForm}>
        <div className={style.formInput}>
          <input type="text" value={email} onChange={onChangeEmail} placeholder="Enter E-mail" />
        </div>

        <div className={style.formInput}>
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Enter Password"
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
