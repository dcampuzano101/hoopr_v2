import React from "react";

import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
const LocationPin = ({ text }) => (
  <div className="pin">
    <LocationOnIcon />
    <p className="pin-text">{text}</p>
  </div>
);
const Map = ({ location, zoomLevel }) => {
  return (
    <div className="map" style={{ width: "100%" }}>
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "API_KEY_HERE" }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
