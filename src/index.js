/* eslint-disable import/default */
import 'babel-polyfill';
import 'masonry-layout';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import './Services/history';
// import { taxRateListener } from './Services/socket-init';
import createStore from './Redux/index';
import initiateActions from './Services/asynchDispatchServices';
import routes from './Navigation/routes';

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);
initiateActions(store.dispatch);

render(
  <Provider store={store} >
    <Router
      history={history}
      routes={routes}
      onUpdate={() => initiateActions(store.dispatch)}
    />
  </Provider >
  ,
  document.getElementById('app'),
);
