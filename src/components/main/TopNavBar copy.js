import React, { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
 
import '../styles/TopNavBar.css'



function TopNavBar(props){
    const history = useNavigate();
    const[musicOn, setMusicOn] = useState(false)
    const[loginState, setLoginState] = useState(false)
    
    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            setLoginState(true)
        }else{
            setLoginState(false)
        }
    },[history])
    /* potentially changes navbar on page change */

        return(
      
            <Navbar collapseOnSelect expand="lg" variant="light" >
                <Container >
                <div className='topbar-name'><Navbar.Brand href="#home">Aroura</Navbar.Brand></div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div className="alllinks">
                        <NavLink className={musicOn? "navlinksWhite":"navlinks" } exact to="/home"> Home</NavLink>
                        <NavLink className={musicOn? "navlinksWhite":"navlinks"} exact to="/overview"> Overview</NavLink>
                        <NavLink className={musicOn? "navlinksWhite":"navlinks"} exact to="/aboutus"> About Us</NavLink>
                        <NavLink className={musicOn? "navlinksWhite":"navlinks"} exact to="/mobile"> Aurora Mobile</NavLink>
                        <NavLink className={musicOn? "navlinksWhite":"navlinks"} exact to="/packages"> Packages</NavLink>
                    </div>
                    <NavLink exact to={loginState? '/logout':'/login'}><button className="button-signup">{loginState? 'LOG OUT':'LOG IN'}</button></NavLink>
                </Navbar.Collapse>
                </Container>
                </Navbar>

        )
}

export default TopNavBar;