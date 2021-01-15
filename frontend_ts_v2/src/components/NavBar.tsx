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
  },
  linkStyle: {
    textDecoration: 'none',
    // padding: '0 5%',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: palette.primary.dark,
      cursor: 'pointer'
    },
    borderRadius: '3px',
    padding: 'calc(.625rem - 1px) calc(1rem - 1px)'
  },
  button: {
    backgroundColor: '#2276fc',
    marginLeft: '20px',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#1e63d0',
      cursor: 'pointer'
    }
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
        <Link to="/pricing" className={classes.linkStyle}>
          <Typography variant="body2">Pricing</Typography>
        </Link>
        <Link to="/blog" className={classes.linkStyle}>
          <Typography variant="body2">Blog</Typography>
        </Link>
      </Grid>
      <Grid item xs={10} className={classes.secondaryLinks}>
        <Link to="/contact" className={classes.linkStyle}>
          <Typography variant="body2">Contact</Typography>
        </Link>
        <Link to="/login" className={classes.linkStyle}>
          <Typography variant="body2">Log in</Typography>
        </Link>
        <Button href="/get-started" className={classes.button}>
          <Typography
            variant="body2"
            style={{ color: '#fafafa', textTransform: 'none' }}
          >
            Get started
          </Typography>
        </Button>
      </Grid>
    </nav>
  )
}

export default NavBar
