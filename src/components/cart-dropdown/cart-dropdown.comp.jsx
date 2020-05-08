import React from "react";
import {toggleCartHidden} from "../../redux/cart/cart.actions";

import CartItem from "../cart-item/cart-item.comp";
import CustomButton from "../custom-button/custom-button.comp";

import './cart-dropdown.styles.scss';


const CartDropDown = ({ cartItems, history, dispatch }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                (cartItems.length > 0) ?
                    (cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                    ))) :
                    (<span className="empty-message">Cart Empty</span>)
            }
        </div>
        <CustomButton onClick=
                          {
                              () => {
                                  history.push('/checkout');
                                  dispatch(toggleCartHidden());
                              }
                          }
        >
            GO TO CHECKOUT
        </CustomButton>
    </div>
);

export default CartDropDown;