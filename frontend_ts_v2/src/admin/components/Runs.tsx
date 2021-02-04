import React, { useState, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Grid,
  // Paper,
  Card,
  Typography,
  TextField,
  InputAdornment
} from '@material-ui/core'
import { Search, SportsBasketball } from '@material-ui/icons'
import RunInfoCard from './RunInfoCard'
// import moment from 'moment'
import { RunListState } from '../../reducers/runReducers'
import { useDispatch, useSelector } from 'react-redux'
import { listRuns } from '../../actions/runActions'
import GoogleMap from './GoogleMap'


const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
  mainInnerWrapper: {
    height: '90%'
  },
  mainHeaderWrapper: {
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    // height: '7%',
    // alignItems: 'center',
    // padding: 'calc(.625rem)',
    [breakpoints.down('sm')]: {
      height: 'auto'
    }
  },
  mainComponentWrapper: {
    display: 'flex',
    overflow: 'auto',
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
    flexDirection: 'row',
    height: '300px',
    width: '100%',
    backgroundColor: palette.primary.light,
    opacity: '95%',
    margin: 'calc(1.2rem) 0',
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
    height: '100%',
    width: '100%',
    border: '1px solid black',
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

interface RunsProps { }

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
  geoLocation: {
    address: string
    lat: number
    lng: number
  }
}

const Runs: React.FC<RunsProps> = () => {
  const classes = useStyles()

  const [filterQuery, setFilterQuery] = useState<string | undefined>()
  const [page, setPage] = useState<any>(1)
  const [limit, setLimit] = useState<any>(4)


  const dispatch = useDispatch();
  const runList = useSelector((state: RunListState) => state.runList.runs) as Run || {}
  // const [runs, setRuns] = useState<any | undefined | null>(runList)

  useEffect(() => {
    dispatch(listRuns(page, limit))
  }, [dispatch, limit, page])
  console.log(runList)
  return (
    <>
      {runList ? (

        <Grid container className={classes.mainInnerWrapper}>
          <Grid item xs={12} className={classes.mainHeaderWrapper}>
            <Typography variant="h1" className={classes.componentHeader}>
              Runs
        </Typography>
            <SportsBasketball className={classes.basketballIcon} />
          </Grid>
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
              {Object.values(runList).length} Runs
          </Typography>
          </Grid>
          <Grid container xs={12} className={classes.mainComponentWrapper}>
            <Grid item xs={12} spacing={3} className={classes.runsWrapper}>
              <div className={classes.cardWrapper}>
                {Object.values(runList).map((run: Run, idx: number) => (
                  <Card elevation={3} key={idx} className={classes.run}>
                    <GoogleMap name={run.location} geoLocation={run.geoLocation} zoomLevel={15} />
                    <RunInfoCard run={run} />
                  </Card>
                ))}
              </div>
              {/* <Grid item xs={12} className={classes.paginationWrapper}>
                {`<  *  >`}
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </>
  )
}

export default Runs
