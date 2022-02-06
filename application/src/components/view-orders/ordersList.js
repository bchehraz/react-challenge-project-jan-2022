import React, { useState } from "react";
import { OrderForm } from "../";
import { SERVER_IP } from "../../private";

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;

const OrdersList = (props) => {
  // index of selected order to edit, -1 to cancel
  const [editIndex, setEditIndex] = useState(-1);

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

  function showEdit(orderIndex) {
    setEditIndex(orderIndex);
  }

  function hideEdit() {
    setEditIndex(-1);
  }

  async function onEditSuccess() {
    await props.fetchOrders();
    hideEdit();
  }

  return orders.map((order, index) => {
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
          {editIndex !== index && (
            <button className="btn btn-success" onClick={() => showEdit(index)}>
              Edit
            </button>
          )}
          <button
            className="btn btn-danger"
            onClick={() => deleteOrder(order._id)}
          >
            Delete
          </button>
        </div>

        {editIndex === index && (
          <div className="edit-section">
            <OrderForm
              order={order}
              onEditSuccess={onEditSuccess}
              onCancelEdit={hideEdit}
            />
          </div>
        )}
      </div>
    );
  });
};

OrdersList.defaultProps = {
  orders: [], // Array of Order objects
  fetchOrders: () => {}, // Function to refresh the orders list
};

export default OrdersList;
