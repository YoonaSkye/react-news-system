import React from "react";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// pages && components
import Login from "../pages/login/Login";
import NewsSandbox from "../pages/newssandbox/NewsSandbox";

export default function RootRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/"
          render={() =>
            localStorage.getItem("token") ? (
              <NewsSandbox />
            ) : (
              <Redirect to="login" />
            )
          }
        />
      </Switch>
    </Router>
  );
}
