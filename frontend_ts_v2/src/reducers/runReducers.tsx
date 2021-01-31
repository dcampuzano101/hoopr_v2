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
import { Action } from 'redux'
interface ReduxAction extends Action {
    payload?: any
  }


  export const runListReducer = (state = { loading: true }, action: ReduxAction) => {
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
    action: ReduxAction
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

  export const runCreateReducer = (state = {}, action: ReduxAction) => {
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
  
 