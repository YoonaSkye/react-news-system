import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
const { Option } = Select;

const UserUpdateForm = ({
  visible,
  onCreate,
  onCancel,
  regionList,
  rolesList,
  currentUser,
  form,
}) => {
  const [isDisable, setIsDisable] = useState(false);

  // 对于当前为超级管理员用户，地区选项为空
  useEffect(() => {
    if (currentUser?.roleId === 1) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [currentUser]);

  // 修改用户角色为超级管理员，地区选项设置为空
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

  return (
    <Modal
      visible={visible}
      title="更新用户"
      okText="更新"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" initialValues={currentUser}>
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
              <Option value={data.value} key={data.id}>
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
              <Option value={data.id} key={data.id}>
                {data.roleName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserUpdateForm;
