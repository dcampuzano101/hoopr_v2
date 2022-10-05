import React from "react";
// import { Typography, } from '@material-ui/core/'
// import { makeStyles, Theme } from '@material-ui/core/styles'
import GoogleMapReact from "google-map-react";
// import LocationOnIcon from "@material-ui/icons/LocationOn";

//fill in
const GOOGLE_MAP_API_KEY = "AIzaSyCHBNfg-xsj9eQI5X7H5v09vDrU9Q0oJxE";

const LocationPin = ({ pinText }) => {
  // const classes = useStyles();
  return (
    <div className='pin'>
      {/* <LocationOnIcon /> */}
      {/* <p className={classes.pinIcon}></p> */}
      <h3 variant='h3' className='pinText'>
        {pinText}
      </h3>
    </div>
  );
};

const GoogleMap = ({ geoLocation, name, screen }) => {
  // const classes = useStyles();
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    // <div className='lg:w-1/2 lg:h-full sm:w-full sm:h-1/2'>
    <div className='w-full h-1/2 xl:h-full'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
        center={{ lat: geoLocation.lat, lng: geoLocation.lng }}
        zoom={15}
      >
        <LocationPin
          lat={geoLocation.lat}
          lng={geoLocation.lng}
          pinText={name}
        />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
