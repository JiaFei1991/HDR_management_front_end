import { store } from '../../app/store';
import { getCurrentDaySchedules, setDimmer } from './scheduleSlice';
import { renderEventCard } from './renderEventCard';

export async function populateDay(displayingDates) {
  // clear all existing events before populating events from server
  const existingEvents = document.querySelectorAll('.event');
  const existingForeignEvents = document.querySelectorAll('.event-foreign');
  const existingAlldayEvents = document.querySelectorAll('.event-allday');
  const allExistingEvents = [
    ...existingEvents,
    ...existingForeignEvents,
    ...existingAlldayEvents
  ];
  if (allExistingEvents.length !== 0) {
    for (let i = 0; i < allExistingEvents.length; i++) {
      allExistingEvents[i].remove();
    }
  }

  for (let i = 0; i < displayingDates.length; i++) {
    const selectedDate = displayingDates[i];

    const events = await store
      .dispatch(
        getCurrentDaySchedules(
          `${selectedDate[1]}-${selectedDate[2]}-${selectedDate[3]}`
        )
      )
      .unwrap();

    // debugger;
    if (events && events.data.data.length !== 0) {
      const allday = events.data.allday;
      const arrayOfEvents = events.data.data;
      arrayOfEvents.forEach((event) => {
        let myEvent;
        event.userID === store.getState().auth.loggedinUser._id
          ? (myEvent = true)
          : (myEvent = false);

        renderEventCard({
          title: event.title,
          startTime: new Date(event.startTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }),
          endTime: new Date(event.endTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }),
          repeat: event.repeat,
          description: event.description,
          allday: event.allday,
          scheduleId: event._id,
          eventLengthInMin: event.eventLengthInMin,
          myEvent,
          isThereAllday: allday,
          selectedDate
        });
      });
    }
  }
  store.dispatch(setDimmer(false));
}
