// import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
// import { apiSlice } from '../api/apiSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  loggedinUser: undefined,
  token: undefined,
  refreshToken: undefined
};

export const login = createAsyncThunk('auth/login', async (loginDetails) => {
  //   debugger;
  const response = await axios({
    method: 'post',
    url: 'http://localhost:8000/HDRapi/v1/users/login',
    data: {
      email: loginDetails.userEmail,
      password: loginDetails.userPassword
    },
    withCredentials: true
  });

  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      const returnObj = {
        loggedinUser: action.payload.user,
        token: Cookies.get('jwt'),
        refreshToken: Cookies.get('jwtRefresh')
      };
      return returnObj;
    });
  }
});

export const selectLoggedinUser = (state) => state.loggedinUser;
export const selectToken = (state) => state.token;
export const selectRefreshToken = (state) => state.refreshToken;

export default authSlice.reducer;

// const userAdapter = createEntityAdapter();

// const initialUsersState = userAdapter.getInitialState();

// export const authApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (loginDetails) => ({
//         url: '/users/login',
//         method: 'POST',
//         body: {
//           email: loginDetails.userEmail,
//           password: loginDetails.userPassword
//         }
//       }),
//       transformResponse: (responseData) => {
//         // const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

//         // return userAdapter.setAll(initialUsersState, responseData.data.users);
//         return responseData;
//       },
//       providesTags: ['Auth']
//     })
//   })
// });

// export const { useLoginMutation } = authApiSlice;
