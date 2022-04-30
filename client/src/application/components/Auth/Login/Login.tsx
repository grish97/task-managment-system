import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateAuth } from 'redux-store/reducers/authSlice';
import style from './Login.module.scss';
import { auth, validator } from 'services';

interface IPropType {}

function Login(props: IPropType) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidForm()) {
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
      console.log(response.message);
      toast.error(response.message);
    }
  }

  function onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const { message } = validator.checkEmail(value);

    setEmail(value);
    setEmailError(message);
  }

  function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    const { message } = validator.checkPassword(value);

    setPassword(value);
    setPasswordError(message);
  }

  function isValidForm(): boolean {
    return validator.checkEmail(email).isValid && validator.checkPassword(password).isValid;
  }

  return (
    <div className={style.loginContiner}>
      <h3>Sign In</h3>

      <form onSubmit={onSubmit} className={style.loginForm}>
        <div className={style.formInput}>
          <input type="text" value={email} onChange={onChangeEmail} placeholder="Enter E-mail" />
          {emailError && <span className={style.errorMessage}>{emailError}</span>}
        </div>

        <div className={style.formInput}>
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Enter Password"
          />
          {passwordError && <span className={style.errorMessage}>{passwordError}</span>}
        </div>
        <button type="submit" disabled={!isValidForm()}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
