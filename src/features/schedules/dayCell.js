import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../style.css';

import HourCell from './hourCell';
import NewEventModal from './newEventModal';
import { ActionModal } from './ActionModal';
import { populateDay } from './populateDay';
import { setEventModalOpen } from './scheduleSlice';

const DayCell = () => {
  const dispatch = useDispatch();
  const [initTime, setInitTime] = useState(['00:00', '00:00']);

  const dimmer = useSelector((state) => state.schedule.dimmer);
  const selectedDate = useSelector((state) => state.schedule.selectedDate);

  useEffect(() => {
    populateDay(selectedDate);
  }, [selectedDate, dispatch]);

  // handle row click
  const onRowClick = (e) => {
    dispatch(setEventModalOpen(true));

    const eventName = e.target.getAttribute('name');
    let [hour, min] = eventName.split('-');
    const startMin = min === 'first' ? '00' : '30';

    let endHour, endMin;
    if (startMin === '00') {
      endHour = hour;
      endMin = '30';
    } else {
      endHour = (Number(hour) + 1).toString();
      endMin = '00';
    }

    if (hour.length < 2) {
      hour = `0${hour}`;
    }
    if (endHour.length < 2) {
      endHour = `0${endHour}`;
    }

    const prefillTime = [`${hour}:${startMin}`, `${endHour}:${endMin}`];

    setInitTime(prefillTime);
  };

  // generate hour cells
  let cellStack = [];
  for (let i = 0; i < 24; i++) {
    cellStack.push(
      <HourCell key={i} hour={`${i}:00`} onRowClick={onRowClick} />
    );
  }

  return (
    <div id="scheduler-body">
      {cellStack}
      <div
        className={`ui ${dimmer} inverted dimmer`}
        style={{ position: 'absolute' }}
      >
        <div className="ui text loader">Loading</div>
      </div>
      <NewEventModal initTime={initTime} />
      <ActionModal />
    </div>
  );
};

export default DayCell;
