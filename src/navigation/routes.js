import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { replace, push } from 'react-router-redux';
import App from '../app';
import Homepage from '../containers/home/homePage';
import Routes from './index';
import AuthService from '../services/utils/authService';

export const auth = new AuthService();
const requireAuth = () => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
    push('/login');
  }
};
const parseAuthHash = (nextState) => {
  console.info('nextState: ', nextState);
  const hash = nextState.location.hash;
  if (/access_token|id_token|error/.test(hash)) {
    auth.parseHash(hash);
  }
};

export default (
  <Route path="/" component={App} auth={auth}>
    <IndexRoute component={Homepage} />
    {Routes.ProductRoutes()}
    {Routes.MediaRoutes()}
    {Routes.LegalRoutes()}
    {Routes.AuthRoutes(auth, parseAuthHash)}
    {Routes.CheckoutRoutes()}
    {Routes.UserDashboardRoutes(requireAuth)}
    {Routes.AdminDashboardRoutes(requireAuth)}
    {Routes.NotFoundRoute()}
  </Route>
);