import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Template } from "../../components";
import OrdersList from "./ordersList";
import "./viewOrders.css";
import { getCurrentOrders } from "../../redux/actions/orderActions";

const mapActionsToProps = (dispatch) => ({
  fetchOrders() {
    dispatch(getCurrentOrders());
  },
});

const mapStateToProps = (state) => ({
  orders: state.order.orders,
});

const ViewOrders = (props) => {
  const { fetchOrders } = props;

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <Template>
      <div className="container-fluid">
        <OrdersList orders={props.orders} />
      </div>
    </Template>
  );
};

export default connect(mapStateToProps, mapActionsToProps)(ViewOrders);
