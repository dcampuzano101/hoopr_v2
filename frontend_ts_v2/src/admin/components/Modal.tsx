import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core/'
import { ReactNode } from 'react'


const useStyles = makeStyles(({ palette }: Theme) => ({
    modalOverlay: {
        zIndex: 100,
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(10, 10, 10, 0.6)",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    }
}))
interface ModalProps {
    Component: React.ElementType
}

const Modal: React.FC<ModalProps> = ({ Component }) => {
    const classes = useStyles();
    console.log('hiiiii modal')
    return (
        <div className={classes.modalOverlay}>

            <Typography variant='h2'>I AM ZE MODAL</Typography>
            <Component />
        </div>
    );
}


export default Modal