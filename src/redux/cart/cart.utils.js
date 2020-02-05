export const addItemToCart = (actualCartItems, cartItemToAdd) => {
    const existingCartItem = actualCartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if (existingCartItem) {
        return actualCartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1} :
                cartItem);
    }

    /* always will add the quantity prop because the last if block
     will only run after we add the first item to the array */
    return [...actualCartItems, {...cartItemToAdd, quantity: 1}];
};