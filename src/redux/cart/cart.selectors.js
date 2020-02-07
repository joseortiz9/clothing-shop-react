import {createSelector} from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

// reduce goes over the array, using the second parameter as a counter of index
// and the first one as a counter of the result in every iteration
export const selectCartItemsCount = createSelector([selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity, 0
    )
);