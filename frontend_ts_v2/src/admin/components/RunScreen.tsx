import React, { useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core/'
import GoogleMap from './GoogleMap'
import { getRunDetails } from '../../actions/runActions'
import { useSelector, useDispatch } from 'react-redux'
import { RunDetailsState } from '../../reducers/runReducers'
import { Run } from '../components/Runs'
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

    const run = useSelector((state: RunDetailsState) => state.runDetails.run) as Run || {} as Run

    useEffect(() => {
        dispatch(getRunDetails(params.id))
    }, [])
    return (
        <>
            {run?.geoLocation && (
                <Grid container className={classes.runScreenWrapper}>
                    <Grid item xs={12} className={classes.mapWrapper}>
                        <GoogleMap geoLocation={run?.geoLocation} name={run?.name} width={'100%'} height={'100%'} />
                    </Grid>
                    <Grid item xs={6} className={classes.runInfoWrapper}>

                    </Grid>
                    <Grid item xs={6} className={classes.runUserListWrapper}>

                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default RunScreen