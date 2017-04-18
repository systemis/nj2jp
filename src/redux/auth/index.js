import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  authorizationInProgress: null,
  authSocialLogin: ['socialType'],
  loginSuccess: null,
  loginFailure: ['error'],
  loggedOut: null,
});
export const authTypes = Types;
export default Creators;
export const INITIAL_STATE = Immutable({
  authorizationInProgress: false,
  loginSuccess: null,
  loginError: false,
  loggedIn: false,
  idToken: null,
});
const authorizationInProgress = state => ({
  ...state,
  authorizationInProgress: true,
});

const loginSuccess = state => ({
  ...state,
  loggedIn: true,
  loginSuccess: true,
  idToken: localStorage.getItem('id_token'),
});
const loginFailure = (state, { error }) => ({
  loggedIn: false,
  loginSuccess: false,
  loginError: error,
  idToken: null,
});
const loggedOut = state => ({
  ...state,
  loggedIn: false,
  idToken: null,
});
export const authReducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGGED_OUT]: loggedOut,
  [Types.AUTHORIZATION_IN_PROGRESS]: authorizationInProgress,
});
