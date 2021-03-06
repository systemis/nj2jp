import React from 'react';
import FontAwesome from 'react-fontawesome';

export default function ShippingPolicy() {
  return (
    <div className="shipping-main">
      <div className="shipping-main-title">
        <h1>Shipping Policy</h1>
      </div>
      <hr />
      <p>
        <h4>SHIPPING</h4>
        Orders will be processed within 2-5 business days after your full payment has been received. Shipment time will be between 2-7 business days depending on your physical address. The total wait time after you place your order will be between 2-10 business days. Shipping time and cost vary depending on location, and product ordered.
        <br />
        <br />
        <h4>QUANTITY RESTRICTIONS</h4>
        <br />
        Japanese Ministry of Health & Labour have passed regulations on Nicotine e-juice imports.  A person(s) can import up to a maximum of 120 milliliters into the country at any one time, per person, per address, per month.  You can find more information at their website here: http://www.mhlw.go.jp/english/
        <h4>CODs</h4>
        <br />
        {'"Cash On Delivery"'} ({'COD\'s'}): We do not Accept {'COD\'s'}.
        <br />
        <br />
        <h4>IN A HURRY?</h4>
        <br />
        We offer priority handling and delivery on most items upon request. For special instructions, PLEASE ORDER BY PHONE.
        <br />
        <br />
        <h4>SALES TAX</h4>
        <br />
        We collect an exclusive sales tax when you place your order in compliance with tax requirements for the state of Washington. All shipments to Japan are subject to Washington State Sales Tax.
        <br />
        <br />
        <h4>CUSTOMER SERVICE</h4>
        <br />
        Our helpful customer service department is committed to assist you in every way. If you have a question or problem with your order, please call 1-855-587-8888 for Customer Service, Monday–Friday, 8am – 5pm PST. Or email us at support@vapeswitch.com 24 hours a day, 7 days a week. Special requests or adjustments need to be arranged with our Customer Service department before your order has shipped.
      </p>
    </div>
  );
}

/* TODO make sure you add the success modal styles dynamically.
See the style sheet for detials.
*/
