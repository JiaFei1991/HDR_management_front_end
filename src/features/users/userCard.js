// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from "antd";
import React from "react";
const { Meta } = Card;

export const Usercard = (props) => {
  return (
    <>
      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
      >
        <Meta
          avatar={
            <Avatar src={`http://localhost:8000/profiles/${props.avatar}`} />
          }
          title={props.title}
          description={props.description}
        />
      </Card>
    </>
  );
};
