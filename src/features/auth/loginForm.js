import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import { login } from './authSlice';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import RegisterModal from '../users/registerModal';
import ForgotPassModal from '../auth/forgotPassModal';
import { openModal } from '../users/userSlice';
import { openForgotPassModal } from './authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const loggedinUser = useSelector((state) => state.auth.loggedinUser);

  const onFinish = async (values) => {
    // console.log('Received values of form: ', values);
    try {
      const response = await dispatch(login(values)).unwrap();
      const loggedinUser = response.user;
      if (loggedinUser) {
        loggedinUser.role === 'student'
          ? navigate('/home/schedule')
          : navigate('/home/student');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickRegister = () => {
    dispatch(openModal(true));
  };

  const onClickForgotPass = () => {
    dispatch(openForgotPassModal(true));
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
            <a className="login-form-forgot" onClick={onClickForgotPass}>
              Forgot password
            </a>
          </Space>
        </Form.Item>
      </Form>
      <RegisterModal />
      <ForgotPassModal />
    </>
  );
};

export default LoginForm;
