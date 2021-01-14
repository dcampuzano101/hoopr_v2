import React from 'react'
import { Typography, Grid, Container } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Logo from './Logo'

const useStyles = makeStyles(({ palette }: Theme) => ({
  headerRoot: {
    border: `1px solid ${palette.secondary.main}`,
    zIndex: 100,
    height: '5em',
    display: 'flex',
    alignItems: 'center',
    padding: '0 3%',
    margin: '0 3%',
    width: 'auto'
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100%'
  },
  headerLogoWrapper: {
    borderRadius: '3px'
  }
}))

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const classes = useStyles()
  return (
    <>
      <Grid container className={classes.headerRoot}>
        <Grid item xs={2} md={2} lg={2}>
          <Logo logoText="Hoopr" />
        </Grid>
        <Grid item xs={10} md={10} lg={10}>
          <NavBar />
        </Grid>
      </Grid>
    </>
  )
}

export default Header

//style={{ marginRight: '5%' }}
