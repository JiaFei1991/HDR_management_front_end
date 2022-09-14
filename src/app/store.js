import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { getDefaultNormalizer } from "@testing-library/react";
import { apiSlice } from "../features/api/apiSlice";

import logger from "../middleware/logger";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: true,
});
