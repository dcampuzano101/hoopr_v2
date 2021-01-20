import React from 'react'
import { Card, Grid, Typography, Avatar, Paper } from '@material-ui/core/'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Drawer from '../components/Drawer';

const useStyles = makeStyles(({palette, breakpoints}: Theme) => ({
    adminDashboardWrapper: {
        border: '1px solid black',
        height: '100vh',
        [breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column'
        }
    },
    drawerPanelWrapper: {
        border: '1px solid black',
        height: '100%',
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        [breakpoints.down('sm')]: {
            height: '10%',
        }
    },
    drawerPanel: {
        width: '100%',
        height: '98%',
        display: 'flex',
        boxSizing: 'border-box',
        [breakpoints.down('sm')]: {
            height: '95%',
            width: '95%',
            margin: '0 auto',
            display: 'flex',
            padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
            boxSizing: 'border-box',
        }

    },
    mainWrapper: {
        border: '1px solid black',
        height: '100%',
        boxSizing: 'border-box',
        [breakpoints.down('sm')]: {
            height: '45%',
        }
    },
    main: {
        height: '98%',
        display: 'flex',
        
        
        boxSizing: 'border-box',
        
        [breakpoints.down('sm')]: {
            height: '95%',
            width: '95%',
            margin: '0 auto',
            display: 'flex',
            padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
            boxSizing: 'border-box',
            
        }
    },
    activitiesWrapper: {
        border: '1px solid black',
        height: '100%',
        boxSizing: 'border-box',
        [breakpoints.down('sm')]: {
            height: '45%',
        }
    },
    activities: {
        height: '98%',
        display: 'flex',
        boxSizing: 'border-box',
        [breakpoints.down('sm')]: {
            height: '95%',
            width: '95%',
            margin: '0 auto',
            display: 'flex',
            padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
            boxSizing: 'border-box',
        }
    }
}))

interface DashboardScreenProps {

}

 const DashboardScreen: React.FC<DashboardScreenProps> = ({}) => {

    const classes = useStyles();
        return (
                <Grid container spacing={0} className={classes.adminDashboardWrapper}>
                    <Grid item sm={12} md={2} className={classes.drawerPanelWrapper}>
                        <Paper elevation={0} className={classes.drawerPanel}>
                            <Drawer />
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={7} className={classes.mainWrapper}>
                        <Paper elevation={0} className={classes.main}>

                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={3} className={classes.activitiesWrapper}>
                        <Paper elevation={0} className={classes.activities}>
                
                        </Paper>
                    </Grid>
                </Grid>
        );
}

export default DashboardScreen

/*
// padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
// padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
// margin:  'calc(.625rem - 1px) calc(1rem - 1px)',
// padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
// margin: 'calc(.625rem - 1px) calc(1rem - 1px)',
*/