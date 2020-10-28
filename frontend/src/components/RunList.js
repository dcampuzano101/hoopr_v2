import React, { useState, useEffect } from "react";
import { listRuns } from "../actions/runActions";
import { useSelector, useDispatch } from "react-redux";

const RunList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listRuns());
  }, [dispatch]);

  return <div>RUN LIST</div>;
};

export default RunList;
