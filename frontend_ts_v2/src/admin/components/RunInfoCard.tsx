import React from 'react'
import { Paper, Card, Grid, Avatar, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
// import userAvatar from '../../assets/images/user-avatar.png'

const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
  runInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    position: 'relative',
    justifyContent: 'center',
    width: '50%'
  },
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
    <div className={classes.runInfoWrapper}>
      <Typography variant="h1">{run.name}</Typography>
      <Typography variant="h1">{run.location}</Typography>
      <Typography variant="h1">{run.date}</Typography>
      <Typography variant="h1">{run.price}</Typography>
      <Typography variant="h1">
        {run.users.length} / {run.capacity}
      </Typography>
    </div>
  )
}

export default RunInfoCard
