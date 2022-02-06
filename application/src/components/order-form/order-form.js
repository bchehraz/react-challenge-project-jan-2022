import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SERVER_IP } from "../../private";
import "./orderForm.css";

const ADD_ORDER_URL = `${SERVER_IP}/api/add-order`;
const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;

const OrderForm = (props) => {
  const isEditing = props.order._id !== "";
  const [orderItem, setOrderItem] = useState(props.order.order_item);
  const [quantity, setQuantity] = useState(props.order.quantity);

  const menuItemChosen = (event) => setOrderItem(event.target.value);
  const menuQuantityChosen = (event) => setQuantity(event.target.value);

  const auth = useSelector((state) => state.auth);

  const submitOrder = () => {
    if (orderItem === "") return;

    if (isEditing) {
      editOrder();
    } else {
      createOrder();
    }
  };

  const createOrder = () => {
    fetch(ADD_ORDER_URL, {
      method: "POST",
      body: JSON.stringify({
        order_item: orderItem,
        quantity,
        ordered_by: auth.email || "Unknown!",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("Success", JSON.stringify(response)))
      .catch((error) => console.error(error));
  };

  const editOrder = () => {
    fetch(EDIT_ORDER_URL, {
      method: "POST",
      body: JSON.stringify({
        id: props.order._id,
        order_item: orderItem,
        quantity,
        ordered_by: props.order.ordered_by,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        props.onEditSuccess();
        console.log("Success", JSON.stringify(response));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="form-wrapper">
      <form>
        <label className="form-label">
          {!isEditing ? "I'd like to order..." : "Edit Order"}
        </label>
        <br />
        <select
          value={orderItem}
          onChange={(event) => menuItemChosen(event)}
          className="menu-select"
        >
          <option value="" defaultValue disabled hidden>
            Lunch menu
          </option>
          <option value="Soup of the Day">Soup of the Day</option>
          <option value="Linguini With White Wine Sauce">
            Linguini With White Wine Sauce
          </option>
          <option value="Eggplant and Mushroom Panini">
            Eggplant and Mushroom Panini
          </option>
          <option value="Chili Con Carne">Chili Con Carne</option>
        </select>
        <br />
        <label className="qty-label">Qty:</label>
        <select
          value={quantity}
          onChange={(event) => menuQuantityChosen(event)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <button
          type="button"
          className="order-btn"
          onClick={() => submitOrder()}
        >
          {!isEditing ? "Order It!" : "Update"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="order-btn btn-danger"
            onClick={props.onCancelEdit}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

OrderForm.defaultProps = {
  order: {
    _id: "",
    order_item: "",
    ordered_by: "",
    quantity: 1,
  },
  onEditSuccess: () => {},
  onCancelEdit: () => {},
};

export default OrderForm;
