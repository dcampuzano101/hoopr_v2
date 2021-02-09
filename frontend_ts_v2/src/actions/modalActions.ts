import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modalConstants";
// import { FunctionComponent } from 'react'
import { Dispatch } from 'redux'

export const openModal = (componentName: string ) => async (dispatch: Dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    componentName: componentName
  });
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
