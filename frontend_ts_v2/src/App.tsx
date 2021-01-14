import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.dark
  }
}))

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const classes = useStyles()
  return (
    <Router>
      <Header />
      {/* <Typography className={classes.root} variant="body1">
        Hello Welcome to My TS React App
      </Typography> */}
    </Router>
  )
}

export default App
