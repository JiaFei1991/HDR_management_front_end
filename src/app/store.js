import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { getDefaultNormalizer } from '@testing-library/react';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';

import logger from '../middleware/logger';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: true
});
