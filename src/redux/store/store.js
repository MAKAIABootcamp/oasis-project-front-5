import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer';
import productsReducer from './products/productsReducer';
import favoritesReducer from './favorites/favoriteSlice'
import cartReducer from './cart/cartSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer, 
    favorites: favoritesReducer,
    cart: cartReducer,
    },
  middleware: [thunk]
});
  
export default store;