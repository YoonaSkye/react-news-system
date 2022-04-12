import React, { useEffect, useState } from "react";
import { Button, Table, Tag, notification } from "antd";
import axios from "axios";
const colorList = ["", "orange", "green", "red"];
const auditList = ["草稿箱", "审核中", "已通过", "未通过"];

const AuditList = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    /* 
    auditState: 0 - 草稿箱 / 1 - 审核中 / 2 - 已通过 / 3 - 未通过
    publishState: 0 - 未发布 / 1 - 待发布 / 2 - 已发布 / 3 - 已下架
    */
    axios
      .get(
        `http://localhost:5000/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`
      )
      .then((res) => setDataSource(res.data));
  }, [username]);
  const columns = [
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => (
        <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      ),
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "新闻分类",
      dataIndex: "category",
      render: (category) => <div>{category.title}</div>,
    },
    {
      title: "审核状态",
      dataIndex: "auditState",
      render: (auditState) => (
        <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
      ),
    },
    {
      title: "操作",
      render: (item) => (
        <div>
          {item.auditState === 1 && (
            <Button danger onClick={() => handleCancel(item)}>
              撤销
            </Button>
          )}
          {item.auditState === 2 && (
            <Button
              type="primary"
              onClick={() => {
                handlePublish(item);
              }}
            >
              发布
            </Button>
          )}
          {item.auditState === 3 && (
            <Button onClick={() => handleUpdate(item)}>更新</Button>
          )}
        </div>
      ),
    },
  ];

  const handleCancel = (item) => {
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    axios
      .patch(`http://localhost:5000/news/${item.id}`, {
        auditState: 0,
      })
      .then((res) => {
        notification.info({
          message: `通知`,
          description: `您可以到草稿箱中查看您的新闻`,
          placement: "bottomRight",
        });
      });
  };

  const handlePublish = (item) => {
    axios
      .patch(`http://localhost:5000/news/${item.id}`, {
        publishState: 2,
      })
      .then((res) => {
        props.history.push("/publish-manage/published");

        notification.info({
          message: `通知`,
          description: `您可以到[发布管理/已经发布]中查看您的新闻`,
          placement: "bottomRight",
        });
      });
  };

  const handleUpdate = (item) => {
    props.history.push(`/news-manage/update/${item.id}`);
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        rowKey={(item) => item.id}
      />
    </div>
  );
};

export default AuditList;
