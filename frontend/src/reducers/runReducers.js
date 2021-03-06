import {
  RUN_LIST_FAIL,
  RUN_LIST_REQUEST,
  RUN_LIST_SUCCESS,
  RUN_DETAILS_REQUEST,
  RUN_DETAILS_SUCCESS,
  RUN_DETAILS_FAIL,
  RUN_DELETE_REQUEST,
  RUN_DELETE_SUCCESS,
  RUN_DELETE_FAIL,
  RUN_CREATE_REQUEST,
  RUN_CREATE_SUCCESS,
  RUN_CREATE_FAIL,
  RUN_CREATE_RESET,
  RUN_UPDATE_REQUEST,
  RUN_UPDATE_SUCCESS,
  RUN_UPDATE_FAIL,
  RUN_UPDATE_RESET,
  RUN_DETAILS_RESET,
} from "../constants/runConstants";

export const runListReducer = (state = { loading: true }, action) => {
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

export const runDetailsReducer = (
  state = {
    loading: true,
    success: false,
    run: {},
  },
  action
) => {
  switch (action.type) {
    case RUN_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case RUN_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        run: action.payload,
      };
    case RUN_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RUN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const runCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RUN_CREATE_REQUEST:
      return {
        loading: true,
      };
    case RUN_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        run: action.payload,
      };
    case RUN_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RUN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const runDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RUN_DELETE_REQUEST:
      return {
        loading: true,
      };
    case RUN_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case RUN_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const runUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case RUN_UPDATE_REQUEST:
      return { loading: true };
    case RUN_UPDATE_SUCCESS:
      return { loading: false, success: true, run: action.payload };
    case RUN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case RUN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
