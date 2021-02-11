import React, { useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Grid, Avatar } from '@material-ui/core/'
import GoogleMap from './GoogleMap'
import { getRunDetails } from '../../actions/runActions'
import { useSelector, useDispatch } from 'react-redux'
import { RunDetailsState } from '../../reducers/runReducers'
import { Run } from '../components/Runs'
import { User } from '../components/Users'
// import { getUserDetails } from '../../actions/userActions'
const useStyles = makeStyles(({ palette }: Theme) => ({
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
        border: '1px solid blue',
        height: '100%'
    },
    runUserListWrapper: {
        border: '1px solid red',
        height: '100%'
    },
    avatarWrapper: {
        display: 'flex',

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


    const run = useSelector((state: RunDetailsState) => state.runDetails.run) as Run || {} as Run

    useEffect(() => {
        dispatch(getRunDetails(params.id))
    }, [dispatch, params.id])
    return (
        <>
            {run?.geoLocation && (
                <Grid container className={classes.runScreenWrapper}>
                    <Grid item xs={12} className={classes.mapWrapper}>
                        <GoogleMap geoLocation={run?.geoLocation} name={run?.name} screen={true} />
                    </Grid>
                    <Grid item xs={6} className={classes.runUserListWrapper}>
                        <Grid item xs={12}><Typography variant="h1" style={{ textTransform: 'capitalize', textAlign: 'center' }}>Players</Typography></Grid>
                        <div className={classes.avatarWrapper}>
                            {run.users.map((user: User, idx: number) => (
                                <React.Fragment key={idx}>
                                    <Avatar
                                        alt={user.username}
                                        src={user.profilePhoto}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={6} className={classes.runInfoWrapper}>

                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default RunScreen