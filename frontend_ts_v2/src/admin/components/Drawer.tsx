import React from 'react'
import { Typography, IconButton } from '@material-ui/core'
import { Send, Settings, SettingsApplications, SportsBasketball, ShoppingBasket, CardMembership } from "@material-ui/icons";
import { makeStyles, Theme } from '@material-ui/core/styles'
import { withRouter } from "react-router-dom";




const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
    drawerWrap: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    header: {

    },
    navWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',

    },
    otherWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',

    },
    navOtherWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        justifyContent: 'space-around',
        alignItems: 'center',
        [breakpoints.down('sm')]: {
            flexDirection: 'row',
        }


    },
    button: {
        width: '100%',
        margin: '2% 0',
        borderRadius: '3px',
        display: 'flex',
        justifyContent: 'flex-start',
        '& span svg': {
            marginRight: '15%'
        },
        '&:hover': {
            backgroundColor: palette.secondary.main,
            color: palette.primary.main,
            '& p': {
                color: palette.primary.main
            }
        },
    },
}))

interface DrawerProps {
    history?: any
}

 const Drawer: React.FC<DrawerProps> = ({ history }) => {
        const classes = useStyles();
        return (
            <div className={classes.drawerWrap}>
                <div className={classes.header}>
                    <Typography variant="h1">hoopr.io</Typography>
                </div>
                <div className={classes.navOtherWrapper}>    
                    <nav className={classes.navWrapper}>
                        <Typography variant="h3">Tools</Typography>
                        <div>
                            <IconButton className={classes.button}
                                onClick={() => {
                                    history.push(`/admin/runs`);
                                  }}    
                            >
                                <SportsBasketball fontSize="small"/>
                                <Typography variant="body2">Runs</Typography>
                            </IconButton>
                        </div>
                        <div>
                            <IconButton className={classes.button}
                                onClick={() => {
                                    history.push(`/admin/users`);
                                  }}
                            >
                            <CardMembership fontSize="small"/>
                                <Typography variant="body2">Users</Typography>
                            </IconButton>
                        </div>
                        <div>
                            <IconButton  className={classes.button}
                                onClick={() => {
                                    history.push(`/admin/orders`);
                                  }}
                            >
                            <ShoppingBasket fontSize="small"/>
                                <Typography variant="body2">Orders</Typography>
                            </IconButton>
                        </div>
                    </nav>
                    <div className={classes.otherWrapper}>
                        <Typography variant="h3">Other</Typography>
                        <div>
                            <IconButton className={classes.button}
                                onClick={() => {
                                    history.push(`/admin/messages`);
                                  }}
                            >
                                    <Send fontSize="small"/>
                                    <Typography variant="body2" >Messages</Typography>
                            </IconButton>
                        </div>
                        <div>
                            <IconButton className={classes.button}
                                onClick={() => {
                                    history.push(`/admin/settings`);
                                  }}
                            >
                                <SettingsApplications fontSize="small"/>
                                <Typography variant="body2" >Settings</Typography>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default withRouter(Drawer)