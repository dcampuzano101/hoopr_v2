import React, { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  Typography,
  TextField,
  InputAdornment
} from '@material-ui/core'
import { Search, SportsBasketball } from '@material-ui/icons'
import { makeStyles, Theme } from '@material-ui/core/styles'
import UserCard from './UserCard'
import { listUsers } from '../../actions/userActions'
import { UserListState } from '../../reducers/userReducers'
import { useSelector, useDispatch } from 'react-redux'
import Fuse from 'fuse.js'

const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
  mainInnerWrapper: {
    height: '100%'
  },
  mainHeaderWrapper: {
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    height: '7%',
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

export interface User {
  createdAt: string
  email: string
  isAdmin: boolean
  profilePhoto: string
  runs: []
  updatedAt: string
  username: string
  waitList: [] | undefined
  __v: number
  _id: string
  orders: []
  map: any
}

interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const [filterQuery, setFilterQuery] = useState<string | any>('')
  const [page, setPage] = useState<any>(2)
  const [limit, setLimit] = useState<any>(4)
  const classes = useStyles()
  const dispatch = useDispatch()

  let userList =
    (useSelector((state: UserListState) => state.userList.users) as User) || {}

  const fuse = new Fuse(Object.values(userList), {
    keys: ['username']
  })

  const results = fuse.search(filterQuery)

  const userResults = filterQuery
    ? results.map((user) => user.item)
    : Object.values(userList)

  useEffect(() => {
    dispatch(listUsers(page, limit))
  }, [page, limit, dispatch])
  console.log(userResults)
  console.log(Object.values(userList))
  return (
    <>
      {userResults && Object.values(userList).length > 0 ? (
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
                onChange={(e) => setFilterQuery(e.target.value)}
              />
              <Typography variant="h1" className={classes.filterResults}>
                {userList
                  ? Object.values(userList).length
                    ? Object.values(userList).length
                    : 0
                  : null}{' '}
                Results
              </Typography>
            </Grid>
            <Grid item xs={12} spacing={3} className={classes.usersWrapper}>
              <div className={classes.cardWrapper}>
                {userResults.map((user: User | any, idx: number) => (
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
