import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
const { confirm } = Modal;

const NewsDraft = () => {
  const [dataSource, setDataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/news?author=${username}&auditState=0&_expand=category`
      )
      .then((res) => setDataSource(res.data));
  }, [username]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
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
      title: "分类",
      dataIndex: "category",
      render: (category) => {
        return category.title;
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => showConfirm(item)}
            />

            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                // props.history.push(`/news-manage/update/${item.id}`)
              }}
            />

            <Button type="primary" shape="circle" icon={<UploadOutlined />} />
          </div>
        );
      },
    },
  ];

  const showConfirm = (item) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        //   console.log('OK');
        deleteDraft(item);
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });
  };

  //删除
  const deleteDraft = (item) => {
    // console.log(item)
    // 当前页面同步状态 + 后端同步
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`/news/${item.id}`);
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

export default NewsDraft;
