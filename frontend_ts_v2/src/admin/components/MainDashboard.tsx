import React, { useState } from 'react'
import { Grid, Paper, Card, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles(({ palette }: Theme) => ({
    mainInnerWrapper: {
        border: '1px solid black',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    mainHeaderWrapper: {
        maxWidth: '100%',
        display: 'flex',
    },
    mainComponentWrapper: {
        maxWidth: '100%',
        display: 'flex'
    },
    mainFooterWrapper: {
        maxWidth: '100%',
        display: 'flex'
    },
    componentHeader: {
        textTransform: 'none',
        fontSize: 'calc(1rem + 1.5vw)'
    }
}))
interface MainDashboardProps {

}



 const MainDashboard: React.FC<MainDashboardProps> = ({}) => {
     const classes = useStyles();

        return (
            <Grid container className={classes.mainInnerWrapper}>
                <Grid item xs={1} className={classes.mainHeaderWrapper}  style={{ border: '1px solid green'}}>
            
                    <Typography variant="h1" className={classes.componentHeader}>componentName</Typography>
            
                </Grid>
                <Grid item xs={9} className={classes.mainComponentWrapper} style={{ border: '1px solid blue'}}>

                </Grid>
                <Grid item  xs={2} className={classes.mainFooterWrapper} style={{ border: '1px solid red'}}>

                </Grid>
            </Grid>
        );
}

export default MainDashboard