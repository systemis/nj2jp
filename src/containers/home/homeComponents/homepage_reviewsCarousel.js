import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBob from './navBob';
import HomepageReviewsSlide from '../../../components/CarouselTextSlide/carouselTextSlide';
import HomepageReviewsCarourselDots from '../../../components/CarouselDots/carouselDots';

let globalTimer;
const { string, number } = PropTypes;

class HomepageReviewsCarousel extends Component {
  static defaultProps = {
    screenSize: window.screen.availWidth,
  }

  static propTypes = {
    screenSize: string,
    height: number.isRequired,
  }
  static reviews = [
    {
      className: 'slides--slide',
      review: 'Well, NJ2JP wasn’t lying. 5 days to Fukuoka. Way faster than all of my previous online choices. I’m sold.',
      author: 'Matt Shipmen',
    },
    {
      className: 'slides--slide',
      review: 'Wow! Fruity Bamm-Bamm = Delicious.  4 Day Delivery = Fast. My New Juice Source = NJ2JP.',
      author: 'Gene Smith, Okinawa',
    },
    {
      className: 'slides--slide',
      review: 'NicJuice2Japan (NJ2JP) are killing it with these delivery speeds. Not to mention the juice line is delicious.  Looking forward to more juices flavors.',
      author: 'Robert McNair, Sasebo',
    },
    {
      className: 'slides--slide',
      review: 'I placed my order on Monday, by Thursday morning, I was vaping Nicotine e-juice. Nj2jp is blazing fast!',
      author: 'Justin Arians, Yokosuka',
    },
  ]
  constructor(props) {
    super(props);
    this.state = {
      screenSize: Number(this.props.screenSize || '360'),
      showIndex: 0,
      maxWidth: '346px',
      leftAdjust: {
        left: 0,
      },
    };
  }

  componentDidMount() {
    this.startTimer(0);
  }

  componentWillReceiveProps({ screenSize }) {
    const { maxWidth } = this.calcMaxWidth(screenSize, 0);
    this.setState({
      screenSize: Number(screenSize),
      maxWidth,
    });
  }

  componentWillUnmount() {
    clearTimeout(globalTimer);
  }

  calcMaxWidth = (screen, index = 0) => {
    const screenSize = Number(screen);
    let screenAdjust = 0;
    let maxWidth = 0;
    if (screenSize > 1079) {
      screenAdjust = -1000;
      maxWidth = '1000px';
    } else if (screenSize < 1080 && screenSize > 359) {
      screenAdjust = -346;
      maxWidth = '346px';
    } else if (screenSize < 360) {
      screenAdjust = (screenSize - 14) * -1;
      maxWidth = `${screenAdjust * -1}px`;
    }
    return { maxWidth, screenAdjust, index };
  }

  returnNewSlide = (inputIndex) => {
    const { screenSize } = this.state;
    const { maxWidth, screenAdjust, index } = this.calcMaxWidth(screenSize, inputIndex);
    this.setState({
      maxWidth,
      showIndex: index,
      leftAdjust: {
        left: `${(screenAdjust * index) / 10}em`,
      },
    });
  }

  startTimer = (index) => {
    if (index === 4) {
      return this.startTimer(0);
    }
    if (index !== this.state.index) {
      this.returnNewSlide(index);
    }
    globalTimer = setTimeout(() => this.startTimer(index += 1), 10000);
    return globalTimer;
  }

  stopTimer = (newIndex) => {
    clearTimeout(globalTimer);
    this.startTimer(newIndex);
  }

  handleClick = (e) => {
    e.preventDefault();
    switch (e.target.getAttribute('id')) {
      case 'alpha': this.stopTimer(0); break;
      case 'beta': this.stopTimer(1); break;
      case 'gamma': this.stopTimer(2); break;
      case 'delta': this.stopTimer(3); break;
      default: this.stopTimer(0);
    }
  }

  render() {
    const { showIndex, leftAdjust, maxWidth } = this.state;
    let newMaxWidth = maxWidth;
    newMaxWidth = String(newMaxWidth);
    const { height } = this.props;
    return (
      <div className="homepage__reviews" style={{ height }} >
        <div className="reviews__content--container">
          <h1 className="content__title">Reviews</h1>
          <div className="content__carousel--parent">
            <div className="carousel--container">
              <div style={leftAdjust} className="carousel__slides">
                { HomepageReviewsCarousel.reviews.map(({ className, review, author }) =>
                  <HomepageReviewsSlide
                    key={new Buffer(author, 'utf8').toString('base64')}
                    maxWidth={newMaxWidth}
                    className={className}
                    review={review}
                    author={author}
                  />)
                }
              </div>
            </div>
          </div>
          <HomepageReviewsCarourselDots
            show={showIndex}
            handleClick={this.handleClick}
          />
        </div>
        <NavBob
          className={'reviews__navBob'}
          height={height * 4}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ mobile }) => ({
  screenSize: mobile.screenWidth,
});
export default connect(mapStateToProps, null)(HomepageReviewsCarousel);
