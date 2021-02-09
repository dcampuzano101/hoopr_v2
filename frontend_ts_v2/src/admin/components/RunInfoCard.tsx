import React from 'react'
import {
  Paper,
  Card,
  Grid,
  Avatar,
  Typography,
  IconButton
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { ShoppingCart } from '@material-ui/icons'
import { Run } from './Runs'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openModal } from '../../actions/modalActions'
// import RunScreen from './RunScreen'

const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
  runWrapper: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    width: '50%',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      width: '100%',
      height: '50%'
    }
  },
  runInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    [breakpoints.down('xs')]: {
      padding: '0',
      height: 'auto',
      flexDirection: 'row'
    }
  },
  infoTag: {
    fontSize: '1.3rem',
    letterSpacing: '-1.5px',
    [breakpoints.down('xs')]: {
      fontSize: '1rem'
    }
  },
  infoDetail: {
    fontSize: '1rem',
    [breakpoints.down('xs')]: {
      fontSize: '.8rem'
    }
  },
  infoWrap: {
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      height: '20px'
    }
  },
  infoLine: {
    display: 'flex',
    width: '100%',
    paddingLeft: '25px',
    boxSizing: 'border-box'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center'
  },
  button: {
    width: '175px',
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
      border: '1px solid black',
      '& p': {
        color: palette.primary.main
      }
    },
    [breakpoints.down('xs')]: {
      width: '100%',
      height: '30px'
    }
  },
  buttonText: {
    fontSize: '1rem',
    [breakpoints.down('xs')]: {
      fontSize: '.8rem'
    }
  },
  infoLineWrapper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%'
  }
}))

interface RunCardProps {
  run: Run
}

const RunInfoCard: React.FC<RunCardProps> = ({ run }) => {
  const classes = useStyles()
  const history = useHistory()
  // const dispatch = useDispatch();
  return (
    <Grid container className={classes.runWrapper} onClick={() => {
      // dispatch(openModal('RunScreen'))
      history.push(`/admin/runs/${run._id}/`, { modal: true })
    }}>
      <Grid container className={classes.runInfoWrapper}>
        <Grid item xs={12} md={12} className={classes.infoLineWrapper}>
          <div className={classes.infoLine}>
            <Grid item xs={4} md={3} className={classes.infoWrap}>
              <Typography variant="h1" className={classes.infoTag}>
                location:
              </Typography>
            </Grid>
            <Grid item xs={8} md={9} className={classes.infoWrap}>
              <Typography variant="h3" className={classes.infoDetail}>
                {run.location}
              </Typography>
            </Grid>
          </div>
          <div className={classes.infoLine}>
            <Grid item xs={4} md={3} className={classes.infoWrap}>
              <Typography variant="h1" className={classes.infoTag}>
                date:
              </Typography>
            </Grid>
            <Grid item xs={8} md={9} className={classes.infoWrap}>
              <Typography variant="h3" className={classes.infoDetail}>
                {run.date}
              </Typography>
            </Grid>
          </div>
          <div className={classes.infoLine}>
            <Grid item xs={4} md={3} className={classes.infoWrap}>
              <Typography variant="h1" className={classes.infoTag}>
                price:
              </Typography>
            </Grid>
            <Grid item xs={8} md={9} className={classes.infoWrap}>
              <Typography variant="h3" className={classes.infoDetail}>
                ${run.price}
              </Typography>
            </Grid>
          </div>
          <div className={classes.infoLine}>
            <Grid item xs={4} md={3} className={classes.infoWrap}>
              <Typography variant="h1" className={classes.infoTag}>
                spots:
              </Typography>
            </Grid>
            <Grid item xs={8} md={9} className={classes.infoWrap}>
              <Typography variant="h3" className={classes.infoDetail}>
                {run.users.length}/{run.capacity}
              </Typography>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={7} md={12} className={classes.buttonWrapper}>
          <IconButton className={classes.button}>
            <ShoppingCart fontSize="small" />
            <Typography variant="h3" className={classes.buttonText}>
              ADD TO CART
            </Typography>
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RunInfoCard
