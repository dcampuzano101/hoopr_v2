import axios from "axios";
import {
  RUN_LIST_REQUEST,
  RUN_LIST_SUCCESS,
  RUN_LIST_FAIL,
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

// export const listRuns = () => async (dispatch) => {
//   try {
//     dispatch({ type: RUN_LIST_REQUEST });

//     const { data } = await axios.get("/api/runs");

//     dispatch({
//       type: RUN_LIST_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: RUN_LIST_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
