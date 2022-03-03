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
        <div className='p-0.5 h-full w-full flex flex-wrap flex-col shadow-lg border border-black border-opacity-50 rounded'>
          <div
            className='w-full h-1/2 border-2 border-red-500'
          >
            <GoogleMap
              geoLocation={run?.geoLocation}
              name={run?.name}
              screen={true}
            />
          </div>
          <div className='w-full h-1/2 flex flex-wrap flex-row'>
            <div className='h-1/2 w-full flex flex-col justify-center'>
              <div className='flex justify-center'>
                <h1 className='font-rubik uppercase tracking-tight font-medium leading-6'>
                  Players
                </h1>
              </div>
              <div className='grid grid-cols-5 gap-0.5 justify-items-center'>
                {runUsers?.map((user, idx) => (
                  <div className=''>
                    <div
                      className='shadow rounded w-8 h-8 align-middle border-none'
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
              <div className='h-4/5 w-1/2 xl:w-1/4  justify-center flex flex-col'>
                <div className='flex flex-row p-0.5'>
                  <h1
                    variant='h1'
                    className='font-rubik  lowercase tracking-tight font-medium leading-2 w-1/2'
                  >
                    location:
                  </h1>

                  <h3
                    variant='h3'
                    className='font-roboto  tracking-tight leading-2 w-1/2'
                  >
                    {run.location}
                  </h3>
                </div>
                <div className='flex flex-row p-0.5'>
                  <h1
                    variant='h1'
                    className='font-rubik  lowercase tracking-tight font-medium leading-2 w-1/2'
                  >
                    date:
                  </h1>

                  <h3
                    variant='h3'
                    className='font-roboto  tracking-tight leading-2 w-1/2'
                  >
                    {run.date}
                  </h3>
                </div>
                <div className='flex flex-row p-0.5'>
                  <h1
                    variant='h1'
                    className='font-rubik  lowercase tracking-tight font-medium leading-2 w-1/2'
                  >
                    price:
                  </h1>

                  <h3
                    variant='h3'
                    className='font-roboto  tracking-tight leading-2 w-1/2'
                  >
                    ${run.price}
                  </h3>
                </div>
                <div className='flex flex-row p-0.5'>
                  <h1
                    variant='h1'
                    className='font-rubik  lowercase tracking-tight font-medium leading-2 w-1/2'
                  >
                    spots:
                  </h1>

                  <h3
                    variant='h3'
                    className='font-roboto  tracking-tight leading-2 w-1/2'
                  >
                    {run.users.length}/{run.capacity}
                  </h3>
                </div>
              </div>
              <div className='w-full flex justify-center p-2 sm:items-center'>
                <button
                  type='submit'
                  className='w-2/3 xl:w-1/4 transition-all duration-300 flex flex-row align-middle items-center justify-center cursor-pointer bg-transparent hover:bg-gray-900 font-semibold hover:text-white border border-black hover:border-transparent rounded'
                >
                  <IconContext.Provider value={{ style: { fontSize: '1.2rem' } }}>
                    <MdShoppingCart />
                  </IconContext.Provider>

                  <h3
                    variant='h3'
                    className='font-roboto tracking-tight leading-6 p-1 text-sm'
                  >
                    ADD TO CART
                  </h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RunScreen;
