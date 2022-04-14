import { useEffect, useState } from "react";
import axios from "axios";

function usePublish(type) {
  const { username } = JSON.parse(localStorage.getItem("token"));
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/news?author=${username}&publishState=${type}&_expand=category`
      )
      .then((res) => setDataSource(res.data));
  }, [username, type]);

  return {
    dataSource,
  };
}

export default usePublish;