import React from 'react'
import { Grid, useMediaQuery } from '@material-ui/core'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Runs from './admin/components/Runs'
import Orders from './admin/components/Orders'
import Users from './admin/components/Users'
import Drawer from './admin/components/Drawer'
import Modal from './admin/components/Modal'
import RunScreen from './admin/components/RunScreen'

const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: palette.secondary.light
  },
  body: {
    height: '100vh'
  },
  adminDashboardWrapper: {
    height: '100%',
    padding: 'calc(.625rem - -10px)',
    display: 'flex',
    [breakpoints.down('sm')]: {
      display: 'flex',
      padding: '0',
      height: 'auto'
    }
  },
  drawerPanelWrapper: {
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    height: '100%',
    [breakpoints.down('sm')]: {
      padding: 'calc(.625rem - -10px)',
      width: '100%',
      borderBottom: '1px solid rgba(0, 0, 0, 0.34)',
      boxShadow: '0 6px 3px -6px black',
      height: '65px'
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
    boxSizing: 'border-box'
  },
  mainWrapper: {
    boxSizing: 'border-box',
    height: '100%',
    overflow: 'hidden',
    padding: 'calc(.625rem - -3px) calc(.625rem - -25px)',
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
      display: 'flex',
      padding: 'calc(.625rem - -10px)',
      boxSizing: 'border-box',
      height: '89%'
    }
  },
  main: {
    boxSizing: 'border-box',
    height: '100%',
    [breakpoints.down('sm')]: {}
  },
  verticalDivider: {
    height: '100%',
    border: '1px solid rgba(0, 0, 0, 0.8)'
  }
}))

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const classes = useStyles()
  return (
    <Router>
      <main className={classes.body}>
        <Grid container spacing={0} className={classes.adminDashboardWrapper}>
          <Grid item xs={12} md={2} className={classes.drawerPanelWrapper}>
            <Drawer />
            {!isMobile ? <div className={classes.verticalDivider}></div> : null}
          </Grid>

          <Grid item xs={12} md={10} className={classes.mainWrapper}>
            <Switch>
              <Route path="/admin/runs" exact component={Runs} />
              <Route path="/admin/orders" component={Orders} />
              <Route path="/admin/users" exact component={Users} />
              <Route
                path="/admin/runs/:id?"
                render={(props) => <Modal Component={RunScreen} />}
                exact
              />
            </Switch>
          </Grid>
        </Grid>
      </main>
    </Router>
  )
}

export default App
