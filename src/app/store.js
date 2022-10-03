import { configureStore } from '@reduxjs/toolkit';
// import { getDefaultNormalizer } from '@testing-library/react';
import { combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';
import scheduleReducer from '../features/schedules/scheduleSlice';

// import logger from '../middleware/logger';

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  schedule: scheduleReducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: true
});
