import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer';
import productsReducer from './products/productsReducer';
import favoritesReducer from './favorites/favoriteSlice'
import cartReducer from './cart/cartSlice'
import adminReducer from './admin/adminReducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer, 
    favorites: favoritesReducer,
    cart: cartReducer,
    admin: adminReducer
    },
  middleware: [thunk]
});
  
export default store;