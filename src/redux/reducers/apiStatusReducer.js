import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.subString(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = initialState.authors,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
