/* eslint-disable no-lone-blocks, import/first*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';

import { propTypes, defaultProps } from './propTypes';
import orderActions from '../../../../../redux/orders/';
import userActions from '../../../../../redux/user/';
import {
  FindProductById,
  FindProductsByFlavor,
  AddToMemberCart,
  EditToMemberCart,
} from './graphql.imports';
import {
  MainTitle,
  BreadCrumb,
  ActionBtns,
  SuccessModal,
  BulkSaleModal,
  RegisterModal,
  ProductDisplay,
} from './component.imports';

class SingleProduct extends Component {
  static propTypes = propTypes
  static defaultProps = defaultProps
  constructor(props) {
    super(props);

    this.state = {
      qty: 0,
      error: false,
      added: false,
      product: null,
      errorMsg: '',
      showBulkModal: false,
      chosenStrength: 0,
      showSuccessModal: false,
      showRegisterModal: false,
    };
  }

  componentWillReceiveProps({ loggedIn }) {
    if (loggedIn !== this.props.loggedIn) this.setState(() => ({ loggedIn }));
  }

  /**
  * a) "isArrayEqual" - Checks deeply nested array values inside "nextProps" for new values. If found - allows re-render.  If not found, stops re-render.
  *
  * 1) Determines if userCart & guestCart are different upon receiving new props - if so, re-render allowed. If not, re-render NOT allowed.
  *
  * @param {object} nextProps - New props.
  * @param {object} nextState - New State.
  *
  * @return {boolean} true/false.
  */
  shouldComponentUpdate(nextProps, nextState) {
    const isArrayEqual = (np, tp) => _(np).differenceWith(tp, _.isEqual).isEmpty();

    const userCartDiff = isArrayEqual(nextProps.userCart, this.props.userCart);
    const guestCartDiff = isArrayEqual(nextProps.guestCart, this.props.guestCart);

    if (
      !_.isEqual(nextState, this.state)
      || !_.isEqual(nextProps, this.props)
      || userCartDiff
      || guestCartDiff
    ) return true;
    return false;
  }

  /**
  * 1) receives "event" - and extracts parent element & tag element values.
  * 2) Filters parent element via Switch block.
  * 3) Once parent element has been identified, filters tag element via nested switch block.
  * 4) Based on the type of modal that's been chosen by user, either "toggleModal" or "toggleModalAndGo" is called.  The difference between the two is that "toggleModal" simply shows static information but does not allow navigation to outside components.  "toggleModalAndGo" does allow navigation to outside components and is given the location as an input argument when called.
  *
  * @param {object} e - event object.
  *
  * @return {function call} - calls "toggleModal" || "toggleModalAndGo"
  */
  modalHandler = (e) => {
    let parentEl = e.target.dataset.parent;
    let tagEl = e.target.dataset.tag;

    if (!parentEl) parentEl = e.target.parentNode.dataset.parent;
    if (!tagEl) tagEl = e.target.parentNode.dataset.tag;

    switch (parentEl) {
      case 'success': {
        switch (tagEl) {
          case 'view-cart':
            this.toggleModalAndGo('showSuccessModal', '/cart'); break;
          case 'view-checkout':
            this.toggleModalAndGo('showSuccessModal', '/express_checkout'); break;
          default: this.toggleModal('showSuccessModal');
        }
      } break;
      case 'promotion-bulk': {
        switch (tagEl) {
          case 'view-juices':
            this.toggleModalAndGo('showBulkModal', '/juices'); break;
          default: this.toggleModal('showBulkModal');
        }
      } break;
      case 'promotion-register': {
        switch (tagEl) {
          case 'view-signup':
            this.toggleModalAndGo('showRegisterModal', '/login'); break;
          default: this.toggleModal('showRegisterModal');
        }
      } break;
      default: this.toggleModal();
    }
  }

  /**
  * 1) recieves name of modal as input argument.
  * 2) sets the show state variable for that modal to "true".
  *
  * @param {string} modal - name of the modal to show.
  *
  * @return {new state} - returns new state with new modal show value.
  */
  toggleModal = (modal) => {
    this.setState(prevState => ({ [modal]: !prevState[modal] }));
  }

  /**
  * 1) recieves name of modal as input argument & destination name for in-modal navigation buttons.
  * 2) sets the show state variable for that modal to "true".
  *
  * @param {string} modal - name of the modal to show.
  * @param {string} location - name of the destination for nav buttons.
  *
  * @return {new state} - returns new state with new modal show value.
  */
  toggleModalAndGo = (modal, location) => {
    this.setState(prevState => ({
      [modal]: !prevState[modal],
    }), () => this.props.push(location));
  }

  /**
  * 1) receives event object and determines if "+" or "-" button has been clicked.
  * 2a) If "+" button has been chosen, compares the current total to the state total.  If the total amount exceeds 4, an error is thrown.  If amount is less than or equal to 4, the component state is allowed to update.
  * 2b) If the "-" button has been chosen, determines if the total qty already saved to local state is between 1 and 4.  If so, allows a decrement of 1.
  * 3) Returns new local state value for "qty".
  * BUG - Need to add "GLOBAL" qty value to this function.
  * @param {e} object - the click event object.
  *
  * @return {new state} - returns new state with new qty value.
  */
  qtyHandler = (e) => {
    const { globalRequestQty } = this.composeGlobalCartInfo();
    const qtyToCheck = 1;

    let buttonEl = e.target.dataset.tag;
    if (!buttonEl) buttonEl = e.target.parentNode.dataset.tag;

    if (buttonEl === 'qty-plus') {
      if ((globalRequestQty + this.state.qty + qtyToCheck) < 5) {
        this.setState(prevState => ({
          ...prevState,
          qty: (prevState.qty += 1),
          error: false,
          errorMsg: '',
        }));
      } else {
        this.setState(prevState => ({
          ...prevState,
          error: true,
          errorMsg: 'Too much',
        }));
      }
    } else if (buttonEl === 'qty-minus') {
      const { qty } = this.state;

      if (qty >= 1 && qty <= 4) {
        this.setState(prevState => ({
          ...prevState,
          qty: (prevState.qty -= 1),
          error: false,
          errorMsg: '',
        }));
      } else {
        this.setState(prevState => ({
          ...prevState,
          error: true,
          errorMsg: 'Not enough',
        }));
      }
    }
  }

  /**
  * 1) Extract productId & nicotine Strength value from click event object.
  * 2) Fetch all db products matching the clicked flavor.
  * 3) Filter results by the id of the clicked product's id.
  * 4) Save result to local compoent state.
  *
  * @param {e} object - the click event object.
  *
  * @return {new state} - returns new state with chosen product from local DB && nicotine strength value.
  */
  nicotineHandler = (e) => {
    let productId = e.target.dataset.product;
    let nicStrength = e.target.dataset.nicotinestrength;

    if (!nicStrength || !productId) {
      productId = e.target.parentNode.dataset.product;
      nicStrength = e.target.parentNode.dataset.nicotinestrength;
    }

    const product = this.props.data.FindProductsByFlavor
    .filter(({ _id }) => _id === productId)[0];

    this.setState(() => ({
      product,
      error: false,
      errorMsg: '',
      chosenStrength: Number(nicStrength),
    }));
  }

  /**
  * 1) receives event object and determines if "+" or "-" button has been clicked.
  * 2a) If "+" button has been chosen, compares the current total to the state total.  If the total amount exceeds 4, an error is thrown.  If amount is less than or equal to 4, the component state is allowed to update.
  * 2b) If the "-" button has been chosen, determines if the total qty already saved to local state is between 1 and 4.  If so, allows a decrement of 1.
  * 3) Returns new local state value for "qty".
  *
  * @param none
  *
  * @return {object} - object containing values 1) "updatedCart" (updated quanitty values for either the user cart if the user is logged in, or the guest cart if the user is not logged in.), 2) "prevCartIds" used to determine whether we have to "update" the items in an existing cart, or "create" a new cart. 3) "globalRequestQty" the overall quantity of items the user is requesting.
  */
  composeGlobalCartInfo = () => {
    // When run the first time (no previous items in the cart) then a flag "updated" is a value of false.  This will make "globalRequestQty" to be assigned the "qty" value from state directly.

    // If this function is run a subsequent time (items already exist in the cart) then "globalRequestQty" will be assigned it's value based on a reduce across all items.

    const {
      loggedIn,
      guestCart,
      userCart,
    } = this.props;

    const {
        qty: requestQty,  // alias
        product: stateProduct,
      } = this.state,
      prevCartIds = [];

    // Update the User/Guest cart quantity with like items.
    let updatedCart = [],
      updated = true;
    // If user has items in their cart && logged in check & update "like items".
    if (loggedIn && userCart.length) {
      updated = true;
      const updatedUserCart = userCart
      .map((userCartProduct) => {
        // Apollo & GraphQL add "__typename" property for id purposes to query results.  When mutating the result, this property must be removed if object is to be used in a subsequent query/mutation different than it's originating query.
        if (Object.prototype.hasOwnProperty.call(userCartProduct, '__typename')) delete userCartProduct.__typename;

        if (
          Object.prototype.hasOwnProperty.call(userCartProduct, 'product') && (userCartProduct.product === stateProduct._id)
        ) userCartProduct.qty += requestQty;

        return userCartProduct;
      });
      updatedCart = [...updatedUserCart];
    // If user has items in their cart & is a guest, check & update "like items"
    } else if (!loggedIn && guestCart.length) {
      updated = true;
      const updatedGuestCart = guestCart
      .map((guestCartProduct) => {
        if (
          Object.prototype.hasOwnProperty.call(guestCartProduct, '_id') &&
          guestCartProduct._id === stateProduct._id
        ) guestCartProduct.qty += requestQty;

        return guestCartProduct;
      });
      updatedCart = [...updatedGuestCart];
    }

    // --- Add up all the product quantities to check for qty violations later. -- Also save the id's of all items to know which items are NEW and OLD to call "Add" or "Update" respectively.
    const globalRequestQty = !updated ? requestQty : updatedCart
    .reduce((accum, nextObj) => {
      if (nextObj && Object.prototype.hasOwnProperty.call(nextObj, '_id')) prevCartIds.push(nextObj._id);

      // "product" = object on Guest cart, & string on Member cart.
      if (typeof nextObj.product === 'string') prevCartIds.push(nextObj.product);

      accum += nextObj.qty;
      return accum;
    }, 0);
    // --- Return results to "addToCartHandler".
    return {
      updatedCart,
      prevCartIds,
      globalRequestQty,
    };
  }

  addToCartHandler = () => {
    // 1. If the total items in the cart (redux store) are >= 4, then throw error.
    // 2. If the total items in the cart are <4 than, verify the additional qty, will not exceed 4.  If so, throw an error.
    // 3.  If the items to be added + the total <= 4, then reduce like items, and dispatch.
    if (this.state.qty === 0) {
      this.setState(() => ({
        error: true,
        errorMsg: 'You must choose a quantity of at least 1.',
      }));
    } else if (!this.state.chosenStrength) {
      this.setState(() => ({
        error: true,
        errorMsg: 'No strength',
      }));
    } else {
      const {
        updatedCart,
        prevCartIds,
        globalRequestQty,
      } = this.composeGlobalCartInfo();

      const {
          qty,
          chosenStrength: nicotineStrength,
          product: {
            product,
            _id: productId,
          },
        } = this.state,

        deltaQty = (globalRequestQty > 4) && (globalRequestQty - 4);

      if (globalRequestQty > 4) {
        this.setState({
          qty: 0,
          error: true,
          errorMsg: 'Max items',
          chosenStrength: 0,
        });
      } else if (deltaQty > 0) {
        this.setState(() => ({
          qty: 0,
          error: true,
          errorMsg: `You have too many items in your cart.  Please remove ${deltaQty} items from your cart to add the requested quantity.`,
        }));
      } else if (!deltaQty) {
        const { userId, loggedIn } = this.props,

          currentGuestProduct = {
            _id: productId,
            qty,
            userId,
            nicotineStrength,
            ...product,  // from state
          },

          currentMemberProduct = {
            qty,
            nicotineStrength,
            product: productId,
          };

        // If user is logged in, and there's already products in their cart, but the current product is not one of them, add it.
        if (
          loggedIn &&
          updatedCart.length &&
          !prevCartIds.includes(productId)
        ) updatedCart.push(currentMemberProduct);

        // If user is NOT logged in, and there's already products in their cart, but the current product is not one of them, add it.
        if (
          !loggedIn &&
          updatedCart.length &&
          !prevCartIds.includes(productId)
        ) updatedCart.push(currentGuestProduct);


        if (loggedIn) {
          if (updatedCart.length) {
            this.setState(() => ({
              qty: 0,
              added: true,
              error: false,
              errorMsg: '',
              chosenStrength: 0,
            }), () => {
              this.props.EditToMemberCart({
                variables: {
                  userId,
                  products: updatedCart,
                },
              })
              .then(({ data: { EditToMemberCart: updatedUser } }) => {
                this.props.saveProfile(updatedUser);
              });
            });
          } else {
            this.setState(() => ({
              qty: 0,
              added: true,
              error: false,
              errorMsg: '',
              chosenStrength: 0,
            }), () => {
              this.props.AddToMemberCart({
                variables: {
                  qty,
                  userId,
                  nicotineStrength,
                  product: productId,
                },
              })
              .then(({ data: { AddToMemberCart: updatedUser } }) => {
                this.props.saveProfile(updatedUser);
              });
            });
          }
        } else if (!loggedIn) {
          if (updatedCart.length) {
            this.setState(() => ({
              qty: 0,
              added: true,
              error: false,
              errorMsg: '',
              chosenStrength: 0,
            }), () => {
              this.props.updateToGuestCart(updatedCart);
            });
          } else {
            this.setState(() => ({
              qty: 0,
              added: true,
              error: false,
              errorMsg: '',
              chosenStrength: 0,
            }), () => {
              this.props.addToGuestCart(currentGuestProduct);
            });
          }
        }
      }
    }
  }


  /*
  * Resets the state variable "added" to false to reset dynamic animations after user adds item to their cart.
  */
  componentDidUpdate() {
    if (this.state.added) {
      setTimeout(() => {
        this.setState({ added: false });
      }, 5000);
    }
  }

  render() {
    const {
      qty,
      error,
      added,
      errorMsg,
      showBulkModal,
      chosenStrength,
      showSuccessModal,
      showRegisterModal,
    } = this.state;

    const {
      data,
      taxRate,
      loggedIn,
    } = this.props;

    return (
      <div className="juice-page__main">
        <BreadCrumb
          paths={['Home', 'Juices']}
          classes={['home', 'home']}
          destination={['', 'juices']}
          lastCrumb={data.FindProductById ? data.FindProductById.product.title : 'Juice Page'}
        />
        {
          data.FindProductById ?
            <MainTitle
              vendor={data.FindProductById.product.vendor}
              mainTitle={data.FindProductById.product.mainTitle}
            /> : ''
        }
        {
          data.loading ?
          (<h1 className="main__loading">
            <FontAwesome name="spinner" pulse size="3x" />
            <br />
            Loading...
          </h1>) :
          <ProductDisplay
            qty={qty}
            added={added}
            error={error}
            errorMsg={errorMsg}
            loggedIn={loggedIn}
            qtyHandler={this.qtyHandler}
            chosenStrength={chosenStrength}
            modalHandler={this.modalHandler}
            nicotineHandler={this.nicotineHandler}
            addToCartHandler={this.addToCartHandler}
            productsArray={data.FindProductsByFlavor ? data.FindProductsByFlavor : null}
          />
        }
        <ActionBtns />

        <SuccessModal
          qty={qty}
          productTitle={data.FindProductById ? data.FindProductById.product.title : ''}
          showModal={showSuccessModal}
          modalHandler={this.modalHandler}
        />

        <BulkSaleModal
          taxRate={taxRate}
          showModal={showBulkModal}
          modalHandler={this.modalHandler}
        />

        <RegisterModal
          taxRate={taxRate}
          loggedIn={loggedIn}
          showModal={showRegisterModal}
          modalHandler={this.modalHandler}
        />
      </div>
    );
  }
}

