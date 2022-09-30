import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import '../../style.css';

import DayCell from './dayCell';
import { vh, vw } from '../util/layoutCalc';

const DayScheduler = () => {
  const [vhSize, setVhSize] = useState(vh(100));
  const [vwSize, setVwSize] = useState(vw(100));
  const today = useSelector((state) => state.schedule.today);

  window.onresize = function () {
    setVhSize(100);
    setVwSize(100);
  };

  useEffect(() => {
    const mainPageComponent = document.getElementById('main-page');
    const breadcrumbComponent = document.getElementById('breadcrumb');
    const daySchedulerComponent = document.getElementById('day-scehduler');
    const schedulerHeader = document.getElementById('scheduler-header');
    const schedulerBody = document.getElementById('scheduler-body');

    // const hourRow = document.getElementsByClassName('row');
    // const events = document.getElementsByClassName('event');
    // // debugger;
    // if (hourRow.length !== 0 && events.length !== 0) {
    //   events.style.maxWidth = hourRow.clientWidth;
    // }

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
