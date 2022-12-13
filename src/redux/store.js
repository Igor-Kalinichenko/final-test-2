import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import { productsApi } from './productsApi';
import { brandsApi } from './brandsApi';
import { categoriesApi } from './categoriesApi';
import { userApi } from './userApi';
import { ordersApi } from './ordersApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        [userApi.reducerPath]: userApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [brandsApi.reducerPath]: brandsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(brandsApi.middleware,
                                                                    productsApi.middleware,
                                                                    categoriesApi.middleware,
                                                                    userApi.middleware,
                                                                    ordersApi.middleware), 
});