import { Button } from "antd";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish";

const Published = () => {
  // publishState = 2 已发布
  const { dataSource, handleSunset } = usePublish(2);

  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button danger onClick={() => handleSunset(id)}>
            下线
          </Button>
        )}
      />
    </div>
  );
};

export default Published;
