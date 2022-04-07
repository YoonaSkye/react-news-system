import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./Login.css";
import axios from "axios";

export default function Login(props) {
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    axios
      .get(
        `http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.length === 0) {
          message.error("用户名或者密码不正确!");
        } else {
          localStorage.setItem("token", JSON.stringify(res.data[0]));
          props.history.push("/");
        }
      });
  };
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-title">全球新闻发布管理系统</div>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
