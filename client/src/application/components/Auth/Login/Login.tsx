import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAuth } from 'redux-store/reducers/authSlice';
import style from './Login.module.scss';
import { auth } from 'services';

interface IPropType {}

function Login(props: IPropType) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.length || !password.length) {
      return;
    }

    sendRequest();
  }

  async function sendRequest() {
    const response = await auth.login(email, password);

    if (response.accessToken) {
      dispatch(
        updateAuth({
          isLogged: true,
          accessToken: response.accessToken,
          userData: response.user,
        })
      );
    } else if (response.message) {
      setMessage(response.message);
    }
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
