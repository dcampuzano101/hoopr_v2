import axios from 'axios'
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
} from '../constants/runConstants'
import { Dispatch } from 'redux'
import { UserLoginState } from '../reducers/userReducers'

export interface Run {
    _id: string
    name: string
    location: string
    date: string
    price: string
    capacity: string
    startTime: string
    endTime: string
}

export const listRuns = () => async (dispatch: Dispatch) => {
    try {
        dispatch({
            type: RUN_LIST_REQUEST
        })

        const { data } = await axios.get(`/api/runs`)

        dispatch({
            type: RUN_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: RUN_LIST_FAIL,
            error: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getRunDetails = (id: number) => async (dispatch: Dispatch, getState: () => UserLoginState) => {
    try {
        dispatch({
            type: RUN_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = axios.get(`/api/users/${id}`, config)

        dispatch({
            type: RUN_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RUN_DETAILS_FAIL,
            error: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteRun = (id: number) => async (dispatch: Dispatch, getState: () => userLoginState) => {
    try {
        dispatch({
            type: RUN_DELETE_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`api/runs/${id}`, config)

        dispatch({
            type: RUN_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: RUN_DELETE_FAIL,
            error: error.message && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateRun = (run: Run) => async (dispatch: Dispatch, getState: () => UserLoginState) => {
    try {
        dispatch({
            type: RUN_UPDATE_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/runs/${run._id}`, run, config)

        dispatch({
            type: RUN_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RUN_UPDATE_FAIL,
            error: error.message && error.response.data.message ? error.response.data.message : error.message
        })
    }
}