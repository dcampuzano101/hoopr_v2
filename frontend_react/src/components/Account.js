import React from 'react';
import Login from './Login';

const Account = () => {
  return (
    <>
      <div className='max-w-full flex justify-center h-full'>
        <div className='w-11/12 sm:p-0 h-full flex p-5 items-center'>
          <div className='box-border h-full flex flex-row flex-wrap w-full align-middle justify-center border-black border-4'>
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
