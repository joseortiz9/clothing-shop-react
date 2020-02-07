import React from "react";
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";

import './checkout.styles.scss';
import CheckoutItem from "../../components/checkout-item/checkout-item.comp";

const Checkout = ({ cartItems, itemsTotal }) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} /> )
        }

        <div className="total">TOTAL: ${itemsTotal}</div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    itemsTotal: selectCartTotal
});

export default connect(mapStateToProps)(Checkout);