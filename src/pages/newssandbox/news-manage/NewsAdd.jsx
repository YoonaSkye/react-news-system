import React, { useEffect, useState } from "react";
import { PageHeader, Steps, Button, Form, Input, Select } from "antd";
import "./News.css";
import axios from "axios";

const { Step } = Steps;
const { Option } = Select;

const NewsAdd = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/categories").then((res) => {
      // console.log(res.data);
      setCategoryList(res.data);
    });
  }, []);

  const handleNext = () => {
    if (current === 0) {
      form
        .validateFields()
        .then((values) => {
          console.log(values);
          setCurrent(current + 1);
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
      setCurrent(current + 1);
    } else {
      setCurrent(current + 1);
    }
  };
  const handlePrevious = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="news-add">
      <PageHeader
        className="site-page-header"
        title="撰写新闻"
        subTitle="This is a subtitle"
      />

      <Steps current={current}>
        <Step title="基本信息" description="新闻标题, 新闻分类" />
        <Step title="新闻内容" description="新闻主题内容" />
        <Step title="新闻提交" description="保存草稿或提交审核" />
      </Steps>

      <div style={{ marginTop: "50px" }}>
        <div className={current === 0 ? "" : "news-active"}>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Select>
                {categoryList.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={current === 1 ? "" : "news-active"}>22222</div>
        <div className={current === 2 ? "" : "news-active"}>33333</div>
      </div>

      <div style={{ marginTop: "50px" }}>
        {current === 2 && (
          <span>
            <Button type="primary">保存草稿箱</Button>
            <Button danger>提交审核</Button>
          </span>
        )}
        {current < 2 && (
          <Button type="primary" onClick={handleNext}>
            下一步
          </Button>
        )}
        {current > 0 && <Button onClick={handlePrevious}>上一步</Button>}
      </div>
    </div>
  );
};

export default NewsAdd;
