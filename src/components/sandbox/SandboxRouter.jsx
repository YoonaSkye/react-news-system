import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

// components & pages
import Home from "../../pages/newssandbox/home/Home";
import UserList from "../../pages/newssandbox/user-manage/UserList";
import RoleList from "../../pages/newssandbox/right-manage/RoleList";
import RightList from "../../pages/newssandbox/right-manage/RightList";
import NotFound from "../../pages/newssandbox/notfound/NotFound";
import NewsAdd from "../../pages/newssandbox/news-manage/NewsAdd";
import NewsDraft from "../../pages/newssandbox/news-manage/NewsDraft";
import NewsCategory from "../../pages/newssandbox/news-manage/NewsCategory";
import Audit from "../../pages/newssandbox/audit-manage/Audit";
import AuditList from "../../pages/newssandbox/audit-manage/AuditList";
import Unpublished from "../../pages/newssandbox/publish-manage/Unpublished";
import Published from "../../pages/newssandbox/publish-manage/Published";
import Sunset from "../../pages/newssandbox/publish-manage/Sunset";
import NewsPreview from "../../pages/newssandbox/news-manage/NewsPreview";
import NewsUpdate from "../../pages/newssandbox/news-manage/NewsUpdate";

const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewsDraft,
  "/news-manage/category": NewsCategory,
  "/news-manage/preview/:id": NewsPreview,
  "/news-manage/update/:id": NewsUpdate,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": Sunset,
};

const SandboxRouter = () => {
  const [routeList, setRouteList] = useState([]);
  const {
    role: { rights },
  } = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/rights"),
      axios.get("http://localhost:5000/children"),
    ]).then((res) => {
      // console.log([...res[0].data, ...res[1].data]);
      setRouteList([...res[0].data, ...res[1].data]);
    });
  }, []);

  const checkRoute = (item) => {
    return (
      LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    );
  };

  const checkUserPermission = (item) => {
    return rights.includes(item.key);
  };

  return (
    <Switch>
      {routeList.map((item) => {
        if (checkRoute(item) && checkUserPermission(item)) {
          return (
            <Route
              path={item.key}
              component={LocalRouterMap[item.key]}
              key={item.key}
            />
          );
        }
        return null;
      })}
      <Redirect from="/" to="/home" exact />
      {routeList.length > 0 && <Route path="*" component={NotFound} />}
    </Switch>
  );
};

export default SandboxRouter;
