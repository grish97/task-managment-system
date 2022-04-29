import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'redux-store/reducers/authSlice';
import { auth } from 'services';
import './Layout.scss';

interface IPropType {
  children: ReactNode;
}

function Layout(props: IPropType) {
  const dispatch = useDispatch();

  function onLogout() {
    auth.logout();

    dispatch(logout());
  }

  return (
    <div className="app-content">
      <div className="navbar">
        <div className="navbar-content">
          <div className="brand">App</div>
          <div className="log-out" onClick={onLogout}>
            Log Out
          </div>
        </div>
      </div>

      <div className="content">{props.children}</div>
    </div>
  );
}

export default Layout;
