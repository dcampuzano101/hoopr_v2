import axios from 'axios';
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
  RUN_USERS_FAIL,
  RUN_USERS_REQUEST,
  RUN_USERS_SUCCESS,
} from '../constants/runConstants';

export const listRuns = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: RUN_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/runs?page=${page}&limit=${limit}`);
    // const { data } = await axios.get(`/api/runs`);
    console.log(data);

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

export const getRunDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RUN_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/runs/${id}`);
    // const { usersData: any } = await axios.get(`/api/runs/${id}/users?${usersString}`)
    // usersData;

    // console.log(usersData);
    //
    // getUsersForRun(data._id, data.users)
    dispatch({
      type: RUN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RUN_DETAILS_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsersForRun = (id, userIds) => async (dispatch) => {
  try {
    dispatch({
      type: RUN_USERS_REQUEST,
    });

    const users = [
      '6026b9622fab2757a85df105',
      '6026b9622fab2757a85df118',
      '6026b9622fab2757a85df112',
      '6026b9622fab2757a85df10a',
      '6026b9622fab2757a85df107',
      '6026b9622fab2757a85df10b',
      '6026b9622fab2757a85df111',
      '6026b9622fab2757a85df10f',
      '6026b9622fab2757a85df115',
      '6026b9622fab2757a85df10d',
      '6026b9622fab2757a85df110',
      '6026b9622fab2757a85df113',
      '6026b9622fab2757a85df117',
      '6026b9622fab2757a85df106',
      '6026b9622fab2757a85df114',
    ];
    const usersInfo = users.map((userId, idx) => `${idx}=${userId}`);

    const usersString = usersInfo.join('&');
    const { data } = await axios.get(`/api/runs/${id}/users?${usersString}`);

    dispatch({
      type: RUN_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: RUN_USERS_FAIL,
      error:
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
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/runs/create', run, config);
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
      },
    };
    await axios.delete(`api/runs/${id}`, config);

    dispatch({
      type: RUN_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: RUN_DELETE_FAIL,
      error:
        error.message && error.response.data.message
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
      },
    };

    const { data } = await axios.put(`/api/runs/${run._id}`, run, config);

    dispatch({
      type: RUN_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RUN_UPDATE_FAIL,
      error:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
