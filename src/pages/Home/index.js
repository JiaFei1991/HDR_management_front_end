import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Space } from 'antd';
import React from 'react';
import './index.css';
import 'antd/dist/antd.css';

import { useGetAllUsersQuery } from '../../features/users/userSlice';
import { Usercard } from '../../features/users/userCard';

const { Header, Content, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`
        };
      })
    };
  }
);

const HomePage = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAllUsersQuery();

  let displayContent;
  if (isLoading) {
    displayContent = <p>...is loading for the first time</p>;
  } else if (isSuccess) {
    // displayContent = JSON.stringify(users);
    displayContent = users.map((oneUser) => {
      return (
        <Usercard
          key={oneUser.id}
          title={oneUser.name}
          description={oneUser.role}
          avatar={oneUser.avatar}
        />
      );
    });
  } else if (isError) {
    displayContent = <p>{JSON.stringify(error)}</p>;
  }

  // const users = useSelector(selectAllUsers);
  // console.log(users);

  return (
    <div className="app-container">
      <Layout style={{ height: '100vh' }}>
        <Header className="header" style={{ backgroundColor: 'darkcyan' }}>
          {/* <div className="logo">
            <img
              alt="uow_logo"
              src="http://localhost:8000/logos/uow_logo.jpg"
            />
          </div> */}
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
                borderRight: 0
              }}
              items={items2}
            />
          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px'
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0'
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <Space wrap>{displayContent}</Space>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomePage;
