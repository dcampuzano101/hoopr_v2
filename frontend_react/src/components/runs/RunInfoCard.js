import React from 'react';
import { IconContext } from 'react-icons';
import { MdShoppingCart } from 'react-icons/md';
// import { Run } from './Runs';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/modalActions';
import { getUsersForRun } from '../../actions/runActions';

const RunInfoCard = ({ run, profile }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div
      // className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}
      className={!profile ? 'w-full h-1/3 xl:h-full flex cursor-pointer' : 'w-full h-full'}
      onClick={() => {
        dispatch(openModal('RunScreen'));
        dispatch(getUsersForRun(run._id, run.users));
        history.push(`/admin/runs/${run._id}/`, { modal: true });
      }}
    >
      <div className='w-full flex justify-center items-center flex-col p-2'>
        <div className='h-4/5 w-1/2 xl:w-1/2  justify-center flex flex-col'>
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
        {!profile &&
          <div className='w-full flex justify-center p-2 sm:items-center'>
            <button
              type='submit'
              className='w-2/3 xl:w-1/2 transition-all duration-300 flex flex-row align-middle items-center justify-center cursor-pointer bg-transparent hover:bg-gray-900 font-semibold hover:text-white border border-black hover:border-transparent rounded'
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
        }

      </div>
    </div>
  );
};

export default RunInfoCard;
