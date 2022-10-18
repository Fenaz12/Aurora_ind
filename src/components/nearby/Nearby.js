import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, InfoBox, Marker } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from './List'
import '../styles/Nearby.css'
import MuiAlert from '@mui/material/Alert';
import { Typography } from '@mui/material';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Nearby({currentPos}){
    const [places, setPlaces] = useState([])
    const [placeDetails, setPlaceDetails]= useState([])
    const [number, setNumber] = useState(0)
    const [requestIds, setRequestIds] = useState([])
    const [noResultsIds, setNoResultsIds] = useState([])
    const [resultsIds, setResultsIds] = useState([])
    const [childClick, setChildClick] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [changeMarkerSize, setMarkerSize] = useState()
    const [open, setOpen] = useState(false);


    useEffect(()=>{
      setTimeout(() => {
        setOpen(true)
    }, 2000)
    },[])
  

    const timer = ms => new Promise(res => setTimeout(res, ms))
    const defaultMapOptions = {
      styles: mapStyles
    };
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAeiVDBcKJqwutLQ3fpLIzTiq0FrfM1RgE" ,
        libraries:"geometry,drawing,places"
      })

      const svgMarker = {
        path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
        fillColor: '#FF0000',
        fillOpacity: .6,
        anchor: new window.google.maps.Point(-15,0),
        strokeWeight: 0,
        scale: 1
      };
      const onLoad = useCallback(
        function onLoad (map) {
          setIsLoading(true)
          var nearbyLocation = new window.google.maps.LatLng(currentPos.lat, currentPos.lng);
          var request = {
            location: nearbyLocation,
            radius: '50000',
            type:['health'],
            keyword : 'counselling'
          };
          function callback(results, status) {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                  setPlaces(results)
                  for (let i = 0; i < results.length; i++) {
                    var requestDetails = {
                      placeId : results[i].place_id,
                      fields :['name', 'rating', 'formatted_phone_number', 'geometry','opening_hours','photos','vicinity']
                    }
                  setRequestIds(oldArray => [...oldArray,requestDetails.placeId] );
                  service.getDetails(requestDetails,callbackDetails)

                   function callbackDetails(place, status2) {
                    if (status2 === window.google.maps.places.PlacesServiceStatus.OK) {
                      setPlaceDetails(oldArray => [...oldArray,place] );
                      setResultsIds(oldArray => [...oldArray,requestDetails.placeId] );
                      if (place.opening_hours){
                        const isOpenNow = place.opening_hours.isOpen()
                        if(isOpenNow){
                        }
                      }

                   }else {
                      setNoResultsIds(oldArray => [...oldArray,requestDetails.placeId] );

                    }
                      // if(places.length - placeDetails.length === requestIds.length){
                      //     console.log("yes")
                      // }
                }
              }
              
          }

        }
          let service = new window.google.maps.places.PlacesService(map);
          service.nearbySearch(request,callback)
          setIsLoading(false)

      }
      )

      useEffect(()=>{
        console.log("Current pos changes")
        // window.location.reload();
    },[currentPos])

    const onLoadPlaceDetails = useCallback(
      function onLoad (map) {
          let service = new window.google.maps.places.PlacesService(map);
          for (let i = 0; i < noResultsIds.length; i++) {
              var requestDetailsNo = {
                placeId : noResultsIds[i],
                fields :['name', 'rating', 'formatted_phone_number', 'geometry','opening_hours','utc_offset_minutes','vicinity']
              }
              service.getDetails(requestDetailsNo,callbackDetailsNo)
              function callbackDetailsNo(place, status2) {
              if (status2 === window.google.maps.places.PlacesServiceStatus.OK) {
                setPlaceDetails(oldArray => [...oldArray,place] );
            
              }
              else{
                // console.log("Nope")
              }
              }
          }
      }
    )

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    const action = (
      <React.Fragment>
 
        <IconButton
          size="large"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );


    return(
      
        <div style={{fontWeight:'300'}}>
          <div >
          <Snackbar
            open={open}
            autoHideDuration={null}
            TransitionComponent={Slide}
            onClose={handleClose}
            message=""
            action={action}
            anchorOrigin={{vertical: 'bottom',horizontal: 'center',}}
            sx={{width:'900px', marginLeft:'200px'}}
            >
              <Alert onClose={handleClose} severity="info" sx={{  fontSize:'20px' }}>
                You Are Not Alone, Please Contact National Suicide Prevention, <strong> CALL 1926 </strong>
              </Alert>
          </Snackbar>
    </div>
          {currentPos.lat !==0?<div>
            <div className='map-container'>
                <div className = 'google-map'>
                
                <GoogleMap mapContainerStyle={{ height: '91vh', width: '75vw', marginTop: '16px' }}
                    zoom={14}
                    onLoad={onLoad}
                    center= { currentPos}
                    onCenterChanged={''}
                    options={{
                      styles: mapStyles,
                  }}
             
                    >
                    {
                        <div >
                          {placeDetails?.map((place,i)=>(
                            
                          <>
                          {place.geometry.location.lat() === changeMarkerSize?
                          <Marker 
                                key={i}
                                className={"text-info"}
                                position={{ lat: place.geometry.location.lat(), lng:  place.geometry.location.lng()}}      
                                onClick ={(child) => setChildClick(child)}
                                icon= {svgMarker}
                                opacity={1}
                                >
                          </Marker>:
                          <Marker 
                              key={i}
                              className={"text-info"}
                              position={{ lat: place.geometry.location.lat(), lng:  place.geometry.location.lng()}}      
                              onClick ={(child) => setChildClick(child)}
                          >
                    </Marker>
                          }
                          </>
                          ))}
                        </div>
                    }
                </GoogleMap>
                {noResultsIds.length > 1 && places.length - resultsIds.length === noResultsIds.length ?<GoogleMap mapContainerStyle={{ height: '0px', width: 'px' }}
                    onLoad={onLoadPlaceDetails}>
                </GoogleMap>:<></>}
                </div>
                {noResultsIds.length > 1 && places.length - resultsIds.length === noResultsIds.length && placeDetails ?<List className="place-list" places={places} placeDetails={placeDetails} childClick={childClick}
                isLoading={isLoading}
                setMarkerSize={setMarkerSize}/>:null}

            </div>
        </div>:null}
        {/* <button onClick={()=>handleClick()}>button</button> */}
        </div>
    )
}