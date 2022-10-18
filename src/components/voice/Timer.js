import React,{useState, useEffect} from 'react'
import Fade from '@mui/material/Fade';

export default function Timer({timerControl,timeReset,isPause,isRecordStopped}){
    const [time, setTime] = useState(0);
    const [startTimer, setStartTimer] = useState(false);

    useEffect(()=>{
        setStartTimer(timerControl)
    },[timerControl])

    useEffect(()=>{
        setTime(0)
        setStartTimer(false)
    },[timeReset])

    useEffect(()=>{        
        let interval = null;
        if(startTimer){
            interval = setInterval(()=>{
                setTime(prevTime => prevTime + 10)
            },10)
        }else{
            clearInterval(interval)
        }

        return()=> clearInterval(interval)
    },[startTimer])


    return(
        <div>
  
            {startTimer || isPause? <h1 style={{color:'white'}}>
                <span>{("0" + Math.floor((time/60000)% 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time/1000)% 60)).slice(-2)}:</span>
                <span>{("0" + (time/10)% 1000).slice(-2)}</span>
            </h1> : <>{!isRecordStopped? <h1 style={{textAlign: 'center', fontSize:'72px', color:'white'}}>Tap the microphone button,<br></br> We are here to listen</h1>:
             <h1 style={{textAlign: 'center', fontSize:'72px', color:'white'}}>Start Recording Again!<br></br> or send it to us</h1> }</>} 
            <div>
            </div>
        </div>
    )

}