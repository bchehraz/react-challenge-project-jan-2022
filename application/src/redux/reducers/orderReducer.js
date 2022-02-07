import { GET_CURRENT_ORDERS } from "../actions/types";

const INITIAL_STATE = { orders: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CURRENT_ORDERS:
      return {
        ...state,
        orders: [...action.payload.orders],
      };
    default:
      return state;
  }
};
