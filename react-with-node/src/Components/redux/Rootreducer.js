import { combineReducers } from "redux";
import userReducer from "./Reducers/UsersReducer";

const rootReducer = combineReducers({
  users: userReducer,
});

export default rootReducer;
