import React from "react";

import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const LocationPin = ({ text }) => (
  <div className="pin">
    <LocationOnIcon />
    <p className="pin-text">{text}</p>
  </div>
);
const Map = ({ location, zoomLevel, name }) => {
  return (
    <div className="map" style={{ width: "100%" }}>
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin lat={location.lat} lng={location.lng} text={name} />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
