import { call, put, take } from 'redux-saga/effects';
import apiActions from '../../redux/api';
import productActions, { productTypes } from '../../redux/products';
import productApi from '../../services/api/graphQL/products';

const api = productApi.createAPI();

export function* fetchProductById() {
  while (true) {  //eslint-disable-line
    const { id } = yield take(productTypes.FETCH_PRODUCT_BY_ID);
    const responses = yield [
      put(apiActions.fetching()),
      call(() => api.fetchProductById(id)),
    ];
    const response = cleanGQLresponse(responses[1]);
    if (response.ok) {
      yield [
        put(apiActions.apiSuccess()),
        put(productActions.receivedProductById(response.data)),
      ];
    } else {
      yield put(apiActions.apiFail(response.problem));
    }
  }
}

export function* fetchPopularProducts() {
  while (true) { //eslint-disable-line
    const { qty } = yield take(productTypes.FETCH_POPULAR_PRODUCTS);
    const responses = yield [
      put(apiActions.fetching()),
      call(() => api.fetchPopularProducts(qty)),
    ];
    const response = cleanGQLresponse(responses[1]);
    if (response.ok) {
      yield [
        put(apiActions.apiSuccess()),
        put(productActions.receivedPopularProducts(response.data)),
      ];
    } else {
      yield put(apiActions.apiFail(response.problem));
    }
  }
}

export function cleanGQLresponse(response) {
  console.log('GraphQL response: ', response);
  if (response.data) {
    const { errors, errorMessage, errorType } = response.data;
    if (errors || errorMessage) {
      response.problem = `${errorType}: ${
        errors ? errors[0].message : errorMessage
      }`;
      response.ok = false;
    }
    return response;
  }
  response.problem = 'GraphQL returned an empty result. Verify your settings.';
  response.ok = false;
  return response;
}
