import React, { useState, useEffect } from 'react'
import { Grid, Paper, Card, Typography, TextField, InputAdornment } from '@material-ui/core'
import { Search, AccountCircle } from "@material-ui/icons";
import { makeStyles, Theme } from '@material-ui/core/styles'
import UserCard from './UserCard'
import { UserInfo } from 'os';

interface Result {
  result: []
}
const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
    mainInnerWrapper: {
        // border: '1px solid black',
        // display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    mainHeaderWrapper: {
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 'calc(.625rem)'
    },
    mainComponentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        [breakpoints.down('sm')]: {
          display: 'block'
        },
        margin: '0 auto',
        // minWidth: '100%',

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
      padding: 'calc(.625rem)',
        flexBasis: 'none',
        width: '100%',
        maxWidth: 'none',
        margin: '0 auto'
    },
    user: {
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        height: '100%',
        backgroundColor: palette.primary.light,
        opacity: '95%',
        maxWidth: '75%',

      },
      paginationWrapper: {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '100%'
      },
      userCardContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        top: '0',
        '&:hover': {
          cursor: 'pointer',
          transition: 'top .3s ease',
          top: '-.5rem'
        }
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

interface UsersProps {

}



 const Users: React.FC<UsersProps> = ({}) => {
    const [filterQuery, setFilterQuery] = useState<string | undefined>();
     const classes = useStyles();
     const users = [
        // {
        //   username: "Chris Carr",
        //   email: "chris@gmail.com",
        //   waitList: [],
        //   isAdmin: false,
        //   profilePhoto: "https://hoopr2.s3.amazonaws.com/chris.jpg",
        //   orders: {},
        // },
        {
          username: "Danan Capote",
          email: "danan@gmail.com",
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/danan.jpg",
          orders: {},
        },
        {
          username: "Darko Lukacevic",
          email: "darko@gmail.com",
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/darko.jpg",
          orders: {},
        },
        {
          username: "Ellis Chang",
          email: "ellis@gmail.com",
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/ellis.jpg",
          orders: {},
        },
        {
          username: "Jared Schutz",
          email: "jared@gmail.com",
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/jared.jpg",
          orders: {},
        },
        {
          username: "Jason Caps",
          email: "jason@gmail.com",
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/jason.jpg",
          orders: {},
        },
      
        {
          username: "Radu Negu",
          email: "radu@gmail.com",
          waitList: [],
          isAdmin: false,
          profilePhoto: "https://hoopr2.s3.amazonaws.com/radu.jpg",
          orders: {},
        },
      ];

    const [userList, setUserList] = useState<any | undefined | null>(users)

    const filterHelper = (query:string, user:User) => {
        let endIndex = query.length - 1;
        let start = 0;
        let userName = user.username.toLowerCase()
        while (start < userName.length) {
          let possibleMatch = userName.slice(start, endIndex + 1) 
          if (query === possibleMatch) {
            return true;
          }
          start++;
          endIndex++;
        }
        return false;
    }
    const handleFilter = (query:string) => {
      query = query.toLowerCase();
      let usersCopy = [...users];
      let filtered = usersCopy.filter((user, idx) => filterHelper(query, user))
      console.log(filtered);
      setUserList(filtered);

    }

    useEffect(() => {
      console.log(filterQuery);
      if (filterQuery?.length === 0) {
        setUserList(users);
      }
    }, [filterQuery])
        return (
            <Grid container className={classes.mainInnerWrapper}>
                <Grid item xs={1} className={classes.mainHeaderWrapper} >
                        <Typography variant="h1" className={classes.componentHeader}>Users</Typography>
                        <Typography variant="h3">{userList.length} Results</Typography>
                </Grid>
                <Grid item xs={10} className={classes.mainComponentWrapper} >
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
                    onChange={(e) => handleFilter(e.target.value)}
                  />
                </Grid>
                <Grid container xs={12} spacing={3} className={classes.usersWrapper}>
                    {userList.map((user: User, idx: number) => (
                      <Grid item xs={12}  sm={12} md={6} lg={4} className={classes.userCardContainer}>
                          <Card elevation={3} key={idx} className={classes.user}>
                            <UserCard user={user} />
                          </Card>
                      </Grid>
                    ))}
                </Grid>
                <Grid item xs={1} className={classes.paginationWrapper}>
                      {`<  *  >`}
                </Grid>
                </Grid>
            </Grid>
        );
}

export default Users
