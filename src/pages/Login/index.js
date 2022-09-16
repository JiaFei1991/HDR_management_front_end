import { Layout, Space } from 'antd';
import React from 'react';
import LoginForm from '../../features/auth/loginForm';
import './index.css';

const { Content } = Layout;

const LoginPage = () => {
  return (
    <>
      <Layout
        style={{
          height: '100vh',
          minWidth: '1000px',
          backgroundImage:
            'url(http://localhost:8000/backgrounds/login-background.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 280,
            minWidth: 800,
            margin: 'auto',
            marginTop: '50px',
            marginBottom: '50px'
          }}
        >
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <div className="login-header">
              <h1>HDR student management system</h1>
            </div>
            <div className="login-form-container">
              <h2>Login</h2>
              <LoginForm />
            </div>
          </Space>
        </Content>
      </Layout>
    </>
  );
};

export default LoginPage;
