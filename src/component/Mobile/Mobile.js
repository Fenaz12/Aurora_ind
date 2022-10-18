import React from 'react';
import './Mobile.css';
import {FaGooglePlay} from 'react-icons/fa';
import {BsApple} from 'react-icons/bs';
import Pulse from 'react-reveal/Pulse';
import mobileImage from '../../images/4n.png';

function Mobile(props) {
  return (
    <div className="offer" ref={props.refProp}>
        <div className="container2">
            <div className="row">
                    <Pulse>
                    <div className="content1">
                        <img src={mobileImage} className="offer_image"/>
                    </div>
                    </Pulse>
                    <div className="content1">
                        <p>Introducing all new</p>
                        <h1><span id='aura'>Aurora</span> Mobile</h1>
                        <small>Get in touch with all new Aurora Mobile app and experience the revolution. We garrent you will be excited.</small> <br/>
                        <a href="" className="button1"><FaGooglePlay/> Google Play &#10095; </a> 
                        <a href="" className="button1"><BsApple/> Apple Store &#10095; </a>     
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Mobile;
