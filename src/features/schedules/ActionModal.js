import { Button, message, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEventId, setEventModalOpen } from './scheduleSlice';

import {
  setActionModalOpen,
  deleteOneSchedule,
  setDimmer,
  setModalPrefill,
  getScheduleNotificationOfMonth
} from './scheduleSlice';
import { populateDay } from './populateDay';

export const ActionModal = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const dispatch = useDispatch();
  const open = useSelector((state) => state.schedule.actionModalOpen);
  const eventId = useSelector((state) => state.schedule.selectedEventId);
  const selectedDate = useSelector((state) => state.schedule.selectedDate);
  const formattedDate = `${selectedDate[1]}-${selectedDate[2]}-${selectedDate[3]}`;
  const scheduleMonth = useSelector((state) => state.schedule.scheduleMonth);
  const supervisorsName = useSelector((state) => state.user.supervisorsName);
  const studentsName = useSelector((state) => state.user.studentsName);

  const getNameFromId = (participantsId) => {
    let nameArray = [];
    participantsId.forEach((id) => {
      [...supervisorsName, ...studentsName].forEach((obj) => {
        if (obj._id === id) {
          nameArray.push(obj.name);
        }
      });
    });

    return nameArray;
  };

  const handleEdit = () => {
    // prefill modal initial content
    let selectedEvent;

    if (scheduleMonth[formattedDate]) {
      selectedEvent = scheduleMonth[formattedDate][eventId];
    }

    let prefillObj = {
      prefilledTitle: selectedEvent.title,
      prefilledDescription: selectedEvent.description,
      prefilledStartTime: new Date(selectedEvent.startTime).toLocaleTimeString(
        [],
        {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }
      ),
      prefilledEndTime: new Date(selectedEvent.endTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      prefilledRepeat: selectedEvent.repeat,
      prefilledChecked: selectedEvent.allday,
      prefilledLocation: selectedEvent.location,
      prefilledParticipants: getNameFromId(selectedEvent.participants)
    };

    if (!selectedEvent.startDate && !selectedEvent.endDate) {
      prefillObj = {
        ...prefillObj,
        prefilledStartDate: `${selectedDate[3]}-${selectedDate[2]}-${selectedDate[1]}`,
        prefilledEndDate: `${selectedDate[3]}-${selectedDate[2]}-${selectedDate[1]}`
      };
    } else {
      prefillObj = {
        ...prefillObj,
        prefilledStartDate: new Date(selectedEvent.startDate)
          .toLocaleDateString('en-au', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          })
          .split('/')
          .reverse()
          .join('-'),
        prefilledEndDate: new Date(selectedEvent.endDate)
          .toLocaleDateString('en-au', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          })
          .split('/')
          .reverse()
          .join('-')
      };
    }

    dispatch(setModalPrefill(prefillObj));

    // close the action modal
    dispatch(setActionModalOpen(false));

    // open event modal for editing
    dispatch(setEventModalOpen(true));
  };

  const handleDelete = async () => {
    // debugger;
    setDeleteLoading(true);
    const res = await dispatch(deleteOneSchedule(eventId)).unwrap();

    if (res && res.status === 'success') {
      setDeleteLoading(false);
      dispatch(setActionModalOpen(false));
      message.success('Schedule deleted successfully!', 4);

      // then populate the day with newly fetched events
      populateDay(selectedDate);
      dispatch(setSelectedEventId(undefined));
      dispatch(setDimmer(true));
    }
    dispatch(
      getScheduleNotificationOfMonth(`${selectedDate[2]}-${selectedDate[3]}`)
    );
  };

  const handleCancel = () => {
    dispatch(setActionModalOpen(false));
  };

  return (
    <Modal
      title="Select action"
      open={open}
      width={600}
      footer={null}
      maskClosable={false}
      onCancel={handleCancel}
    >
      <div id="action-modal-message">
        <h3 style={{ paddingBottom: '20px' }}>Delete event?</h3>
      </div>
      <div
        className="ant-modal-footer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          onClick={handleCancel}
          // disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          ghost
          htmlType="submit"
          name="submit-button"
          onClick={handleEdit}
          // disabled={disabled}
          // loading={loading}
        >
          Edit
        </Button>
        <Button
          type="primary"
          danger
          loading={deleteLoading}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
