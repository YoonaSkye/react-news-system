import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Tree } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

export default function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rightsList, setRightsList] = useState([]);
  const [currentRights, setCurrentRights] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => {
      // console.log(res.data);
      setDataSource(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      setRightsList(res.data);
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (item) => <b>{item}</b>,
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
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
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setIsModalVisible(true);
              setCurrentRights(item.rights);
              setCurrentId(item.id);
            }}
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

  const deleteRole = (item) => {
    // 同步界面和后端数据
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:5000/roles/${item.id}`);
  };

  const handleOk = () => {
    // 同步界面和后端数据
    setIsModalVisible(false);
    setDataSource(
      dataSource.map((data) => {
        if (data.id === currentId) {
          return {
            ...data,
            rights: currentRights,
          };
        }
        return data;
      })
    );

    axios.patch(`http://localhost:5000/roles/${currentId}`, {
      rights: currentRights,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onCheck = (checkedKeys) => {
    // console.log(checkedKeys);
    setCurrentRights(checkedKeys.checked);
  };

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
      <Modal
        title="权限分配"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          checkStrictly
          checkedKeys={currentRights}
          onCheck={onCheck}
          treeData={rightsList}
        />
      </Modal>
    </div>
  );
}
