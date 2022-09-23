import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  RadarChartOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Space, Calendar, Tooltip } from 'antd';
import React from 'react';
import './index.css';
import 'antd/dist/antd.css';

import { useGetAllUsersQuery } from '../../features/users/userSlice';
import { Usercard } from '../../features/users/userCard';
import LogoutButton from '../../features/auth/logoutButton';
import AvatarButton from '../../features/auth/avatarButton';

import TodayList from '../../features/schedules/todayList';

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
      icon: React.createElement(icon)
      // label: `subnav ${key}`,
      // children: new Array(4).fill(null).map((_, j) => {
      //   const subKey = index * 4 + j + 1;
      //   return {
      //     key: subKey
      //     // label: `option${subKey}`
      //   };
      // })
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
    // console.log(users);
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

  const menuIconGenerator = (icon, text) => {
    return (
      <Tooltip placement="right" color="blue" title={text}>
        {icon}
      </Tooltip>
    );
  };

  const menuItems = [
    {
      key: 1,
      icon: menuIconGenerator(<UserOutlined />, 'my menu item')
    },
    {
      key: 2,
      icon: menuIconGenerator(<LaptopOutlined />, 'my menu item')
    },
    {
      key: 3,
      icon: menuIconGenerator(<NotificationOutlined />, 'my menu item')
    }
  ];

  const dateCellRender = (value) => {
    if (value.date() === 21) {
      return <h6>Content</h6>;
    }
    return;
  };

  return (
    <div className="app-container">
      <Layout style={{ height: '100vh' }}>
        <Sider width={60} className="site-layout-background">
          <div className="icon-container">
            <RadarChartOutlined style={{ fontSize: 35 }} />
          </div>
          <Menu
            mode="inline"
            style={{
              height: '100%',
              // borderRight: 0,
              width: 60
              // border: 'auto'
            }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ height: '100vh' }}>
          <Header
            className="header"
            style={{
              backgroundColor: 'darkcyan',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: 60
            }}
          >
            <AvatarButton />
            <LogoutButton />
          </Header>
          <Layout>
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
            <Sider width={400} className="site-layout-background">
              <Calendar
                fullscreen={false}
                dateCellRender={dateCellRender}
                style={{ width: 400 }}
              />
              <TodayList />
            </Sider>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomePage;
