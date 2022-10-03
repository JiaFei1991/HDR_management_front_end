import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  loggedinUser: undefined,
  token: undefined,
  refreshToken: undefined,
  forgotPassModalOpen: false
};

export const login = createAsyncThunk('auth/login', async (loginDetails) => {
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

export const logout = createAsyncThunk(
  'auth/logout',
  async (arg, { getState }) => {
    const token = getState().auth.token;
    const refreshToken = getState().auth.refreshToken;
    if (!token || !refreshToken) {
      // just a reminder, program will continue to log user out
      console.log('token missing in logout process.');
    }
    const response = await axios({
      method: 'get',
      url: 'http://localhost:8000/HDRapi/v1/users/logout',
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: `Bearer ${refreshToken}`
      },
      withCredentials: true
    });

    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (input) => {
    let response;
    try {
      response = await axios({
        method: 'post',
        url: 'http://localhost:8000/HDRapi/v1/users/forgetpassword',
        data: {
          email: input.email
        },
        withCredentials: true
      });

      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return err.response.data;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openForgotPassModal: (state, action) => {
      action.payload
        ? (state.forgotPassModalOpen = true)
        : (state.forgotPassModalOpen = false);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const returnObj = {
          loggedinUser: action.payload.user,
          token: Cookies.get('jwt'),
          refreshToken: Cookies.get('jwtRefresh')
        };
        return returnObj;
      })
      .addCase(logout.fulfilled, (state, action) => {
        const returnObj = {
          loggedinUser: undefined,
          token: Cookies.get('jwt'),
          refreshToken: Cookies.get('jwtRefresh')
        };
        return returnObj;
      })
      .addCase(PURGE, (state, action) => {
        return initialState;
      });
    // .addCase(resetPassword.rejected, (state, action) => {
    //   console.log(action.payload);
    //   return action.payload;
    // });
  }
});

export const selectLoggedinUser = (state) => state.loggedinUser;
export const selectToken = (state) => state.token;
export const selectRefreshToken = (state) => state.refreshToken;

export const { openForgotPassModal } = authSlice.actions;
export default authSlice.reducer;
