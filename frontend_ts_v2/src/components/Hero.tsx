import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import heroImg from '../assets/images/basketball_illustration_1.jpg'

const useStyles = makeStyles(({ palette, breakpoints, typography }: Theme) => ({
  heroWrapper: {
    maxWidth: '820px',
    border: '1px solid black',
    margin: '0 auto',
    height: '75%'
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
