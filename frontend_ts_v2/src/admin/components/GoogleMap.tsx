import React from 'react'
import { Typography, Grid } from '@material-ui/core/'
import { makeStyles, Theme } from '@material-ui/core/styles'
// @ts-ignore
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const GOOGLE_MAP_API_KEY: string = 'api'


const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
    mapWrapper: {
        width: '50%',
        [breakpoints.down('xs')]: {
            width: '100%',
            height: '50%'

        }
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
    zoomLevel: number
    name: string
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

const GoogleMap: React.FC<GoogleMapProps> = ({ geoLocation, zoomLevel, name }) => {
    const classes = useStyles();
    return (
        <div className={classes.mapWrapper}>
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