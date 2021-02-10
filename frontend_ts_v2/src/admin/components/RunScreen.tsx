import React, { useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core/'
import GoogleMap from './GoogleMap'
import { getRunDetails } from '../../actions/runActions'
import { useSelector, useDispatch } from 'react-redux'
import { RunState } from '../../reducers/runReducers'
import { Run } from '../components/Runs'
const useStyles = makeStyles(({ palette }: Theme) => ({
    heading: {
        color: 'red',
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

    const run = useSelector((state: RunState) => state.run) || {}

    useEffect(() => {
        dispatch(getRunDetails(params.id))
    })
    debugger;
    console.log(params)
    return (
        <>
            <Grid container>
                <Grid item xs={12} md={6}>
                    {/* <GoogleMap geoLocation={run?.geoLocation} name={run?.name} /> */}
                </Grid>

            </Grid>
        </>
    );
}

export default RunScreen