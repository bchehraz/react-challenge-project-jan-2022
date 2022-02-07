import { GET_CURRENT_ORDERS } from "./types";
import { SERVER_IP } from "../../private";

const setCurrentOrders = (orders) => {
  return {
    type: GET_CURRENT_ORDERS,
    payload: {
      orders,
    },
  };
};

const getCurrentOrders = () => {
  return (dispatch) => {
    fetch(`${SERVER_IP}/api/current-orders`)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          dispatch(setCurrentOrders(response.orders));
        } else {
          console.log("Error getting orders");
        }
      });
  };
};

const addOrder = (orderItem, quantity, orderedBy) => {
  return async (dispatch) => {
    return fetch(`${SERVER_IP}/api/add-order`, {
      method: "POST",
      body: JSON.stringify({
        order_item: orderItem,
        quantity,
        ordered_by: orderedBy,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => dispatch(getCurrentOrders()))
      .catch((error) => console.error(error));
  };
};

const editOrder = (orderId, orderItem, quantity, orderedBy) => {
  return async (dispatch) => {
    return fetch(`${SERVER_IP}/api/edit-order`, {
      method: "POST",
      body: JSON.stringify({
        id: orderId,
        order_item: orderItem,
        quantity,
        ordered_by: orderedBy,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        dispatch(getCurrentOrders());
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const deleteOrder = (orderId) => {
  return async (dispatch) => {
    return fetch(`${SERVER_IP}/api/delete-order`, {
      method: "POST",
      body: JSON.stringify({
        id: orderId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => dispatch(getCurrentOrders()))
      .catch((error) => console.error(error));
  };
};

export { getCurrentOrders, addOrder, editOrder, deleteOrder };
