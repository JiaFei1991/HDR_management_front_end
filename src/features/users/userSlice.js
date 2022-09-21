import {
  createEntityAdapter,
  createSelector,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';
import { apiSlice } from '../api/apiSlice';

const initialState = {
  registerModalOpen: false,
  supervisorsName: undefined,
  studentsName: undefined
};

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
      });
  }
});

export const { openModal } = userSlice.actions;
export default userSlice.reducer;

// const userAdapter = createEntityAdapter();

// const initialUsersState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => '/users',
      transformResponse: (responseData) => {
        // return userAdapter.setAll(initialUsersState, responseData.data.users);
        return responseData.data.users;
      },
      providesTags: ['Users']
      // providesTags: (result, error, arg) => [
      //   { type: "Post", id: "LIST" },
      //   ...result.ids.map((id) => ({ type: "Post", id })),
      // ],
    })
  })
});

// // returns the query result object
// export const selectUsersResult = userApiSlice.endpoints.getAllUsers.select();

// // Creates memoized selector
// const selectUsersData = createSelector(
//   selectUsersResult,
//   (res) => res.data // normalized state object with ids & entities
// );

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUserIds,
//   // Pass in a selector that returns the posts slice of state
// } = userAdapter.getSelectors(
//   (state) => selectUsersData(state) ?? initialUsersState
// );

export const { useGetAllUsersQuery } = userApiSlice;
