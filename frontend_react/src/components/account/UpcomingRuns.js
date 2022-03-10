import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../util/spinner';
import RunInfoCard from '../runs/RunInfoCard'

const UpcomingRuns = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const { user, success: successDetails, loading } = userDetails;
  const [myRuns, setMyRuns] = useState(null);
  const [waitList, setWaitList] = useState(null);
  const runList = useSelector((state) => state.runList);
  const { runs, loading: loadingRuns } = runList;

  useEffect(() => {
    if (successDetails) {
      setMyRuns(user.runs);
      setWaitList(user.waitList);
    } else {
    }
  }, [successDetails]);

  const displayRunsForUser = () => {
    const userRuns = [];
    user.runs.forEach((runId, i) => {
      if (runId === runs[i]['_id']) {
        userRuns.push(runs[i]);
      }
    });
    if (runs.length === 0) {
      return <h1>No Upcoming Runs</h1>;
    } else {
      return (

        <div className='flex w-full flex-col'>
          <h1>Upcoming Runs</h1>
          {user &&
            runs &&
            userRuns.map((run) => (
              <RunInfoCard run={run} />
            ))}

        </div>
      );
    }
  };

  const displayWaitListForUser = () => {
    const userWaitList = [];

    user.waitList.forEach((runId, i) => {
      if (runId === runs[i]['_id']) {
        userWaitList.push(runs[i]);
      }
    });
    if (user.waitList.length === 0) {
      return <h1>Wait list is empty</h1>;
    } else {
      return (
        <div className='flex w-full flex-col'>
          <h1>Upcoming Runs</h1>
          {user &&
            runs &&
            userWaitList.map((run) => (
              <RunInfoCard run={run} />
            ))}

        </div>
      );
    }
  };

  return (
    <div className='box-border w-full h-fit xl:w-4/5 xl:h-1/2 flex flex-wrap shadow-lg m-3 xl:m-2 xl:mt-0 p-0.5 border border-black border-opacity-50 rounded'>
      <div className='w-full h-full flex flex-wrap'>
        {!loading && !loadingRuns && user && successDetails ? (
          displayRunsForUser()
        ) : (
          <Spinner />
        )}
      </div>
      <div className='xl:w-full xl:h-full'>
        {!loading && !loadingRuns && user && successDetails ? (
          displayWaitListForUser()
        ) : (
          <Spinner />
        )}
      </div>
    </div >
  );
};

export default UpcomingRuns;
