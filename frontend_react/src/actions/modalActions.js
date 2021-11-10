import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modalConstants';
// import { FunctionComponent } from 'react'

export const openModal = (componentName) => async (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    componentName: componentName,
  });
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
