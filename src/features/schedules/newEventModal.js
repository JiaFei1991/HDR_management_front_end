import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, message } from 'antd';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// import { renderEventCard } from './renderEventCard';
import { populateDay } from './populateDay';
import { ParticipantPicker } from './participantPicker';
import {
  //   addScheduleToDate,
  createNewSchedule,
  setModalPrefill,
  setEventModalOpen,
  updateScheduleById,
  setSelectedEventId,
  setDimmer
} from './scheduleSlice';

const NewEventModal = ({ initTime }) => {
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [repeat, setRepeat] = useState('None');
  const [title, setTitle] = useState('My new event');
  const [description, setDescription] = useState('Event description');
  const [checked, setChecked] = useState(false);
  const [location, setLocation] = useState('None');
  const [participants, setParticipants] = useState([]);

  const [timeDisabled, setTimeDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [confirmButton, setConfirmButton] = useState('Create event');

  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.schedule.selectedDate);
  const currentUser = useSelector((state) => state.auth.loggedinUser);
  const open = useSelector((state) => state.schedule.eventModalOpen);
  const prefillObj = useSelector((state) => state.schedule.modalPrefill);
  const selectedEventId = useSelector(
    (state) => state.schedule.selectedEventId
  );
  const supervisorsName = useSelector((state) => state.user.supervisorsName);
  const studentsName = useSelector((state) => state.user.studentsName);

  useEffect(() => {
    if (Object.keys(prefillObj).length !== 0) {
      setStartTime(prefillObj.prefilledStartTime);
      setEndTime(prefillObj.prefilledEndTime);
      setRepeat(prefillObj.prefilledRepeat);
      setTitle(prefillObj.prefilledTitle);
      setDescription(prefillObj.prefilledDescription);
      setChecked(prefillObj.prefilledChecked);
      setLocation(prefillObj.prefilledLocation);
      setParticipants(prefillObj.prefilledParticipants);

      setConfirmButton('Update event');
    } else {
      setConfirmButton('Create event');
    }
  }, [prefillObj]);

  useEffect(() => {
    setStartTime(initTime[0]);
    setEndTime(initTime[1]);
  }, [initTime]);

  const loadingAndDisable = (value) => {
    setLoading(value);
    setDisabled(value);
    setTimeDisabled(value);
  };

  // handle form submission and create new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    loadingAndDisable(true);

    const [startHour, startMin] = startTime.split(':');
    const [endHour, endMin] = endTime.split(':');
    const start = new Date();
    start.setHours(startHour, startMin, 0);
    const end = new Date();
    end.setHours(endHour, endMin, 0);

    if (start >= end) {
      message.error(
        'Start time of the event cannot be equal to or later than the end time.',
        4
      );
      loadingAndDisable(false);
      return;
    }
    const eventLengthInMin = (end - start) / (1000 * 60);
    if (eventLengthInMin < 30) {
      message.error('An event can be no shorter than 30 minutes.', 4);
      loadingAndDisable(false);
      return;
    }
    if (title.length > 35) {
      message.error('A title cannot exceeds 35 letters.', 4);
      loadingAndDisable(false);
      return;
    }

    const currentLocalStates = {
      title,
      description,
      repeat,
      allday: checked,
      userID: currentUser._id,
      eventDate: `${selectedDate[1]}-${selectedDate[2]}-${selectedDate[3]}`,
      eventLengthInMin,
      location,
      participants,
      startTime: new Date(
        selectedDate[3],
        selectedDate[2] - 1,
        selectedDate[1],
        ...startTime.split(':')
      ),
      endTime: new Date(
        selectedDate[3],
        selectedDate[2] - 1,
        selectedDate[1],
        ...endTime.split(':')
      )
    };

    console.log(currentLocalStates);

    // if prefill doesnt exist, submit form to create new event
    if (Object.keys(prefillObj).length === 0) {
      const res = await dispatch(
        createNewSchedule(currentLocalStates)
      ).unwrap();

      if (res && res.status === 'success') {
        populateDay(selectedDate);
        dispatch(setDimmer(true));

        message.success('Event created successfully.', 4);
      }
    } else {
      // otherwise, update the existing event
      const res = await dispatch(
        updateScheduleById({
          scheduleId: selectedEventId,
          data: currentLocalStates
        })
      ).unwrap();

      if (res && res.status === 'success') {
        populateDay(selectedDate);
        dispatch(setSelectedEventId(undefined));
        dispatch(setDimmer(true));

        message.success('Event updated successfully.', 4);
      }
    }

    // clear the prefill content
    dispatch(setModalPrefill({}));
    loadingAndDisable(false);
    dispatch(setEventModalOpen(false));
    resetForm();
  };

  // handle cancelling form
  const handleCancel = () => {
    dispatch(setEventModalOpen(false));
    resetForm();

    // clear the prefill content
    dispatch(setModalPrefill({}));
  };

  const resetForm = () => {
    setChecked(false);
    setRepeat('None');
    setTitle('My new event');
    setDescription('Event description');
    setLocation('None');
    setParticipants([]);
  };

  const onStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };
  const onEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onCheckboxChange = (event) => {
    setChecked(event.target.checked);
    event.target.checked ? setTimeDisabled(true) : setTimeDisabled(false);
  };

  const onRepeatChange = (event) => {
    setRepeat(event.target.value);
  };

  const onLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <>
      <Modal
        title="Create an new event"
        open={open}
        width={600}
        footer={null}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          <div id="event-form-container">
            <TextField
              required
              id="event-form-title"
              name="title"
              label="Title"
              value={title}
              onChange={onTitleChange}
              disabled={disabled}
            />

            <TextField
              id="event-form-location"
              name="location"
              label="Location"
              value={location}
              onChange={onLocationChange}
              disabled={disabled}
            />

            <ParticipantPicker
              id="event-form-participant"
              names={
                supervisorsName && studentsName
                  ? [...supervisorsName, ...studentsName].map(
                      (nameObj) => nameObj.name
                    )
                  : []
              }
              participants={participants}
              setParticipants={setParticipants}
            />

            <div id="time-input">
              <TextField
                required
                id="event-form-startTime"
                label="Start time"
                name="startTime"
                type="time"
                value={startTime}
                disabled={timeDisabled}
                onChange={onStartTimeChange}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
                sx={{ width: 150 }}
              />

              <TextField
                required
                id="event-form-endTime"
                label="End time"
                name="endTime"
                type="time"
                value={endTime}
                disabled={timeDisabled}
                onChange={onEndTimeChange}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
                sx={{ width: 150 }}
              />
            </div>

            <TextField
              id="event-form-description"
              label="Description"
              name="description"
              value={description}
              multiline
              rows={4}
              onChange={onDescriptionChange}
              disabled={disabled}
            />

            <div id="event-form-checkbox">
              <FormControl>
                <InputLabel>Repeat</InputLabel>
                <Select
                  id="event-form-repeat-select"
                  value={repeat}
                  label="Repeat"
                  onChange={onRepeatChange}
                  disabled={disabled}
                >
                  <MenuItem value={'None'}>None</MenuItem>
                  <MenuItem value={'Daily'}>Daily</MenuItem>
                  <MenuItem value={'Weekly'}>Weekly</MenuItem>
                  <MenuItem value={'Monthly'}>Monthly</MenuItem>
                  <MenuItem value={'Yearly'}>Yearly</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    value={checked}
                    onChange={onCheckboxChange}
                    disabled={disabled}
                    name="AlldayCheckbox"
                  />
                }
                label="All day"
              />
            </div>
          </div>

          <div
            className="ant-modal-footer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Button onClick={handleCancel} disabled={disabled}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              name="submit-button"
              disabled={disabled}
              loading={loading}
            >
              {confirmButton}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NewEventModal;
