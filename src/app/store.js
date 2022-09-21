import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { getDefaultNormalizer } from '@testing-library/react';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';

import logger from '../middleware/logger';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: true
});
