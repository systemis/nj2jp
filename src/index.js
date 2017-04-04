import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './Redux/index';
import reactStartup from './Services/Asynch';
import routes from './Navigation/routes';
import './styles.scss';

/* NOTE:
This import will be implemented in React Router v4 implementation.
Currently react-router-redux is in beta.  Upon approval, this app will migrate.

import browserHistory from './Services/history';
*/

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);
reactStartup('initialize', store.dispatch);

render(
  <Provider store={store} >
    <Router
      history={history}
      routes={routes}
      onUpdate={() => reactStartup(null, store.dispatch)}
    />
  </Provider >
  ,
  document.getElementById('app'),
);
