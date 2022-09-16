import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import React from 'react';

export const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/HDRapi/v1',
    mode: 'cors',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      const refreshToken = getState().auth.refreshToken;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token && refreshToken) {
        headers.set('authorization', `Bearer ${token}`);
        headers.set('refreshtoken', `Bearer ${refreshToken}`);
      }
      return headers;
    }
  }),
  tagTypes: ['User', 'Auth'],
  endpoints: (builder) => ({})
});
