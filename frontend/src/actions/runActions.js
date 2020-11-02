import axios from "axios";
import {
  RUN_LIST_REQUEST,
  RUN_LIST_SUCCESS,
  RUN_LIST_FAIL,
  RUN_DETAILS_REQUEST,
  RUN_DETAILS_SUCCESS,
  RUN_DETAILS_FAIL,
  RUN_DELETE_REQUEST,
  RUN_DELETE_SUCCESS,
  RUN_DELETE_FAIL,
  RUN_CREATE_REQUEST,
  RUN_CREATE_SUCCESS,
  RUN_CREATE_FAIL,
  RUN_UPDATE_REQUEST,
  RUN_UPDATE_SUCCESS,
  RUN_UPDATE_FAIL,
  RUN_DETAILS_RESET,
} from "../constants/runConstants";

export const listRuns = () => async (dispatch) => {
  try {
    dispatch({
      type: RUN_LIST_REQUEST,
    });

    const { data } = await axios.get("/api/runs");

    dispatch({
      type: RUN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RUN_LIST_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRunDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RUN_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/runs/${id}`, config);

    dispatch({
      type: RUN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RUN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createRun = (run) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RUN_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/runs/", config);

    dispatch({
      type: RUN_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RUN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteRun = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RUN_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`/api/runs/${id}`, config);
    dispatch({
      type: RUN_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: RUN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateRun = (run) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RUN_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/runs/${run._id}`, run, config);

    dispatch({
      type: RUN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: RUN_DETAILS_RESET,
    });
  } catch (error) {
    dispatch({
      type: RUN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
