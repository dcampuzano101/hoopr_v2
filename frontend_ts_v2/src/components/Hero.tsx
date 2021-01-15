import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(({ palette, breakpoints, typography }: Theme) => ({
  heroWrapper: {
    maxWidth: '820px',
    border: '1px solid black',
    margin: '0 auto',
    height: '75%'
  }
}))

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  const classes = useStyles()
  return (
    <div className={classes.heroWrapper}>
      <Typography variant="h2">
        hoopr.
        <br />
        buckets for everyone.
      </Typography>
    </div>
  )
}

export default Hero
