import {createSlice} from '@reduxjs/toolkit';

const initialState = {cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []};

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setToCart(state, action) {
            state.cart = action.payload;
        }
    },
});

export const {setToCart} = cart.actions;

export default cart.reducer;