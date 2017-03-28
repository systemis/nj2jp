import React, { PropTypes } from 'react';
import 'react-router';
import FontAwesome from 'react-fontawesome';
import Breadcrumb from '../../../../Components/breadcrumbs';
import AdminSideBar from '../adminDashboard_sidebar/adminSideBar';
import AdminWelcomeMsg from '../adminDashboard_welcomeMsg/adminWelcomeMsg';

const propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

function AdminReports({ location }) {
  const homeDashboard = location.pathname.split('/')[1];
  return (
    <div className="reports--main">
      <div className="reports--container">
        <Breadcrumb
          paths={['Home', 'Your Account']}
          classes={['home', 'your-account']}
          destination={['', homeDashboard]}
          lastCrumb="Manage Login"
        />
        <AdminWelcomeMsg />
        <div className="reports__body">
          <AdminSideBar location={location} />
          <div className="body__dashboard">
            <div className="dashboard--container">

              <div className="reports__title">
                <h1>Reports</h1>
              </div>

              <div className="reports__body">

              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
AdminReports.propTypes = propTypes;
export default AdminReports;