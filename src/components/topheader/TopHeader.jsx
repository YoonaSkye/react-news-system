import React, { useState } from "react";

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

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item>超级管理员</Menu.Item>

      <Menu.Item danger>退出</Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: "0 24px" }}>
      {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })} */}
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
        <span>欢迎回来Sheldon!</span>
        <Dropdown overlay={menu}>
          {/* <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Hover me <DownOutlined />
        </a> */}
          <span>
            <Avatar size="large" icon={<UserOutlined />} /> <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </Header>
  );
}
