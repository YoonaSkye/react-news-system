import { Button } from "antd";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish";

const Unpublished = () => {
  // publishState = 1 未发布
  const { dataSource, handlePublish } = usePublish(1);
  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button type="primary" onClick={() => handlePublish(id)}>
            发布
          </Button>
        )}
      />
    </div>
  );
};

export default Unpublished;
