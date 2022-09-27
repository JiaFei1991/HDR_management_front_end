import { RadarChartOutlined } from '@ant-design/icons';
import { Layout, Calendar } from 'antd';
import React, { useEffect, useState } from 'react';
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
import { selectDate } from '../../features/schedules/scheduleSlice';

import { useDispatch, useSelector } from 'react-redux';

const { Content } = Layout;

function vh(percent) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (percent * h) / 100;
}

// function vw(percent) {
//   var w = Math.max(
//     document.documentElement.clientWidth,
//     window.innerWidth || 0
//   );
//   return (percent * w) / 100;
// }

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedinUser = useSelector((state) => state.auth.loggedinUser);

  const [breadcrumb, setBreadcrumb] = useState(
    loggedinUser
      ? loggedinUser.role === 'student'
        ? 'Schedule'
        : 'Student'
      : undefined
  );

  useEffect(() => {
    //calculate the height of right-sider-list
    const calendarComponent = document.getElementById('right-sider-calendar');
    const titleComponent = document.getElementById('right-sider-title');
    const listComponent = document.getElementById('right-sider-list');

    if (calendarComponent && titleComponent && listComponent) {
      const listHeightInPx =
        vh(100 - 8) -
        calendarComponent.clientHeight -
        titleComponent.clientHeight;
      listComponent.style.maxHeight = `${listHeightInPx}px`;
    }
  }, []);

  const onSelectDate = (moment) => {
    const selectedDate = moment._d.toString().split(' ').slice(0, 4);
    dispatch(selectDate(selectedDate));
  };

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
      <section id="main-section" style={{ height: '100vh' }}>
        <header
          style={{
            backgroundColor: 'darkcyan',
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '8vh',
            paddingRight: '2vw'
          }}
        >
          <i className="large bell outline icon"></i>
          <div className="vl" />
          <AvatarButton />
          <LogoutButton />
        </header>
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
              id="outlet-page"
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
            <div id="right-sider-calendar">
              <Calendar
                fullscreen={false}
                dateCellRender={dateCellRender}
                onSelect={onSelectDate}
                style={{
                  maxHeight: '50vh'
                }}
              />
            </div>
            <div
              id="right-sider-title"
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
      </section>
    </div>
  );
};

export default HomePage;
