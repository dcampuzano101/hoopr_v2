import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ history }) => {
  return (
    <div className='border-b-1 border-black flex flex-row justify-between box-border h-24 px-3'>
      <div className='h-full flex-initial flex justify-center items-center'>
        <Link
          to='/'
          className='font-rubik xl:text-5xl lg:text-4xl md:lg:text-3xl transition'
        >
          HOOPR
        </Link>
      </div>
      <div className='h-full flex flex-row justify-evenly xl:justify-end lg:justify-end items-center sm:justify-evenly'>
        <Link
          to='/runs'
          className='mx-3 font-karla xl:text-3xl lg:text-2xl md:text-xl flex justify-center'
        >
          <div className='transition-all p-1 border-transparent border-b-2 hover:border-black'>
            RUNS
          </div>
        </Link>
        <Link
          to='/about'
          className='mx-3 font-karla xl:text-3xl lg:text-2xl md:text-xl flex justify-center'
        >
          <div className='transition-all p-1 border-transparent border-b-2 hover:border-black'>
            ABOUT
          </div>
        </Link>
        <Link
          to='/profile'
          className='mx-3 font-karla xl:text-3xl lg:text-2xl md:text-xl flex justify-center'
        >
          <div className='transition-all p-1 border-transparent border-b-2 hover:border-black'>
            ACCOUNT
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
