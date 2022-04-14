import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish";

const Published = () => {
  // publishState = 2 已发布
  const { dataSource } = usePublish(2);

  return (
    <div>
      <NewsPublish dataSource={dataSource} />
    </div>
  );
};

export default Published;
