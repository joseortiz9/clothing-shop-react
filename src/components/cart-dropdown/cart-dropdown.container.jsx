import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import {selectCartItems} from "../../redux/cart/cart.selectors";
import CartDropDown from './cart-dropdown.comp';
import {withRouter} from "react-router-dom";

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

const CartDropDownContainer = withRouter(connect(mapStateToProps)(CartDropDown));

export default CartDropDownContainer;