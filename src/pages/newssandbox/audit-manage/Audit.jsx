import React, { useEffect, useState } from "react";
import { Table, Button, notification } from "antd";
import axios from "axios";

const roleObj = {
  1: "superadmin",
  2: "admin",
  3: "editor",
};

const Audit = () => {
  const [dataSource, setDataSource] = useState([]);
  const { username, roleId, region } = JSON.parse(
    localStorage.getItem("token")
  );

  useEffect(() => {
    axios
      .get(`http://localhost:5000/news?auditState=1&_expand=category`)
      .then((res) => {
        setDataSource(
          roleObj[roleId] === "superadmin"
            ? res.data
            : [
                ...res.data.filter(
                  (item) =>
                    item.username === username ||
                    (item.region === region &&
                      roleObj[item.roleId] === "editor")
                ),
              ]
        );
      });
  }, [username, region, roleId]);

  const columns = [
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>;
      },
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "新闻分类",
      dataIndex: "category",
      render: (category) => {
        return <div>{category.title}</div>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button type="primary" onClick={() => handleAudit(item, 2, 1)}>
              通过
            </Button>
            <Button
              danger
              onClick={() => handleAudit(item, 3, 0)}
              style={{ marginLeft: "20px" }}
            >
              驳回
            </Button>
          </div>
        );
      },
    },
  ];

  const handleAudit = (item, auditState, publishState) => {
    /* 
    auditState: 0 - 草稿箱 / 1 - 审核中 / 2 - 已通过 / 3 - 未通过
    publishState: 0 - 未发布 / 1 - 待发布 / 2 - 已发布 / 3 - 已下架
    */
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    axios
      .patch(`http://localhost:5000/news/${item.id}`, {
        auditState,
        publishState,
      })
      .then((res) => {
        notification.info({
          message: `通知`,
          description: `您可以到[审核管理/审核列表]中查看您的新闻的审核状态`,
          placement: "bottomRight",
        });
      });
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

export default Audit;
