import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core/'

const useStyles = makeStyles(({ palette }: Theme) => ({
    heading: {
        color: 'red',
    }
}))
interface RunScreenProps {

}

const RunScreen: React.FC<RunScreenProps> = () => {
    const classes = useStyles();
    console.log('hiiiii runscreen')
    return (
        <>
            <Typography variant="h2" className={classes.heading} >RUNSCREEN</Typography>
        </>
    );
}

export default RunScreen