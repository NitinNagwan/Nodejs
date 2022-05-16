import { combineReducers } from "redux";
import tabReducer from "./Reducers/TabReducer";
import userReducer from "./Reducers/UsersReducer";

const rootReducer = combineReducers({
  users: userReducer,
  tabs: tabReducer,
});

export default rootReducer;
