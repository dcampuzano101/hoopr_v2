import React, { useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Grid, Avatar, IconButton } from '@material-ui/core/'
import GoogleMap from './GoogleMap'
import { getRunDetails, getUsersForRun } from '../../actions/runActions'
import { useSelector, useDispatch } from 'react-redux'
import { RunDetailsState, UsersState } from '../../reducers/runReducers'
import { Run } from '../components/Runs'
import { User } from '../components/Users'
import { ShoppingCart } from '@material-ui/icons'

import RunInfoCard from './RunInfoCard'
// import { getUserDetails } from '../../actions/userActions'
const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
    heading: {
        color: 'red',
    },
    runScreenWrapper: {
        height: '100%',
        border: '1px solid green',
        boxSizing: 'border-box'
    },
    mapWrapper: {
        height: '50%',
        width: '100%',
        border: '1px solid black',
        boxSizing: 'border-box'
    },
    runInfoWrapper: {
        height: '100%',
        boxSizing: 'border-box',
        padding: 'calc(.625rem - -2px) calc(.625rem - -10px)'
    },
    runUserListWrapper: {
        height: '100%',
        boxSizing: 'border-box',
        padding: 'calc(.625rem - -2px) calc(.625rem - -10px)'
    },
    avatarWrapper: {
        display: 'flex',
        boxSizing: 'border-box',
        height: '80%',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    avatarBox: {
        width: '20%',
        display: 'flex',
        justifyContent: 'center'
    },
    avatar: {
        width: spacing(7),
        height: spacing(7),
    },
    verticalDivider: {
        height: '95%',
        border: '1px solid rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignSelf: 'center'
    },
    infoTag: {
        fontSize: '1.3rem',
        letterSpacing: '-1.5px',
        [breakpoints.down('xs')]: {
            fontSize: '1rem'
        }
    },
    infoDetail: {
        fontSize: '1rem',
        [breakpoints.down('xs')]: {
            fontSize: '.8rem'
        }
    },
    infoWrap: {
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        [breakpoints.down('xs')]: {
            height: '20px'
        }
    },
    infoLine: {
        display: 'flex',
        width: '100%',
        paddingLeft: '25px',
        boxSizing: 'border-box'
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },
    button: {
        width: '175px',
        height: '45px',
        margin: '2% 0',
        borderRadius: '3px',
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: 'black',
        color: palette.primary.main,
        '& span svg': {
            marginRight: '15%'
        },
        '&:hover': {
            color: palette.secondary.main,
            backgroundColor: palette.primary.main,
            border: '1px solid black',
            '& p': {
                color: palette.primary.main
            }
        },
        [breakpoints.down('xs')]: {
            width: '100%',
            height: '30px'
        }
    },
    buttonText: {
        fontSize: '1rem',
        [breakpoints.down('xs')]: {
            fontSize: '.8rem'
        }
    },
    infoLineWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '55%'
    }
}))
interface RunScreenProps {
    params: {
        id: string
    }
}



const RunScreen: React.FC<RunScreenProps> = ({ params }) => {
    const classes = useStyles();
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
    //             className={classes.submit}
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

    const runUsers = useSelector((state: UsersState) => state.runUsers.users) as User[] || [] as User[]

    const run = useSelector((state: RunDetailsState) => state.runDetails.run) as Run || {} as Run

    useEffect(() => {
        dispatch(getRunDetails(params.id))
        if (run) {
            dispatch(getUsersForRun(params.id, run.users))
        }
    }, [dispatch, params.id])
    return (
        <>
            {run?.geoLocation && runUsers && (
                <Grid container className={classes.runScreenWrapper}>
                    <Grid item xs={12} className={classes.mapWrapper}>
                        <GoogleMap geoLocation={run?.geoLocation} name={run?.name} screen={true} />
                    </Grid>
                    <div style={{ display: 'flex', width: '100%', height: '50%' }}>

                        <Grid item xs={6} className={classes.runUserListWrapper}>
                            <Grid item xs={12} style={{ marginBottom: '10px' }}><Typography variant="h1" style={{ textTransform: 'capitalize', textAlign: 'center' }}>Players</Typography></Grid>
                            <div className={classes.avatarWrapper}>
                                {runUsers?.map((user: User, idx: number) => (
                                    <div className={classes.avatarBox}>
                                        <Avatar
                                            alt={user.username}
                                            src={user.profilePhoto}
                                            className={classes.avatar}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Grid>
                        <div className={classes.verticalDivider}></div>
                        <Grid item xs={6} className={classes.runInfoWrapper}>
                            <Grid item xs={12} style={{ marginBottom: '10px' }}><Typography variant="h1" style={{ textTransform: 'capitalize', textAlign: 'center' }}>Run Details</Typography></Grid>
                            <Grid item xs={12} md={12} className={classes.infoLineWrapper}>
                                <div className={classes.infoLine}>
                                    <Grid item xs={4} md={3} className={classes.infoWrap}>
                                        <Typography variant="h1" className={classes.infoTag}>
                                            location:
              </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={9} className={classes.infoWrap}>
                                        <Typography variant="h3" className={classes.infoDetail}>
                                            {run.location}
                                        </Typography>
                                    </Grid>
                                </div>
                                <div className={classes.infoLine}>
                                    <Grid item xs={4} md={3} className={classes.infoWrap}>
                                        <Typography variant="h1" className={classes.infoTag}>
                                            date:
              </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={9} className={classes.infoWrap}>
                                        <Typography variant="h3" className={classes.infoDetail}>
                                            {run.date}
                                        </Typography>
                                    </Grid>
                                </div>
                                <div className={classes.infoLine}>
                                    <Grid item xs={4} md={3} className={classes.infoWrap}>
                                        <Typography variant="h1" className={classes.infoTag}>
                                            price:
              </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={9} className={classes.infoWrap}>
                                        <Typography variant="h3" className={classes.infoDetail}>
                                            ${run.price}
                                        </Typography>
                                    </Grid>
                                </div>
                                <div className={classes.infoLine}>
                                    <Grid item xs={4} md={3} className={classes.infoWrap}>
                                        <Typography variant="h1" className={classes.infoTag}>
                                            spots:
              </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={9} className={classes.infoWrap}>
                                        <Typography variant="h3" className={classes.infoDetail}>
                                            {run.users.length}/{run.capacity}
                                        </Typography>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={7} md={12} className={classes.buttonWrapper}>
                                <IconButton className={classes.button}>
                                    <ShoppingCart fontSize="small" />
                                    <Typography variant="h3" className={classes.buttonText}>
                                        ADD TO CART
            </Typography>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            )}
        </>
    );
}

export default RunScreen