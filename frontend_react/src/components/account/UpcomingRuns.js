import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../util/spinner';

const UpcomingRuns = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const { user, success: successDetails, loading } = userDetails;
  const [myRuns, setMyRuns] = useState(null);
  const [waitList, setWaitList] = useState(null);
  const runList = useSelector((state) => state.runList);
  const { runs, loading: loadingRuns } = runList;

  useEffect(() => {
    debugger;
    if (successDetails) {
      setMyRuns(user.runs);
      setWaitList(user.waitList);
    } else {
    }
  }, [successDetails]);

  const displayRunsForUser = () => {
    debugger;
    const userRuns = [];
    user.runs.forEach((runId, i) => {
      debugger;
      if (runId === runs[i]['_id']) {
        debugger;
        userRuns.push(runs[i]);
      }
    });
    if (runs.length === 0) {
      return <h1>No Upcoming Runs</h1>;
    } else {
      return (
        <>
          <div className='flex h'>
            <h1>Upcoming Runs</h1>
            <table class='table-auto'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {user &&
                  runs &&
                  userRuns.map((run) => (
                    <React.Fragment key={run._id}>
                      <tr>
                        <td>{run.date}</td>
                        <td>{run.location}</td>
                        <td>${run.price}</td>
                        <td>{run.capacity}</td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }
  };

  const displayWaitListForUser = () => {
    debugger;
    const userWaitList = [];

    user.waitList.forEach((runId, i) => {
      if (runId === runs[i]['_id']) {
        debugger;
        userWaitList.push(runs[i]);
      }
    });
    if (user.waitList.length === 0) {
      return <h1>Wait list is empty</h1>;
    } else {
      return (
        <>
          <h2>Wait listed runs</h2>
          <table class='table-auto'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Location</th>
                <th>Price</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                runs &&
                userWaitList.map((run) => (
                  <React.Fragment key={run._id}>
                    <tr>
                      <td>{run.date}</td>
                      <td>{run.location}</td>
                      <td>${run.price}</td>
                      <td>{run.capacity}</td>
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </>
      );
    }
  };

  return (
    <div className='flex'>
      <div className='xl:w-full xl:h-full'>
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
    </div>
  );
};

export default UpcomingRuns;
