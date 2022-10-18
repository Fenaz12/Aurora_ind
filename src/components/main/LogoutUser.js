
import React,{useEffect} from 'react';
import { useNavigate } from "react-router-dom";



export default function LogoutUser() {
    const history = useNavigate();
    useEffect(()=>{
        localStorage.removeItem("userInfo")
        window.location = "/home"
        
    },[history])
    return(
        <div>

        </div>
    )
}