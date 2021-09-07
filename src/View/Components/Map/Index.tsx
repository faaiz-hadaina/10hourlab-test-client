//@ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

function Index(props: any) {
  const locations = useSelector((state: any) => state.mapData);
  return (
    locations && (
      <Map
        google={props.google}
        zoom={1}
        center={{
          lat: locations[0].lat,
          lng: locations[0].lng
        }}
      >
        {locations.map((location, i) => {
          return (
            <Marker
              key={i}
              position={{ lat: location.lat, lng: location.lng }}
            />
          );
        })}
      </Map>
    )
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCLq1V1G6G_8GyStSyYjKkf-nj-hvuiYoE'
})(Index);
