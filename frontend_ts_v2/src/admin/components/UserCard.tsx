import React from 'react'
import { Paper, Card, Grid, Avatar, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import userAvatar from '../../assets/images/user-avatar.png'

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
    cardFooter: {
        display: 'flex',
        maxWidth: '100%',
        flexDirection: 'column',
    },
    userCardWrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        padding: 'calc(.5rem)'
    },
    avatarWrapper: {
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        textAlign: 'center',
    },
    small: {
        width: spacing(3),
        height: spacing(3),
      },
      large: {
        width: spacing(7),
        height: spacing(7),
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
        const classes = useStyles();
        return (

            <div className={classes.userCardWrapper}>
                <div  className={classes.avatarWrapper}>
                    <img
                        src={user.profilePhoto ? user.profilePhoto : userAvatar}
                        alt="avatar"
                        style={{
                        width: "75%",
                        borderRadius: "90px",
                        marginBottom: "2px",
                        opacity: '85%'
                        }}
                    />
                </div>
                <div className={classes.cardFooter}>
                    <Typography variant="h3" style={{ fontSize: 'calc(.8em / 16 * 15)' }}>
                        {`username: ${user.username}`}
                    </Typography>
                    <Typography variant="h3" style={{ fontSize: 'calc(.8em / 16 * 15)'}}>
                    {`email: ${user.email}`}
                    </Typography>
                    <Typography variant="h3" style={{ fontSize: 'calc(.8em / 16 * 15)'}}>
                    {`isAdmin: ${user.isAdmin}`}
                    </Typography>
                </div>
                
            </div>
        );
}

export default UserCard