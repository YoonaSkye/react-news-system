import React, { useEffect, useState } from "react";
import {
  PageHeader,
  Steps,
  Button,
  Form,
  Input,
  Select,
  message,
  notification,
} from "antd";
import "./News.css";
import axios from "axios";
import NewsEditor from "../../../components/news-manage/NewsEditor";

const { Step } = Steps;
const { Option } = Select;

const NewsUpdate = (props) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([]);
  const [formInfo, setFormInfo] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/categories").then((res) => {
      // console.log(res.data);
      setCategoryList(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/news/${props.match.params.id}?_expand=category&_expand=role`
      )
      .then((res) => {
        let { title, categoryId, content } = res.data;
        form.setFieldsValue({
          title,
          categoryId,
        });
        setContent(content);
      });
  }, [props.match.params.id, form]);

  const handleNext = () => {
    if (current === 0) {
      form
        .validateFields()
        .then((values) => {
          // console.log(values);
          setFormInfo(values);
          setCurrent(current + 1);
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    } else {
      if (content === "" || content.trim() === "<p></p>") {
        message.error("新闻内容不能为空");
      } else {
        setCurrent(current + 1);
      }
    }
  };
  const handlePrevious = () => {
    setCurrent(current - 1);
  };

  const handleSave = (auditState) => {
    axios
      .patch(`http://localhost:5000/news/${props.match.params.id}`, {
        ...formInfo,
        content: content,
        auditState: auditState,
      })
      .then((res) => {
        props.history.push(
          auditState === 0 ? "/news-manage/draft" : "/audit-manage/list"
        );

        notification.info({
          message: `通知`,
          description: `您可以到${
            auditState === 0 ? "草稿箱" : "审核列表"
          }中查看您的新闻`,
          placement: "bottomRight",
        });
      });
  };

  return (
    <div className="news-add">
      <PageHeader
        className="site-page-header"
        title="更新新闻"
        onBack={() => props.history.goBack()}
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
        <div className={current === 1 ? "" : "news-active"}>
          <NewsEditor
            getContent={(value) => setContent(value)}
            content={content}
          />
        </div>
        <div className={current === 2 ? "" : "news-active"}></div>
      </div>

      <div style={{ marginTop: "50px" }}>
        {current === 2 && (
          <span>
            <Button type="primary" onClick={() => handleSave(0)}>
              保存草稿箱
            </Button>
            <Button danger onClick={() => handleSave(1)}>
              提交审核
            </Button>
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

export default NewsUpdate;
