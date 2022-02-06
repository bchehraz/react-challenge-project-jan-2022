import React from "react";
import { SERVER_IP } from "../../private";

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;

const OrdersList = (props) => {
  const { orders } = props;
  if (!props || !props.orders || !props.orders.length)
    return (
      <div className="empty-orders">
        <h2>There are no orders to display</h2>
      </div>
    );

  async function deleteOrder(orderId) {
    await fetch(DELETE_ORDER_URL, {
      method: "POST",
      body: JSON.stringify({
        id: orderId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    props.fetchOrders();
  }

  return orders.map((order) => {
    const createdDate = new Date(order.createdAt);
    return (
      <div className="row view-order-container" key={order._id}>
        <div className="col-md-4 view-order-left-col p-3">
          <h2>{order.order_item}</h2>
          <p>Ordered by: {order.ordered_by || ""}</p>
        </div>
        <div className="col-md-4 d-flex view-order-middle-col">
          <p>
            Order placed at{" "}
            {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}
          </p>
          <p>Quantity: {order.quantity}</p>
        </div>
        <div className="col-md-4 view-order-right-col">
          <button className="btn btn-success">Edit</button>
          <button
            className="btn btn-danger"
            onClick={() => deleteOrder(order._id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
};

OrdersList.defaultProps = {
  orders: [], // Array of Order objects
  fetchOrders: () => {}, // Function to refresh the orders list
};

export default OrdersList;
