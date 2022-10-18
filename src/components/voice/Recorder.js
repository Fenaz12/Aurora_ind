import React, { useRef, useState, useEffect} from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import '../styles/Voice.css';
import {BsCheckCircleFill,BsFillPauseCircleFill,BsMic,BsFillStopFill}  from 'react-icons/bs';
import { FaCircle } from "react-icons/fa";
import Timer from './Timer'
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress'
import LoginError from '../main/LoginError';
import {NavLink} from 'react-router-dom';
import axios from "axios";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IconStack = styled.span`
  display: grid;
  svg {
    grid-area: 1 / 1;
  }
`;


export default function VoiceRecorder(){

  const context = new AudioContext()
  const analyserNode = new AnalyserNode(context,{fftSize:32})
  analyserNode.minDecibels = -80;
  analyserNode.maxDecibels = -10;
  analyserNode.smoothingTimeConstant = 0.97;
  const canvasRef = useRef(null)
  const [recordState, setRecordState] = useState(null);
  const [isRecording, setIsRecording] = useState(false)
  const [blobURL, setBlobURL] = useState(null);
  const [timerControl, setTimerControl] = useState(false)
  const [timeReset,setTimeReset] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const [open, setOpen] = useState(false)
  const [openMusicRec, setOpenMusicRec] = useState(false)
  const [isRecordStopped, setIsRecordStopped] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openInvalid, setOpenInvalid] = useState(false)
  const [loadskeleton, setLoadskeleten] = useState(false)
  const [emotion, setEmotion] = useState(null);
  const [loginState, setLoginState] = useState(false)
  const animation = useRef(null);
  const box = useRef(null)
  const history = useNavigate();

  useEffect(() => {
    animation.current = gsap.timeline().to(canvasRef.current, {
      opacity:0,
    }).to(canvasRef.current, {
 
      });

    return () => {
      animation.current.kill();
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      animation.current.reverse();
    } else {
      animation.current.play();
    }
  }, [isRecording]);




  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };
  
  const onFileUpload = async() => {
    setLoadskeleten(true)
    const formData = new FormData();
    let userFile = await fetch(blobURL).then(r => r.blob()).then(blobFile => new File([blobFile], "UserInputVoice", { type: "audio/wav" }))

    const file: File = userFile;
    formData.append("file", file);

    axios
      .post(" http://127.0.0.1:70/infer", formData, { headers })
      .then((res) => localStorage.setItem('emotion',res.data.Emotion));
 
      // if(emotion){localStorage.setItem('emotion',emotion.Emotion);}else{localStorage.setItem('emotion',null)}
    
    setTimeout(() => {
        setLoadskeleten(false)
        handleClose()
        handleSend() 
        setEmotion(localStorage.getItem('emotion'))
    }, 1000)



  };


  const headers = {
    "content-type": "multipart/form-data",
  };


  function handleSkeleton(){
      setTimeout(() => {
        setLoadskeleten(false);
  }, 5000)}


  const handleClickOpen = () => {
    setOpen(true);
  };

   function handleClose()  {
    setOpen(false);
  };


  function handleSend() {
    if(localStorage.getItem('emotion') === "null" || !localStorage.getItem('emotion')){
      setOpenInvalid(true)
    }else{
      setOpenMusicRec(true);
    }
  };

  function handleCloseSecond(){
    setOpenMusicRec(false)
  }

  function handleCloseThird(){
    setOpenInvalid(false)
  }
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  function start(){
    setRecordState(RecordState.START)
    setIsRecording(true)
    setIsPause(false)
    setIsRecordStopped(false)
  }

  function stop(){
    setRecordState(RecordState.STOP)
    setIsRecording(false)
    setIsPause(false)
    setIsRecordStopped(true)
  }

  function pause(){
    setRecordState(RecordState.PAUSE)
    setIsPause(true)
  }
  //audioData contains blob and blobUrl
  const onStop = (audioData) => {
    setBlobURL(audioData.url)
  }
useEffect(() => {
  if(isRecording){
    async function setupContext(){
  
      const inputDevice = await getInputDevice()
      if(context.state === 'suspended'){
        await context.resume()
      }
      const source = context.createMediaStreamSource(inputDevice)
      source
      .connect(analyserNode)
      // .connect(context.destination)
  
    }
    setupContext()}
  }, [isRecording,isPause])

function getInputDevice(){
  return navigator.mediaDevices.getUserMedia({
    audio:true
  })
}
useEffect(() => {
  const canvas = canvasRef.current
  const canvasContext = canvas.getContext('2d')
  if(isRecording){  
  function drawVisualizer(){
    requestAnimationFrame(drawVisualizer)

    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserNode.getByteFrequencyData(dataArray)
    const width = canvas.width 
    const height = canvas.height
    const barWidth = width/bufferLength
    const CENTERX = canvas.width/2
    const CENTERY = canvas.height/2
    // console.log(dataArray)
    canvasContext.clearRect(0, 0, width, height)

    canvasContext.fillStyle = 'rgba(255, 255, 255, 0)'
    canvasContext.fillRect(0, 0, width, height)

    let radius = dataArray[2] + 46
    
    if (isPause) {radius = 115}
    else if (radius < 115) {radius = 115;}
    else if (radius > 160) {radius = 160;}
    
    // console.log('Radius ', radius)
    canvasContext.beginPath();
    canvasContext.arc(CENTERX, CENTERY, radius, 0, 2 * Math.PI, false);
    // canvasCtx.fill();
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'rgb(54,128,' + (radius+130) +')';
    // canvasContext.strokeStyle = 'rgb(54,128,181)';

    canvasContext.stroke();
    let radius2 = radius + 25
    if (radius2 < 90) radius2 = 100;
    if (radius2 > 160) radius2 = 160;

    canvasContext.beginPath();
    canvasContext.arc(CENTERX, CENTERY, radius2, 0, 2 * Math.PI, false);
    // canvasCtx.fill();
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'rgb(41,136,' + (radius2+130) +')';
    canvasContext.stroke();


  }
  drawVisualizer()}else{
    canvas.width = 0
    canvas.height =0
  };
}, [isRecording,isPause])

