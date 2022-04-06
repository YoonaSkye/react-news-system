import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Switch, Form } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

// components
import UserAddForm from "../../../components/user-manage/UserAddForm";
import UserUpdateForm from "../../../components/user-manage/UserUpdateForm";

const { confirm } = Modal;

export default function UserList() {
  const [dataSource, setDataSource] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users?_expand=role")
      .then((res) => setDataSource(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/regions")
      .then((res) => setRegionList(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/roles")
      .then((res) => setRolesList(res.data));
  }, []);

  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      render: (item) => <b>{item === "" ? "全球" : item}</b>,
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => role.roleName,
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render: (roleState, record) => (
        <Switch checked={roleState} disabled={record.default} />
      ),
    },
    {
      title: "操作",
      render: (item) => (
        <div>
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => showConfirm(item)}
            disabled={item.default}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            disabled={item.default}
            onClick={() => handleUpdate(item)}
          />
        </div>
      ),
    },
  ];

  const showConfirm = (item) => {
    confirm({
      title: "你确实要删除吗?",
      icon: <ExclamationCircleOutlined />,
      // content: "Some descriptions",
      onOk() {
        // console.log(item);
        deleteUser(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // 删除用户
  const deleteUser = (item) => {
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:5000/users/${item.id}`);
  };

  // 增加用户
  const onAddCreate = (values) => {
    console.log("Received values of form: ", values);
    setIsAddVisible(false);
    axios
      .post(`http://localhost:5000/users`, {
        ...values,
        roleState: true,
        default: false,
      })
      .then((res) => {
        console.log(res.data);
        // 由于我们需要的是连表查询的结果(users?_expand=role)
        // 手动补充`role`字段，数据用于更新界面
        setDataSource([
          ...dataSource,
          {
            ...res.data,
            role: rolesList.filter((data) => data.id === values.roleId)[0],
          },
        ]);
      });
  };

  // 更新用户
  const handleUpdate = (item) => {
    setIsUpdateVisible(true);
    setCurrentUser(item);
    form.setFieldsValue(item);
  };

  const onUpdateCreate = (values) => {
    // console.log(currentUser);
    // console.log("Received values of form: ", values);
    setIsUpdateVisible(false);

    setDataSource(
      dataSource.map((data) => {
        if (data.id === currentUser.id) {
          return {
            ...data,
            ...values,
            role: rolesList.filter((item) => item.id === values.roleId)[0],
          };
        }
        return data;
      })
    );

    axios.patch(`http://localhost:5000/users/${currentUser.id}`, values);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsAddVisible(true)}>
        添加用户
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(item) => item.id}
        pagination={{
          pageSize: 5,
        }}
      />
      <UserAddForm
        visible={isAddVisible}
        onCreate={onAddCreate}
        onCancel={() => setIsAddVisible(false)}
        regionList={regionList}
        rolesList={rolesList}
      />
      <UserUpdateForm
        visible={isUpdateVisible}
        onCreate={onUpdateCreate}
        onCancel={() => setIsUpdateVisible(false)}
        regionList={regionList}
        rolesList={rolesList}
        currentUser={currentUser}
        form={form}
      />
    </div>
  );
}
