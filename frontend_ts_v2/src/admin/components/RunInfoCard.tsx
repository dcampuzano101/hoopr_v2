import React from 'react'
import { Paper, Card, Grid, Avatar, Typography, IconButton } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  ShoppingBasket
} from '@material-ui/icons'
// import userAvatar from '../../assets/images/user-avatar.png'

const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
  runWrapper: {
    display: 'flex',
    // flexDirection: 'column',
    // boxSizing: 'border-box',
    position: 'relative',
    justifyContent: 'center',
    width: '50%',
    alignItems: 'center'
  },
  runInfoWrapper: {
    height: '80%',
    display: "flex",
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    // height: '80%'

  },
  infoTag: {
    fontSize: '1.5rem',
    letterSpacing: '-1.5px'
  },
  infoWrap: {
    height: '35px',
    display: 'flex',
    alignItems: 'center'
  },
  infoLine: {
    display: 'flex',
    width: '100%',
    paddingLeft: '25px'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    width: '35%',
    height: '45px',
    margin: '2% 0',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    color: palette.primary.main,
    '& span svg': {
      marginRight: '15%'
    },
    '&:hover': {
      color: palette.secondary.main,
      backgroundColor: palette.primary.main,
      '& p': {
        color: palette.primary.main
      }
    }
  },
  buttonText: {
    fontSize: '1rem'
  }
}))

interface Run {
  name: string
  location: string
  date: any
  price: number
  capacity: number
  users: []
  waitList: []
  startTime: any
  endTime: any
  geoLocation: {}
}

interface RunCardProps {
  run: Run
}

const RunInfoCard: React.FC<RunCardProps> = ({ run }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.runWrapper}>
      <div className={classes.runInfoWrapper}>

        <div className={classes.infoLine}>
          <Grid item xs={3} className={classes.infoWrap}><Typography variant="h1" className={classes.infoTag}  >location:</Typography></Grid> <Grid item xs={9} className={classes.infoWrap}><Typography variant="h3">{run.location}</Typography></Grid>
        </div>
        <div className={classes.infoLine}>

          <Grid item xs={3} className={classes.infoWrap}><Typography variant="h1" className={classes.infoTag}  >date:</Typography></Grid> <Grid item xs={9} className={classes.infoWrap}><Typography variant="h3">{run.date}</Typography></Grid>
        </div>
        <div className={classes.infoLine}>

          <Grid item xs={3} className={classes.infoWrap}><Typography variant="h1" className={classes.infoTag}  >price:</Typography></Grid> <Grid item xs={9} className={classes.infoWrap}><Typography variant="h3">${run.price}</Typography></Grid>
        </div>
        <div className={classes.infoLine}>

          <Grid item xs={3} className={classes.infoWrap}><Typography variant="h1" className={classes.infoTag}  >spots:</Typography></Grid> <Grid item xs={9} className={classes.infoWrap}><Typography variant="h3">{run.users.length}/{run.capacity}</Typography></Grid>
        </div>
        <div className={classes.buttonWrapper}>
          <IconButton
            className={classes.button}
          >
            <ShoppingBasket fontSize="small" />
            <Typography variant="h3" className={classes.buttonText}>ADD TO CART</Typography>
          </IconButton>
        </div>
      </div>
    </Grid>
  )
}

export default RunInfoCard
