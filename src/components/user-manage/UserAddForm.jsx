import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
const { Option } = Select;
const roleObj = {
  1: "superadmin",
  2: "admin",
  3: "editor",
};

const UserAddForm = ({
  visible,
  onCreate,
  onCancel,
  regionList,
  rolesList,
}) => {
  const [isDisable, setIsDisable] = useState(false);
  const [form] = Form.useForm();
  const { region, roleId } = JSON.parse(localStorage.getItem("token"));

  // 处理超级管理员对应区域选择限制
  // 创建超级管理员时，`区域`选择禁止，默认值为`全球`
  const handleChange = (value) => {
    if (value === 1) {
      setIsDisable(true);
      form.setFieldsValue({
        region: "",
      });
    } else {
      setIsDisable(false);
    }
  };

  //添加用户表单中，admin & editor 不能选择区域(默认为自己所在区域)
  // 对于`角色`，admin & editor 只能向下创建权限(admin -> editor / editor -> editor)
  const checkRegionDisable = (item) => {
    if (roleObj[roleId] === "superadmin") {
      return false;
    } else {
      return item.value !== region;
    }
  };

  const checkRoleDisable = (item) => {
    if (roleObj[roleId] === "superadmin") {
      return false;
    } else {
      return roleObj[item.id] !== "editor";
    }
  };

  return (
    <Modal
      visible={visible}
      title="添加用户"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="region"
          label="区域"
          rules={
            isDisable
              ? []
              : [
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]
          }
        >
          <Select disabled={isDisable}>
            {regionList.map((data) => (
              <Option
                value={data.value}
                key={data.id}
                disabled={checkRegionDisable(data)}
              >
                {data.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="roleId"
          label="角色"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Select onChange={(value) => handleChange(value)}>
            {rolesList.map((data) => (
              <Option
                value={data.id}
                key={data.id}
                disabled={checkRoleDisable(data)}
              >
                {data.roleName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserAddForm;
