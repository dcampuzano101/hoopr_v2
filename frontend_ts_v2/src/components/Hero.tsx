import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import heroImg from '../assets/images/illustration-hero.png'
import brooklynIllustration from '../assets/images/brooklyn_blush.svg'
import smallCityIllustration from '../assets/images/small_city_blush.svg'
import hangingOutIllustration from '../assets/images/hanging_out_blush.svg'
import happyPersonIllustration from '../assets/images/happy_person_blush.svg'




const useStyles = makeStyles(({ palette, breakpoints, typography }: Theme) => ({
  heroWrapper: {
    height: '100%',
    display: 'flex',
    padding: '0 10%',
    alignItems: 'center',
    [breakpoints.down('md')]: {
      // flexDirection: 'column',
      justifyContent: 'space-around',
      height: "90%"
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: "90%"
},

    background:
      'linear-gradient(to right, #556270, #4ECDC4)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },
  heroImg: {
    width: '50%',
    zIndex: 0,
    opacity: '90%',
    right: '0%',
    [breakpoints.down('md')]: {
      margin: '0% 0%',
      width: '100%'

    },
    [breakpoints.up('sm')]: {
      width: '60%',
      margin: '0% 0%'
    },
    // [breakpoints.down('sm')]: {
    //   width: '100%',
    //   margin: '10% 0%'
    // },
  },
  heroText: {
    width: '85%',
    zIndex: 1,
    fontWeight: 750,
    [breakpoints.down('md')]: {
      width: '65%',
      margin: '0% 0%'
    },
    // [breakpoints.up('sm')]: {
    //   width: '65%',
    //   margin: '0% 0%'
    // },
    [breakpoints.down('sm')]: {
      margin: '10% 0%'
    },
  }
}))

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  const classes = useStyles()
  return (
    <div className={classes.heroWrapper}>
      <Typography variant="h2" className={classes.heroText}>
        hoopr.io
        <br />
        buckets for everyone.
      </Typography>
      <img src={happyPersonIllustration} className={classes.heroImg}></img>
    </div>
  )
}

export default Hero
