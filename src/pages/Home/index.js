import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import "./index.css";
import "antd/dist/antd.css";

import { useSelector } from "react-redux";

import {
  useGetAllUsersQuery,
  selectAllUsers,
} from "../../features/users/userSlice";

const { Header, Content, Sider } = Layout;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
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
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const HomePage = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllUsersQuery();

  let displayContent;
  if (isLoading) {
    displayContent = <p>...is loading for the first time</p>;
  } else if (isSuccess) {
    displayContent = JSON.stringify(users);
  } else if (isError) {
    displayContent = <p>{JSON.stringify(error)}</p>;
  }

  // console.log(useSelector(selectAllUsers));

  return (
    <div className="app-container">
      <Layout style={{ height: "100vh" }}>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
          />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={items2}
            />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
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
              }}
            >
              {displayContent}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomePage;
