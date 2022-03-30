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
      const dataList = res.data;
      dataList.forEach((item) => {
        if (item.children.length === 0) {
          item.children = "";
        }
      });
      setDataSource(dataList);
    });
  }, []);

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
      render: (text) => (
        <div>
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => showConfirm(text)}
          />
          <Popover
            content={content(text)}
            title="页面配置项"
            trigger={text.pagepermisson === undefined ? "" : "click"}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={text.pagepermisson === undefined}
            />
          </Popover>
        </div>
      ),
    },
  ];

  const onChange = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
    // console.log(item);
    setDataSource([...dataSource]);

    if (item.grade === 1) {
      axios.patch(`http://localhost:5000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    }

    if (item.grade === 2) {
      axios.patch(`http://localhost:5000/children/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    }
  };

  const content = (item) => (
    <div>
      <Switch checked={item.pagepermisson} onChange={() => onChange(item)} />
    </div>
  );

  const showConfirm = (item) => {
    confirm({
      title: "你确实要删除吗?",
      icon: <ExclamationCircleOutlined />,
      // content: "Some descriptions",
      onOk() {
        // console.log(item);
        deleteRight(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteRight = (item) => {
    // 同时更新界面和后端数据
    // 判断是一级权限还是二级权限
    // /rights里只有一级权限
    if (item.grade === 1) {
      setDataSource(dataSource.filter((data) => data.id !== item.id));
      axios.delete(`http://localhost:5000/rights/${item.id}`);
    }
    // 二级权限在 /children api端口
    if (item.grade === 2) {
      // 这里只是浅拷贝对应的父对象，修改children属性会修改原dataSource
      let list = dataSource.filter((data) => data.id === item.rightId);
      list[0].children = list[0].children.filter((data) => data.id !== item.id);
      setDataSource([...dataSource]);
      axios.delete(`http://localhost:5000/children/${item.id}`);
    }
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
