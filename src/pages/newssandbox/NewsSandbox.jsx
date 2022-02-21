import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import SideMenu from "../../components/sidemenu/SideMenu";
import TopHeader from "../../components/topheader/TopHeader";
import Home from "./home/Home";
import UserList from "./user-manage/UserList";
import RoleList from "./right-manage/RoleList";
import RightList from "./right-manage/RightList";
import NotFound from "./notfound/NotFound";

// css
import "./NewsSandbox.css";

// antd component
import { Layout } from "antd";

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
          }}
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/user-manage/list" component={UserList} />
            <Route path="/right-manage/role/list" component={RoleList} />
            <Route path="/right-manage/right/list" component={RightList} />

            <Redirect from="/" to="/home" exact />
            <Route path="*" component={NotFound} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
