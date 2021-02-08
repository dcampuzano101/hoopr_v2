import React, { useState, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Grid,
  // Paper,
  Card,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress
} from '@material-ui/core'
import { Search, SportsBasketball, FiberManualRecord } from '@material-ui/icons'
import RunInfoCard from './RunInfoCard'
// import moment from 'moment'
import { RunListState } from '../../reducers/runReducers'
import { useDispatch, useSelector } from 'react-redux'
import { listRuns } from '../../actions/runActions'
import GoogleMap from './GoogleMap'
import Fuse from 'fuse.js'
// @ts-ignore
import Observer from '@researchgate/react-intersection-observer';


const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
  mainInnerWrapper: {
    height: '100%'
  },
  mainHeaderWrapper: {
    padding: '0 calc(.625rem)',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      height: 'auto'
    }
  },
  mainComponentWrapper: {
    display: 'flex',
    overflow: 'auto',
    height: '80%',
    [breakpoints.down('sm')]: {
      display: 'block',
      height: '100%'
    },
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    },
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
      margin: '3%'
    },
    [breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column'
    },
    '&:first-child': {
      marginTop: '0',
    },
    '&:last-child': {
      marginTop: '0',
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
    fontSize: '2.5rem',
    opacity: '80%'
  },
  root: {
    '&$focused': {
      borderColor: 'orange'
    }
  },
  circularProgress: {
    color: palette.secondary.dark
  }
}))

interface RunsProps { }

export interface Run {
  _id: string
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
  const [filterQuery, setFilterQuery] = useState<string | any>('')
  const [runs, setRuns] = useState<Run[]>([])
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<any>(3)


  const dispatch = useDispatch();
  const next = useSelector((state: RunListState) => state.runList.next) || {
    page: null,
    limit: null
  }
  const previous = useSelector((state: RunListState) => state.runList.previous) || {}
  const loading = useSelector((state: RunListState) => state.runList.loading) || false

  const runList = useSelector((state: RunListState) => state.runList.runs) || []
  const fuse = new Fuse(runList, {
    keys: [
      'location',
      'date',
      'price',
      'name'
    ]
  })

  const results = fuse.search(filterQuery)

  const handlePageChange = (e: any) => {
    if (e.isIntersecting) {
      if (next.page !== null) {
        setPage(prevPage => prevPage + 1)
        dispatch(listRuns(next.page, limit))
      }
    }
  }

  const runResults = filterQuery ? results.map(user => user.item) : runList;
  useEffect(() => {
    dispatch(listRuns(page, limit))
  }, [])
  return (
    <>
      {runResults ? (
        <Grid container className={classes.mainInnerWrapper}>
          <Grid item xs={12} className={classes.mainHeaderWrapper}>
            <Typography variant="h1" className={classes.componentHeader}>
              Runs
        </Typography>
            <SportsBasketball className={classes.basketballIcon} />
          </Grid>
          <Grid item xs={12} className={classes.filterTools}>
            <TextField
              label="Filter Runs"
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
              {runResults.length} Runs
          </Typography>
          </Grid>


          <Grid container xs={12} className={classes.mainComponentWrapper}>
            <Grid item id="scrolling-container" xs={12} spacing={3} className={classes.runsWrapper}>
              <div className={classes.cardWrapper}>
                {runResults.map((run: Run, idx: number) => (
                  <Card elevation={3} key={idx} className={classes.run}>
                    <GoogleMap name={run.location} geoLocation={run.geoLocation} zoomLevel={15} />
                    <RunInfoCard run={run} />
                  </Card>
                ))}
              </div>
              <Observer onChange={handlePageChange}>

                <div style={{ display: 'flex', justifyContent: 'center' }}>

                  {loading ? <CircularProgress className={classes.circularProgress} /> : <FiberManualRecord color="disabled" />}
                </div>

              </Observer>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </>
  )
}

export default Runs
