import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
  // console.log(props);
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

  const setCollapsed = () => {
    props.changeCollapsed();
  };

  return (
    <Header className="site-layout-background" style={{ padding: "0 24px" }}>
      {props.isCollapsed ? (
        <MenuUnfoldOutlined className="trigger" onClick={setCollapsed} />
      ) : (
        <MenuFoldOutlined className="trigger" onClick={setCollapsed} />
      )}
      <div style={{ float: "right" }}>
        <span style={{ marginRight: "10px" }}>
          欢迎回来<span style={{ color: "#8d69f1" }}>{username}</span>!
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

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    isCollapsed: state.CollApsedReducer.isCollapsed,
  };
};

const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: "change_collapsed",
      // payload:
    }; //action
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopHeader));
