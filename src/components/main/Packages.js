import React,{Component} from "react";
import '../styles/Packages.css';
import {BsFillCheckCircleFill}  from 'react-icons/bs';
import {withStyles} from "@material-ui/styles"




class Packages extends Component{
    render(){
        return(
        <div className='packages'>
            <h1>Get our latest</h1>
            <h1>Plans and Promotions here</h1>
            <br></br>
            <container className='parent'>
                <div className='package a'>
                    <h2 >Default Package</h2>
                    <p><BsFillCheckCircleFill color='green' size='25px'/> Facial Recogonition</p>
                    <p><BsFillCheckCircleFill color='green' size='25px'/> Limited Diagnosis via text, audio, video</p>
                    <p><BsFillCheckCircleFill color='green' size='25px'/> Voice Recogonition</p>
                    <p><BsFillCheckCircleFill color='green' size='25px'/> Music Recomendation</p>
                </div>
                <div className='package b'>
                    <h2>Permium Package</h2>
                    <p><BsFillCheckCircleFill color='green' size='25px'/> Therapeutic Chatbot</p>
                    <p><BsFillCheckCircleFill color='green' size='25px'/> Twitter Analyzer</p>
                    <p><BsFillCheckCircleFill color='green' size='25px'/> Virtual Walk</p>
                    <p><BsFillCheckCircleFill color='green' size='25px'/> Facial Recogonition</p>
                    <p><BsFillCheckCircleFill color='green' size='25px'/> Voice Recogonition</p>
                    <p><BsFillCheckCircleFill color='green' size='25px'/> Music Recomendation</p>

                </div>
            </container>
        </div>
            )
    }
    
}

export default (Packages)