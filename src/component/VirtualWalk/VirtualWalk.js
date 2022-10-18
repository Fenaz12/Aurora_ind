import React,{useState} from 'react';
import VirtualMap from './VirtualMap';
import './VirtualWalk.css';

import PlacesAutocomplete,{
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';


function VirtualWalk() {

  const [address, setAddress] = useState("")
  const [coordinates, setCoordinates] = useState({
    lat:6.865270819465338,
    lng:79.8598509099568
  })

  const handleSelect = async value =>{
    const results = await geocodeByAddress(value);

    const ll = await getLatLng(results[0])
    console.log(ll)
    setAddress(value)
    setCoordinates(ll)
  }
  return (
    <div className='virtual-container'>
        <h2>Virtual Walk</h2>
        <p>by Aurora</p>
        <div className='map-container-2'>
          <div>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div
                key={suggestions.description}
                >
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <VirtualMap coords={coordinates}/>
        </div>
    </div>
  )
}

export default VirtualWalk;