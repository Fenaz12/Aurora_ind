import React, { useEffect, useState } from 'react';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io5';
import {BsMusicNote} from 'react-icons/bs'
import profile from '../images/profile.jpg';
import activeImg from '../images/activelink.png'
import activeImgdark from '../images/activelink-dark.png'
import '../styles/SideBar.css';
import {NavLink} from 'react-router-dom';

export default function SideBar(){

    const [showBar, setShowBar] = useState(false);
    const [activeLink, setActivelink] = useState(1);
    const [darkMode, setDarkMode] = useState(false)
    
    function handleClick(id) {
        setActivelink(id)
      };
      
    function expandBar(){
        setShowBar(prevshowBar => !prevshowBar)
    }

    useEffect(() =>{
        if(window.location.pathname === "/music"){
            setActivelink(7)
        }
    },[activeLink]);

    return(
        <nav>
            <nav>
                <div  className={showBar ? 'navbar-coll' : 'navbar-expanded'}>
                    <section className='side-nav-wrapper'>
                        <section className='profile'>
                            <div className='profile-logo' onClick={()=>expandBar()}> <FaIcons.FaReact size={70}/> </div>
                            <div className='profile-logo-text'>Aurora</div>
                            <div className='profile-pic'><img src={profile} width="110px" height="110px" alt="profile"/></div>
                            <div className='profile-name'>
                                User Name
                                <p>url</p>
                            </div>
                        </section>
                        <hr className='line'/>
                        <section className='container-1'>
                            <div className='box'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#e3f5ff', backgroundColor:'#e3f5ff'}}size={55} className='circle-icon' />
                                    <FiIcons.FiTwitter size={25} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#4497c6'}}>Social Media</p> 
                            </div>

                            <div className='box'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#f9e9ff', backgroundColor:'#f9e9ff'}}size={55} className='circle-icon' />
                                    <FaIcons.FaWalking size={25} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#c175dc'}}>Virtual Walk</p> 
                            </div>
                            
                            <div className='box'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#ffedfa', backgroundColor:'#ffedfa'}}size={55} className='circle-icon' />
                                    <FaIcons.FaRegComments size={25} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#ce56ac'}}>ChatBot</p> 
                            </div>

                        </section>
                        <section className='container-1'>
                            <div className='box'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#ffc0c0', backgroundColor:'#ffc0c0'}}size={55} className='circle-icon' />
                                    <FiIcons.FiMic size={25} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#ff7777'}}>Audio Detection</p> 
                            </div>
                            
                            <div className='box'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#fff0de', backgroundColor:'#fff0de'}}size={55} className='circle-icon' />
                                    <IoIcons.IoGridOutline size={25} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#ffa02f'}}>Status</p> 
                            </div>
                            
                            <div className='box'>
                                <span style={{ display: 'inline-block', position: 'relative' }}>
                                    <FaIcons.FaRegCircle style={{color:'#d7ffdb', backgroundColor:'#d7ffdb'}}size={55} className='circle-icon' />
                                    <IoIcons.IoLocationOutline size={30} className='controlBox-icon' color='#555555'/> 
                                </span>
                                <p style={{color:'#2ca738'}}>Nearby me</p> 
                            </div>
                        </section>
                        <section className='container-2'>
                            <div className='box-bg'> <IoIcons.IoMusicalNotesOutline size={22}/></div>
                            <div className='box-bg'> <AiIcons.AiOutlineTag size={22}/></div>
                            <div className='box-bg'> <FiIcons.FiSettings size={22}/></div>
                            <div className='box-bg'> <IoIcons.IoExitOutline size={22}/></div>
                        </section>
                            <div className="button-expanded"><button className="button-nav"><FiIcons.FiNavigation size={30}/></button> </div>
                    </section>
                </div>
            </nav>
            
            <nav className={showBar ? 'navbar-expanded' : 'navbar-coll'}>
                <div className={activeLink===7? "main-container dark" : "main-container"}>
                    <ul className={activeLink===7? 'navbar-start dark' : 'navbar-start'}>
                    {/* <div className="logo-active"style={{height:'400px', width:'300px'}}>
                        <svg
                        viewBox="0 0 1300 1300">
                        <defs
                            id="defs8" />
                        <path
                            fill="#ff0000"
                            fill-opacity="1"
                            d="m 2.4630542,107.38916 q 0,150 149.9999958,192.61084 150,42.61084 150,142.61084 0,100 -150,157.38916 Q 2.4630542,657.38916 2.4630542,807.38916"
                            id="path2" />
                        <path
                            style={{fill:'#ffffff'}}
                            id="path84"
                            d="M 283.49753,442.11819 A 100,100 0 0 1 183.61447,542.11813 100,100 0 0 1 83.497802,442.35207 100,100 0 0 1 183.14672,342.11881 100,100 0 0 1 283.49643,441.65045" />
                        <path
                            style={{fill:"#f9f9f9"}}
                            id="path110"
                            d="m 195.8128,467.98029 a 11.699508,1.2315271 0 0 1 -11.68582,1.23152 11.699508,1.2315271 0 0 1 -11.71316,-1.22864 11.699508,1.2315271 0 0 1 11.65843,-1.2344 11.699508,1.2315271 0 0 1 11.74043,1.22576" />
                        </svg>
                    </div> */}
                        <li className='nav-item' onClick={()=> expandBar()}> <FaIcons.FaReact size={40}/> </li> 
                        <img alt="activelogo" src={activeImg} className={((1 === activeLink ? "logo-active a" : "")||(2 === activeLink ? "logo-active b":"")
                        ||(3 === activeLink ? "logo-active c":"")||(3 === activeLink ? "logo-active c":"") 
                        ||(4 === activeLink ? "logo-active d":"") ||(5 === activeLink ? "logo-active e":"") 
                        ||(6 === activeLink ? "logo-active f":"") || (7 === activeLink ? "logo-active g":""))}/>

                        <img alt="activelogo" src={activeImgdark} className={7 === activeLink ? "logo-active g":"hide-active-logo"}/>     

                        
                        <NavLink exact to='/home'><li onClick={() => handleClick(1)} className='nav-item' activeClassName="active"> <AiIcons.AiFillHome size={30}/> </li></NavLink>
                        <NavLink exact to='/virtual'><li onClick={() => handleClick(2)} className='nav-item 1' activeClassName="xActive"><FaIcons.FaWalking size={30}/> </li></NavLink>
                        <NavLink exact to='/virtual'> <li onClick={() => handleClick(3)} className='nav-item 2' activeClassName="yActive"> <FaIcons.FaRegComments size={30}/></li></NavLink>
                        <NavLink exact to='/virtual'>  <li onClick={() => handleClick(4)} className='nav-item 3'><FiIcons.FiTwitter size={30}/></li></NavLink>
                        <NavLink exact to='/virtual'> <li onClick={() => handleClick(5)} className='nav-item 4'> <FiIcons.FiMic size={30}/> </li></NavLink>
                        <NavLink exact to='/virtual'>  <li onClick={() => handleClick(6)} className='nav-item 5'> <IoIcons.IoLocationOutline size={30}/></li></NavLink>
                        <NavLink exact to='/music'> <li onClick={() => handleClick(7)} className='nav-item 6'> <BsMusicNote size={30}/></li></NavLink>
                        <NavLink exact to='/virtual'> <li className='button-start'><button className='button-nav'><FiIcons.FiNavigation size={30}/></button> </li></NavLink>
                    </ul>

                </div>
            </nav>
  
        </nav>  
        
        
    );
}
