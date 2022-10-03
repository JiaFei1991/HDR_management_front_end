import { store } from '../../app/store';
import { getCurrentDaySchedules, setDimmer } from './scheduleSlice';
import { renderEventCard } from './renderEventCard';

export async function populateDay(selectedDate) {
  // clear all existing events before populating events from server
  const existingEvents = document.querySelectorAll('.event');
  if (existingEvents.length !== 0) {
    for (let i = 0; i < existingEvents.length; i++) {
      existingEvents[i].remove();
    }
  }

  const events = await store
    .dispatch(
      getCurrentDaySchedules(
        `${selectedDate[1]}-${selectedDate[2]}-${selectedDate[3]}`
      )
    )
    .unwrap();

  if (events && events.data.data.length !== 0) {
    const arrayOfEvents = events.data.data;
    arrayOfEvents.forEach((event) => {
      renderEventCard({
        title: event.title,
        startTime: new Date(event.startTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        endTime: new Date(event.endTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        repeat: event.repeat,
        description: event.description,
        allday: event.allday,
        scheduleId: event._id,
        eventLengthInMin: event.eventLengthInMin
      });
    });
  }
  store.dispatch(setDimmer(false));
}
