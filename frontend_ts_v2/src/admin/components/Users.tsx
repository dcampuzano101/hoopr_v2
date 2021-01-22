import React, { useState, useEffect } from 'react'
import {
  Grid,
  Paper,
  Card,
  Typography,
  TextField,
  InputAdornment
} from '@material-ui/core'
import { Search, AccountCircle } from '@material-ui/icons'
import { makeStyles, Theme } from '@material-ui/core/styles'
import UserCard from './UserCard'
import { UserInfo } from 'os'

interface Result {
  result: []
}
const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
  mainInnerWrapper: {
    border: '1px solid black',
    // display: 'flex',
    // flexDirection: 'column',
    height: '100%'
  },
  mainHeaderWrapper: {
    border: '1px solid black',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    height: '5%',
    padding: 'calc(.625rem)'
  },
  mainComponentWrapper: {
    border: '1px solid black',
    display: 'flex',
    [breakpoints.down('sm')]: {
      display: 'block'
    },
    height: '95%',
    marginTop: '1%',
    minWidth: '100%'
  },
  mainFooterWrapper: {
    border: '1px solid black',
    maxWidth: '100%',
    display: 'flex'
  },
  componentHeader: {
    textTransform: 'none',
    fontSize: 'calc(1rem + 1.5vw)'
  },
  headerWrapper: {},
  filterTools: {
    maxWidth: '100%',
    border: '1px solid yellow',
    padding: 'calc(.625rem)'
  },
  usersWrapper: {
    padding: '0 calc(.625rem)',
    flexBasis: 'none',
    width: '100%',
    height: '90%',
    maxWidth: 'none'
  },
  user: {
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
    height: '300px',
    width: '300px',
    backgroundColor: palette.primary.light,
    opacity: '95%'
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%'
  },
  userCardContainer: {
    position: 'relative',
    display: 'flex',
    // justifyContent: 'center',
    top: '0',
    '&:hover': {
      cursor: 'pointer',
      transition: 'top .3s ease',
      top: '-.5rem'
    }
  },
  cardWrapper: {
    display: 'inline-flex',
    height: '95%',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
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

interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const [filterQuery, setFilterQuery] = useState<string | undefined>()
  const classes = useStyles()
  const users = [
    {
      username: 'Chris Carr',
      email: 'chris@gmail.com',
      waitList: [],
      isAdmin: false,
      profilePhoto: 'https://hoopr2.s3.amazonaws.com/chris.jpg',
      orders: {}
    },
    {
      username: 'Danan Capote',
      email: 'danan@gmail.com',
      waitList: [],
      isAdmin: false,
      profilePhoto: 'https://hoopr2.s3.amazonaws.com/danan.jpg',
      orders: {}
    },
    {
      username: 'Darko Lukacevic',
      email: 'darko@gmail.com',
      waitList: [],
      isAdmin: false,
      profilePhoto: 'https://hoopr2.s3.amazonaws.com/darko.jpg',
      orders: {}
    },
    {
      username: 'Ellis Chang',
      email: 'ellis@gmail.com',
      waitList: [],
      isAdmin: false,
      profilePhoto: 'https://hoopr2.s3.amazonaws.com/ellis.jpg',
      orders: {}
    },
    {
      username: 'Jared Schutz',
      email: 'jared@gmail.com',
      waitList: [],
      isAdmin: false,
      profilePhoto: 'https://hoopr2.s3.amazonaws.com/jared.jpg',
      orders: {}
    },
    {
      username: 'Jason Caps',
      email: 'jason@gmail.com',
      waitList: [],
      isAdmin: false,
      profilePhoto: 'https://hoopr2.s3.amazonaws.com/jason.jpg',
      orders: {}
    },

    {
      username: 'Radu Negu',
      email: 'radu@gmail.com',
      waitList: [],
      isAdmin: false,
      profilePhoto: 'https://hoopr2.s3.amazonaws.com/radu.jpg',
      orders: {}
    },
    {
      username: 'Jone Wong',
      email: 'jone@gmail.com',
      waitList: [],
      isAdmin: false,
      profilePhoto: 'https://hoopr2.s3.amazonaws.com/jone.jpg',
      orders: {}
    }
  ]

  const [userList, setUserList] = useState<any | undefined | null>(users)

  const filterHelper = (query: string, user: User) => {
    let endIndex = query.length - 1
    let start = 0
    let userName = user.username.toLowerCase()
    while (start < userName.length) {
      let possibleMatch = userName.slice(start, endIndex + 1)
      if (query === possibleMatch) {
        return true
      }
      start++
      endIndex++
    }
    return false
  }
  const handleFilter = (query: string) => {
    query = query.toLowerCase()
    let usersCopy = [...users]
    let filtered = usersCopy.filter((user, idx) => filterHelper(query, user))
    console.log(filtered)
    setUserList(filtered)
  }

  useEffect(() => {
    console.log(filterQuery)
    if (filterQuery?.length === 0) {
      setUserList(users)
    }
  }, [filterQuery])
  return (
    <Grid container className={classes.mainInnerWrapper}>
      <Grid item xs={12} className={classes.mainHeaderWrapper}>
        <Typography variant="h1" className={classes.componentHeader}>
          Users
        </Typography>
        <Typography variant="h3">{userList.length} Results</Typography>
      </Grid>
      <Grid container xs={12} className={classes.mainComponentWrapper}>
        <Grid item xs={12} className={classes.filterTools}>
          <TextField
            id="outlined-basic"
            label="Filter Users By Name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            onChange={(e) => handleFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} spacing={3} className={classes.usersWrapper}>
          <div className={classes.cardWrapper}>
            {userList.map((user: User, idx: number) => (
              <Card elevation={3} key={idx} className={classes.user}>
                <UserCard user={user} />
              </Card>
            ))}
          </div>
          <Grid item xs={12} className={classes.paginationWrapper}>
            {`<  *  >`}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Users
