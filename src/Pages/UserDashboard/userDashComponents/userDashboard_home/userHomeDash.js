import React from 'react';
import BreadCrumb from '../../../../Components/breadcrumbs';
import UserSideBar from '../userDashboard_sidebar/userSideBar';
import UserWelcomeMsg from '../userDashboard_welcomeMsg/userWelcomeMsg';

export default function UserHomeDash() {
  return (
    <div className="user-home-dash--container">
      <BreadCrumb
        paths={['Home', 'Your Account']}
        classes={['home', 'your-account']}
        destination={['', location.pathname]}
        lastCrumb="Home Dashboard"
      />

      <UserWelcomeMsg />

      <div className="user-home-dash__body">
        <UserSideBar location={location} />

        <div className="body__dashboard">
          <div className="dashboard--container">
            <div className="dashboard--title">
              <h1>Home Dashboard</h1>
            </div>
            <div className="dashboard__top-third--container">
              <div className="top-third--contact-info">
                <div className="contact-info__title">
                  <h3>Contact Info</h3>
                </div>
                <div className="contact-info__info">
                  {/* TODO:  Render this information dynamically */}
                  <p className="info--name">Bruce Wayne</p>
                  <p className="info--email">bruce.wayne@wayneenterprises.com</p>
                  <p className="info--phone">(123)-123-1234</p>
                </div>
                <div className="contact-info__edit-btn">
                  <button className="small-edit-btn">Edit</button>
                </div>
              </div>
              <div className="top-third--newsletters">
                <div className="newsletters__title">
                  <h3>Newsletters</h3>
                </div>
                <div className="newsletters__status-msg">
                  You are not currently subscribed to any newsletters.
                </div>
                <div className="newsletters__edit-btn">
                  <button className="small-edit-btn">Edit</button>
                </div>
              </div>
            </div>
            <div className="dashboard__mid-third--container">
              <div className="mid-third__address-book">
                <div className="address-book__title">
                  <h3>Address Book</h3>
                </div>
                <div className="address-book__default--container">
                  <div className="default--shipping-address">
                    <h3>Default Shipping Address</h3>
                    <p className="shipping-address__postal-code">
                      5-3, Yaesau 1-Chome
                    </p>
                    <p className="shipping-address__wards">
                      Chuo-ku,
                    </p>
                    <p className="shipping-address__city">
                      Tokyo
                    </p>
                    <p className="shipping-address__main-postal">
                      100-8994
                    </p>
                  </div>
                  <div className="default--billing-address">
                    <h3>Default Shipping Address</h3>
                    <p className="billing-address__postal-code">
                      5-3, Yaesau 1-Chome
                    </p>
                    <p className="billing-address__wards">
                      Chuo-ku,
                    </p>
                    <p className="billing-address__city">
                      Tokyo
                    </p>
                    <p className="billing-address__main-postal">
                      100-8994
                    </p>
                  </div>
                  <div className="default__manage-btn">
                    <button className="medium-size-btn">Manage Addresses</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard__bottom-third--container">
              <div className="bottom-third--billing-info">
                <div className="billing-info__title">
                  <h3>Billing Info</h3>
                </div>
                <div className="billing-info__cc-type">
                  <div className="cc-type--cc">
                    <label htmlFor="cc-type--cc-input">CC</label>
                    <input type="radio" id="cc-type--cc-input" />
                  </div>
                  <div className="cc-type--debit">
                    <label htmlFor="cc-type--debit-input">DEBIT</label>
                    <input type="radio" id="cc-type--debit-input" />
                  </div>
                </div>
                <div className="billing-info__name">
                  <label htmlFor="billing-info--name">Name on Card</label>
                  <input type="text" id="billing-info--name" />
                </div>
                <div className="billing-info__cc-number">
                  <label htmlFor="billing-info--cc-number">Credit Card Number</label>
                  <input type="text" id="billing-info--cc-number" />
                </div>
                <div className="billing-info__expiration">
                  <p className="expiration__title">Expiration</p>
                  <div className="expiration__row">
                    <label htmlFor="expiration--month">Month</label>
                    <input type="number" id="expiration--month" disabled />
                    <label htmlFor="expiration--year">Year</label>
                    <input type="number" id="expiration--year" disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
