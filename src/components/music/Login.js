import React from 'react';
import {Container} from 'react-bootstrap'
import Button from '@mui/material/Button';
import bg from '../../images/mp-bg.png';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=57036486fbe64b72adc79b3dae4473d7&response_type=code&redirect_uri=http://localhost:3000/music&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20streaming%20streaming%20playlist-modify-private%20playlist-read-private%20playlist-modify-public"
export default function 
() {
  return <div style={{backgroundImage: `url(${bg})`, backgroundRpeat:'no-repeat',backgroundPosition:'center', backgroundSize:'cover'}}>
      <Button  href={AUTH_URL} variant="contained" color="success"  sx={{position: 'absolute',top: '47%',left: '45%',transform: 'translate(-0%,-50%)',height: '64px', width: '240px', fontSize: '18px'
     
   }} >
      Login with Spotify
      </Button>
      </div>;
}

