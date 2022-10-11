import { useDispatch, useSelector } from 'react-redux';
import '../../style.css';

import HourCell from './hourCell';
import NewEventModal from './newEventModal';
import { ActionModal } from './ActionModal';
import {
  setEventModalOpen,
  setInitTime,
  setModalSelectedDate
} from './scheduleSlice';

const DayCell = ({ selectedDate, displayingDates }) => {
  const dispatch = useDispatch();

  // handle row click
  const onRowClick = (e) => {
    const eventName = e.target.getAttribute('name');
    let [day, month, year, hour, min] = eventName.split('-');
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
    const prefillDate = `${year}-${month}-${day}`;

    dispatch(setInitTime(prefillTime));

    dispatch(setModalSelectedDate(prefillDate));

    dispatch(setEventModalOpen(true));
  };

  // generate hour cells
  let cellStack = [];
  for (let i = 0; i < 24; i++) {
    cellStack.push(
      <HourCell
        key={`${selectedDate[1]}-${i}`}
        hour={`${i}:00`}
        onRowClick={onRowClick}
        selectedDate={selectedDate}
      />
    );
  }

  return (
    <div className="scheduler-body">
      {cellStack}
      <NewEventModal displayingDates={displayingDates} />
      <ActionModal displayingDates={displayingDates} />
    </div>
  );
};

export default DayCell;