/**
* NOTE: Connecting Redux & ApolloClient to Single Product Container. (below)
*
* 1) Redux's "connect" function maps state & dispatch to props on "SingleProduct" and returns HOC - "SingleProductWithState"
* 2) React Apollo's "compose" function, composes multiple GraphQL queries and mutations onto the HOC returned in Step 1. - Redux's mapped props are available to these graphql functions if needed due to step 1.  Returns HOC "SingleProductWithStateAndData".
* 3) This final HOC is the default export.
*
*/
const SingleProductWithState = connect(
  ({ orders, auth, routing, user }) => ({
    userId: user.profile ? user.profile._id : '',
    flavor: routing.locationBeforeTransitions.pathname.split('/')[1],
    taxRate: orders.taxRate.totalRate,
    loggedIn: auth.loggedIn || false,
    userCart: auth.loggedIn ? user.profile.shopping.cart : [],
    guestCart: orders.cart,
  }),
  dispatch => ({
    push: location => dispatch(push(location)),

    saveProfile: updatedUser => dispatch(userActions.saveProfile(updatedUser)),

    addToGuestCart: productObj =>
    dispatch(orderActions.addToGuestCart(productObj)),

    updateToGuestCart: updatedCartProducts =>
    dispatch(orderActions.updateToGuestCart(updatedCartProducts)),

    addToReduxProfileCart: cart => dispatch(userActions.addToReduxProfileCart(cart)),

    addToReduxMemberCart: products => dispatch(orderActions.addToReduxMemberCart(products)),

    updateToReduxMemberCart: products => dispatch(orderActions.updateToReduxMemberCart(products)),
  }),
)(SingleProduct);

const SingleProductWithStateAndData = compose(
  graphql(FindProductById, { skip: true }),
  graphql(FindProductsByFlavor, {
    options: ({ location }) => ({
      variables: {
        flavor: location.pathname.split('/')[2],
      },
    }),
  }),
  graphql(AddToMemberCart, { name: 'AddToMemberCart' }),
  graphql(EditToMemberCart, { name: 'EditToMemberCart' }),
)(SingleProductWithState);

export default SingleProductWithStateAndData;
