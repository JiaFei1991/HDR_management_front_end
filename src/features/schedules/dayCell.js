import HourCell from './hourCell';
import '../../style.css';
import NewEventModal from './newEventModal';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { setInitTime } from './scheduleSlice';
import { useDispatch } from 'react-redux';

const DayCell = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [initTime, setmyInitTime] = useState([]);
  //   const [event, setEvent] = useState();

  //   // handle form submission and create new event
  //   const handleSubmit = ({ values, form }) => {
  //     console.log(values);
  //     form.resetFields();
  //     // const eventName = e.target.getAttribute('name');
  //     // const eventDiv = document.createElement('div');
  //     // eventDiv.classList.add('event');
  //     // eventDiv.id = `event-${eventName}`;
  //     // eventDiv.innerText = 'my new event';

  //     // e.target.appendChild(eventDiv);
  //   };

  //   // handle cancelling form
  //   const handleCancel = (form) => {
  //     form.resetFields();
  //     setInitTime(undefined);
  //     setOpen(false);
  //   };

  // handle row click
  const onRowClick = (e) => {
    setOpen(true);
    // setEvent(e.target.getAttribute('name'));
    // debugger;
    const mStart = moment();
    const mEnd = moment();
    const eventName = e.target.getAttribute('name');
    const [hour, min] = eventName.split('-');
    const startMin = min === 'first' ? '0' : '30';
    let endHour, endMin;
    if (startMin === '0') {
      endHour = hour;
      endMin = 30;
    } else {
      endHour = Number(hour) + 1;
      endMin = 0;
    }
    // const prefillTime = [
    //   mStart.set({
    //     hour: Number(hour),
    //     minute: Number(startMin),
    //     second: 0,
    //     millisecond: 0
    //   }),
    //   mEnd.set({ hour: endHour, minute: endMin, second: 0, millisecond: 0 })
    // ];
    const prefillTime = `${hour}:${startMin}`;
    setmyInitTime(prefillTime);
    // dispatch(setInitTime(prefillTime));
    // setmyInitTime(prefillTime);
    // debugger;
    console.log(e.target.getAttribute('name'));
  };

  //   useEffect(() => {
  //     console.log(initTime);
  //     dispatch(setInitTime(initTime));
  //   }, [initTime]);

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
      <NewEventModal
        open={open}
        setOpen={setOpen}
        initTime={initTime}
        // eventName={event}
        // handleSubmit={handleSubmit}
        // handleCancel={handleCancel}
      />
    </div>
  );
};

export default DayCell;
