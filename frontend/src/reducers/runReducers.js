import {
  RUN_LIST_FAIL,
  RUN_LIST_REQUEST,
  RUN_LIST_SUCCESS,
} from "../constants/runConstants";

export const runListReducer = (state = {}, action) => {
  switch (action.type) {
    case RUN_LIST_REQUEST:
      return { loading: true };
    case RUN_LIST_SUCCESS:
      return { loading: false, runs: action.payload };
    case RUN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
