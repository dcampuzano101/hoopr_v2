import React, { useState } from 'react'
import { Grid, Paper, Card, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles(({ palette }: Theme) => ({
    mainInnerWrapper: {
        border: '1px solid black',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    mainHeaderWrapper: {
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainComponentWrapper: {
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    mainFooterWrapper: {
        maxWidth: '100%',
        display: 'flex'
    },
    componentHeader: {
        textTransform: 'none',
        fontSize: 'calc(1rem + 1.5vw)'
    },
    headerWrapper: {

    },
    filterTools: {
        maxWidth: '100%',
        border: '1px solid yellow',
        padding: 'calc(.625rem)',
    },
    usersWrapper: {
        maxWidth: '100%',
        border: '1px solid purple',
        padding: 'calc(.625rem - -10px)',
    }

}))



interface UsersProps {

}



 const Users: React.FC<UsersProps> = ({}) => {
     const classes = useStyles();
     const users = [
        {
          username: "merkyoass",
          email: "dcampuzano101@gmail.com",
        //   password: bcrypt.hashSync("Zeu$1987", 10),
          waitList: [],
          isAdmin: true,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/fallback.jpg",
          orders: {},
        },
        {
          username: "ana furman",
          email: "munya1386@gmail.com",
        //   password: bcrypt.hashSync("binx1986", 10),
          waitList: [],
          isAdmin: true,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/ana.jpg",
          orders: {},
        },
        {
          username: "Chris Carr",
          email: "chris@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/chris.jpg",
          orders: {},
        },
        {
          username: "Danan Capote",
          email: "danan@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/danan.jpg",
          orders: {},
        },
        {
          username: "Darko Lukacevic",
          email: "darko@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/darko.jpg",
          orders: {},
        },
        {
          username: "Ellis Chang",
          email: "ellis@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/ellis.jpg",
          orders: {},
        },
        {
          username: "Jared Schutz",
          email: "jared@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/jared.jpg",
          orders: {},
        },
        {
          username: "Jason Caps",
          email: "jason@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/jason.jpg",
          orders: {},
        },
        {
          username: "Jon Moreno",
          email: "jon@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/jonathan.jpg",
          orders: {},
        },
        {
          username: "Jone Wong",
          email: "jone@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/jone.jpg",
          orders: {},
        },
        {
          username: "Kareem Hartl",
          email: "kareem@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/kareem.jpg",
          orders: {},
        },
        {
          username: "Danny Kegel",
          email: "danny@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/danny.jpg",
          orders: {},
        },
        {
          username: "Kenny L",
          email: "kenny@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/kenny.jpg",
          orders: {},
        },
        {
          username: "Lowg Racho",
          email: "lowg@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/lowg.jpg",
          orders: {},
        },
        {
          username: "Kevin Mersch",
          email: "kevin@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/kevin.jpg",
          orders: {},
        },
        {
          username: "Mike Yen",
          email: "mike@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/mike.jpg",
          orders: {},
        },
        {
          username: "Radu Negu",
          email: "radu@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/radu.jpg",
          orders: {},
        },
        {
          username: "Mike C",
          email: "mikec@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/mikec.jpg",
          orders: {},
        },
        {
          username: "Simon Leong",
          email: "simon@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/simon.jpg",
          orders: {},
        },
        {
          username: "Steve Song",
          email: "steve@gmail.com",
        //   password: bcrypt.hashSync("123456", 10),
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/steve.jpg",
          orders: {},
        },
      ];
        return (
            <Grid container className={classes.mainInnerWrapper}>
                <Grid item xs={1} className={classes.mainHeaderWrapper}  style={{ border: '1px solid green'}}>
                        <Typography variant="h1" className={classes.componentHeader}>Users</Typography>
                        <Typography variant="h3">{users.length} Results</Typography>
                </Grid>
                <Grid item xs={9} className={classes.mainComponentWrapper} style={{ border: '1px solid blue'}}>
                    <Grid item xs={1} className={classes.filterTools}>

                    </Grid>
                    <Grid item xs={11} className={classes.usersWrapper}>
                        
                    </Grid>
                </Grid>
                <Grid item  xs={2} className={classes.mainFooterWrapper} style={{ border: '1px solid red'}}>

                </Grid>
            </Grid>
        );
}

export default Users