import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormControl, Button } from 'react-bootstrap';
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
          <FormControl
            type="text"
            value={email}
            onChange={onChangeEmail}
            placeholder="Enter E-mail"
            isInvalid={emailError.length !== 0}
          />
          <FormControl.Feedback type={emailError ? 'invalid' : 'valid'}>
            {emailError}
          </FormControl.Feedback>
        </div>

        <div className={style.formInput}>
          <FormControl
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Enter Password"
            isInvalid={passwordError.length !== 0}
          />
          <FormControl.Feedback type={passwordError ? 'invalid' : 'valid'}>
            {passwordError}
          </FormControl.Feedback>
        </div>
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}

export default Login;
