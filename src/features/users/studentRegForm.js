import React, { useState } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, DatePicker, Upload, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, createNewUser } from './userSlice';
// import { useNavigate } from 'react-router';

const { TextArea } = Input;
const { Option } = Select;

const StudentRegForm = ({ role }) => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const supervisors = useSelector((state) => state.user.supervisors);

  const [imageUrl, setImageUrl] = useState();
  const [uploadFileError, setUploadFileError] = useState();
  const [submitDisabled, setsubmitDisabled] = useState(false);

  const submitForm = (supervisors) => async (values) => {
    values['role'] = role;
    values['DoB'] = values.DoB._d;
    values['MoA'] = values.MoA._d;
    values['avatar'] = values.avatar[0].originFileObj;

    for (let item of supervisors) {
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

    await dispatch(createNewUser(formData));
    message.success(
      'Student account successfully created, log in with email and password!'
    );
    dispatch(openModal(false));
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

  let supervisorList;
  if (!supervisors) {
    supervisorList = (
      <Select.Option value="disabled" disabled>
        No supervisor available
      </Select.Option>
    );
  } else {
    supervisorList = supervisors.map((supervisor) => {
      return (
        <Option key={supervisor.name} value={`${supervisor.name}`}>
          {supervisor.name}
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

  return (
    <Form
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        span: 14
      }}
      layout="horizontal"
      onFinish={submitForm(supervisors)}
    >
      <Form.Item label="Name" name="name" rules={formRules('name')}>
        <Input name="name-input" />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={formRules('email')}>
        <Input name="email-input" />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={formRules('password')}>
        <Input.Password name="password-input" />
      </Form.Item>

      <Form.Item
        label="Password Confirm"
        name="passwordConfirm"
        rules={formRules('password confirm')}
      >
        <Input.Password name="passwordConfirm-input" />
      </Form.Item>

      <Form.Item
        label="Date of birth"
        name="DoB"
        rules={formRules('date of birth')}
      >
        <DatePicker name="DoB-picker" />
      </Form.Item>

      <Form.Item
        label="Month of admission"
        name="MoA"
        rules={formRules('month of admission')}
      >
        <DatePicker picker="month" name="MoA-picker" />
      </Form.Item>

      <Form.Item
        label="Research stage"
        name="researchStage"
        rules={formRules('research stage')}
      >
        <Select>
          <Select.Option value="literature review">
            literature review
          </Select.Option>
          <Select.Option value="project">project</Select.Option>
          <Select.Option value="thesis">thesis</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Supervisor"
        name="supervisors"
        rules={formRules('supervisor')}
      >
        <Select>{supervisorList}</Select>
      </Form.Item>

      <Form.Item
        label="Research topic"
        name="researchTopic"
        rules={formRules('research topic')}
      >
        <TextArea rows={4} name="Rtopic-field" />
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

export default StudentRegForm;
