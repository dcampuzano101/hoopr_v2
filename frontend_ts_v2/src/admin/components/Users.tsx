import React, { useState, useEffect } from 'react'
import { Grid, Paper, Card, Typography, TextField, InputAdornment } from '@material-ui/core'
import { Search, AccountCircle } from "@material-ui/icons";
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
        alignItems: 'center',
        padding: 'calc(.625rem)'
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
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        padding: 'calc(.625rem)',
        boxSizing: 'border-box',
        position: 'relative'
    },
    user: {
        display: 'grid',
        placeItems: 'center',
        border: '1px solid black',
      },

}))



interface UsersProps {

}



 const Users: React.FC<UsersProps> = ({}) => {
    const [filterQuery, setFilterQuery] = useState<string | undefined>();
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

    useEffect(() => {
      console.log(filterQuery)
    }, [filterQuery])
        return (
            <Grid container className={classes.mainInnerWrapper}>
                <Grid item xs={1} className={classes.mainHeaderWrapper}  style={{ border: '1px solid green'}}>
                        <Typography variant="h1" className={classes.componentHeader}>Users</Typography>
                        <Typography variant="h3">{users.length} Results</Typography>
                </Grid>
                <Grid item xs={9} className={classes.mainComponentWrapper} style={{ border: '1px solid blue'}}>
                    <Grid item xs={1} className={classes.filterTools}>
                      <TextField 
                        id="outlined-basic" 
                        label="Filter Users By Name" 
                        variant="outlined" 
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                          ),
                        }} 
                        onChange={(e) => setFilterQuery(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={11} className={classes.usersWrapper}>
                    <div className={classes.user}>1</div>
                <div className={classes.user}>2</div>
                <div className={classes.user}>3</div>
                <div className={classes.user}>4</div>
                <div className={classes.user}>5</div>
                <div className={classes.user}>6</div>
                <div className={classes.user}>7</div>
                <div className={classes.user}>8</div>
                    </Grid>
                </Grid>
                <Grid item  xs={2} className={classes.mainFooterWrapper} style={{ border: '1px solid red'}}>

                </Grid>
            </Grid>
        );
}

export default Users