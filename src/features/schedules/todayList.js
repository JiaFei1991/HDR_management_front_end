import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDaySchedules } from './scheduleSlice';

const TodayList = () => {
  const dispatch = useDispatch();

  const selectedDate = useSelector((state) => state.schedule.selectedDate);
  const formattedDate = `${selectedDate[1]}-${selectedDate[2]}-${selectedDate[3]}`;
  const todayTasks = useSelector(
    (state) => state.schedule.scheduleMonth[formattedDate]
  );

  useEffect(() => {
    dispatch(getCurrentDaySchedules(formattedDate));
  }, [selectedDate]);

  let todayTaskList = [];
  if (todayTasks && Object.keys(todayTasks).length !== 0) {
    for (const [key, value] of Object.entries(todayTasks)) {
      todayTaskList.push(
        <div className="item" id="today-list-item" key={key}>
          <div className="time-avatar">{`${new Date(
            value.startTime
          ).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}`}</div>
          <div className="today-list-item-content">
            <div className="header">{value.title}</div>
            <div id="today-list-item-description">
              {value.description.length > 40
                ? `${value.description.slice(0, 40)}...`
                : `${value.description}`}
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div
      id="right-sider-list"
      style={{
        overflow: 'auto',
        padding: '0 16px'
      }}
    >
      <div className="ui large divided list">{todayTaskList}</div>
    </div>
  );
};

export default TodayList;
