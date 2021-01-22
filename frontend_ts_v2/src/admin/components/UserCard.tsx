import React from 'react'
import { Paper, Card, Grid, Avatar, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import userAvatar from '../../assets/images/user-avatar.png'

const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
  cardFooter: {
    display: 'flex',
    flexDirection: 'column',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'baseline',
    padding: 'calc(.5rem)',
    backgroundColor: palette.primary.main,
    [breakpoints.down('sm')]: {
      height: '100%'
    }
  },
  userCardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    justifyContent: 'center'
    // [breakpoints.down('sm')]: {
    //     flexDirection: 'row',
    // }
    // padding: 'calc(.5rem)',
  },
  avatarWrapper: {
    textAlign: 'center',
    padding: 'calc(.5rem)',
    display: 'grid',
    placeItems: 'center',
    height: '50%'
    // [breakpoints.down('sm')]: {
    //     width: '50%',
    //     display: 'flex',
    //     justifyContent: 'flex-start',
    //     marginLeft: '15px',
    //     boxSizing: 'border-box',
    //     height: 'auto'
    // }
  },
  small: {
    width: spacing(3),
    height: spacing(3)
  },
  large: {
    width: spacing(7),
    height: spacing(7)
  }
}))

interface User {
  username: string
  email: string
  waitList: string[] | undefined
  isAdmin: boolean
  profilePhoto: string
  orders: {}
}

interface UserCardProps {
  user: User
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const classes = useStyles()
  return (
    <div className={classes.userCardWrapper}>
      <div className={classes.avatarWrapper}>
        <img
          src={user.profilePhoto ? user.profilePhoto : userAvatar}
          alt="avatar"
          style={{
            width: '50%',
            borderRadius: '50%',
            marginBottom: '2px',
            opacity: '85%'
          }}
        />
      </div>
      <div className={classes.cardFooter}>
        <Typography variant="h3" style={{ fontSize: 'calc(1em / 16 * 15)' }}>
          {`username: ${user.username}`}
        </Typography>
        <Typography variant="h3" style={{ fontSize: 'calc(1em / 16 * 15)' }}>
          {`email: ${user.email}`}
        </Typography>
        <Typography variant="h3" style={{ fontSize: 'calc(1em / 16 * 15)' }}>
          {`isAdmin: ${user.isAdmin}`}
        </Typography>
      </div>
    </div>
  )
}

export default UserCard
