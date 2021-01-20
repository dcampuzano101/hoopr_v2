import React from 'react'
import { Typography, IconButton } from '@material-ui/core'
import { Send, Settings, SettingsApplications, SportsBasketball, ShoppingBasket, CardMembership } from "@material-ui/icons";
import { makeStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles(({ palette }: Theme) => ({
    drawerWrap: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '5% 10%',
    },
    header: {

    },
    navWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    otherWrapper: {

    },
    navOtherWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '80%',
        boxSizing: 'border-box',
        justifyContent: 'space-around'
    }
}))

interface DrawerProps {

}

 const Drawer: React.FC<DrawerProps> = ({}) => {
        const classes = useStyles();
        return (
            <div className={classes.drawerWrap}>
                <div className={classes.header}>
                    <Typography variant="h1">Admin</Typography>
                </div>
                <div className={classes.navOtherWrapper}>    
                    <nav className={classes.navWrapper}>
                        <Typography variant="h3">Tools</Typography>
                        <div style={{ display: 'flex'}}>
                            <IconButton aria-label="edit">
                                <SportsBasketball htmlColor={"#77bfed"}/>
                                <Typography variant="body2">Runs</Typography>
                            </IconButton>
                        </div>
                        <div style={{ display: 'flex'}}>
                            <IconButton aria-label="edit">
                            <CardMembership htmlColor={"#77bfed"}/>
                                <Typography variant="body2">Users</Typography>
                            </IconButton>
                        </div>
                        <div style={{ display: 'flex'}}>
                            <IconButton aria-label="edit">
                            <ShoppingBasket htmlColor={"#77bfed"}/>
                                <Typography variant="body2">Orders</Typography>
                            </IconButton>
                        </div>
                    </nav>
                    <div className={classes.otherWrapper}>
                        <Typography variant="h3">Other</Typography>
                        <div style={{ display: 'flex'}}>
                            <IconButton
                                    aria-label="edit"
                                >
                                    <Send htmlColor={"#77bfed"}/>
                                    <Typography variant="body2">Messages</Typography>
                            </IconButton>
                        </div>
                        <div style={{ display: 'flex'}}>
                            <IconButton
                                aria-label="edit"
                            >
                                <SettingsApplications htmlColor={"#77bfed"}/>
                                <Typography variant="body2">Settings</Typography>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Drawer