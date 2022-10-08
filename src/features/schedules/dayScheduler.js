import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import '../../style.css';

import DayCell from './dayCell';
import { vh, vw, resizeEventCard } from '../util/layoutCalc';

const DayScheduler = () => {
  const [vhSize, setVhSize] = useState(vh(100));
  const [vwSize, setVwSize] = useState(vw(100));
  const today = useSelector((state) => state.schedule.selectedDate);

  let timeoutId;
  window.addEventListener('resize', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setVhSize(window.innerWidth);
      setVwSize(window.innerHeight);
    }, 250);
  });

  useEffect(() => {
    const mainPageComponent = document.getElementById('main-page');
    const breadcrumbComponent = document.getElementById('breadcrumb');
    const daySchedulerComponent = document.getElementById('day-scehduler');
    const schedulerHeader = document.getElementById('scheduler-header');
    const schedulerBody = document.getElementById('scheduler-body');

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
      schedulerBody
    ) {
      const schedulerHeightInPx =
        mainPageComponent.clientHeight -
        breadcrumbComponent.clientHeight -
        24 * 4;
      daySchedulerComponent.style.maxHeight = `${schedulerHeightInPx}px`;

      const schedulerBodyHeightInPx =
        mainPageComponent.clientHeight -
        breadcrumbComponent.clientHeight -
        schedulerHeader.clientHeight -
        24 * 4;
      schedulerBody.style.maxHeight = `${schedulerBodyHeightInPx}px`;
    }
  }, [vhSize, vwSize]);

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
            View
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className="item">Day</div>
              <div className="item">Week</div>
            </div>
          </div>
        </div>
        <div id="date-display">
          <i className="large calendar icon"></i>
          <h2 id="date-display">
            {new Date(today[3], today[2] - 1, today[1]).toLocaleDateString(
              'en-au',
              {
                weekday: 'long',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              }
            )}
          </h2>
        </div>
        <div id="header-button-group">
          <button className="ui icon button">
            <i className="angle left icon"></i>
          </button>
          <button className="ui icon button">
            <i className="angle right icon"></i>
          </button>
        </div>
      </header>

      <div id="scheduler-body-container">
        <DayCell />
      </div>
    </section>
  );
};

export default DayScheduler;
