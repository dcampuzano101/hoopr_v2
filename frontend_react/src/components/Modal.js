import React from "react";
// import { makeStyles, Theme } from '@material-ui/core/styles';
// import { Grid, Card } from '@material-ui/core/';
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RUN_DETAILS_RESET } from "../constants/runConstants";

const Modal = ({ Component, isModal }) => {
  // const classes = useStyles()
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClickOutside = (e) => {
    console.log(e);
    history.goBack();
    dispatch({
      type: RUN_DETAILS_RESET,
    });
    e.stopPropagation();
  };
  return (
    <div
      className='flex z-10 w-full h-full justify-center items-center'
      onClick={handleClickOutside}
    >
      <div
        className='h-full w-full flex justify-center'
        onClick={handleClickOutside}
      >
        <div
          className='h-full w-10/12 xl:w-11/12'
          onClick={(e) => e.stopPropagation()}
        >
          <Component params={params} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
