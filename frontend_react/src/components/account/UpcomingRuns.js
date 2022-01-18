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
        <div>
          <div className='flex'>
            <h1>Upcoming Runs</h1>
            <table class='table-auto min-w-full'>
              <thead className='border-b'>
                <tr>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Date
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Location
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Price
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Capacity
                  </th>
                </tr>
              </thead>
              <tbody>
                {user &&
                  runs &&
                  userRuns.map((run) => (
                    <React.Fragment key={run._id}>
                      <tr className='border-b'>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {run.date}
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {run.location}
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          ${run.price}
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {run.capacity}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
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
        <>
          <h2>Wait listed runs</h2>
          <table className='table-auto min-w-full'>
            <thead className='border-b'>
              <tr>
                <th
                  scope='col'
                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                >
                  Date
                </th>
                <th
                  scope='col'
                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                >
                  Location
                </th>
                <th
                  scope='col'
                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                >
                  Price
                </th>
                <th
                  scope='col'
                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                >
                  Capacity
                </th>
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
    <div className='flex w-2/3 flex-row'>
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
