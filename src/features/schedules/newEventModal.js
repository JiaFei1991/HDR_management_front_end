import { Modal, Form, Button, Input, TimePicker, Checkbox } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const { TextArea } = Input;

const NewEventModal = ({ open, setOpen, initTime }) => {
  //   const initTime = useSelector((state) => state.schedule.initTime);
  //   const initialValues = {}
  //   const dispatch = useDispatch();
  // const [confirmLoading, setConfirmLoading] = useState(false);
  //   useEffect(() => {
  //     const input = document.getElementById('event-title-input');
  //     if (input) {
  //       input.value = '';
  //     }
  //   }, [open]);
  const [form] = Form.useForm();
  //   const [initTime, setInitTime] = useState([]);

  // handle form submission and create new event
  const handleSubmit = (values) => {
    form.resetFields();
    console.log(values);
    // const eventName = e.target.getAttribute('name');
    // const eventDiv = document.createElement('div');
    // eventDiv.classList.add('event');
    // eventDiv.id = `event-${eventName}`;
    // eventDiv.innerText = 'my new event';

    // e.target.appendChild(eventDiv);
  };

  // handle cancelling form
  const handleCancel = () => {
    form.resetFields();
    // setInitTime(undefined);
    setOpen(false);
  };

  //   useEffect(() => {
  //     if (eventName) {
  //       const mStart = moment();
  //       const mEnd = moment();
  //       // const eventName = e.target.getAttribute('name');
  //       const [hour, min] = eventName.split('-');
  //       const startMin = min === 'first' ? '0' : '30';
  //       let endHour, endMin;
  //       if (startMin === '0') {
  //         endHour = hour;
  //         endMin = 30;
  //       } else {
  //         endHour = Number(hour) + 1;
  //         endMin = 0;
  //       }
  //       const prefillTime = [
  //         mStart.set({
  //           hour: Number(hour),
  //           minute: Number(startMin),
  //           second: 0,
  //           millisecond: 0
  //         }),
  //         mEnd.set({ hour: endHour, minute: endMin, second: 0, millisecond: 0 })
  //       ];
  //       setInitTime(prefillTime);
  //     }
  //   }, [eventName]);

  //   useEffect(() => {
  //     setValue((value) => value + 1);
  //   }, [initTime]);

  const formRules = (fieldName) => [
    {
      required: true,
      message: `Please enter your ${fieldName}!`
    }
  ];

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
        <input value={initTime}></input>
        <div class="ui input">
          <input type="text" placeholder="Search..." value={initTime} />
        </div>
        {/* <Form
            form={form}
            labelCol={{
              span: 4
            }}
            wrapperCol={{
              span: 14
            }}
            layout="horizontal"
            //   disabled={formDisable}
            onFinish={handleSubmit}
            // initialValues={initialValues}
          >
            <Form.Item label="Title" name="title" rules={formRules('title')}>
              <Input id="event-title-input" allowClear={true} />
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={formRules('location')}
            >
              <Input id="event-location-input" allowClear={true} />
            </Form.Item>

            <Form.Item label="Time" name="time" rules={formRules('time')}>
              <TimePicker.RangePicker
                allowClear={true}
                // defaultValue={initTime}
              />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <TextArea
                rows={4}
                placeholder="maxLength is 400"
                maxLength={400}
                allowClear={true}
                defaultValue={initTime}
              />
            </Form.Item>

            <Form.Item name="allday">
              <Checkbox>All day</Checkbox>
            </Form.Item>

            <div
              className="ant-modal-footer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                name="submit-button"
                //   disabled={submitDisabled}
                //   loading={spin}
              >
                Create event
              </Button>
            </div>
          </Form> */}
      </Modal>
    </>
  );
};

export default NewEventModal;
