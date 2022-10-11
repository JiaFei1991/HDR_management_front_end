import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import '../../style.css';

import DayCell from './dayCell';
import { populateDay } from './populateDay';
import {
  setDimmer,
  setEventModalOpen,
  setCreatebuttonopen
} from './scheduleSlice';
import { vh, vw, resizeEventCard } from '../util/layoutCalc';

const generateDisplayingDates = (today, numberOfDays) => {
  const dateObj = new Date(today[3], today[2] - 1, today[1]);
  let dateArray = [today];
  for (let i = 0; i < numberOfDays - 1; i++) {
    dateObj.setDate(dateObj.getDate() + 1);
    dateArray.push([
      dateObj.getDay().toString(),
      ...new Date(dateObj).toLocaleDateString().split('/')
    ]);
  }
  return dateArray;
};

const DayScheduler = () => {
  const [view, setView] = useState(1);
  const [viewMenuDisplay, setViewMenuDisplay] = useState('View');
  const [dayCellArray, setDayCellArray] = useState([]);
  const [vhSize, setVhSize] = useState(vh(100));
  const [vwSize, setVwSize] = useState(vw(100));

  const dispatch = useDispatch();

  const selectedDate = useSelector((state) => state.schedule.selectedDate);
  const dimmer = useSelector((state) => state.schedule.dimmer);

  let timeoutId;
  window.addEventListener('resize', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setVhSize(window.innerWidth);
      setVwSize(window.innerHeight);
    }, 250);
  });

  useEffect(() => {
    let array = [];
    const displayingDates = generateDisplayingDates(selectedDate, view);
    displayingDates.forEach((date) => {
      array.push(
        <DayCell
          key={date}
          selectedDate={date}
          displayingDates={displayingDates}
        />
      );
    });
    setDayCellArray(array);

    dispatch(setDimmer(true));
    populateDay(displayingDates);
  }, [view, selectedDate]);

  useEffect(() => {
    setTimeout(() => {
      const mainPageComponent = document.getElementById('main-page');
      const breadcrumbComponent = document.getElementById('breadcrumb');
      const daySchedulerComponent = document.getElementById('day-scehduler');
      const schedulerHeader = document.getElementById('scheduler-header');
      const schedulerBodys = document.getElementsByClassName('scheduler-body');

      const resizeTargetList = [
        ...document.getElementsByClassName('event'),
        ...document.getElementsByClassName('event-foreign')
      ];
      const alldayEvents = [
        ...document.getElementsByClassName('event-allday'),
        ...document.getElementsByClassName('event-allday-foreign')
      ];

      const isThereAllday = alldayEvents.length !== 0;
      for (let i = 0; i < resizeTargetList.length; i++) {
        resizeEventCard(isThereAllday, resizeTargetList[i]);
      }

      if (
        breadcrumbComponent &&
        mainPageComponent &&
        daySchedulerComponent &&
        schedulerHeader &&
        schedulerBodys
      ) {
        const schedulerHeightInPx =
          mainPageComponent.clientHeight - breadcrumbComponent.clientHeight;
        daySchedulerComponent.style.maxHeight = `${schedulerHeightInPx}px`;

        const schedulerBodyHeightInPx =
          mainPageComponent.clientHeight -
          breadcrumbComponent.clientHeight -
          schedulerHeader.clientHeight -
          24 * 2;

        for (let i = 0; i < schedulerBodys.length; i++) {
          schedulerBodys[i].style.maxHeight = `${schedulerBodyHeightInPx}px`;
        }
      }
    }, 50);
  }, [vhSize, vwSize, view, selectedDate]);

  const onViewClick = (event) => {
    const selectedViewNumeric = event.target.getAttribute('data-value');
    const selectedViewText = event.target.getAttribute('name');
    setView(selectedViewNumeric);
    setViewMenuDisplay(selectedViewText);
  };

  const onCreateNewEvent = (event) => {
    console.log('create new event clicked!');
    dispatch(setCreatebuttonopen(true));
    dispatch(setEventModalOpen(true));
  };

  return (
    <section
      id="day-scehduler"
      style={{
        padding: 0,
        margin: 0
      }}
    >
      <header id="scheduler-header">
        <div id="header-dropdown" className="ui compact menu">
          <div className="ui simple dropdown item">
            {viewMenuDisplay}
            <i className="dropdown icon"></i>
            <div className="menu" onClick={onViewClick}>
              <div className="item" data-value="1" name="Day">
                Day
              </div>
              <div className="item" data-value="2" name="Two days">
                Two days
              </div>
              <div className="item" data-value="3" name="Three days">
                Three days
              </div>
              <div className="item" data-value="5" name="Week">
                Week
              </div>
            </div>
          </div>
        </div>
        <div id="date-display">
          <i className="large calendar icon"></i>
          <h2 id="date-display">
            {new Date(
              selectedDate[3],
              selectedDate[2] - 1,
              selectedDate[1]
            ).toLocaleDateString('en-au', {
              weekday: 'long',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            })}
          </h2>
        </div>
        <div id="header-button-group">
          <button className="ui icon button" onClick={onCreateNewEvent}>
            <i className="plus icon"></i>
          </button>
        </div>
      </header>

      <div id="scheduler-body-container" style={{ position: 'relative' }}>
        <div
          className={`ui ${dimmer} inverted dimmer`}
          style={{ position: 'absolute' }}
        >
          <div className="ui text loader">Loading</div>
        </div>
        {dayCellArray}
      </div>
    </section>
  );
};

export default DayScheduler;
