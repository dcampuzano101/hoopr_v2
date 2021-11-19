import React from 'react';
import { IconContext } from 'react-icons';
import { MdShoppingCart } from 'react-icons/md';
// import { Run } from './Runs';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '../actions/modalActions';
import { getUsersForRun } from '../actions/runActions';
import RunScreen from './RunScreen';

const RunInfoCard = ({ run }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div
      className='lg:w-1/2 sm:w-full sm:h-1/2 lg:h-full flex cursor-pointer'
      onClick={() => {
        dispatch(openModal('RunScreen'));
        dispatch(getUsersForRun(run._id, run.users));
        history.push(`/admin/runs/${run._id}/`, { modal: true });
      }}
    >
      <div className='w-full flex justify-center lg:flex-col sm:flex-row p-2'>
        <div className='flex h-4/5 flex-col w-full sm:h-full justify-center lg:items-center sm:items-start'>
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
            <IconContext.Provider value={{ style: { fontSize: '1.7rem' } }}>
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
  );
};

export default RunInfoCard;
