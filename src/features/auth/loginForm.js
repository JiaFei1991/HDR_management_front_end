import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import React from 'react';
import { login } from './authSlice';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import RegisterModal from '../users/registerModal';
import { openModal } from '../users/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
      const response = await dispatch(login(values)).unwrap();
      console.log(response);
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  const onClickRegister = () => {
    dispatch(openModal(true));
  };

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userEmail"
          rules={[
            {
              required: true,
              message: 'Please input your Email!'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            style={{ maxWidth: '400px' }}
          />
        </Form.Item>

        <Form.Item
          name="userPassword"
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            style={{ maxWidth: '400px' }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>

        <Form.Item>
          <Space>
            <a className="login-form-register" onClick={onClickRegister}>
              register
            </a>
            Or
            <a className="login-form-forgot">Forgot password</a>
          </Space>
        </Form.Item>
      </Form>
      <RegisterModal />
    </>
  );
};

export default LoginForm;