useEffect(()=>{
  if(isRecording){
  function resize(){
    const canvas = canvasRef.current
    const width = canvas.clientWidth 
    const height = canvas.clientHeight
    canvas.width = width * window.devicePixelRatio
    canvas.height =height * window.devicePixelRatio
  } resize()}
},[isRecording,isPause])




  return(
    <div className="recorder-container">
    
      <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#9cecfb" offset="0%" />
          <stop stopColor="#65c7f7" offset="50%" />
          <stop stopColor="#0052d4" offset="100%" />
        </linearGradient>
      </svg>

      <div className="stop-watch"><Timer timerControl={timerControl} timeReset={timeReset} isPause={isPause} isRecordStopped={isRecordStopped}/></div>
      <div className='recording'>
      <IconStack>
        <FaCircle className="recording-button micicon"  ref={box} style={{ fill: "url(#blue-gradient)"}} size={'12rem'}  onClick={!isRecording?()=>{start();setTimerControl(true);setLoadskeleten(true) ;handleSkeleton()}:
          ()=>{stop(); setTimeReset(!timeReset); setTimerControl(false)}}/>
        {!isRecording?<BsMic  className="recording-button" color={'white'} size={70} onClick={()=>{start();setTimerControl(true) }}/>:
        <BsFillStopFill className="recording-button fadein" color={'white'} size={70} onClick={()=>{stop(); setTimeReset(!timeReset); setTimerControl(false)}}/>}
      </IconStack>
          <canvas ref={canvasRef} className='recorder-canvas'></canvas> 
      </div>
      <div className="controls">
      <AudioReactRecorder state={recordState} onStop={onStop} canvasWidth={0} canvasHeight={0} />
      <div className="control-buttons">
  
        {isRecording? <>{!isPause?
        <><BsFillPauseCircleFill  
        className="control-buttons pause blue" color={'white'} size={60} onClick={()=>{pause(); setTimerControl(false)}}/>
        <BsCheckCircleFill  className="control-buttons pause blue" color={'white'} size={60} style={{cursor: 'not-allowed'}}/></>:
        <><BsFillPauseCircleFill className="control-buttons pause blue" color={'white'} size={60} onClick={()=>{start();setTimerControl(true) }}/>
        <BsCheckCircleFill  className="control-buttons send" color={'white'} style={{cursor: 'not-allowed'}} size={60} /></>
        }</>:

        <><BsFillPauseCircleFill
          className="control-buttons" color={'white'} style={{cursor: 'not-allowed'}} size={60}/>
          <>{blobURL? <BsCheckCircleFill
          aria-owns={openPop ? 'mouse-over-pause' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          className="control-buttons pause blue" color={'white'} onClick={handleClickOpen} size={60} />:
          <BsCheckCircleFill
          className="control-buttons pause blue" color={'white'} style={{cursor: 'not-allowed'}} size={60} />}</></>
        }


      </div>
      </div>

      <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>handleClose()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Aurora's depression diagnosis service?"}</DialogTitle>
        <DialogContent sx={{height: 150,}}>
          <DialogContentText id="alert-dialog-slide-description" sx={{color:'black'}}>
            Before sending your voice record to Aurora, make sure you are fine with it or record again
          </DialogContentText>
          {!loadskeleton?<audio src={blobURL} controls="controls" id="alert-dialog-slide-description"/>:
          <Box sx={{ width: '80%', position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                  <LinearProgress />
          </Box>}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose()}>Don't Send</Button>
          <Button onClick={onFileUpload}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
    

    <div>
        <Dialog
          open={openInvalid}
          TransitionComponent={Transition}
          keepMounted
          onClose={()=>handleCloseThird()}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"We cannot recognize your mood, please try again!"}</DialogTitle>
          <DialogContent sx={{height: 50,}}>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>handleCloseThird()}>Close</Button>
          </DialogActions>
        </Dialog>
    </div>
    <div>
      <Dialog
        open={openMusicRec}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseSecond}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Aurora's depression diagnosis service?"}</DialogTitle>
        <DialogContent sx={{height: 100,}}>
          <DialogContentText id="alert-dialog-slide-description" sx={{color:'black'}}>
            We have created a custom playlist for your mood, Click listen to access the playlist
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <NavLink exact to='/customplaylist'> <Button>listen</Button></NavLink>

        </DialogActions>
      </Dialog>
    </div>
    <Popover
        id="mouse-over-pause"
        sx={{pointerEvents: 'none', }}
        open={openPop}
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'bottom',horizontal: 'center',}}
        transformOrigin={{vertical: 'top',horizontal: 'left',}}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Send</Typography>
      </Popover>
  
    </div>
    
  )
}