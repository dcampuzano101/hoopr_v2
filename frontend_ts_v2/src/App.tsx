import React from 'react'
import { Typography, Grid, Paper } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import BlogScreen from './screens/BlogScreen'
import DashboardScreen from './admin/screens/DashboardScreen'
import Runs from './admin/components/Runs'
import Orders from './admin/components/Orders'
import Users from './admin/components/Users'
import Drawer from './admin/components/Drawer'
import MainDashboard from './admin/components/MainDashboard'



const useStyles = makeStyles(({ palette, breakpoints}: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: palette.secondary.light,
    // backgroundColor: palette.primary.dark
  },
  body: {
    height: '100vh',
    // padding: '5%',
    // border: '1px solid green'
  },
  adminDashboardWrapper: {
    border: '1px solid black',
    // height: '100vh',
    padding: 'calc(.625rem - -10px)',
    [breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column'
    }
},
drawerPanelWrapper: {
    border: '1px solid black',
    // height: '100%',
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    padding: 'calc(.625rem - -10px)',
    [breakpoints.down('sm')]: {
        height: '10%',
    },
    '& h3': {
        fontSize: 'calc(1.1em / 16 * 15)',
        marginBottom: '5%'
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
    height: '100vh',
    boxSizing: 'border-box',
    padding: 'calc(.625rem - -3px) calc(.625rem - -25px)',
    [breakpoints.down('md')]: {
        height: '15%',
        padding: '0',
    }
},
main: {
    height: '100%',
    // display: 'flex',
    boxSizing: 'border-box',
    [breakpoints.down('sm')]: {
        // height: '95%',
        // width: '95%',
        // margin: '0 auto',
        // display: 'flex',
        // padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
        // boxSizing: 'border-box',
    }
},
activitiesWrapper: {
    border: '1px solid black',
    height: '100%',
    boxSizing: 'border-box',
    padding: 'calc(.625rem - -10px)',
    [breakpoints.down('sm')]: {
        height: '45%',
    }
},
activities: {
    height: '100%',
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

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const classes = useStyles()
  return (
    <Router>
      <main className={classes.body}>
        <Grid container spacing={0} className={classes.adminDashboardWrapper}>
          <Grid item xs={12} md={12}  lg={2}className={classes.drawerPanelWrapper}>
              <Paper elevation={0} className={classes.drawerPanel}>
                  <Drawer />
              </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={10} className={classes.mainWrapper}>
              <Paper elevation={0} className={classes.main}>
                      <Switch>
                        <Route path="/admin/runs" component={Runs} />
                        <Route path="/admin/orders" component={Orders} />
                        <Route path="/admin/users" component={Users} />        
                      </Switch> 
              </Paper>
          </Grid>
          {/* <Grid item sm={12} md={3} className={classes.activitiesWrapper}>
              <Paper elevation={0} className={classes.activities}>

              </Paper>
            </Grid> */}
        </Grid>
      </main>
    </Router>
  )
}

export default App


{/* <Route path="/" component={HomeScreen} exact />
<Route path="/blog" component={BlogScreen} /> */}
{/* <Route path="/admin" exact component={DashboardScreen} /> */}
{/* <Header /> */}