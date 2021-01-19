import React, { useState, useRef } from 'react'
import { Typography, Paper, Button, Card, Grid } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

interface Option {
  path?: string | any | undefined
  title?: string
  subTitle?: string
  heading?: string
  subLinks?: string[]
}
// mobileOptions vs regularOptions declare different types

interface DropdownProps {
  options: Option[]
  name?: string
  mobile?: boolean
  open?: boolean
  isOpen?: boolean
  onChange?: any
  // setIsOpen?: React.Dispatch<React.SetStateAction<boolean>> | undefined
}

const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
  dropdownWrapper: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    },
    position: 'absolute',
    width: '15%'
  },
  optionsWrapperLarge: {
    position: 'absolute',
    display: 'none',
    top: '45px',
    left: '5px',
    flexDirection: 'column',
    width: 'max-content',
    border: '1px solid black',
    padding: '5% 0'
  },
  optionsWrapperMobile: {
    top: '80px',
    left: '-1px',
    width: '100%',
    // height: '100%',
    display: 'none',
    padding: '5% 0',
    position: 'absolute',
    flexDirection: 'column',
    zIndex: 5,
    [breakpoints.down('sm')]: {
      height: '85%',
      justifyContent: 'space-evenly'
    },
  },
  show: {
    display: 'flex',
    borderRadius: '3px',
    width: '102%',
  },
  optionWrap: {
    padding: '2% 10%',
    '&:hover': {
      backgroundColor: palette.primary.dark,
      cursor: 'pointer'
    },
    // '&:first-child': {
    //   marginTop: '5%'
    // },
    // '&:last-child': {
    //   marginBottom: '5%'
    // }
  },
  optionWrapMobile: {
    padding: '0% 10%',
    '&:hover': {
      backgroundColor: palette.primary.light
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      width: '60%',
      margin: '0 auto'
    },
  },
  dropdownStyle: {
    padding: 'calc(.625rem - 1px) calc(1rem - 1px)',
    display: 'flex',
    alignItems: 'center'
  },

  dropdownUp: {
    top: 'calc(-.5rem + 3.09rem)',
    left: '2.3rem',
    width: '8px',
    height: '8px',
    position: 'absolute',
    transform: 'rotate(225deg)',
    borderBottom: '1px solid black',
    borderRight: '1px solid black',
    zIndex: 1000,
    backgroundColor: 'white'
  },
  mobileButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      padding: '5%',
      margin: '5%'
    }
  },
  button: {
    backgroundColor: '#2276fc',
    width: '100%',
    margin: '0 5%',

    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#1e63d0',
      cursor: 'pointer'
    }
  }
}))

//largeOptions: { path:<string>, title:<string>, subTitle:<string>}
//mobileOptions: { heading:<string>, subLinks:String[]}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  name,
  mobile,
  open,
  isOpen,
  onChange
}) => {
  const classes = useStyles()

  const handleChange = (value: boolean) => onChange(value)

  const displaySubLinks = (subLinks: string[] | undefined) => {
    return (
      subLinks &&
      subLinks.map((link: string | undefined) => (
        <Link
          to={`/${link?.toLowerCase()}`}
          style={{ textDecoration: 'none', color: '#2c2f48', padding: '1% 0' }}
        >
          <Typography variant="subtitle1" style={{ fontSize: '1.1rem' }}>
            {link}
          </Typography>
        </Link>
      ))
    )
  }

  return (
    <>
      {mobile && open ? (
        <Card
          // raised={true}
          className={`${classes.optionsWrapperMobile} ${
            mobile ? classes.show : ''
          }`}
        >
          {options.map((option, idx) => (
            <div key={idx} className={classes.optionWrapMobile}>
              <Typography
                variant="body2"
                style={{
                  fontSize: '1.5rem',
                  color: '#b0bec5'
                }}
              >
                {option.heading}
              </Typography>
              {displaySubLinks(option.subLinks)}
            </div>
          ))}
          <div className={classes.mobileButtonWrapper}>
            <Button href="/get-started" className={classes.button}>
              <Typography
                variant="body2"
                style={{ color: '#fafafa', textTransform: 'none' }}
              >
                Get started
              </Typography>
            </Button>
            <Button href="/login" className={classes.button}>
              <Typography
                variant="body2"
                style={{ color: '#fafafa', textTransform: 'none' }}
              >
                Log in
              </Typography>
            </Button>
          </div>
        </Card>
      ) : (
        <div
          className={classes.dropdownWrapper}
          onMouseEnter={() => handleChange(true)}
          onMouseLeave={() => handleChange(false)}
        >
          <div
            className={classes.dropdownUp}
            style={{ display: isOpen ? 'block' : 'none' }}
          ></div>
          <Card
            raised={true}
            className={`${classes.optionsWrapperLarge} ${
              isOpen ? classes.show : ''
            }`}
          >
            {options.map((option, idx) => (
              <div key={idx} className={classes.optionWrap}>
                <Link
                  to={option.path}
                  style={{ textDecoration: 'none', color: '#2c2f48' }}
                >
                  <Typography variant="body2" onClick={() => handleChange(false)}>{option.title}</Typography>
                  <Typography variant="subtitle1">{option.subTitle}</Typography>
                </Link>
              </div>
            ))}
          </Card>
        </div>
      )}
    </>
  )
}

export default Dropdown
