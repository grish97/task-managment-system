import { createSlice, Slice } from '@reduxjs/toolkit';

import { IAuthStore } from '@redux-store';
import { auth } from 'services';

function getState(): IAuthStore {
  const loggedUser = auth.user();
  const state: IAuthStore = {
    isLogged: false,
    userData: {},
    accessToken: '',
  };

  if (loggedUser) {
    state.isLogged = true;
    state.accessToken = loggedUser.accessToken;
    state.userData = loggedUser.user;
  }

  return state;
}

const initialState: IAuthStore = getState();

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    updateAuth: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state) => {
      return {
        isLogged: false,
        userData: {},
        accessToken: '',
      };
    },
  },
});

const updateAuth = authSlice.actions.updateAuth;
const logout = authSlice.actions.logout;

export { updateAuth, logout };

export default authSlice.reducer;
