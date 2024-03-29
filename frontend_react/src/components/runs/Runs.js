import React, { useState, useEffect } from "react";
import RunInfoCard from "./RunInfoCard";
import { useDispatch, useSelector } from "react-redux";
import { listRuns } from "../../actions/runActions";
import GoogleMap from "../GoogleMap";
import { useInView } from "react-intersection-observer";

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
    console.log(runList);
    dispatch(listRuns(page, limit));
  }, [page, limit, dispatch]);

  return (
    <>
      {runList ? (
        <div className='max-w-full h-full flex flex-wrap justify-center scroll-auto scrollbar-thin'>
          {runList.map((run, idx) => (
            <div className='w-10/12 h-95/100 m-4 xl:w-5/12 xl:h-1/2 flex flex-wrap shadow-lg p-0.5 border border-black border-opacity-50 rounded'>
              <GoogleMap name={run.location} geoLocation={run.geoLocation} />

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
      ) : null}
    </>
  );
};

export default Runs;
