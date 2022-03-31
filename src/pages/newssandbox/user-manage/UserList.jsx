import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Switch } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

export default function UserList() {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then((res) => {
      setDataSource(res.data);
    });
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
            onClick={() => {
              // setIsModalVisible(true);
              // setCurrentRights(item.rights);
              // setCurrentId(item.id);
            }}
            disabled={item.default}
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
        deleteRole(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteRole = () => {};

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(item) => item.id}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
}
