import React, { useState, useEffect } from 'react'
import {
  Grid,
  Paper,
  Card,
  Typography,
  TextField,
  InputAdornment
} from '@material-ui/core'
import { Search, SportsBasketball } from '@material-ui/icons'
import { makeStyles, Theme } from '@material-ui/core/styles'
import UserCard from './UserCard'
import { listUsers } from '../../actions/userActions'
import { userListState } from '../../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

interface Result {
  result: []
}
const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
  mainInnerWrapper: {
    height: '100%'
  },
  mainHeaderWrapper: {
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    height: '7%',
    alignItems: 'center',
    padding: 'calc(.625rem)',
    [breakpoints.down('sm')]: {
      height: 'auto'
    }
  },
  mainComponentWrapper: {
    display: 'flex',
    [breakpoints.down('sm')]: {
      display: 'block',
      height: '100%'
    },
    height: '95%',
    marginTop: '1%',
    minWidth: '100%'
  },
  mainFooterWrapper: {
    maxWidth: '100%',
    display: 'flex'
  },
  componentHeader: {
    textTransform: 'none',
    fontSize: 'calc(1rem + 1.5vw)',
    [breakpoints.down('sm')]: {
      letterSpacing: '-1.5px'
    }
  },
  headerWrapper: {},
  filterTools: {
    maxWidth: '100%',
    padding: 'calc(.625rem)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    height: '250px',
    width: '250px',
    backgroundColor: palette.primary.light,
    opacity: '95%',
    margin: 'calc(1.2rem) calc(1.2rem) calc(1.2rem) 0',
    [breakpoints.down('sm')]: {
      width: '250px',
      height: '250px',
      margin: '3%'
    },
    [breakpoints.down('xs')]: {
      width: '300px',
      height: '300px'
    }
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%'
  },
  userCardContainer: {
    position: 'relative',
    display: 'flex',
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
    // justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },
  filterResults: {
    marginRight: 'calc(1.7rem)',
    fontSize: '1.5rem',
    letterSpacing: '-1px',
    fontWeight: 400,
    [breakpoints.down('sm')]: {
      fontSize: '1rem'
    }
  },
  basketballIcon: {
    marginRight: 'calc(1.7rem)',
    fontSize: '2.5rem',
    opacity: '80%'
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
  const [page, setPage] = useState<any>(1)
  const [limit, setLimit] = useState<any>(4)
  // const { loading, error, users, hasMore } = useGetUsers(page, limit)
  const classes = useStyles()
  // const users = [
  //   {
  //     username: 'Chris Carr',
  //     email: 'chris@gmail.com',
  //     waitList: [],
  //     isAdmin: false,
  //     profilePhoto: 'https://hoopr2.s3.amazonaws.com/chris.jpg',
  //     orders: {}
  //   },
  //   {
  //     username: 'Danan Capote',
  //     email: 'danan@gmail.com',
  //     waitList: [],
  //     isAdmin: false,
  //     profilePhoto: 'https://hoopr2.s3.amazonaws.com/danan.jpg',
  //     orders: {}
  //   },
  //   {
  //     username: 'Darko Lukacevic',
  //     email: 'darko@gmail.com',
  //     waitList: [],
  //     isAdmin: false,
  //     profilePhoto: 'https://hoopr2.s3.amazonaws.com/darko.jpg',
  //     orders: {}
  //   },
  //   {
  //     username: 'Ellis Chang',
  //     email: 'ellis@gmail.com',
  //     waitList: [],
  //     isAdmin: false,
  //     profilePhoto: 'https://hoopr2.s3.amazonaws.com/ellis.jpg',
  //     orders: {}
  //   },
  //   {
  //     username: 'Jared Schutz',
  //     email: 'jared@gmail.com',
  //     waitList: [],
  //     isAdmin: false,
  //     profilePhoto: 'https://hoopr2.s3.amazonaws.com/jared.jpg',
  //     orders: {}
  //   },
  //   {
  //     username: 'Jason Caps',
  //     email: 'jason@gmail.com',
  //     waitList: [],
  //     isAdmin: false,
  //     profilePhoto: 'https://hoopr2.s3.amazonaws.com/jason.jpg',
  //     orders: {}
  //   },

  //   {
  //     username: 'Radu Negu',
  //     email: 'radu@gmail.com',
  //     waitList: [],
  //     isAdmin: false,
  //     profilePhoto: 'https://hoopr2.s3.amazonaws.com/radu.jpg',
  //     orders: {}
  //   },
  //   {
  //     username: 'Jone Wong',
  //     email: 'jone@gmail.com',
  //     waitList: [],
  //     isAdmin: false,
  //     profilePhoto: 'https://hoopr2.s3.amazonaws.com/jone.jpg',
  //     orders: {}
  //   }
  // ]
  const dispatch = useDispatch()
  const userList = useSelector((state: userListState) => state.users)
  const [users, setUsers] = useState<any | undefined | null>(userList)

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
    setUsers(filtered)
  }

  useEffect(() => {
    debugger
    dispatch(listUsers(page, limit))
    // setPage(page => page + 1)
  }, [users])
  return (
    <>
      {users ? (
        <Grid container className={classes.mainInnerWrapper}>
          <Grid item xs={12} className={classes.mainHeaderWrapper}>
            <Typography variant="h1" className={classes.componentHeader}>
              Users
            </Typography>
            <SportsBasketball className={classes.basketballIcon} />
          </Grid>
          <Grid container xs={12} className={classes.mainComponentWrapper}>
            <Grid item xs={12} className={classes.filterTools}>
              <TextField
                id="outlined-basic"
                label="Filter Users By Name"
                variant="outlined"
                style={{ height: '50px', width: '200px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
                onChange={(e) => handleFilter(e.target.value)}
              />
              <Typography variant="h1" className={classes.filterResults}>
                {users ? (users.length ? users.length : 0) : null} Results
              </Typography>
            </Grid>
            <Grid item xs={12} spacing={3} className={classes.usersWrapper}>
              <div className={classes.cardWrapper}>
                {users.map((user: User, idx: number) => (
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
      ) : null}
    </>
  )
}

export default Users
