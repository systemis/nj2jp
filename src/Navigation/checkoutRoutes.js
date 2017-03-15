import React from 'react';
import { Route } from 'react-router';

// ----------------------------- Legal -------------------------------
import Cart from '../Pages/Cart/cart';
import EmptyCart from '../Pages/Cart/EmptyCart/emptyCart';
import ExpressCheckout from '../Pages/ExpressCheckout/expressCheckout';
import OrderSuccess from '../Pages/ExpressCheckout/orderSuccess';

const authRoutes = () => (
  <div>
    <Route path="cart" component={Cart} />
    <Route path="empty" component={EmptyCart} />
    <Route path="express_checkout" component={ExpressCheckout} />
    <Route path="successfully_ordered" component={OrderSuccess} />
  </div>
);

export default authRoutes;