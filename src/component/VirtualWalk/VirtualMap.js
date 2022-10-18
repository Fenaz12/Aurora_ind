import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


class VirtualMap extends React.Component {

  state = {
    address: '',
    city: '',
    area: '',
    state: '',
    zoom: 20,
    height: 200,
    mapPosition: {
        lat: 6.865270819465338,
        lng: 79.8598509099568,
    },
    markerPosition: {
        lat: 6.865270819465338,
        lng: 79.8598509099568,
    }
  }

  render() {

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
      >
        <Marker
          position={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
        />
      </GoogleMap>
    ));
    

    console.warn(this.props.coords)
    const latlngset = () => {
      let Lat = this.props.coords.lat;
      let Lng = this.props.coords.lng;
      let ll = {...this.state.mapPosition};
      ll.lat = {Lat};
      ll.lng = {Lng};
      this.setState({mapPosition: ll});
    }

    return (
        <div>
          <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCboZ2BuVpS7h88AVgoOXZmRtMAzH9GsdU&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `550px`, width:`1000px`, marginLeft:50}} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
    )
  }
}

export default VirtualMap;