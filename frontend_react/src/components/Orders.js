import React from 'react';
// import { Grid, Typography } from '@material-ui/core';
// import { makeStyles, Theme } from '@material-ui/core/styles';

// const useStyles = makeStyles(({ palette }: Theme) => ({
//     mainInnerWrapper: {
//         border: '1px solid black',
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     mainHeaderWrapper: {
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 'calc(.625rem)'
//     },
//     mainComponentWrapper: {
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         maxWidth: 'none'
//     },
//     mainFooterWrapper: {
//         width: '100%',
//         display: 'flex'
//     },
//     componentHeader: {
//         textTransform: 'none',
//         fontSize: 'calc(1rem + 1.5vw)'
//     },
//     headerWrapper: {

//     },
//     filterTools: {
//         width: '100%',
//         border: '1px solid yellow',
//         padding: 'calc(.625rem)',
//     },
//     ordersWrapper: {
//         width: '100%',
//         border: '1px solid purple',
//         padding: 'calc(.625rem - -10px)',
//     }

// }))

// interface OrdersProps {

// }

const Orders = () => {
  // const classes = useStyles();
  const orders = ['', '', '', '', ''];
  return (
    <div container className='{classes.mainInnerWrapper}'>
      <div
        item
        xs={1}
        className='{classes.mainHeaderWrapper}'
        style={{ border: '1px solid green' }}
      >
        <h1 variant='h1' className='{classes.componentHeader}'>
          Orders
        </h1>
        <h3 variant='h3'>{orders.length} Results</h3>
      </div>
      <div
        item
        xs={9}
        className='{classes.mainComponentWrapper}'
        style={{ border: '1px solid blue' }}
      >
        <div item xs={1} className='{classes.filterTools}'></div>
        <div item xs={11} className='{classes.ordersWrapper}'></div>
      </div>
      <div
        item
        xs={2}
        className='{classes.mainFooterWrapper}'
        style={{ border: '1px solid red' }}
      ></div>
    </div>
  );
};

export default Orders;
