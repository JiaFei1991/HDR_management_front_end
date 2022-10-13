import { store } from '../../app/store';
import { getRandomColor } from '../util/randomColor';
import { setActionModalOpen, setSelectedEventId } from './scheduleSlice';
import { vwToPx } from '../util/layoutCalc';
import { setModalSelectedDate } from './scheduleSlice';

const setParentElement = (target) => {
  const eventName = target.parentElement.getAttribute('name');
  let [day, month, year, hour, min] = eventName.split('-');
  const prefillDate = `${year}-${month}-${day}`;
  store.dispatch(setModalSelectedDate(prefillDate));
};

const onEventClick = (e) => {
  e.stopPropagation();

  console.log(e.target);

  if (e.target) {
    if (e.target.id && e.target.id !== '') {
      store.dispatch(setSelectedEventId(e.target.id.split('-')[1]));
      setParentElement(e.target);
    } else if (
      [
        'eventDescription',
        'eventTitle',
        'eventDuration',
        'eventTitleContainer'
      ].includes(e.target.className)
    ) {
      let cardId;
      if (['eventTitle', 'eventDuration'].includes(e.target.className)) {
        cardId = e.target.parentElement.parentElement.id;
        setParentElement(e.target.parentElement.parentElement);
      } else {
        cardId = e.target.parentElement.id;
        setParentElement(e.target.parentElement);
      }
      store.dispatch(setSelectedEventId(cardId.split('-')[1]));
    }
    store.dispatch(setActionModalOpen(true));
  }
};

export const renderEventCard = ({
  title,
  startTime,
  description,
  allday,
  scheduleId,
  eventLengthInMin,
  myEvent,
  isThereAllday,
  selectedDate
}) => {
  const [weekday, day, month, year] = selectedDate;
  let targetElement;
  const eventCard = document.createElement('div');
  eventCard.addEventListener('click', onEventClick);

  const fullWidth = document.getElementsByName(
    `${day}-${month}-${year}-0-first`
  )[0].clientWidth;

  let foreignEventClassName;
  myEvent ? (foreignEventClassName = '') : (foreignEventClassName = '-foreign');

  if (!allday) {
    // calculate card height in vh, half of an hour is 3vh
    const cardHeightInVh = eventLengthInMin * (3 / 30);

    // calculate card start position relative to a half hour row box
    const [startHour, startMin] = startTime.split(':');
    let cardStartPosInVh;
    if (Number(startMin) <= 30) {
      cardStartPosInVh = Number(startMin) * (3 / 30);
    } else {
      cardStartPosInVh = (Number(startMin) - 30) * (3 / 30);
    }

    eventCard.classList.add(`event${foreignEventClassName}`);
    eventCard.id = `event-${scheduleId}`;

    // title
    const eventTitle = document.createElement('h4');
    eventTitle.classList.add('eventTitle');
    eventTitle.innerText = `${title}`;
    // length
    const eventDuration = document.createElement('h5');
    eventDuration.classList.add('eventDuration');
    let length;
    if (eventLengthInMin % 60 === 0) {
      length = `${eventLengthInMin / 60} hour`;
    } else {
      length =
        eventLengthInMin < 60
          ? `${eventLengthInMin} mins`
          : `${Math.floor(eventLengthInMin / 60)} hour ${
              eventLengthInMin % 60
            } min`;
    }
    eventDuration.innerText = `Start at:${startTime}  Length:${length}`;

    // title and length container
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('eventTitleContainer');
    titleContainer.appendChild(eventTitle);
    titleContainer.appendChild(eventDuration);
    eventCard.appendChild(titleContainer);

    if (eventLengthInMin > 30) {
      eventCard.style.padding = '10px';
    } else {
      eventCard.style.paddingLeft = '10px';
      eventCard.style.paddingRight = '10px';
    }

    if (eventLengthInMin > 60) {
      eventDuration.innerText = `Start at: ${startTime}\nLength: ${length}`;
      const eventDescription = document.createElement('h5');
      eventDescription.classList.add('eventDescription');
      eventDescription.innerText =
        description.length <= 40
          ? `${description}`
          : `${description.slice(0, 40)}...`;
      eventCard.appendChild(eventDescription);
    }

    // eventCard.style.width = '20vw';
    let cardWidth;
    isThereAllday
      ? (cardWidth = `${fullWidth - vwToPx(2)}px`)
      : (cardWidth = `${fullWidth}px`);
    eventCard.style.width = cardWidth;
    eventCard.style.height = `${cardHeightInVh}vh`;
    eventCard.style.top = `${cardStartPosInVh}vh`;
    eventCard.style.backgroundColor = `${getRandomColor()}`;

    // identify the target
    targetElement = document.getElementsByName(
      `${day}-${month}-${year}-${Number(startHour)}-${
        Number(startMin) <= 30 ? 'first' : 'second'
      }`
    );
  } else {
    eventCard.classList.add(`event-allday${foreignEventClassName}`);
    eventCard.id = `event-${scheduleId}`;
    eventCard.style.backgroundColor = `${getRandomColor()}`;

    const eventTitle = document.createElement('h4');
    eventTitle.classList.add('verticalText');
    eventTitle.innerText = `${title}`;
    eventCard.appendChild(eventTitle);

    targetElement = document.getElementsByName(
      `${day}-${month}-${year}-0-first`
    );
  }

  // add card to target
  if (targetElement) {
    targetElement[0].append(eventCard);
  }
};
