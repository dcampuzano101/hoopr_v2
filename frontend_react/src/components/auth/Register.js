import React from 'react';

const Register = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-1/2 border-2 border-blue-600'>
        <div
          className='
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
        '
        >
          <div className='font-medium self-center text-xl sm:text-3xl text-gray-800 font-karla'>
            Join HOOPR
          </div>
          <div className='mt-4 self-center text-xl sm:text-sm text-gray-800'>
            Enter your credentials to create an account
          </div>

          <div className='mt-10'>
            <form action='#'>
              <div className='flex flex-col mb-5'>
                <label
                  for='name'
                  className='mb-1 text-xs tracking-wide text-gray-600'
                >
                  Name:
                </label>
                <div className='relative'>
                  <div
                    className='
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  '
                  >
                    <i className='fas fa-user text-gray-900'></i>
                  </div>

                  <input
                    id='name'
                    type='name'
                    name='name'
                    className='
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-gray-900
                  '
                    placeholder='Enter your name'
                  />
                </div>
              </div>
              <div className='flex flex-col mb-5'>
                <label
                  for='email'
                  className='mb-1 text-xs tracking-wide text-gray-600'
                >
                  E-Mail Address:
                </label>
                <div className='relative'>
                  <div
                    className='
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  '
                  >
                    <i className='fas fa-at text-gray-900'></i>
                  </div>

                  <input
                    id='email'
                    type='email'
                    name='email'
                    className='
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-gray-900
                  '
                    placeholder='Enter your email'
                  />
                </div>
              </div>
              <div className='flex flex-col mb-6'>
                <label
                  for='password'
                  className='mb-1 text-xs sm:text-sm tracking-wide text-gray-600'
                >
                  Password:
                </label>
                <div className='relative'>
                  <div
                    className='
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  '
                  >
                    <span>
                      <i className='fas fa-lock text-gray-900'></i>
                    </span>
                  </div>

                  <input
                    id='password'
                    type='password'
                    name='password'
                    className='
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-gray-900
                  '
                    placeholder='Enter your password'
                  />
                </div>
              </div>
              <div className='flex flex-col mb-6'>
                <label
                  for='confirmPassword'
                  className='mb-1 text-xs sm:text-sm tracking-wide text-gray-600'
                >
                  Confirm Password:
                </label>
                <div className='relative'>
                  <div
                    className='
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  '
                  >
                    <span>
                      <i className='fas fa-lock text-gray-900'></i>
                    </span>
                  </div>

                  <input
                    id='confirmPassword'
                    type='confirmPassword'
                    name='confirmPassword'
                    className='
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-gray-900
                  '
                    placeholder='Confirm your password'
                  />
                </div>
              </div>

              <div className='flex w-full justify-center'>
                <button
                  type='submit'
                  className='
                  
                  mt-2
                  items-center
                  focus:outline-none
                transition-all duration-300 lg:w-1/2 sm:w-4/6 sm:h-12 sm:items-center flex flex-row align-middle justify-center cursor-pointer bg-transparent hover:bg-gray-900 font-semibold hover:text-white lg:py-2 lg:px-4 border border-black hover:border-transparent rounded
                '
                >
                  <span className='mr-2 uppercase'>Sign Up</span>
                  <span>
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='flex justify-center items-center mt-6'>
          <a
            href='#'
            target='_blank'
            className='
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          '
          >
            <span className='ml-2'>
              Have an account?
              <a
                href='/login'
                className='text-xs ml-2 text-gray-900 font-semibold'
              >
                Login here
              </a>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
