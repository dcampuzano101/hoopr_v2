import React, { useState } from 'react';
import { Grid, Paper, Card, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

// const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
//   mainInnerWrapper: {
//     border: '1px solid black',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   mainHeaderWrapper: {
//     width: '100%',
//     display: 'flex'
//   },
//   mainComponentWrapper: {
//     display: 'flex'
//   },
//   mainFooterWrapper: {
//     width: '100%',
//     display: 'flex'
//   },
//   componentHeader: {
//     textTransform: 'none',
//     fontSize: 'calc(1rem + 1.5vw)'
//   }
// }))
// interface MainDashboardProps {}

const MainDashboard = ({}) => {
  // const classes = useStyles()

  return (
    <div container className='{classes.mainInnerWrapper}'>
      <div
        className={classes.mainHeaderWrapper}
        style={{ border: '1px solid green' }}
      >
        <h1 variant='h1' className='{classes.componentHeader}'>
          componentName
        </h1>
      </div>
      <div
        className='{classes.mainComponentWrapper}'
        style={{ border: '1px solid blue' }}
      ></div>
      <div
        className='{classes.mainFooterWrapper}'
        style={{ border: '1px solid red' }}
      ></div>
    </div>
  );
};

export default MainDashboard;
