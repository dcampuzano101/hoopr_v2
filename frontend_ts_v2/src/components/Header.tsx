import React, { useState } from 'react'
import { Grid, useMediaQuery, Card } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import NavBar from './NavBar'
import { useTheme } from '@material-ui/core/styles'
import Dropdown from './Dropdown'
import { Menu } from '@material-ui/icons'

import Logo from './Logo'

const useStyles = makeStyles(({ palette }: Theme) => ({
  headerRoot: {
    height: '6em',
    display: 'flex',
    alignItems: 'center',
    padding: '0 3%',
    margin: '0 3%',
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
const mobileDropdownOptions = [
  {
    heading: 'Platform',
    subLinks: ['How it works', 'Demo', 'Pricing', 'FAQ']
  },
  {
    heading: 'Resources',
    subLinks: ['Community', 'Guides', 'Testimonials', 'Blog']
  }
]

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const classes = useStyles()
  return (
    <Card style={{ borderRadius: '0px' }}  elevation={0}>
      <Grid container className={classes.headerRoot}>
        <Grid item xs={2} md={2} lg={2}>
          <Logo logoText="Hoopr" />
        </Grid>

        {isMobile ? (
          <Grid
            item
            xs={10}
            md={10}
            lg={10}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Menu style={{ paddingRight: '3%', marginRight: '3%'}} onClick={() => setIsMenuOpen((prevState) => !prevState)} />
            {isMenuOpen ? (
              <Dropdown
                mobile={true}
                options={mobileDropdownOptions}
                open={isMenuOpen}
              />
            ) : null}
          </Grid>
        ) : (
          <Grid item xs={10} md={10} lg={10}>
            <NavBar />
          </Grid>
        )}
      </Grid>
    </Card>
  )
}

export default Header
