import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  RadarChartOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Space, Calendar, Tooltip } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.css';

import { useGetAllUsersQuery } from '../../features/users/userSlice';
import { Usercard } from '../../features/users/userCard';
import LogoutButton from '../../features/auth/logoutButton';
import AvatarButton from '../../features/auth/avatarButton';
import TodayList from '../../features/schedules/todayList';

import SchedulePage from '../Schedule';
import { useSelector } from 'react-redux';

const { Header, Content, Sider } = Layout;

const HomePage = () => {
  const navigate = useNavigate();
  const loggedinUser = useSelector((state) => state.auth.loggedinUser);
  // const [displayContent, setDisplayContent] = useState(undefined);
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

  let studentMenuItems = [
    {
      key: 2,
      icon: menuIconGenerator(<LaptopOutlined />, 'my menu item')
    },
    {
      key: 3,
      icon: menuIconGenerator(<NotificationOutlined />, 'my menu item')
    },
    {
      key: 'schedules',
      icon: menuIconGenerator(<CalendarOutlined />, 'Schedules')
    }
  ];

  const supervisorMenuItems = [
    ...studentMenuItems,
    {
      key: 'students',
      icon: menuIconGenerator(<UserOutlined />, 'Students')
    }
  ];

  // console.log(studentMenuItems);
  // console.log(supervisorMenuItems);

  // debugger;

  let menuItems;
  if (loggedinUser) {
    menuItems =
      loggedinUser.role === 'student' ? studentMenuItems : supervisorMenuItems;
  }

  const dateCellRender = (value) => {
    if (value.date() === 21) {
      return <h6>Content</h6>;
    }
    return;
  };

  const handleMenuClick = ({ key }) => {
    console.log(key);
    if (key === 'schedules') {
      // displayContent = <SchedulePage />;
      navigate('/home/schedule');
    }
  };

  return (
    <div className="app-container">
      <Layout style={{ height: '80vh' }}>
        <Sider width={60} className="site-layout-background">
          <div className="icon-container">
            <RadarChartOutlined style={{ fontSize: 35 }} />
          </div>
          <Menu
            mode="inline"
            style={{
              height: '100%',
              width: 60
            }}
            items={menuItems}
            onClick={handleMenuClick}
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
              height: '8vh'
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
                  minHeight: 280,
                  minWidth: 400
                }}
              >
                {/* <Space wrap>{displayContent}</Space> */}
                <Outlet />
              </Content>
            </Layout>

            <Sider width={400} className="site-layout-background">
              <Calendar
                fullscreen={false}
                dateCellRender={dateCellRender}
                style={{
                  width: 400,
                  maxHeight: '45vh'
                  // borderBottom: '1px solid black'
                }}
              />
              <div
                style={{
                  height: '6vh',
                  overflow: 'auto',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <h3>Today's tasks</h3>
              </div>
              <TodayList />
            </Sider>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomePage;
