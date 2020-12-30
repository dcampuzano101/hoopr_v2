import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modalConstants";

const initialModalState = {
  isActive: false,
  modalType: null,
};

export const modalReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isActive: true,
        modalType: action.payload,
      };
    case CLOSE_MODAL:
      return {
        isActive: false,
        modalType: null,
      };
    default:
      return state;
  }
};
