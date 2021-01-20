import React from 'react'
import { Card, Grid, Typography, Avatar, Paper } from '@material-ui/core/'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Drawer from '../components/Drawer';

const useStyles = makeStyles(({palette, breakpoints}: Theme) => ({
    adminDashboardWrapper: {
        border: '1px solid white',
        height: '100vh',
        backgroundColor: palette.primary.main,
        // boxSizing: 'border-box',
        [breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column'
        }
    },
    drawerPanelWrapper: {
        border: '1px solid white',
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor: palette.primary.main,
        [breakpoints.down('sm')]: {
            height: '10%',
        }
    },
    drawerPanel: {
        height: '98%',
        display: 'flex',
        padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
        boxSizing: 'border-box',
        backgroundColor: palette.primary.main,
        [breakpoints.down('sm')]: {
            height: '95%',
            width: '95%',
            margin: '0 auto',
            display: 'flex',
            padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
            boxSizing: 'border-box',
            backgroundColor: '#313131',
        }

    },
    mainWrapper: {
        border: '1px solid white',
        backgroundColor: palette.primary.dark,
        height: '100%',
        boxSizing: 'border-box',
        [breakpoints.down('sm')]: {
            height: '45%',
        }
    },
    main: {
        height: '98%',
        display: 'flex',
        padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
        margin:  'calc(.625rem - 1px) calc(1rem - 1px)',
        boxSizing: 'border-box',
        backgroundColor: palette.primary.dark,
        [breakpoints.down('sm')]: {
            height: '95%',
            width: '95%',
            margin: '0 auto',
            display: 'flex',
            padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
            boxSizing: 'border-box',
            backgroundColor: '#313131',
        }
    },
    activitiesWrapper: {
        border: '1px solid white',
        backgroundColor: palette.primary.dark,
        height: '100%',
        boxSizing: 'border-box',
        [breakpoints.down('sm')]: {
            height: '45%',
        }
    },
    activities: {
        height: '98%',
        display: 'flex',
        padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
        margin: 'calc(.625rem - 1px) calc(1rem - 1px)',
        boxSizing: 'border-box',
        backgroundColor: palette.primary.dark,
        [breakpoints.down('sm')]: {
            height: '95%',
            width: '95%',
            margin: '0 auto',
            display: 'flex',
            padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
            boxSizing: 'border-box',
            backgroundColor: '#313131',
        }

    }

}))

interface DashboardScreenProps {

}

 const DashboardScreen: React.FC<DashboardScreenProps> = ({}) => {

    const classes = useStyles();
        return (
                <Grid container className={classes.adminDashboardWrapper}>
                    <Grid item sm={12} md={2} className={classes.drawerPanelWrapper}>
                        <Paper elevation={20} className={classes.drawerPanel}>
                            <Drawer />
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={6} className={classes.mainWrapper}>
                        <Paper elevation={20} className={classes.main}>

                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={4} className={classes.activitiesWrapper}>
                        <Paper elevation={20} className={classes.activities}>
                
                        </Paper>
                    </Grid>
                </Grid>
        );
}

export default DashboardScreen