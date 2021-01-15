import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import heroImg from '../assets/images/illustration-hero.png'

const useStyles = makeStyles(({ palette, breakpoints, typography }: Theme) => ({
  heroWrapper: {
    height: '100%',
    display: 'flex',
    padding: '0 10%',
    alignItems: 'center',
    background:
      'linear-gradient(to right, #556270, #4ECDC4)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },
  heroImg: {
    width: '50%'
  }
}))

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  const classes = useStyles()
  return (
    <div className={classes.heroWrapper}>
      <Typography variant="h2">
        hoopr.io
        <br />
        buckets for everyone.
      </Typography>
      <img src={heroImg} className={classes.heroImg}></img>
    </div>
  )
}

export default Hero
