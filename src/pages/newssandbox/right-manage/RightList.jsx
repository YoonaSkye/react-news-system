import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag, Button, Popover, Switch, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

export default function RightList() {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      // console.log(res.data);
      setDataSource(res.data);
    });
  }, []);

  const onChange = () => {
    console.log("修改");
  };

  const content = (
    <div>
      <Switch defaultChecked onChange={onChange} />
    </div>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "权限名称",
      dataIndex: "title",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (text) => <Tag color="orange">{text}</Tag>,
    },
    {
      title: "操作",
      render: (item) => (
        <div>
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => showConfirm()}
          />
          <Popover content={content} title="页面配置项" trigger="click">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          </Popover>
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
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
}
