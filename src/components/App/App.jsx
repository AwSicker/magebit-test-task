import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "../Layout";

import "./app.scss";
import { Table } from "../Table";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route exapt path="/table" component={Table} />
      </Switch>
    </BrowserRouter>
  );
};
