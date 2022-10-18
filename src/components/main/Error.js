import React from 'react';
import '../styles/Error.css';
import error_gif from '../images/error.gif';

function Error() {
  return (
    <div className='error'>
        <img className='err-img' src={error_gif}/>
        <h3 className='error-title'>Oops! Page not found</h3>
        <p className='error-text'>It's looking like you may have taken a wrong turn. Don't worry... it happens to the most of us</p>
        <button className='error-btn' onClick={()=>window.location = "/home"}>Take me home</button>
        
    </div>
  )
}

export default Error;