import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  today: [
    new Date().getDay().toString(),
    ...new Date().toJSON().slice(0, 10).split('-').reverse()
  ],
  selectedDate: undefined,
  initTime: undefined
};

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
    setInitTime: (state, action) => {
      // const updatedAction = [];
      // action.payload.forEach((ele) => {
      //   updatedAction.push(ele._d);
      // });
      // state.initTime = updatedAction[0].toString();
      state.initTime = action.payload;
    }
  }
});

export const { selectDate, setInitTime } = ScheduleSlice.actions;
export default ScheduleSlice.reducer;
