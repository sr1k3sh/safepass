import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import passReducers from "./passReducers";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  passwords: passReducers
});