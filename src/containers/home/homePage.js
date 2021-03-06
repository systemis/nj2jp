import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import HomepageHeader from './homeComponents/homepage_header';
import HomepageFastestDelivery from './homeComponents/homepage_fastestDelivery';
import HomepageHowCarousel from './homeComponents/homepage_howCarousel';
import HomepageReviewsCarousel from './homeComponents/homepage_reviewsCarousel';
import HomepagePopJuices from './homeComponents/homepage_popularProducts';

const { bool } = PropTypes;

class HomePage extends Component {
  static propTypes = {
    mobile: bool,
  };
  static defaultProps = {
    mobile: false,
  };

  calculateHeight = (header) => {
    const { mobile } = this.props;
    const height = window.innerHeight;

    if (!mobile) {
      if (window.innerWidth > 930) return (height - 120);
      return (height - 267);
    }
    if (header) {
      return (height - 267);
    }
    return (window.innerHeight - 60);
  }

  render() {
    return (
      <div className="homepage">
        <HomepageHeader
          height={this.calculateHeight(true)}
          mobile={this.props.mobile}
        />
        <HomepageFastestDelivery
          height={this.calculateHeight()}
          mobile={this.props.mobile}
        />
        <HomepageHowCarousel
          height={this.calculateHeight()}
          mobile={this.props.mobile}
        />
        <HomepageReviewsCarousel
          height={this.calculateHeight()}
          mobile={this.props.mobile}
        />
        <HomepagePopJuices />
      </div>
    );
  }
}
const mapStateToProps = ({ mobile }) => ({
  mobile: !!mobile.mobileType,
});
const mapDispatchToProps = dispatch => ({
  push: location => dispatch(push(location)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
