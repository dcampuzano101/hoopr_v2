import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ history }) => {
  return (
    <div className='border-white border-4 flex flex-row box-border w-screen h-1/6'>
      <div className='w-1/3 h-full flex-initial border-black border-4 flex justify-center items-center'>
        <Link
          to='/'
          className='font-rubik xl:text-7xl lg:text-4xl md:lg:text-3xl transition'
        >
          HOOPR
        </Link>
      </div>
      <div className='w-full border-red-300 border-4 h-full flex flex-row justify-end items-center'>
        <Link
          to='/runs'
          className='w-1/6 font-karla xl:text-3xl lg:text-2xl md:text-xl flex justify-center'
        >
          <div className='transition-all p-2 border-transparent border-b-2 hover:border-black'>
            RUNS
          </div>
        </Link>
        <Link
          to='/about'
          className='w-1/6 font-karla xl:text-3xl lg:text-2xl md:text-xl flex justify-center'
        >
          <div className='transition-all p-2 border-transparent border-b-2 hover:border-black'>
            ABOUT
          </div>
        </Link>
        <Link
          to='/profile'
          className='w-1/6 font-karla xl:text-3xl lg:text-2xl md:text-xl flex justify-center'
        >
          <div className='transition-all p-2 border-transparent border-b-2 hover:border-black'>
            ACCOUNT
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
