import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.dark
  },
  main: {
    height: '100vh'
    // padding: '5%',
    // border: '1px solid green'
  }
}))

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const classes = useStyles()
  return (
    <Router>
      <main className={classes.main}>
        <Header />
        <Hero />
      </main>
    </Router>
  )
}

export default App
