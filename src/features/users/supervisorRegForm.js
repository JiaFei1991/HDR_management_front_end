import React, { useState, useEffect } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  message,
  notification
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, createNewUser } from './userSlice';
// import { useNavigate } from 'react-router';

const { Option } = Select;

const SupervisorRegForm = ({ role }) => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const students = useSelector((state) => state.user.studentsName);

  const [imageUrl, setImageUrl] = useState();
  const [uploadFileError, setUploadFileError] = useState();
  const [submitDisabled, setsubmitDisabled] = useState(false);
  const [pickerDisabled, setpickerDisabled] = useState(false);

  useEffect(() => {
    openNotification();
  }, []);

  const openNotification = () => {
    const args = {
      message: 'Important Notice',
      description:
        'The creation of a supervisor account needs to be approved by an admin. An email will be sent to you notifying the result of your application.',
      duration: 0
    };
    notification.open(args);
  };

  const submitForm = (students) => async (values) => {
    values['role'] = role;
    values['avatar'] = values.avatar[0].originFileObj;

    for (let item of students) {
      if (values.supervisors === item.name) {
        values.supervisors = item._id;
        break;
      }
    }

    console.log(values);

    const formData = new FormData();
    for (const name in values) {
      formData.append(name, values[name]);
    }

    // await dispatch(createNewUser(formData));
    // message.success(
    //   'Application to create supervisor account successfully generated. Wait for email approval!'
    // );
    // dispatch(openModal(false));
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      setsubmitDisabled(true);
      setUploadFileError(true);
      return false;
    }

    if (submitDisabled) setsubmitDisabled(false);
    if (uploadFileError) setUploadFileError(false);

    return false;
  };

  const getBase64 = (file) => {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        resolve(reader.result);
      };
    });
  };

  const handleChange = async (info) => {
    const res = await getBase64(info.file);
    setImageUrl(res);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e.fileList;
  };

  const onCancelForm = () => {
    dispatch(openModal(false));
  };

  let studentList;
  if (!students) {
    setpickerDisabled(true);
    studentList = (
      <Option value="disabled" disabled>
        No students available
      </Option>
    );
  } else {
    studentList = students.map((student) => {
      return (
        <Option key={student.name} value={`${student.name}`}>
          {student.name}
        </Option>
      );
    });
  }

  let displayItem;
  if (imageUrl && !uploadFileError) {
    displayItem = (
      <img
        alt="avatar"
        style={{
          width: '100%'
        }}
        src={imageUrl}
      />
    );
  } else if (imageUrl && uploadFileError) {
    displayItem = (
      <div>
        <CloseOutlined style={{ color: 'red' }} />
        <div
          style={{
            marginTop: 8,
            color: 'red'
          }}
        >
          Error
        </div>
      </div>
    );
  } else {
    displayItem = (
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8
          }}
        >
          Upload
        </div>
      </div>
    );
  }

  const formRules = (fieldName) => [
    {
      required: true,
      message: `Please enter your ${fieldName}!`
    }
  ];

  // <h3></h3>
  return (
    <Form
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        span: 14
      }}
      layout="horizontal"
      onFinish={submitForm(students)}
    >
      <Form.Item label="Name" name="name" rules={formRules('name')}>
        <Input name="name-input" />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={formRules('email')}>
        <Input name="email-input" />
      </Form.Item>

      <Form.Item
        label="Date of birth"
        name="DoB"
        rules={formRules('date of birth')}
      >
        <DatePicker name="DoB-picker" />
      </Form.Item>

      <Form.Item label="Students" name="students" rules={formRules('students')}>
        <Select
          mode="multiple"
          allowClear
          style={{
            width: '100%'
          }}
          disabled={pickerDisabled}
          placeholder="Please select your students"
          // onChange={handleChange}
        >
          {studentList}
        </Select>
      </Form.Item>

      <Form.Item
        label="Profile picture"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        name="avatar"
        rules={formRules('avatar')}
      >
        <Upload
          name="picUpload-card"
          accept="image/png, image/jpeg"
          maxCount={1}
          listType="picture-card"
          showUploadList={false}
          customRequest={dummyRequest} // to override the component sending request on image upload
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {displayItem}
        </Upload>
      </Form.Item>

      <div
        className="ant-modal-footer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <Button onClick={onCancelForm}>Cancel</Button>
        <Button
          type="primary"
          htmlType="submit"
          name="submit-button"
          disabled={submitDisabled}
        >
          Create Account
        </Button>
      </div>
    </Form>
  );
};

export default SupervisorRegForm;
