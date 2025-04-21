// In your store.js or configureStore.js file
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import postReducer from './features/postSlice';
import likesReducer from './features/postLikeSlice';
import commentReducer from './features/commentsSlice'
import userProfileReducer from './features/userProfileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    likes: likesReducer  ,
    comments: commentReducer,
    user : userProfileReducer

  }
});

export default store;