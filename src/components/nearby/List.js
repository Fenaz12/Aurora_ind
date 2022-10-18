import React, {useState, useEffect, createRef} from 'react'
import PlaceDetails from './PlaceDetails';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import '../styles/Nearby-list.css'

export default function List({placeDetails,childClick, isLoading, setMarkerSize}){
    const [elRefs, setElRefs] = useState([])
    const [childOver, setChildOver] = useState(null)
    const [selectedCard, setSelectedCard] = useState(false)

    setMarkerSize(childOver)
    useEffect(()=>{
        const refs = Array(placeDetails?.length).fill().map((_,i) => elRefs[i] || createRef());

        setElRefs(refs);
        }, [placeDetails])
    return(
        <div className='container-list'>
            {isLoading?(
                <div>
                    <CircularProgress size="5rem"/>
                </div>
            ):
            <Grid container spacing={2} className="list-nearby" sx={{marginTop:'1px', marginLeft:'1px'}}>
                <Typography variant={'h6'} sx={{marginLeft:'20px', position:"sticky"}}> Consultants Near your Location</Typography>
                {placeDetails?.map((place,i)=>(
                    <Grid  ref={elRefs[i]} className="list-grid" item key={i} xs={12}>
                        <PlaceDetails place={place} 
                        selected ={childClick ? childClick.latLng.lat() ===place.geometry.location.lat() : false}
                        refProp = {elRefs[i]}
                        setSelectedCard= {setSelectedCard}
                        setChildOver={setChildOver}/>
                    </Grid>
                )
                )}
            </Grid>
            }
        </div>
    )
}