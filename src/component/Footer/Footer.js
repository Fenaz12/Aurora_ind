import React from 'react'
import './Footer.css';
import {Link} from 'react-scroll';
import Logo from '../../images/logo.png';
import Pulse from 'react-reveal/Pulse';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';


const Footer = () => {
  return (
    <section className='footer'>
        <div className='footer-wrapper'>
            <Zoom bottom>
            <h1 className='logo-name'>Aurora</h1>
            </Zoom>
            <Pulse>
            <p className='des'>Enough of Quarantine Troubles, <br/>Stop being stress at home. We are always here with you.
            <br/> Aurora is your Tech-mate</p>
            </Pulse>

            <Fade bottom cascade>
            
            <div className='links'>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Overview</li>
                    <li>Mobile</li>
                </ul>
            </div>
            
            </Fade>
            
            <p className='copy-rights'>© Aurora 2022. All rights reserved</p>
        </div>
    </section>
    
  )
}

export default Footer