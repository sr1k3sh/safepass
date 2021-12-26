import { GET_PASS } from "../actions/types";
const initialState = {};
export default function passReducers(state = initialState, action) {
  switch (action.type) {
    case GET_PASS:
      return action.payload;
    default:
      return state;
  }
}