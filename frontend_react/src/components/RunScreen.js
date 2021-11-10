import React, { useEffect } from 'react';
// import { makeStyles, Theme } from '@material-ui/core/styles';
// import { Typography, Grid, Avatar, IconButton } from '@material-ui/core/';
import GoogleMap from './GoogleMap';
import { getRunDetails, getUsersForRun } from '../actions/runActions';
import { useSelector, useDispatch } from 'react-redux';
// import { RunDetailsState, UsersState } from '../../reducers/runReducers';
// import { Run } from './Runs';
// import { User } from './Users';
// import { ShoppingCart } from '@material-ui/icons';

// const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
//     heading: {
//         color: 'red',
//     },
//     runScreenWrapper: {
//         height: '100%',
//         border: '1px solid green',
//         boxSizing: 'border-box'
//     },
//     mapWrapper: {
//         height: '50%',
//         width: '100%',
//         border: '1px solid black',
//         boxSizing: 'border-box'
//     },
//     runInfoWrapper: {
//         height: '100%',
//         boxSizing: 'border-box',
//         padding: 'calc(.625rem - -2px) calc(.625rem - -10px)'
//     },
//     runUserListWrapper: {
//         height: '100%',
//         boxSizing: 'border-box',
//         padding: 'calc(.625rem - -2px) calc(.625rem - -10px)'
//     },
//     avatarWrapper: {
//         display: 'flex',
//         boxSizing: 'border-box',
//         height: '80%',
//         flexWrap: 'wrap',
//         alignItems: 'center'
//     },
//     avatarBox: {
//         width: '20%',
//         display: 'flex',
//         justifyContent: 'center'
//     },
//     avatar: {
//         width: spacing(7),
//         height: spacing(7),
//         '&:hover': {
//             cursor: 'pointer',
//             transition: 'top .3s ease',
//         }
//     },
//     verticalDivider: {
//         height: '95%',
//         border: '1px solid rgba(0, 0, 0, 0.3)',
//         display: 'flex',
//         alignSelf: 'center'
//     },
//     infoTag: {
//         fontSize: '1.3rem',
//         letterSpacing: '-1.5px',
//         [breakpoints.down('xs')]: {
//             fontSize: '1rem'
//         }
//     },
//     infoDetail: {
//         fontSize: '1rem',
//         [breakpoints.down('xs')]: {
//             fontSize: '.8rem'
//         }
//     },
//     infoWrap: {
//         height: '35px',
//         display: 'flex',
//         alignItems: 'center',
//         [breakpoints.down('xs')]: {
//             height: '20px'
//         }
//     },
//     infoLine: {
//         display: 'flex',
//         width: '100%',
//         paddingLeft: '25px',
//         boxSizing: 'border-box'
//     },
//     buttonWrapper: {
//         display: 'flex',
//         justifyContent: 'center',
//         width: '100%',
//         alignItems: 'center'
//     },
//     button: {
//         width: '175px',
//         height: '45px',
//         margin: '2% 0',
//         borderRadius: '3px',
//         display: 'flex',
//         justifyContent: 'flex-start',
//         backgroundColor: 'black',
//         color: palette.primary.main,
//         '& span svg': {
//             marginRight: '15%'
//         },
//         '&:hover': {
//             color: palette.secondary.main,
//             backgroundColor: palette.primary.main,
//             border: '1px solid black',
//             '& p': {
//                 color: palette.primary.main
//             }
//         },
//         [breakpoints.down('xs')]: {
//             width: '100%',
//             height: '30px'
//         }
//     },
//     buttonText: {
//         fontSize: '1rem',
//         [breakpoints.down('xs')]: {
//             fontSize: '.8rem'
//         }
//     },
//     infoLineWrapper: {
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         width: '100%',
//         height: '55%'
//     }
// }))
// interface RunScreenProps {
//     params: {
//         id: string
//     }
// }

