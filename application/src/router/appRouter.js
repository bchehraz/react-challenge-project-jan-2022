import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders} from '../components';

const AppRouter = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/order" exact element={<OrderForm />} />
        <Route path="/view-orders" exact element={<ViewOrders />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
