import React, { useState, useEffect } from 'react';
// import { makeStyles, Theme } from '@material-ui/core/styles'
// import {
//   Grid,
//   // Paper,
//   Card,
//   Typography,
//   TextField,
//   InputAdornment,
//   CircularProgress
// } from '@material-ui/core'
// import { Search, SportsBasketball, FiberManualRecord } from '@material-ui/icons'
import RunInfoCard from './RunInfoCard';
// import moment from 'moment'
// import { RunListState } from '../reducers/runReducers';
import { useDispatch, useSelector } from 'react-redux';
import { listRuns } from '../../actions/runActions';
import GoogleMap from '../GoogleMap';

// import { useLocation } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';

const Runs = () => {
  const [ref, inView, entry] = useInView({
    threshold: 0,
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const dispatch = useDispatch();
  const next = useSelector((state) => state.runList.next) || {
    page: null,
    limit: null,
  };
  // const previous = useSelector((state: RunListState) => state.runList.previous) || {}
  const loading = useSelector((state) => state.runList.loading) || false;

  const runList = useSelector((state) => state.runList.runs) || [];

  const handlePageChange = (inView) => {
    console.log(inView);
    if (inView) {
      if (next.page !== null) {
        setPage((prevPage) => prevPage + 1);
        dispatch(listRuns(next.page, limit));
      }
    }
  };
  useEffect(() => {
    dispatch(listRuns(page, limit));
  }, [page, limit, dispatch]);

  return (
    <>
      {runList ? (
        <div className='max-w-full flex justify-center h-full'>
          <div className='w-11/12 sm:p-0 h-full flex p-1 items-center'>
            <div className='box-border h-full flex flex-row flex-wrap w-full justify-evenly overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin'>
              {runList.map((run, idx) => (
                <div className='w-full h-full flex flex-wrap shadow-lg mb-2 mr-3 border border-black border-opacity-50 rounded'>
                  <div className='w-full h-2/3'>
                    <GoogleMap
                      name={run.location}
                      geoLocation={run.geoLocation}
                    />
                  </div>
                  <RunInfoCard run={run} />
                </div>
              ))}

              <div
                ref={ref}
                onChange={handlePageChange(inView)}
                className='border-4 w-1/2 border-black bg-red-500 h-1'
              >
                {loading ? <h1>loading</h1> : <h1>not loading</h1>}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Runs;
