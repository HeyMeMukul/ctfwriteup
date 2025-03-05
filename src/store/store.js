import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistAuth } from './persistAuth.jsx';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // other reducers...
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(persistAuth)
});

export default store;