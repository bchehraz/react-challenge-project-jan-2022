import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Template } from "../../components";
import OrdersList from "./ordersList";
import "./viewOrders.css";
import { getCurrentOrders } from "../../redux/actions/orderActions";
import { SERVER_IP } from "../../private";

const MAX_LIVE_TIME = 15;

const mapActionsToProps = (dispatch) => ({
  fetchOrders() {
    dispatch(getCurrentOrders());
  },
});

const mapStateToProps = (state) => ({
  orders: state.order.orders,
});

const ViewOrders = (props) => {
  const [liveMode, setLiveMode] = useState(false);
  const [interval, setInterval] = useState(1);

  const liveModeSwitch = useRef();
  const intervalInput = useRef();

  const { fetchOrders } = props;

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const onLiveModeSwitchChange = () => {
    setLiveMode(liveModeSwitch.current.checked);
    if (liveModeSwitch.current.checked) {
      enableLiveMode();
    }
  };

  const onIntervalChange = () => {
    if (intervalInput.current.value >= 1) {
      setInterval(intervalInput.current.value);
    }
  };

  const enableLiveMode = async () => {
    try {
      await fetch(`${SERVER_IP}/api/live-mode`, {
        method: "POST",
        body: {
          time: interval,
        },
      });

      const counter = window.setInterval(() => {
        fetchOrders();
      }, interval * 1000);

      window.setTimeout(() => {
        window.clearInterval(counter);
        setLiveMode(false);
        liveModeSwitch.current.checked = false;
      }, MAX_LIVE_TIME * 1000);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Template>
      <div className="container-fluid">
        <div className="custom-control custom-switch settings-section">
          <input
            ref={liveModeSwitch}
            type="checkbox"
            className="custom-control-input"
            id="switch"
            onChange={onLiveModeSwitchChange}
            disabled={liveMode}
          />
          <label className="custom-control-label" htmlFor="switch">
            Live Mode
          </label>
          <input
            ref={intervalInput}
            value={interval}
            type="number"
            id="interval-input"
            onChange={onIntervalChange}
            disabled={liveMode}
            step="any"
          />
          <label htmlFor="interval-input">Update interval in seconds</label>
        </div>
        <OrdersList orders={props.orders} />
      </div>
    </Template>
  );
};

export default connect(mapStateToProps, mapActionsToProps)(ViewOrders);
