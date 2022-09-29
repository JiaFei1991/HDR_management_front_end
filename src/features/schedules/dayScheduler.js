import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../../style.css';

import HourCell from './hourCell';
import { vh, vw } from '../util/layoutCalc';
import { useSelector } from 'react-redux';

const DayScheduler = () => {
  const today = useSelector((state) => state.schedule.today);
  const [vhSize, setVhSize] = useState(vh(100));
  const [vwSize, setVwSize] = useState(vw(100));

  window.onresize = function () {
    setVhSize(vh(100));
    setVwSize(vw(100));
  };

  useEffect(() => {
    const mainPageComponent = document.getElementById('main-page');
    const breadcrumbComponent = document.getElementById('breadcrumb');
    const daySchedulerComponent = document.getElementById('day-scehduler');
    const schedulerHeader = document.getElementById('schduler-header');
    const schedulerBody = document.getElementById('scheduler-body');

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

  // generate hour cells
  const onRowClick = (e) => {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.innerText = 'my new event';
    e.target.appendChild(eventDiv);

    console.log(e.target.getAttribute('name'));
  };
  let cellStack = [];
  for (let i = 0; i < 24; i++) {
    cellStack.push(<HourCell hour={`${i}:00`} onRowClick={onRowClick} />);
  }

  return (
    <section
      id="day-scehduler"
      style={{
        padding: 0,
        margin: 0
        // overflow: 'auto'
      }}
    >
      <header id="schduler-header">
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
        <div id="scheduler-body">{cellStack}</div>
      </div>
    </section>
  );
};

export default DayScheduler;
