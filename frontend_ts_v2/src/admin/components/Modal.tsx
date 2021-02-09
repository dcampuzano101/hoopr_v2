import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core/'
import { useParams } from 'react-router-dom'

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

  }
}))

export interface match<Params extends { [K in keyof Params]?: string } = {}> {
  params: Params
  isExact: boolean
  path: string
  url: string
}
interface ModalProps {
  // Component: React.ElementType
  isModal: boolean
}

const Modal: React.FC<ModalProps> = () => {
  const classes = useStyles()
  const params = useParams()
  return (
    <Grid container className={classes.modalOverlay}>
      <Grid item xs={12} md={2}>

      </Grid>
      <Grid item xs={12} md={10} className={classes.modalComponentWrapper}>

        <Typography variant="h2">I AM ZE MODAL</Typography>
      </Grid>
    </Grid>
  )
}

export default Modal
