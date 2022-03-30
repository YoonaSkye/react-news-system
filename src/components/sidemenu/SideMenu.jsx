import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

// antd component
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MailOutlined,
} from "@ant-design/icons";

// css
import "./SideMenu.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

const iconList = {
  "/home": <UserOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <UserOutlined />,
  "/right-manage/role/list": <UserOutlined />,
  "/right-manage/right/list": <UserOutlined />,
};

function SideMenu(props) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      console.log(res.data);
      setMenu(res.data);
    });
  }, []);

  const checkPagePermisson = (item) => item.pagepermisson === 1;

  const renderMenu = (menuList) => {
    return menuList.map((menu) => {
      if (menu.children?.length > 0 && checkPagePermisson(menu)) {
        return (
          <SubMenu key={menu.key} icon={iconList[menu.key]} title={menu.title}>
            {renderMenu(menu.children)}
          </SubMenu>
        );
      }

      return (
        checkPagePermisson(menu) && (
          <Menu.Item
            key={menu.key}
            icon={iconList[menu.key]}
            onClick={() => {
              // console.log(props)
              props.history.push(menu.key);
            }}
          >
            {menu.title}
          </Menu.Item>
        )
      );
    });
  };

  // console.log(props);
  const selectedKey = props.location.pathname;
  const openKey = `/${props.location.pathname.split("/")[1]}`;

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="logo">全球管理系统</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            defaultOpenKeys={[openKey]}
          >
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  );
}

export default withRouter(SideMenu);
