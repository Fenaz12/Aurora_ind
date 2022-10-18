import React, { useEffect, useState, useRef} from 'react';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io5';
import {BiFace} from 'react-icons/bi'
import {BsMusicNote} from 'react-icons/bs'
import profile from '../images/profile.jpg';
import activeImg from '../images/activelink.png'
import activeImgdark from '../images/activelink-dark.png'
import '../styles/SideBar.css';
import {NavLink} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { stepIconClasses } from '@mui/material';
import { gsap } from "gsap";
import logo from '../../images/logo.png';

export default function SideBar({showBar, sideBarChanger}){

    const history = useNavigate();
    const [activeLink, setActivelink] = useState(1);
    const [darkMode, setDarkMode] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [name, setName] = useState("User Name")
    const [pic, setPic] = useState("User Name")
    const [menuOpen, setMenuOpen] = useState(true);
    const animation = useRef(null);
    const box = useRef(null);

    useEffect(() => {
        animation.current = gsap.timeline().to(box.current, {
          x: -500,
          opacity:0,
        
        }).to(box.current, {
            x: 0
          });
    
        return () => {
          animation.current.kill();
        };
      }, []);
    
      useEffect(() => {
        if (showBar) {
          animation.current.duration(0.5).reverse();
        } else {
          animation.current.duration(0.5).play();
        }
      }, [showBar]);


    function handleClick(id) {
        setActivelink(id)
      };
      
    function expandBar(){
        sideBarChanger();
        setMenuOpen(!menuOpen)
    }

    useEffect(()=>{
        
        if(localStorage.getItem("userInfo")){
            const userInfo = localStorage.getItem("userInfo")
            setName(JSON.parse(userInfo).name)
            setPic(JSON.parse(userInfo).pic)
        }
        else{
            setName("User Name")
            setPic(profile)
        }
            // console.log(localStorage.getItem("userInfo"))

        },[history])

    useEffect(() =>{
        if(window.location.pathname === "/music"){
            setActivelink(7)
            setDarkMode(true)}
            else{
                setDarkMode(false)
            }
    },[activeLink]);

    return(
        <nav>
            <nav>
                <div  className={showBar ? 'navbar-coll' : 'navbar-expanded'}>
                    <section ref={box} className='side-nav-wrapper'  >
                        <section className='profile'>
                            <div className='profile-logo' onClick={()=>expandBar()}> <FaIcons.FaRobot size={70}/> </div>
                            <div className='profile-logo-text'>Aurora</div>
                            
                            <div className='profile-pic'><img src={pic} width="110px" height="110px" alt="profile"/></div>
                            <div className='profile-name'>
                                Enjoy your Stay!
                                <p>{name}</p>
                            </div>
                        </section>
                        <hr className='line'/>
                        <div className='contents-expanded'>
                        <section className='container-1'>
                            <NavLink exact to='/twitter'> 
                            <div className='box-navBar'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#e3f5ff', backgroundColor:'#e3f5ff'}}size={55} className='circle-icon' />
                                    <FiIcons.FiTwitter size={25} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#4497c6'}}>Social Media</p> 
                            </div>
                            </NavLink>

                            <NavLink exact to='/virtualWalk'>  
                            <div className='box-navBar'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#f9e9ff', backgroundColor:'#f9e9ff'}}size={55} className='circle-icon' />
                                    <FaIcons.FaWalking size={25} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#c175dc'}}>Virtual Walk</p> 
                            </div>
                            </NavLink>

                            <NavLink exact to='/chat'> 
                            <div className='box-navBar'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#ffedfa', backgroundColor:'#ffedfa'}}size={55} className='circle-icon' />
                                    <FaIcons.FaRegComments size={25} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#ce56ac'}}>ChatBot</p> 
                            </div>
                            </NavLink>
                        </section>
                        <section className='container-1'>

                            <NavLink exact to='/voice'> 
                            <div className='box-navBar'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#ffc0c0', backgroundColor:'#ffc0c0'}}size={55} className='circle-icon' />
                                    <FiIcons.FiMic size={25} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#ff7777'}}>Audio Detection</p> 
                            </div>
                            </NavLink>

                            <NavLink exact to='/status'> 
                            <div className='box-navBar'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#fff0de', backgroundColor:'#fff0de'}}size={55} className='circle-icon' />
                                    <IoIcons.IoGridOutline size={25} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#ffa02f'}}>Status</p> 
                            </div>
                            </NavLink>

                            <NavLink exact to='/facial'>   
                            <div className='box-navBar'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#d7ffdb', backgroundColor:'#d7ffdb'}}size={55} className='circle-icon' />
                                    <BiFace size={30} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#2ca738'}}>Facial Recognition</p> 
                            </div>
                            </NavLink>
                        </section>
                        <section className='container-2'>
                            <NavLink exact to="/music"> <div className='box-bg'> <IoIcons.IoMusicalNotesOutline size={22}/></div></NavLink>
                            <NavLink exact to="/packages"> <div className='box-bg'> <AiIcons.AiOutlineTag size={22}/></div> </NavLink>
                            <NavLink exact to="/"> <div className='box-bg'> <FiIcons.FiSettings size={22}/></div></NavLink>
                            <NavLink exact to="/logout"> <div className='box-bg'> <IoIcons.IoExitOutline size={22}/></div></NavLink>
                        </section>
                            <div className="button-expanded"><button className="button-nav"><FiIcons.FiNavigation size={30}/></button> </div>
                        </div>
                    </section>
                </div>
            </nav>
            
            <nav className={showBar ? 'navbar-expanded' : 'navbar-coll'}>
                <div className={activeLink===7? "main-container dark" : "main-container"}>
                    <ul className={activeLink===7? 'navbar-start dark' : 'navbar-start'}>
        
                        <li className='nav-item' onClick={()=> expandBar()}> <FaIcons.FaRobot size={40}/> </li> 
                        <img alt="activelogo" src={darkMode?activeImgdark: activeImg} className={((1 === activeLink ? "logo-active a" : "")||(2 === activeLink ? "logo-active b":"")
                        ||(3 === activeLink ? "logo-active c":"")||(3 === activeLink ? "logo-active c":"") 
                        ||(4 === activeLink ? "logo-active d":"") ||(5 === activeLink ? "logo-active e":"") 
                        ||(6 === activeLink ? "logo-active f":"") || (7 === activeLink ? "logo-active g":"") || (8 === activeLink ? "logo-active h":""))}/>

                        <NavLink exact to='/home'><li onClick={() => handleClick(1)} className={darkMode? 'nav-item-dark':'nav-item homePage'}  > <AiIcons.AiFillHome size={30}/> </li></NavLink>
                        <NavLink exact to='/facial'> <li onClick={() => handleClick(2)} className={darkMode? 'nav-item-dark':'nav-item'}> <BiFace size={30}/></li></NavLink>
                        <NavLink exact to='/chat'> <li onClick={() => handleClick(3)} className={darkMode? 'nav-item-dark':'nav-item'}> <FaIcons.FaRegComments size={30}/></li></NavLink>
                        <NavLink exact to='/twitter'>  <li onClick={() => handleClick(4)} className={darkMode? 'nav-item-dark':'nav-item'}><FiIcons.FiTwitter size={30}/></li></NavLink>
                        <NavLink exact to='/voice'> <li onClick={() => handleClick(5)} className={darkMode? 'nav-item-dark':'nav-item'}> <FiIcons.FiMic size={30}/> </li></NavLink>
                        <NavLink exact to='/nearby'>  <li onClick={() => handleClick(6)} className={darkMode? 'nav-item-dark':'nav-item'}> <IoIcons.IoLocationOutline size={30}/></li></NavLink>
                        <NavLink exact to='/music'> <li onClick={() => handleClick(7)} className={darkMode? 'nav-item-dark':'nav-item'}> <BsMusicNote size={30}/></li></NavLink>
                        <NavLink exact to='/virtualWalk'><li onClick={() => handleClick(8)} className={darkMode? 'nav-item-dark':'nav-item'} ><FaIcons.FaWalking size={30}/> </li></NavLink>

                    </ul>

                </div>
            </nav>
  
        </nav>  
        
        
    );
}
