import React from 'react'
import { Typography, Grid, useMediaQuery } from '@material-ui/core/'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
// @ts-ignore
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const GOOGLE_MAP_API_KEY: string = ''

const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
    mapWrapper: {
        width: '50%',
        [breakpoints.down('xs')]: {
            width: '100%',
            height: '50%'
        }
    },
    runScreenMap: {
        width: '100%',
        height: '100%'
    },
    pin: {
        display: 'flex',
        alignItems: "center",
        width: '180px',
    },
    pinIcon: {
        fontSize: '.5rem'
    },
    pinText: {
        fontWeight: 650
    }
}))



interface GoogleMapProps {
    geoLocation: {
        address: string
        lat: number
        lng: number
    }
    // zoomLevel: number
    name: string
    screen?: boolean
}

interface LocationPinProps {
    pinText: string
    lat: number
    lng: number

}

const LocationPin: React.FC<LocationPinProps> = ({ pinText }) => {

    const classes = useStyles();
    return (
        <div className={classes.pin}>
            <LocationOnIcon />
            <p className={classes.pinIcon}></p>
            <Typography variant="h3" className={classes.pinText}>{pinText}</Typography>
        </div>

    )
}

const GoogleMap: React.FC<GoogleMapProps> = ({ geoLocation, name, screen }) => {
    const classes = useStyles();
    // const theme = useTheme()
    // const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
    return (
        <div className={screen ? classes.runScreenMap : classes.mapWrapper} >
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
                center={{ 'lat': geoLocation.lat, 'lng': geoLocation.lng }}
                zoom={15}
            >
                <LocationPin lat={geoLocation.lat} lng={geoLocation.lng} pinText={name} />
            </GoogleMapReact>
        </div >
    );
}

export default GoogleMap