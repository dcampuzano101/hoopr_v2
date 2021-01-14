import React from 'react'
import { Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles'
import { Menu } from '@material-ui/icons'

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
  },
  linkStyle: {
    textDecoration: 'none'
  },
  mobileLogo: {
    fontSize: '1.8rem',
    letterSpacing: '-1.8px'
  }
}))

interface LogoProps {
  logoText: string
}

const Logo: React.FC<LogoProps> = ({ logoText }) => {
  const theme = useTheme()
  const classes = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.headerLogoWrapper}>
        <Link to="/" className={classes.linkStyle}>
          <Typography
            variant="h1"
            className={`${isMobile ? classes.mobileLogo : ''}`}
          >
            {logoText}
          </Typography>
        </Link>
      </div>
    </div>
  )
}

export default Logo
