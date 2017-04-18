import { takeLatest } from 'redux-saga/effects';
import TaxRateApi from '../services/api/taxes';
// import distantApi from '../Services/api.distant';

// ----- Sagas ----- //
import getTaxRate from './taxes';
import authSocialLogin from './authorization';

// ----- Types ----- //
import { orderTypes } from '../redux/orders';
import { authTypes } from '../redux/auth';

const api = TaxRateApi.createAPI();

export default function* rootSaga() {
  yield [
    takeLatest(orderTypes.GET_TAX_RATE, getTaxRate, api),
    // takeLatest(authTypes.EMAIL_AUTH_IN_PROGRESS, emailAuthInProgress),
    takeLatest(authTypes.AUTH_SOCIAL_LOGIN, authSocialLogin),
  ];
}
