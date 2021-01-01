import { combineReducers } from "redux";
import todos from "./todos";
import filter from "./filter";

export const todoApp = combineReducers({
  todos,
  filter,
})