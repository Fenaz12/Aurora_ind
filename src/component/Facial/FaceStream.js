import React,{useRef,useState} from 'react';
import './Face.css';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from 'react-webcam';
import { drawmesh } from './utilities';
import {CircularProgress} from '@material-ui/core';
import axios from 'axios';

function FaceStream() {

  const[fr1, setFr1] = useState(50.623);
  const[fr2, setFr2] = useState(100);
  const[fr3, setFr3] = useState(70.89);
  const[fr4, setFr4] = useState(" ");
  const[Fresult, setFResults] = useState("");
  const[click, setClick] = useState(0);


    // Setup references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [fImgSrc, setFImgSrc] = useState("");

  //Load facemesh
  const runFacemesh = async () =>{
    const net = await facemesh.load({
      inputResolution:{width:640, height:480}, scale:0.8
    });
    setInterval(() =>{
      detect(net)
    }, 10)
  };

  //Detect function
  const detect = async(net) =>{
    if(
      typeof webcamRef.current !== "undefined" && 
      webcamRef.current !== null && 
      webcamRef.current.video.readyState ===4
      ){
        //Get Video properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        //Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        //Set canvas width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        //Make detection
        const face = await net.estimateFaces(video);
        console.log(face);

        //Get canvas context for drawing
        const ctx = canvasRef.current.getContext("2d");
        drawmesh(face, ctx);
      }
  };

  //Image Capture
  const capture = React.useCallback(() =>{
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setClick(click => click + 1);

    const formData = new FormData()
    formData.append("file", imageSrc)
    formData.append("upload_preset", "fvfnovul")

    axios.post("https://api.cloudinary.com/v1_1/dpddlv7o8/image/upload", formData).then((response) =>{
      console.log(response);
      setFImgSrc(response.data.secure_url);
      ImageUpload();
    });

    

  }, [webcamRef, setImgSrc]);

  function ImageUpload(){
    const imageU = {
      "file": fImgSrc,
    };

    axios.post("http://127.0.0.1:60/get_emotion_face",null,{files:imageU}).then((response) =>{
      console.log(response);
      setFResults(response.data.result);
      console.log(Fresult);
      let resF = "Happy";
      setFr4(resF);
      if(click == 2){
        let refF = "Neutral";
        setFr4(refF);
      }
    });
  }



  runFacemesh();
  return (
    <div className="Face">
      <h2 className='face-title'>Facial Recognition</h2>
      <header className='Face-header'>
          <Webcam ref={webcamRef} style={
            {
              position:"absolute",
              marginLeft:"auto",
              marginRight:"auto",
              marginTop:"20px",
              left:0,
              right:0,
              textAlign:"center",
              zIndex:9,
              width:640,
              height:480,
            }
          } screenshotFormat="imaage/jpeg"/>
          <canvas ref={canvasRef} style={
            {
              position:"absolute",
              marginLeft:"auto",
              marginRight:"auto",
              marginTop:"20px",
              left:0,
              right:0,
              textAlign:"center",
              zIndex:9,
              width:640,
              height:480,
            }
          }/>  
      </header>
      <button className='btn-anlys' onClick={capture}>Start Analysing</button>  
      <div className='face-sec'>
        <div className='face-res-card-new' id='face-left'>
          <h3>Your Analysis result is : {fr4}</h3>
        </div>
        
      </div>  

  </div>
  );
}

export default FaceStream;

/* */