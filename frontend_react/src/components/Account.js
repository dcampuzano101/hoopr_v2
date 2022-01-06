import React, { useEffect } from 'react';
import Register from './Register';
import { Route, Switch, useLocation } from 'react-router-dom';
import { getUserDetails } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const Account = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // const userId = useSelector((state) => state.userLogin.userInfo._id) || null;

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  // console.log(location.pathname);
  return (
    <>
      <div className='max-w-full flex justify-center h-full'>
        <div className='w-11/12 sm:p-0 h-full flex p-5 items-center'>
          <div className='box-border h-full flex flex-row flex-wrap w-full align-middle justify-center border-black border-4'>
            <Register />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
