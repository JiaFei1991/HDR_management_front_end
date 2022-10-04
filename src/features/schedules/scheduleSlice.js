import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from '../api/apiSlice';
import { PURGE } from 'redux-persist';

const extractTokens = (fn, actionName) => {
  const state = fn();
  const token = state.auth.token;
  const refreshToken = state.auth.refreshToken;
  if (!token || !refreshToken) {
    console.log(`token missing in ${actionName}, request aborted.`);
    return 'token missing';
  }

  return { token, refreshToken };
};

const initialState = {
  today: [
    new Date().getDay().toString(),
    ...new Date().toJSON().slice(0, 10).split('-').reverse()
  ],
  selectedDate: [
    new Date().getDay().toString(),
    ...new Date().toJSON().slice(0, 10).split('-').reverse()
  ],
  scheduleMonth: {},
  dimmer: '',
  eventModalOpen: false,
  actionModalOpen: false,
  selectedEventId: undefined,
  modalPrefill: {}
};

export const createNewSchedule = createAsyncThunk(
  'schedule/createNewSchedule',
  async (data, { getState }) => {
    const token = getState().auth.token;
    const refreshToken = getState().auth.refreshToken;
    if (!token || !refreshToken) {
      console.log('token missing in getAllUsers, request aborted.');
      return;
    }
    const res = await apiInstance({
      url: '/schedules',
      method: 'post',
      data: data,
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: `Bearer ${refreshToken}`
      }
    });
    return res.data;
  }
);

export const getCurrentDaySchedules = createAsyncThunk(
  'schedule/getCurrentDaySchedules',
  async (date, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const refreshToken = state.auth.refreshToken;
    if (!token || !refreshToken) {
      console.log('token missing in getAllUsers, request aborted.');
      return;
    }
    const currentUserId = state.auth.loggedinUser._id;
    if (!currentUserId) {
      console.log(
        'current user id missing in getCurrentDaySchedules, request aborted.'
      );
      return;
    }
    const res = await apiInstance({
      url: `/users/${currentUserId}/schedules/${date}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: `Bearer ${refreshToken}`
      }
    });
    return res.data;
  }
);

export const updateScheduleById = createAsyncThunk(
  'schedule/updateScheduleById',
  async (dataObj, { getState }) => {
    const tokenObj = extractTokens(getState, 'updateScheduleById');
    if (tokenObj === 'token missing') return;

    const res = await apiInstance({
      url: `/schedules/${dataObj.scheduleId}`,
      method: 'patch',
      data: dataObj.data,
      headers: {
        authorization: `Bearer ${tokenObj.token}`,
        refreshtoken: `Bearer ${tokenObj.refreshToken}`
      }
    });

    return res.data;
  }
);

export const deleteOneSchedule = createAsyncThunk(
  'schedule/deleteOneSchedule',
  async (scheduleId, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const refreshToken = state.auth.refreshToken;
    if (!token || !refreshToken) {
      console.log('token missing in deleteOneSchedule, request aborted.');
      return;
    }
    const res = await apiInstance({
      url: `/schedules/${scheduleId}`,
      method: 'delete',
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: `Bearer ${refreshToken}`
      }
    });

    return res.data;
  }
);

const ScheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    selectDate: (state, action) => {
      const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
      let weekDay, month;
      weekDays.forEach((ele, index) => {
        if (ele === action.payload[0]) {
          weekDay = (index + 1).toString();
          return;
        }
      });
      months.forEach((ele, index) => {
        if (ele === action.payload[1]) {
          month = (index + 1).toString();
          if (month.length < 2) {
            month = '0' + month;
          }
          return;
        }
      });
      state.selectedDate = [
        weekDay,
        action.payload[2],
        month,
        action.payload[3]
      ];
    },
    addScheduleToDate: (state, action) => {
      if (!state.scheduleMonth[action.payload.date]) {
        state.scheduleMonth[action.payload.date] = {};
      }
      state.scheduleMonth[action.payload.date][action.payload.id] =
        action.payload.schedule;
    },
    setDimmer: (state, action) => {
      if (action.payload === true) {
        state.dimmer = 'active';
      } else {
        state.dimmer = '';
      }
    },
    setEventModalOpen: (state, action) => {
      state.eventModalOpen = action.payload;
    },
    setActionModalOpen: (state, action) => {
      state.actionModalOpen = action.payload;
    },
    setSelectedEventId: (state, action) => {
      state.selectedEventId = action.payload;
    },
    setModalPrefill: (state, action) => {
      state.modalPrefill = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(PURGE, (state, action) => {
        return initialState;
      })
      .addCase(getCurrentDaySchedules.fulfilled, (state, action) => {
        if (action.payload && action.payload.data.data.length !== 0) {
          const eventArray = action.payload.data.data;
          const date = eventArray[0].eventDate;

          // clear the current state scheduleMonth before assigning the new ones
          state.scheduleMonth[date] = {};

          eventArray.forEach((event) => {
            state.scheduleMonth[date][event._id] = event;
          });
        }
      });
  }
});

export const {
  selectDate,
  addScheduleToDate,
  setDimmer,
  setEventModalOpen,
  setActionModalOpen,
  setSelectedEventId,
  setModalPrefill
} = ScheduleSlice.actions;
export default ScheduleSlice.reducer;
