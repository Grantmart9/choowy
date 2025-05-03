import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = ({ center, markers }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const apiKey = "AIzaSyDFqp0PGp-vOy_BLx-ljnGZcUks9VbJgXM"; // Replace with your Google Maps API key

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      onError={() => console.error("Failed to load Google Maps script")}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center || { lat: 0, lng: 0 }}
        zoom={12}
        options={mapOptions}
      >
        {markers &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

// Usage
// <MapComponent center={{ lat: 37.7749, lng: -122.4194 }} markers={[{ lat: 37.7749, lng: -122.4194 }]} />
