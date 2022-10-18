import React,{useState} from "react";
import { Autocomplete } from "@react-google-maps/api";
import {AppBar, Toolbar, Typography, InputBase, Box} from  '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/Header.css'

export default function Header({setCurrentPos}){
    const [autocomplete, setAutocomplete] = useState(null)

    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCurrentPos({lat, lng})
    }
    return(
        <AppBar position="static">
        <Toolbar className="header-toolbar" sx={{
            display:'flex',
            justifyContent:'space-between'
  }}>
            <Typography variant="h6">
                Nearby Consultants
            </Typography>
            <Box display="flex">
                <Typography variant="h6" className='header-title'>
                    Search for location
                </Typography>  
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className='header-search'>
                        <div className='header-searchIcon'>
                            <SearchIcon/>
                        </div>
                        <InputBase placeholder="Search..." sx={{
                               padding: '1px',
                               paddingLeft : '4px'
                        }}/>
                    </div>

                </Autocomplete> 
            </Box>
        </Toolbar>
    </AppBar>
    )
}