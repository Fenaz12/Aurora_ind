import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios'
import '../styles/Nearby.css'

export default function Nearby(){
    const [currentPos, setCurrentPos] = useState({lat:0, lng:0})
    const [number, setNumber] = useState(0)
    const defaultPos = {lat:0, lng:0}
    const mapref = useRef(null);

    let service;
    function handleLocationClick(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setCurrentPos({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,})
              },
            );
          } 

    }

    
    var pyrmont = new window.google.maps.LatLng(-33.8665433,151.1956316);

    var request = {
        location: pyrmont,
        radius: '500',
        type: ['restaurant']
    };

    function search(){

        service = new window.google.maps.places.PlacesService();   
        service.nearbySearch(request, callback());
        console.log(service)
    }

    function callback(results, status) {
        console.log(service)
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
            console.log(results[i]);}
        }else{
            console.log("fuck off")
        }
    }


    return(
        <div>
            <button onClick={()=> search()}>get loc</button>
            <GoogleMapReact 
                bootstrapURLKeys={{key:'AIzaSyAeiVDBcKJqwutLQ3fpLIzTiq0FrfM1RgE'}}
                defaultCenter={defaultPos}
                center= {currentPos}
                defaultZoom= {14}
                margin={[50,50,50,50]}
                setContent={"found"}
                // options={''}
                // onChange={''}
                // onChildClick={''}
                
                >
                    {currentPos?<div className='markerContainer' lat={Number(currentPos.lat)}
                        lng={Number(currentPos.lng)}>
                        <LocationOnIcon fontSize='large'/>
                    </div>:null}
            </GoogleMapReact>
            <div useRef={mapref}> </div>
            
        </div>
 
    )
}