import React from 'react'
import { Typography, Grid, Container } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: palette.secondary.light,
    backgroundColor: palette.primary.dark
  },
  headerRoot: {
    border: `1px solid ${palette.secondary.main}`,
    width: '100%',
    zIndex: 100,
    height: '5em'
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

interface LogoProps {
  logoText: string
}

const Logo: React.FC<LogoProps> = ({ logoText }) => {
  const classes = useStyles()
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.headerLogoWrapper}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h1">{logoText}</Typography>
        </Link>
      </div>
    </div>
  )
}

export default Logo
