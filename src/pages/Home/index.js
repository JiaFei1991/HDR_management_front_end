import { RadarChartOutlined } from '@ant-design/icons';
import { Layout, Calendar } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { vh, vw } from '../../features/util/layoutCalc';
import '../../style.css';
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';

import LogoutButton from '../../features/auth/logoutButton';
import AvatarButton from '../../features/auth/avatarButton';
import TodayList from '../../features/schedules/todayList';
import {
  selectDate,
  setDimmer,
  getCurrentDaySchedules,
  getScheduleNotificationOfMonth
} from '../../features/schedules/scheduleSlice';

const { Content } = Layout;

const checkDateEquality = (calendarDate, stateDate) => {
  for (let i = 0; i < calendarDate.length; i++) {
    if (calendarDate[i] !== stateDate[i]) return false;
  }

  return true;
};

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedinUser = useSelector((state) => state.auth.loggedinUser);
  const monthNotification = useSelector(
    (state) => state.schedule.monthNotification
  );
  const selectedDate = useSelector((state) => state.schedule.selectedDate);
  const scheduleMonth = useSelector((state) => state.schedule.scheduleMonth);

  const [vhSize, setVhSize] = useState(vh(100));
  const [vwSize, setVwSize] = useState(vw(100));
  const [breadcrumb, setBreadcrumb] = useState(
    loggedinUser
      ? loggedinUser.role === 'student'
        ? 'Schedule'
        : 'Student'
      : undefined
  );

  let timeoutId;
  window.addEventListener('resize', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setVhSize(window.innerWidth);
      setVwSize(window.innerHeight);
    }, 250);
  });

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

    //calculate the width of the main page
    const menuComponent = document.getElementById('left-sider');
    const mainPageComponent = document.getElementById('main-page');

    if (menuComponent && mainPageComponent) {
      const mainPageWidthInPx = vw(100 - 25) - menuComponent.clientWidth;
      mainPageComponent.style.width = `${mainPageWidthInPx}px`;
    }
  }, [vhSize, vwSize]);

  // on any change in scheduleMonth, refetch the notifications so that its up to date
  useEffect(() => {
    dispatch(
      getScheduleNotificationOfMonth(`${selectedDate[2]}-${selectedDate[3]}`)
    );
  }, [scheduleMonth, selectedDate]);

  const onSelectDate = (moment) => {
    dispatch(setDimmer(true));
    const selectedDate = moment._d.toString().split(' ').slice(0, 4);
    dispatch(selectDate(selectedDate));
    // dispatch(
    //   getCurrentDaySchedules(
    //     `${selectedDate[1]}-${selectedDate[2]}-${selectedDate[3]}`
    //   )
    // );
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
    for (let i = 0; i < monthNotification.length; i++) {
      if (
        checkDateEquality(
          value._d.toLocaleDateString().split('/'),
          monthNotification[i].split('-')
        )
      ) {
        return <span className="dot"></span>;
      }
    }
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
    <div id="app-container" style={{ display: 'flex', flexDirection: 'row' }}>
      <aside className="left-sider" id="left-sider">
        <div className="icon-container">
          <RadarChartOutlined style={{ fontSize: 35 }} />
        </div>
        <div className="ui vertical labeled icon menu" id="icon-menu">
          {menuIconGenerator(menuItems)}
        </div>
      </aside>
      <section id="main-section" style={{ height: '100vh' }}>
        <header id="main-header">
          <i className="large bell outline icon"></i>
          <div className="vl" />
          <AvatarButton />
          <LogoutButton />
        </header>
        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
          <Layout
            id="main-page"
            style={{
              padding: '0 24px 24px'
            }}
          >
            <div
              className="ui massive breadcrumb"
              id="breadcrumb"
              style={{ padding: '20px' }}
            >
              <div className="active section">{breadcrumb}</div>
              <i className="right chevron icon divider"></i>
            </div>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
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
