import React, { useState } from "react";

// antd component
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })} */}
      {collapsed ? (
        <MenuUnfoldOutlined className="trigger" />
      ) : (
        <MenuFoldOutlined className="trigger" />
      )}
    </Header>
  );
}
