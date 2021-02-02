import {
    import axios from 'axios'
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
import { RUN_LIST_FAIL, RUN_LIST_REQUEST, RUN_LIST_SUCCESS } from '../constants/runConstants'

export interface Run {
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

