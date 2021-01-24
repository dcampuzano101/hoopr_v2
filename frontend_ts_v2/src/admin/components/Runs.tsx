import React, { useState, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Grid,
  Paper,
  Card,
  Typography,
  TextField,
  InputAdornment
} from '@material-ui/core'
import { Search, SportsBasketball } from '@material-ui/icons'
import RunCard from './RunCard'
import moment from 'moment'

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
  runsWrapper: {
    padding: '0 calc(.625rem)',
    flexBasis: 'none',
    width: '100%',
    height: '90%',
    maxWidth: 'none'
  },
  run: {
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

interface RunsProps {}

interface Run {
  name: string
  location: string
  date: any
  price: number
  capacity: number
  users: any
  waitList: any
  startTime: any
  endTime: any
  geoLocation: {}
}

const Runs: React.FC<RunsProps> = ({}) => {
  const classes = useStyles()
  const runs = [
    {
      name: 'Wednesday Morning Run',
      location: 'The Post',
      date: moment('01-11-2021', 'MM-DD-YYYY').format('LL'),
      price: 10,
      capacity: 15,
      users: [],
      waitList: [],
      startTime: moment('08:00', 'h:mm a'),
      endTime: moment('10:00', 'h:mm a'),
      geoLocation: {
        address: '100 Dobbin St, Brooklyn, NY 11222',
        lat: 40.7251514,
        lng: -73.9566612
      }
    },
    {
      name: 'Saturday Night Run',
      location: 'Cooper Park',
      date: moment('01-11-2021', 'MM-DD-YYYY').format('LL'),
      price: 10,
      capacity: 15,
      users: [],
      waitList: [],
      startTime: moment('18:00', 'h:mm a'),
      endTime: moment('20:00', 'h:mm a'),
      geoLocation: {
        address: 'Cooper Park, Brooklyn, NY 11211',
        lat: 40.715946,
        lng: -73.9383233
      }
    },
    {
      name: 'Sunday Morning Run',
      location: 'Grand Street Basketball Courts',
      date: moment('01-11-2021', 'MM-DD-YYYY').format('LL'),
      price: 10,
      capacity: 15,
      users: [],
      waitList: [],
      startTime: moment('08:00', 'h:mm a'),
      endTime: moment('10:00', 'h:mm a'),
      geoLocation: {
        address: 'Chrystie St &, Forsyth St, New York, NY 10002',
        lat: 40.7217448,
        lng: -73.9937312
      }
    },
    {
      name: 'Wednesday Night Run',
      location: 'The Post',
      date: moment('01-11-2021', 'MM-DD-YYYY').format('LL'),
      price: 10,
      capacity: 15,
      users: [],
      waitList: [1, 2, 3],
      startTime: moment('18:00', 'h:mm a'),
      endTime: moment('20:00', 'h:mm a'),
      geoLocation: {
        address: '100 Dobbin St, Brooklyn, NY 11222',
        lat: 40.7251514,
        lng: -73.9566612
      }
    }
  ]
  const [filterQuery, setFilterQuery] = useState<string | undefined>()
  const [runList, setRunList] = useState<any | undefined | null>(runs)

  const filterHelper = (query: string, run: Run) => {
    let endIndex = query.length - 1
    let start = 0
    let runName = run.name.toLowerCase()
    while (start < runName.length) {
      let possibleMatch = runName.slice(start, endIndex + 1)
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
    let runsCopy = [...runs]
    let filtered = runsCopy.filter((run, idx) => filterHelper(query, run))
    console.log(filtered)
    setRunList(filtered)
  }

  //   useEffect(() => {
  //     console.log(filterQuery)
  //     if (filterQuery?.length === 0) {
  //       setRunList(users)
  //     }
  //   }, [filterQuery])
  return (
    <Grid container className={classes.mainInnerWrapper}>
      <Grid item xs={12} className={classes.mainHeaderWrapper}>
        <Typography variant="h1" className={classes.componentHeader}>
          Runs
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
            {runList.length} Runs
          </Typography>
        </Grid>
        <Grid item xs={12} spacing={3} className={classes.runsWrapper}>
          <div className={classes.cardWrapper}>
            {runList.map((run: Run, idx: number) => (
              <Card elevation={3} key={idx} className={classes.run}>
                <RunCard run={run} />
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

export default Runs
