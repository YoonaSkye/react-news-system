import React from "react";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish";

const Sunset = () => {
  const { dataSource } = usePublish(3);
  return (
    <div>
      <NewsPublish dataSource={dataSource} />
    </div>
  );
};

export default Sunset;
