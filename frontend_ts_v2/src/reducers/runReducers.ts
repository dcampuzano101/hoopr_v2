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
import { Run } from '../admin/components/Runs'

interface ReduxAction extends Action {
  payload?: any
}

export interface RunState {
  success?: boolean
  run?: Run | {}
  loading?: boolean
  error?: string
}

export interface RunListState {
  runList: {
    loading?: boolean
    runs: Run[]
    next?: {
      page: number
      limit: number
    }
    previous?: {
      page: number
      limit: number
    }
  },
  runs: Run[]
}

export interface RunDetailsState {
  runDetails: {
    run?: Run
    success?: boolean
    loading?: boolean
    error?: string
  }
}

const runInitialState: RunState = {
  loading: false,
  run: {}
}

const runListInitialState: RunListState = {
  runList: {
    loading: false,
    runs: [],
    next: {
      page: 2,
      limit: 4
    }
  },
  runs: []
}

const runDetailsInitialState: RunDetailsState = {
  runDetails: {
    // run: {},
    loading: false
  }
}



export const runListReducer = (state: RunListState, action: ReduxAction) => {
  switch (action.type) {
    case RUN_LIST_REQUEST:
      return { 
        loading: true,
        runs: state.runs
      };
      case RUN_LIST_SUCCESS:
        let appendedResults: Run[] = [];
        let filteredResults: Run[] = [];
        if (state.runs) {
          appendedResults = [...state.runs, ...action.payload.runs]
          //ask Mike
          let runs: any = {};
          appendedResults.forEach((run) => {
            if (!runs[run._id]) {
              filteredResults.push(run);
            }
            runs[run._id] = true;
          })
         }
      return {
        loading: false,
        runs: filteredResults.length > 0 ? filteredResults : action.payload.runs,
        next: action.payload.next ? action.payload.next : null,
        previous: action.payload.previous ? action.payload.previous : null
      }
    case RUN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return runListInitialState;
  }
};

export const runDetailsReducer = (
  state: RunDetailsState,
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
      return runDetailsInitialState;
  }
};

export const runCreateReducer = (state = runInitialState, action: ReduxAction) => {
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

export const runDeleteReducer = (state = runInitialState, action: ReduxAction) => {
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

export const runUpdateReducer = (state = runInitialState, action: ReduxAction) => {
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
