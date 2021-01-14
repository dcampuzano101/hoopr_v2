import React, { useState } from 'react'
import { Typography, Grid, Container, Button } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'

const useStyles = makeStyles(({ palette }: Theme) => ({
  navBarRoot: {
    display: 'flex',
    borderRadius: '3px'
  },
  primaryLinks: {
    display: 'flex'
  },
  secondaryLinks: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

const dropdownOptions = [
  {
    path: '/demo',
    title: 'Demo',
    subTitle: 'Check out features'
  },
  {
    path: '/faq',
    title: 'FAQ',
    subTitle: 'Frequently asked questions'
  }
]

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const classes = useStyles()
  return (
    <nav className={classes.navBarRoot}>
      <Grid item xs={2} md={4} className={classes.primaryLinks}>
        <Dropdown name="Platform" options={dropdownOptions} />
        <Button>Link 2</Button>
        <Button>Link 3</Button>
      </Grid>
      <Grid item xs={10} className={classes.secondaryLinks}>
        <Button>Secondary Link 1</Button>
        <Button>Secondary Link 2</Button>
        <Button>Secondary Link 3</Button>
      </Grid>
    </nav>
  )
}

export default NavBar
