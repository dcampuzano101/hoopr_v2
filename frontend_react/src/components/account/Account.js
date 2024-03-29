import React, { useEffect } from 'react';
// import Register from './auth/Register';
import { Route, Switch, useLocation } from 'react-router-dom';
import { getUserDetails } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import ProfileCard from './ProfileCard';
import UpcomingRuns from './UpcomingRuns';
// import UserRuns from './UserRuns';

const Account = ({ location, history }) => {
  // const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin) || null;

  const { userInfo, loading, error } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/login';
  //  console.log(userLogin);

  const userDetails = useSelector((state) => state.userDetails);
  const { detailsError, user, success: successDetails } = userDetails;

  useEffect(() => {
    if (userInfo === undefined || Object.keys(userInfo).length === 0) {
      history.push(redirect);
    } else {
      if (user) {
        dispatch(getUserDetails('profile'));
      }

      if (successDetails) {
        // setUsername(user.username);
        // setEmail(user.email);
        // setProfilePhoto(user.profilePhoto || avatar);
      }
    }
  }, [history, userInfo, redirect, dispatch]);

  return (
    <>
      <div className='max-w-full flex justify-center h-full'>
        <div className='w-11/12 sm:p-0 h-full flex p-1 items-center'>
          <div className='box-border h-full w-full flex flex-row flex-wrap justify-evenly overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin'>
            <ProfileCard />
            <UpcomingRuns />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
