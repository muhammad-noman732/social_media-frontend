// In your store.js or configureStore.js file
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import postReducer from './features/postSlice';
import likesReducer from './features/postLikeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    likes: likesReducer  // Make sure this is included
  }
});

export default store;