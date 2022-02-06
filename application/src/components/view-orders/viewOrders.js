import React, { useState, useEffect } from "react";
import { Template } from "../../components";
import { SERVER_IP } from "../../private";
import OrdersList from "./ordersList";
import "./viewOrders.css";

export default function ViewOrders(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    fetch(`${SERVER_IP}/api/current-orders`)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setOrders(response.orders);
          return response.orders;
        } else {
          console.log("Error getting orders");
        }
      });
  }

  return (
    <Template>
      <div className="container-fluid">
        <OrdersList orders={orders} fetchOrders={fetchOrders} />
      </div>
    </Template>
  );
}
