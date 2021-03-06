/* eslint react/no-unused-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import NavbarMobileUserActionsNotSignedIn from './navbar_mobile_userActions_notSignedIn';
import NavbarMobileUserActionsSignedIn from './navbar_mobile_userActions_signedIn';


function NavbarMobileUserActions({ activeUser }) {
  return (
    <div className="navbar__mobile--actions">
      {
        activeUser && !!activeUser._id ?
          <NavbarMobileUserActionsSignedIn profile={activeUser} /> :
          <NavbarMobileUserActionsNotSignedIn />
      }
    </div>
  );
}
const { objectOf, any } = PropTypes;
NavbarMobileUserActions.propTypes = {
  activeUser: objectOf(any),
};
NavbarMobileUserActions.defaultProps = {
  activeUser: {},
};
export default NavbarMobileUserActions;
