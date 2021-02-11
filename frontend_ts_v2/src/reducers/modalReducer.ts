import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modalConstants";
import { Action } from 'redux'
// import { FunctionComponent } from 'react'


interface ModalAction extends Action {
    componentName: string
  }


export interface ModalState {
    modal: {

      isActive: boolean
      componentName: string | null
    }
}

const initialModalState = {
  modal: {

    isActive: false,
    componentName: null,
  }
};

export const modalReducer = (state: ModalState = initialModalState, action: ModalAction) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isActive: true,
        componentName: action.componentName
      };
    case CLOSE_MODAL:
      return {
        isActive: false,
      };
    default:
      return state;
  }
};
