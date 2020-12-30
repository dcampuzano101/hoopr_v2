import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modalConstants";

export const openModal = (modalType) => async (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    payload: modalType,
  });
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
