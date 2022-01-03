import React from 'react';
import Register from './Register';
import { Route, Switch, useLocation } from 'react-router-dom';

const Account = () => {
  const location = useLocation();

  console.log(location.pathname);
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
