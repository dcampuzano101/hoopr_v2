import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Grid, Card } from '@material-ui/core/'
import { useParams, useHistory } from 'react-router-dom'

const useStyles = makeStyles(({ palette }: Theme) => ({
  modalOverlay: {
    zIndex: 100,
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 10, 10, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    padding: 'calc(.625rem - -10px)'
  },
  modalComponentWrapper: {
    height: '100%',
    padding: 'calc(.625rem - 3px) calc(.625rem - -25px)',
    overflow: 'hidden',
    boxSizing: 'border-box',
    border: '1px solid red',
    display: 'flex',
    alignItems: 'center'
  },
  drawerWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    boxSizing: 'border-box',
    border: '1px solid black'
  },
  mainComponent: {
    height: '80%',
    width: '100%',
    border: '1px solid green',
    backgroundColor: palette.primary.main,
    display: 'flex',
    alignContent: 'center'
  }
}))

export interface match<Params extends { [K in keyof Params]?: string } = {}> {
  params: Params
  isExact: boolean
  path: string
  url: string
}
interface ModalProps {
  Component: React.ElementType
  isModal: boolean
}

const Modal: React.FC<ModalProps> = ({ Component, isModal }) => {
  const classes = useStyles()
  const params = useParams()
  const history = useHistory()
  return (
    <Grid container className={classes.modalOverlay} onClick={() => history.goBack()}>
      <Grid item xs={12} md={2} className={classes.drawerWrapper}>

      </Grid>
      <Grid item xs={12} md={10} className={classes.modalComponentWrapper} onClick={e => e.stopPropagation()}>
        <Card className={classes.mainComponent}>
          <Component params={params} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Modal
