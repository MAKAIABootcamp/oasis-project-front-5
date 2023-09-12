import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer';
import productsReducer from './products/productsReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer, 
    },
  middleware: [thunk]
});
  
export default store;