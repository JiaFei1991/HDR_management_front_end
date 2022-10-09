import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiInstance from '../api/apiSlice';
import { PURGE } from 'redux-persist';
import axios from 'axios';

const initialState = {
  registerModalOpen: false,
  supervisorsName: undefined,
  studentsName: undefined,
  allUsers: undefined
};

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (arg, { getState }) => {
    const token = getState().auth.token;
    const refreshToken = getState().auth.refreshToken;
    if (!token || !refreshToken) {
      console.log('token missing in getAllUsers, request aborted.');
      return;
    }

    const res = await apiInstance({
      url: '/users',
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: `Bearer ${refreshToken}`
      }
    });

    return res.data.data;
  }
);

export const getAllSupervisorsName = createAsyncThunk(
  'user/getAllSupervisorsName',
  async () => {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:8000/HDRapi/v1/users/supervisors',
      withCredentials: true
    });

    return response.data;
  }
);

export const getAllStudentsName = createAsyncThunk(
  'user/getAllStudentsName',
  async () => {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:8000/HDRapi/v1/users/students',
      withCredentials: true
    });

    return response.data;
  }
);

export const createNewUser = createAsyncThunk(
  'user/createNewUser',
  async (formData) => {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:8000/HDRapi/v1/users/signup',
      withCredentials: true,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openModal: (state, action) => {
      action.payload
        ? (state.registerModalOpen = true)
        : (state.registerModalOpen = false);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllSupervisorsName.fulfilled, (state, action) => {
        state.supervisorsName = action.payload.data;
      })
      .addCase(getAllStudentsName.fulfilled, (state, action) => {
        state.studentsName = action.payload.data;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        // state.currentLoginUser = action.payload.data;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload.users;
      })
      .addCase(PURGE, (state, action) => {
        return initialState;
      });
  }
});

export const { openModal } = userSlice.actions;
export default userSlice.reducer;
