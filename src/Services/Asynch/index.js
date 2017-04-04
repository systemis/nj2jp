import MobileDetect from 'mobile-detect';
import sessionActions from '../../Redux/SessionRedux';
import mobileActions from '../../Redux/MobileRedux';
import geoActions from '../../Redux/GeoRedux';
import localeActions from '../../Redux/LocaleRedux';
import orderActions from '../../Redux/OrdersRedux';

export function generateDynamicTitle(dispatch) {
  const url = window.location.pathname;
  const path = url.replace(/[\/]/g, '_')
  .split('_');
  let title = '';
  for (let i = 1; i < path.length; i += 1) {
    if (path[i] === 'and') {
      title += '& ';
    } else if (path[i] === 'stories') {
      title += 'User Stories';
      break;
    } else if (path[i] === 'user') {
      title += 'My Account';
      break;
    } else if (path[i] === 'admin') {
      title += 'Admin Dashboard';
      break;
    } else if (path[i] === 'faqs') {
      title += 'FAQ\'s';
      break;
    } else if (path[i] === '') {
      title += 'Home';
      break;
    } else {
      title += `${path[i][0].toUpperCase()}`;
      title += `${path[i].slice(1)} `;
    }
  }
  dispatch(sessionActions.saveActivePage(title, url));
}

export function saveGeoLocation(dispatch) {
  const activeLocation = JSON.parse(localStorage.getItem('active_location'));
  if (activeLocation) {
    const { ip, country, loc } = activeLocation;
    dispatch(geoActions.updateGeo(ip, loc));
    dispatch(localeActions.setCountry(country));
  }
}

export function setMobileDevice(dispatch) {
  const device = new MobileDetect(window.navigator.userAgent);
  dispatch(mobileActions.setMobileDevice(device.mobile()));
}

export function setScreenSize(dispatch) {
  dispatch(mobileActions.setScreenWidth(String(window.screen.width)));
}

export function dispatchMobileScreenSize(dispatch) {
  if (window.screen.orientation) {
    dispatch(mobileActions.orientationChanged({
      angle: window.screen.orientation.angle,
      type: window.screen.orientation.type,
      height: window.screen.height,
      width: window.screen.width,
    }));
  } else {
    dispatch(mobileActions.orientationChanged({
      angle: null,
      type: null,
      height: window.screen.height,
      width: window.screen.width,
    }));
  }
}

export function screenSpy(dispatch) {
  window.addEventListener('orientationchange', () => dispatchMobileScreenSize(dispatch));
  window.addEventListener('resize', () => setScreenSize(dispatch));
}

export function getTaxRate(dispatch) {
  dispatch(orderActions.getTaxRate());
}

// export function loadModule(dispatch) {
// }

export function scrollToTop() {
  window.scrollTo(0, 1);
}

export default function reactStartup(initialize, dispatch) {
  if (initialize) {
    generateDynamicTitle(dispatch);
    saveGeoLocation(dispatch);
    setMobileDevice(dispatch);
    screenSpy(dispatch);
    getTaxRate(dispatch);
    dispatchMobileScreenSize(dispatch);
    scrollToTop();
  } else {
    generateDynamicTitle(dispatch);
    scrollToTop();
    // loadModule(dispatch);
  }
}
