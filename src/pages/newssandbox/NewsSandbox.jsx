import React from "react";

// components
import SideMenu from "../../components/sidemenu/SideMenu";
import TopHeader from "../../components/topheader/TopHeader";

// css
import "./NewsSandbox.css";

// antd component
import { Layout } from "antd";
import SandboxRouter from "../../components/sandbox/SandboxRouter";

const { Content } = Layout;

export default function NewsSandbox() {
  return (
    <Layout>
      <SideMenu />
      <Layout className="site-layout">
        <TopHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <SandboxRouter />
        </Content>
      </Layout>
    </Layout>
  );
}
