import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import blogReducer from '../features/blogs/blogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
  },
});