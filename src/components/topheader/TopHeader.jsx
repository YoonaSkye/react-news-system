import React, { useState } from "react";
import { withRouter } from "react-router-dom";

// antd component
import { Layout, Dropdown, Menu, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";

// css
import "./TopHeader.css";

const { Header } = Layout;

function TopHeader(props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    role: { roleName },
    username,
  } = JSON.parse(localStorage.getItem("token"));

  const menu = (
    <Menu>
      <Menu.Item key="0">{roleName}</Menu.Item>

      <Menu.Item
        key="1"
        danger
        onClick={() => {
          localStorage.removeItem("token");
          props.history.push("/login");
        }}
      >
        退出
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: "0 24px" }}>
      {collapsed ? (
        <MenuUnfoldOutlined
          className="trigger"
          onClick={() => setCollapsed(!collapsed)}
        />
      ) : (
        <MenuFoldOutlined
          className="trigger"
          onClick={() => setCollapsed(!collapsed)}
        />
      )}
      <div style={{ float: "right" }}>
        <span>
          欢迎回来
          <span style={{ color: "#8d69f1" }}>{username}</span>!
        </span>

        <Dropdown overlay={menu}>
          <span>
            <Avatar size="large" icon={<UserOutlined />} /> <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </Header>
  );
}

export default withRouter(TopHeader);
