import React, { useEffect } from 'react';
// import { makeStyles, Theme } from '@material-ui/core/styles';
// import { Typography, Grid, Avatar, IconButton } from '@material-ui/core/';
import GoogleMap from '../GoogleMap';
import { getRunDetails, getUsersForRun } from '../../actions/runActions';
import { MdShoppingCart } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { useSelector, useDispatch } from 'react-redux';
// import { RunDetailsState, UsersState } from '../../reducers/runReducers';
// import { Run } from './Runs';
// import { User } from './Users';
// import { ShoppingCart } from '@material-ui/icons';

const RunScreen = ({ params }) => {
  // const classes = useStyles();
  const dispatch = useDispatch();

  const runUsers = useSelector((state) => state.runUsers.users);

  const run = useSelector((state) => state.runDetails.run) || {};

  useEffect(() => {
    dispatch(getRunDetails(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      {run?.geoLocation && run?.users && (
        <div className='p-2 xl:w-full lg:w-full md:w-2/3 sm:w-full sm:h-1/2 xl:h-full flex flex-wrap flex-col m-2 shadow-lg border border-black border-opacity-50 rounded'>
          <div
            item
            xs={12}
            className='w-1/2 h-full border-2 border-red-500 p-2'
          >
            <GoogleMap
              geoLocation={run?.geoLocation}
              name={run?.name}
              screen={true}
            />
          </div>
          <div className='w-1/2 h-full flex flex-wrap flex-row'>
            <div className='h-1/2 w-full flex flex-col justify-center'>
              <div className='flex justify-center'>
                <h1 className='font-rubik xl:text-2xl sm:text-lg uppercase tracking-tight font-medium leading-6'>
                  Players
                </h1>
              </div>
              <div className='grid grid-cols-5 gap-3 place-items-center'>
                {runUsers?.map((user, idx) => (
                  <div className=''>
                    <div
                      className='shadow rounded 2xl:h-28 2xl:w-28 xl:h-24 xl:w-24 lg:h-20 lg:w-20 align-middle border-none'
                      style={{
                        backgroundImage: `url(${user.profilePhoto})`,
                        backgroundSize: 'cover',
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <div className='h-1/2 w-full flex flex-col justify-center'>
              <div className='flex justify-center'>
                <h1 className='font-rubik xl:text-2xl sm:text-lg uppercase tracking-tight font-medium leading-6'>
                  Run Details
                </h1>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-row lg:w-1/2 sm:w-full p-2'>
                  <h1
                    variant='h1'
                    className='font-rubik text-2xl sm:text-lg lowercase tracking-tight font-medium leading-6 w-1/2'
                  >
                    location:
                  </h1>

                  <h3
                    variant='h3'
                    className='font-roboto text-xl sm:text-base tracking-tight leading-6 w-1/2 flex items-center'
                  >
                    {run.location}
                  </h3>
                </div>
                <div className='flex flex-row  lg:w-1/2 sm:w-full p-2'>
                  <h1
                    variant='h1'
                    className='font-rubik text-2xl sm:text-lg lowercase tracking-tight font-medium leading-6 w-1/2'
                  >
                    date:
                  </h1>

                  <h3
                    variant='h3'
                    className='font-roboto text-xl sm:text-base tracking-tight leading-6 w-1/2 flex items-center'
                  >
                    {run.date}
                  </h3>
                </div>
                <div className='flex flex-row  lg:w-1/2 sm:w-full p-2'>
                  <h1
                    variant='h1'
                    className='font-rubik text-2xl sm:text-lg lowercase tracking-tight font-medium leading-6 w-1/2'
                  >
                    price:
                  </h1>

                  <h3
                    variant='h3'
                    className='font-roboto text-xl sm:text-base tracking-tight leading-6 w-1/2 flex items-center'
                  >
                    ${run.price}
                  </h3>
                </div>
                <div className='flex flex-row  lg:w-1/2 sm:w-full p-2'>
                  <h1
                    variant='h1'
                    className='font-rubik text-2xl sm:text-lg lowercase tracking-tight font-medium leading-6 w-1/2'
                  >
                    spots:
                  </h1>

                  <h3
                    variant='h3'
                    className='font-roboto text-xl sm:text-base tracking-tight leading-6 w-1/2 flex items-center'
                  >
                    {run.users.length}/{run.capacity}
                  </h3>
                </div>
              </div>
              <div className='w-full flex justify-center p-2 sm:items-center'>
                <div className='transition-all duration-300 lg:w-1/2 sm:w-4/6 sm:h-12 sm:items-center flex flex-row align-middle justify-center cursor-pointer bg-transparent hover:bg-gray-900 font-semibold hover:text-white lg:py-2 lg:px-4 border border-black hover:border-transparent rounded'>
                  <IconContext.Provider
                    value={{ style: { fontSize: '1.7rem' } }}
                  >
                    <MdShoppingCart />
                  </IconContext.Provider>

                  <h3
                    variant='h3'
                    className='font-roboto tracking-tight leading-6 p-1 sm:text-sm'
                  >
                    ADD TO CART
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RunScreen;
