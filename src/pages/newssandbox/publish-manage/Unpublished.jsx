import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish";

const Unpublished = () => {
  // publishState = 1 未发布
  const { dataSource } = usePublish(1);
  return (
    <div>
      <NewsPublish dataSource={dataSource} />
    </div>
  );
};

export default Unpublished;
