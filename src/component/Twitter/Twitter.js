import { green } from '@material-ui/core/colors';
import React, { useState } from 'react';
import axios from 'axios';
import './twitter.css';

const {CircularProgress} = require("@material-ui/core"); 

function Twitter() {
    
    const[srcName, setScrName] = useState("");
    const[ftweets, setFTweets] = useState("");
    const[prog1, setProg1] = useState(100);
    const[prog2, setProg2] = useState(100);
    const[prog3, setProg3] = useState(100);
    const[prog4, setProg4] = useState(100);
    const[tcondition1, setTConsition1] = useState("");
    const[tcondition2, setTConsition2] = useState("");
    const[tcondition3, setTConsition3] = useState("");
    const[tcondition4, setTConsition4] = useState("");

    function indexOfMax(arr) {
        if(arr.length === 0){
          return -1;
        }
    
        var max = arr[0];
        var maxIndex = 0;
    
        for(var i = 1; i< arr.length; i++){
          if(arr[i] > max){
            maxIndex = i;
            max = arr[i];
          }
        }
        setProg2(max);
        console.log(max);
        return maxIndex;
    }

    function indexOfMaxSentiment(arr) {
        if(arr.length === 0){
          return -1;
        }
    
        var max = arr[0];
        var maxIndex = 0;
    
        for(var i = 1; i< arr.length; i++){
          if(arr[i] > max){
            maxIndex = i;
            max = arr[i];
          }
        }
        setProg3(max);
        console.log(max);
        return maxIndex;
    }

    function AnalyseUser(e){
        const analyzeData = {
          "text": ftweets,
          "depression": "true",
          "emotion": "true",
          "suicide": "true",
          "sentiment": "true"
        };
        axios.post("http://127.0.0.1:30/get_text_analysis",null,{params:analyzeData}).then((response) =>{
          console.log(response);

          indexOfMax(response.data.emotion[0][1]);
          indexOfMaxSentiment(response.data.sentiment[0][1]);

          let depression_value = response.data.depression[0][1];
          let sucide_value = response.data.suicide[0][1];

          setProg1(depression_value.toFixed(2));
          setProg4(sucide_value.toFixed(2));
          setTConsition1(response.data.depression[0][0]);
          setTConsition2(response.data.emotion[0][0]);
          setTConsition3(response.data.sentiment[0][0]);
          setTConsition4(response.data.suicide[0][0]);
        });
    }

    function submitHandle(e){
        e.preventDefault();
        const tweets = {
          "account": srcName,
        };
        console.log(srcName);
        axios.post("http://127.0.0.1:40/get_tweets",null,{params:tweets}).then((response) =>{
          console.log(response);
          setFTweets(response.data.tweets);
          console.log(ftweets[0]);
        });
    }


  return (
    <div className='twit-header'>
        <div className='twit-overlay'>
            <div className='twit-container'>
                <div className='twit-row'>
                    <div className='twit-col'>
                        <h2>Let's find your status on TWITTER</h2>
                        <p>Don't worry - We keep your privacy,safe</p>
                        <form onSubmit={submitHandle}>
                            <input type="text" placeholder='Twitter screen name' onChange={e => setScrName(e.target.value)}/>
                            <input type="submit" className='analyse' value="Analyse"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className='twit-sections'>
            <div className='twit-column'>
                <div className='twit-bg'>
                    <h3 className='tweet__title'>Your recent tweets</h3>
                    <p>{ftweets}</p>
                    <button onClick={AnalyseUser}>Check Depression</button>
                </div>
            </div>
            <div className='twit-column'>
                <div className='twit-cards'>
                    <div className='card card-1'>
                        <h3 className='card__title'>Depression</h3>
                        <h3 className='card-percentage'>{prog1}%</h3>
                        <div className='progress2'>
                            <CircularProgress variant='determinate' size={100} value={prog1} style={{'color': 'blue'}}/>
                        </div>
                        <h4 className='condition'>{tcondition1}</h4>
                    </div>

                    <div className='card card-2'>
                        <h3 className='card__title'>Emotional</h3>
                        <h3 className='card-percentage'>{prog2}%</h3>
                        <div className='progress2'>
                            <CircularProgress variant='determinate' size={100} value={prog2} style={{'color': 'green'}}/>
                        </div>
                        <h4 className='condition'>{tcondition2}</h4>
                    </div>

                    <div className='card card-3'>
                        <h3 className='card__title'>Sentiment</h3>
                        <h3 className='card-percentage'>{prog3}%</h3>
                        <div className='progress2'>
                            <CircularProgress variant='determinate' size={100} value={prog3} style={{'color': 'indigo'}}/>
                        </div>
                        <h4 className='condition'>{tcondition3}</h4>
                    </div>

                    <div className='card card-4'>
                        <h3 className='card__title'>Suicidal</h3>
                        <h3 className='card-percentage'>{prog4}%</h3>
                        <div className='progress2'>
                            <CircularProgress variant='determinate' size={100} value={prog4} style={{'color': 'red'}}/>
                        </div>
                        <h4 className='condition'>{tcondition4}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Twitter;