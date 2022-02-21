import React from "react";
import { useHistory, withRouter } from "react-router-dom";

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

const menuList = [
  {
    key: "/home",
    title: "首页",
    icon: <UserOutlined />,
  },
  {
    key: "/user-manage",
    title: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user-manage/list",
        title: "用户列表",
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: "/role-manage",
    title: "权限管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/right-manage/role/list",
        title: "角色列表",
        icon: <UserOutlined />,
      },
      {
        key: "/right-manage/right/list",
        title: "权限列表",
        icon: <UserOutlined />,
      },
    ],
  },
];

function SideMenu(props) {
  // const history = useHistory();
  const renderMenu = (menuList) => {
    return menuList.map((menu) => {
      if (menu.children) {
        return (
          <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
            {renderMenu(menu.children)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item
          key={menu.key}
          icon={menu.icon}
          onClick={() => {
            console.log(props);
            props.history.push(menu.key);
          }}
        >
          {menu.title}
        </Menu.Item>
      );
    });
  };
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo">后台管理系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {renderMenu(menuList)}
      </Menu>
    </Sider>
  );
}

export default withRouter(SideMenu);
