import React from 'react';

import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

let coords = [];

class Map extends React.Component {
  state = {
    center: { lat: -33.867, lng: 151.195 },
    coordsResult: [],
  };

  onMapLoad = (map) => {
    let request = {
      query: 'Museum of Contemporary Art Australia',
      fields: ['name', 'geometry'],
    };

    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

    var request1 = {
      location: pyrmont,
      radius: '500',
      type: ['restaurant'],
    };
    function callback(results, status) {
      // console.log(service);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
        }
      } else {
        console.log('fuck off');
      }
    }

    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request1, callback);

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          coords.push(results[i]);
        }

        this.setState({
          center: results[0].geometry.location,
          coordsResult: coords,
        });
      }
    });
  };

  render() {
    return (
      <div>
        <GoogleMap
          center={this.state.center}
          zoom={13}
          onLoad={(map) => this.onMapLoad(map)}
          mapContainerStyle={{ height: '400px', width: '800px' }}
        >
          {this.state.coordsResult !== [] &&
            this.state.coordsResult.map(function (results, i) {
              return (
                <Marker key={i} position={results.geometry.location}>
                  <InfoWindow options={{ maxWidth: 300 }}>
                    <span>{results.name}</span>
                  </InfoWindow>
                </Marker>
              );
            })}
        </GoogleMap>
      </div>
    );
  }
}

export default Map;
