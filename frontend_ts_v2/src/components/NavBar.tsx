import React, { useState } from 'react'
import { Typography, Grid, Container, Button } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { ExpandMore } from '@material-ui/icons'
import Dropdown from './Dropdown'

const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
  navBarRoot: {
    display: 'flex',
    borderRadius: '3px'
  },
  dropdownWrapper: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
    // position: 'absolute'
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
  },
  categoryWrapper: {
    display: 'flex',
    height: '100%',
    alignItems: 'center'
  },
  linkWrapper: {
    width: '25%',
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      width: '100%',
      paddingRight: '3%',
      marginRight: '3%'
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

interface NavBarProps {
  blog?: boolean | undefined
  categories?: String[] | undefined
}


const NavBar: React.FC<NavBarProps> = ({ blog, categories = [] }) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleChange = (newValue: boolean) => {
    setIsOpen(newValue)
  }
  return (
    
    <>
      { blog ?
       <nav className={classes.categoryWrapper}>
         <div  className={classes.linkWrapper}>
        {categories.map((category, idx) => (
         <React.Fragment key={idx}>
            <Link
              to={`blog/?category=${category.toLowerCase()}`}
              style={{ textDecoration: 'none', color: '#2c2f48' }}
            >
              <Typography variant="body2">{category}</Typography>
            </Link>
        </React.Fragment>
      ))}
      </div>
        </nav>
      : 
      <nav className={classes.navBarRoot}>
      <Grid item xs={2} md={4} className={classes.primaryLinks}>
        <div
          className={classes.dropdownWrapper}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Typography variant="body2">Platform</Typography>
          <ExpandMore style={{ fontSize: '1.1rem' }} />
        </div>

        <Dropdown
          name="Platform"
          options={dropdownOptions}
          isOpen={isOpen}
          onChange={handleChange}
        />
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
    }
    </>
  )
}

export default NavBar
