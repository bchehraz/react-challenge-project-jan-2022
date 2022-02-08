import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Main, Login, OrderFormPage, ViewOrders } from "../components";
import Register from "../components/register/register";
import PrivateRoute from "./privateRoute";

const AppRouter = (props) => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <PrivateRoute path="/order" exact component={OrderFormPage} />
      <PrivateRoute path="/view-orders" exact component={ViewOrders} />
    </Router>
  );
};

export default AppRouter;
