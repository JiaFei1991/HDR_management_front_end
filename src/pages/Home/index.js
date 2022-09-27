import { RadarChartOutlined } from '@ant-design/icons';
import { Layout, Calendar } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';

// import { useGetAllUsersQuery } from '../../features/users/userSlice';
// import { Usercard } from '../../features/users/userCard';
import LogoutButton from '../../features/auth/logoutButton';
import AvatarButton from '../../features/auth/avatarButton';
import TodayList from '../../features/schedules/todayList';

import SchedulePage from '../Schedule';
import { useSelector } from 'react-redux';

const { Header, Content, Sider } = Layout;

const HomePage = () => {
  const navigate = useNavigate();
  const loggedinUser = useSelector((state) => state.auth.loggedinUser);

  const [breadcrumb, setBreadcrumb] = useState(
    loggedinUser
      ? loggedinUser.role === 'student'
        ? 'Schedule'
        : 'Student'
      : undefined
  );

  let studentMenuItems = [
    {
      text: 'Projects',
      key: 'Projects',
      icon: 'archive'
    },
    {
      text: 'Sessions',
      key: 'Sessions',
      icon: 'comments outline'
    },
    {
      text: 'Schedules',
      key: 'Schedules',
      icon: 'calendar alternate outline'
    }
  ];

  const supervisorMenuItems = [
    ...studentMenuItems,
    {
      text: 'Students',
      key: 'Students',
      icon: 'address book outline'
    }
  ];

  let menuItems;
  if (loggedinUser) {
    if (loggedinUser.role === 'student') {
      menuItems = studentMenuItems;
    } else {
      menuItems = supervisorMenuItems;
    }
  }

  const menuIconGenerator = (itemList) => {
    let returnItem = [];
    if (itemList) {
      itemList.forEach((e) => {
        returnItem.push(
          <a
            className="item"
            key={`${e.key}`}
            name={`${e.text}`}
            onClick={handleMenuClick}
          >
            <i className={`${e.icon} icon`} name={`${e.text}`}></i>
            {e.text}
          </a>
        );
      });
    }

    return returnItem;
  };

  const dateCellRender = (value) => {
    if (value.date() === 21) {
      return <h6>Content</h6>;
    }
    return;
  };

  const handleMenuClick = (e) => {
    setBreadcrumb(e.target.getAttribute('name'));
    const key = e.target.getAttribute('name');
    switch (key) {
      case 'Schedules':
        navigate('/home/schedule');
        break;
      case 'Students':
        navigate('/home/student');
        break;
      case 'Sessions':
        navigate('/home/session');
        break;
      case 'Projects':
        navigate('/home/project');
        break;

      default:
        break;
    }
  };

  return (
    <div
      className="app-container"
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      <aside className="left-sider">
        <div className="icon-container">
          <RadarChartOutlined style={{ fontSize: 35 }} />
        </div>
        <div className="ui vertical labeled icon menu" id="icon-menu">
          {menuIconGenerator(menuItems)}
        </div>
      </aside>
      <Layout style={{ height: '100vh' }}>
        <Header
          style={{
            backgroundColor: 'darkcyan',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '6vh'
          }}
        >
          <AvatarButton />
          <LogoutButton />
        </Header>
        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
          <Layout
            style={{
              padding: '0 24px 24px'
            }}
          >
            <div className="ui massive breadcrumb" style={{ padding: '20px' }}>
              <div className="active section">{breadcrumb}</div>
              <i className="right chevron icon divider"></i>
            </div>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                minWidth: 400
              }}
            >
              <Outlet />
            </Content>
          </Layout>

          <aside className="right-sider">
            <Calendar
              fullscreen={false}
              dateCellRender={dateCellRender}
              style={{
                maxHeight: '25vh'
              }}
            />
            <div
              style={{
                height: '5vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h3>Today's tasks</h3>
            </div>
            <TodayList />
          </aside>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomePage;
