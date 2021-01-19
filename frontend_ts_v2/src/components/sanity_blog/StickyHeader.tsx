import React, { useState } from 'react'
import { Grid, useMediaQuery, Card, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import NavBar from '../NavBar';
import { useTheme } from '@material-ui/core/styles'


const useStyles = makeStyles(({ palette }: Theme) => ({
  stickyHeaderRoot: {
    // border: `1px solid ${palette.secondary.main}`,
    // zIndex: 100,
    height: '6em',
    display: 'flex',
    alignItems: 'center',
    padding: '0 3%',
    margin: '0 3%',
    // width: 'auto'
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100%'
  },
  headerLogoWrapper: {
    borderRadius: '3px'
  },
  stickyNavBarWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      justifyContent: 'space-evenly'
  },
  stickyWrapper: {
    borderRadius: '0px', 
    borderBottom: `1px solid #808e95`, 
    width: '100%', 
    position: 'sticky', 
    top: '0' 
  }
}))

const blogCategories = ['All', 'Product', 'Tech', 'Hoops', ]
interface StickyHeaderProps {}

const StickyHeader: React.FC<StickyHeaderProps> = ({}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const classes = useStyles()
  return (
    <Card className={classes.stickyWrapper}  elevation={0} >
        <Grid container className={classes.stickyHeaderRoot}>
            <div className={classes.stickyNavBarWrapper}>
                <Typography variant="h3" style={{ paddingTop: '2%'}}>Filter By Category</Typography>
                <NavBar blog={true} categories={blogCategories}/>
            </div>
        </Grid>
    </Card>
  )
}

export default StickyHeader
