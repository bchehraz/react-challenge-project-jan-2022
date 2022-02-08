import { LOGIN, LOGOUT } from "./types";
import { SERVER_IP } from "../../private";

const finishLogin = (email, token) => {
  return {
    type: LOGIN,
    payload: {
      email,
      token,
    },
  };
};

const loginUser = (email, password) => {
  return async (dispatch) => {
    return fetch(`${SERVER_IP}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          dispatch(finishLogin(response.email, response.token));
          return { success: true };
        }

        return {
          success: false,
          error: response.error,
        };
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const registerUser = (email, password, confirmPassword) => {
  return async (dispatch) => {
    return fetch(`${SERVER_IP}/api/register`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.success) {
          return {
            success: false,
            error: response.error,
          };
        }
        return { success: true };
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const logoutUser = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};

export { logoutUser, loginUser, registerUser };