const RunScreen = ({ params }) => {
  // const classes = useStyles();
  const dispatch = useDispatch();

  // const buttonToDisplay = (run, userInfo) => {
  //     if (userInfo !== null) {
  //       if (
  //         run.users.some((id) => id === userInfo._id) ||
  //         run.waitList.some((id) => id === userInfo._id)
  //       ) {
  //         return (
  //           <Button
  //             type="submit"
  //             variant="contained"
  //             color="primary"
  //             className='{classes.submit}'
  //             onClick={() => setDeleteAlert(userInfo._id)}
  //           >
  //             Cancel
  //           </Button>
  //         );
  //       } else if (
  //         run.capacity === run.users.length &&
  //         run.waitList.length === 3
  //       ) {
  //         return (
  //           <Button
  //             type="submit"
  //             variant="contained"
  //             color="primary"
  //             disabled="true"
  //             className={classes.submit}
  //           >
  //             FULL!
  //           </Button>
  //         );
  //       } else if (
  //         run.capacity === run.users.length &&
  //         run.waitList.length !== 3
  //       ) {
  //         return (
  //           <Button
  //             type="submit"
  //             variant="contained"
  //             color="primary"
  //             className={classes.submit}
  //             onClick={() => waitListHandler(run, userInfo)}
  //             disabled={disableButton(run, userInfo)}
  //           >
  //             JOIN WAITLIST
  //           </Button>
  //         );
  //       } else {
  //         return (
  //           <Button
  //             type="submit"
  //             variant="contained"
  //             color="primary"
  //             className={classes.submit}
  //             onClick={() => addToCartHandler(run._id, userInfo)}
  //             disabled={disableButton(run, userInfo)}
  //           >
  //             ADD TO CART
  //           </Button>
  //         );
  //       }
  //     } else {
  //       return (
  //         <Button
  //           type="submit"
  //           variant="contained"
  //           color="primary"
  //           className={classes.submit}
  //           onClick={() => addToCartHandler(run._id, userInfo)}
  //           disabled={disableButton(run, userInfo)}
  //         >
  //           ADD TO CART
  //         </Button>
  //       );
  //     }
  //   };

  const runUsers = useSelector((state) => state.runUsers.users); // //User[] || [] as User[]

  const run = useSelector((state) => state.runDetails.run) || {};

  useEffect(() => {
    dispatch(getRunDetails(params.id));
    dispatch(
      getUsersForRun(params.id, [
        '6026b9622fab2757a85df105',
        '6026b9622fab2757a85df118',
        '6026b9622fab2757a85df112',
        '6026b9622fab2757a85df10a',
        '6026b9622fab2757a85df107',
        '6026b9622fab2757a85df10b',
        '6026b9622fab2757a85df111',
        '6026b9622fab2757a85df10f',
        '6026b9622fab2757a85df115',
        '6026b9622fab2757a85df10d',
        '6026b9622fab2757a85df110',
        '6026b9622fab2757a85df113',
        '6026b9622fab2757a85df117',
        '6026b9622fab2757a85df106',
        '6026b9622fab2757a85df114',
      ])
    );
  }, [dispatch, params.id]);
  return (
    <>
      {run?.geoLocation && run?.users && (
        <div container className='{classes.runScreenWrapper}'>
          <div item xs={12} className='{classes.mapWrapper}'>
            <GoogleMap
              geoLocation={run?.geoLocation}
              name={run?.name}
              screen={true}
            />
          </div>
          <div style={{ display: 'flex', width: '100%', height: '50%' }}>
            <div item xs={6} className='{classes.runUserListWrapper}'>
              <div item xs={12} style={{ marginBottom: '10px' }}>
                <h1
                  variant='h1'
                  style={{ textTransform: 'capitalize', textAlign: 'center' }}
                >
                  Players
                </h1>
              </div>
              <div className='{classes.avatarWrapper}'>
                {runUsers?.map((user, idx) => (
                  <div className='{classes.avatarBox}'>
                    <h3>AVATAR ICON</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className='{classes.verticalDivider}'></div>
            <div item xs={6} className='{classes.runInfoWrapper}'>
              <div item xs={12} style={{ marginBottom: '10px' }}>
                <h1
                  variant='h1'
                  style={{ textTransform: 'capitalize', textAlign: 'center' }}
                >
                  Run Details
                </h1>
              </div>
              <div item xs={12} md={12} className='{classes.infoLineWrapper}'>
                <div className='{classes.infoLine}'>
                  <div item xs={4} md={3} className='{classes.infoWrap}'>
                    <h1 variant='h1' className='{classes.infoTag}'>
                      location:
                    </h1>
                  </div>
                  <div item xs={8} md={9} className='{classes.infoWrap}'>
                    <h3 variant='h3' className='{classes.infoDetail}'>
                      {run.location}
                    </h3>
                  </div>
                </div>
                <div className='{classes.infoLine}'>
                  <div item xs={4} md={3} className='{classes.infoWrap}'>
                    <h1 variant='h1' className='{classes.infoTag}'>
                      date:
                    </h1>
                  </div>
                  <div item xs={8} md={9} className='{classes.infoWrap}'>
                    <h3 variant='h3' className='{classes.infoDetail}'>
                      {run.date}
                    </h3>
                  </div>
                </div>
                <div className='{classes.infoLine}'>
                  <div item xs={4} md={3} className='{classes.infoWrap}'>
                    <h1 variant='h1' className='{classes.infoTag}'>
                      price:
                    </h1>
                  </div>
                  <div item xs={8} md={9} className='{classes.infoWrap}'>
                    <h3 variant='h3' className='{classes.infoDetail}'>
                      ${run.price}
                    </h3>
                  </div>
                </div>
                <div className='{classes.infoLine}'>
                  <div item xs={4} md={3} className='{classes.infoWrap}'>
                    <h1 variant='h1' className='{classes.infoTag}'>
                      spots:
                    </h1>
                  </div>
                  <div item xs={8} md={9} className='{classes.infoWrap}'>
                    <h3 variant='h3' className='{classes.infoDetail}'>
                      {run.users.length}/{run.capacity}
                    </h3>
                  </div>
                </div>
              </div>
              <div item xs={7} md={12} className='{classes.buttonWrapper}'>
                <h3 variant='h3' className='{classes.buttonText}'>
                  SHOPPING_CART_ICON_ADD TO CART
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RunScreen;
