/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import BreadCrumb from '../../../../components/breadcrumbs';
import Title from './title';
import Container from './container/';
import ActionBtns from './actionBtns';
import SuccessModal from './successModal';
import BulkSaleModal from './promotionModal.bulk';
import RegisterModal from './promotionModal.register';


const { func, number } = React.PropTypes;

class SingleProduct extends Component {
  static propTypes = {
    saveProductToCart: func.isRequired,
    push: func.isRequired,
    taxRate: number.isRequired,
  }
  constructor(props) {
    super(props);

    this.state = {
      showSuccessModal: false,
      showBulkModal: false,
      showRegisterModal: false,
    };
  }

  modalHandler = (e) => {
    let parentEl = e.target.dataset.parent;
    let tagEl = e.target.datset.tag;
    if (!parentEl) {
      parentEl = e.target.parentNode.dataset.parent;
    }
    if (!tagEl) {
      tagEl = e.target.parentNode.dataset.tag;
    }

    switch (parentEl) {
      case 'success': {
        switch (tagEl) {
          case 'view-cart':
            this.toggleModal('showSuccessModal', '/cart'); break;
          case 'view-checkout':
            this.toggleModal('showSuccessModal', '/express_checkout'); break;
          default: this.toggleModal('showSuccessModal');
        }
      } break;
      case 'promotion-bulk': {
        switch (tagEl) {
          case 'view-juices':
            this.toggleModal('showBulkModal', '/juices'); break;
          default: this.toggleModal('showBulkModal');
        }
      } break;
      case 'promotion-register': {
        switch (tagEl) {
          case 'view-checkout':
            this.toggleModal('showRegisterModal', '/express_checkout'); break;
          case 'view-cart':
            this.toggleModal('showRegisterModal', '/cart'); break;
          default: this.toggleModal('showRegisterModal');
        }
      } break;
      default: this.toggleModal();
    }
  }

  toggleModal = (modal, location) => {
    this.setState(prevState => ({
      [modal]: !prevState[modal],
    }), () => this.props.push(location));
  }

  toggleModal = (modal) => {
    this.setState(prevState => ({ [modal]: !prevState[modal] }));
  }

  render() {
    return (
      <div className="juice-page__main">
        <BreadCrumb
          paths={['Home']}
          classes={['home']}
          destination={['']}
          lastCrumb="Juice Page"
        />
        <Title />
        <Container modalHandler={this.modalHandler} />
        <ActionBtns />
        <SuccessModal
          showModal={this.state.showSuccessModal}
          modalHandler={this.modalHandler}
        />
        <BulkSaleModal
          taxRate={this.props.taxRate}
          showModal={this.state.showBulkModal}
          modalHandler={this.modalHandler}
        />
        <RegisterModal
          showModal={this.state.showRegisterModal}
          modalHandler={this.modalHandler}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ orders }) => ({
  taxRate: orders.taxRate.totalRate,
});
const mapDispatchToProps = dispatch => ({
  saveProductToCart: () => console.log('savingProductToCart', dispatch),
  push: location => dispatch(push(location)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
