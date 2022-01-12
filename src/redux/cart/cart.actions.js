import CartActionTypes from "./cart.types";

export let toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export let addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});