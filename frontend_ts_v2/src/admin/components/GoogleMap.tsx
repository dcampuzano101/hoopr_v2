import React from 'react'
import { Typography, Grid } from '@material-ui/core/'
import { makeStyles, Theme } from '@material-ui/core/styles'
const useStyles = makeStyles(({ palette }: Theme) => ({
}))

interface GoogleMapProps {

}

const GoogleMap: React.FC<GoogleMapProps> = ({ }) => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h1">Google Map :)</Typography>
        </>
    );
}

export default GoogleMap