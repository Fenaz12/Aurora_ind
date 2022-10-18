import React, {useState} from 'react';
import Tabs from './tabs';
import {CircularProgress} from '@material-ui/core';
import './status.css';

function Status() {
  const[rslt1, setRslt1] = useState(100);
  const[rslt2, setRslt2] = useState(100);
  const[rslt3, setRslt3] = useState(100);
  const[rslt4, setRslt4] = useState(100);
  const[condition1, setConsition1] = useState("");
  const[condition2, setConsition2] = useState("");
  const[condition3, setConsition3] = useState("");
  const[condition4, setConsition4] = useState("");

   function getResults(result){
     console.log(result);
     indexOfMax(result.emotion[0][1]);
     indexOfMaxSentiment(result.sentiment[0][1]);

     //const emo_dict = ['anger','happiness', 'neutral', 'sadness', 'surprise'];
     //const senti_dict = ['Negative','Neutral','Positive'];

     let depression_value = result.depression[0][1];
     let sucide_value = result.suicide[0][1];
     //let emotion_text = result.emotion[0][0];
     //let sentiment_text = result.sentiment[0][0];

     setRslt1(depression_value.toFixed(2));
     setRslt4(sucide_value.toFixed(2));
     setConsition1(result.depression[0][0]);
     setConsition2(result.emotion[0][0]);
     setConsition3(result.sentiment[0][0]);
     setConsition4(result.suicide[0][0]);
   }
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
    setRslt2(max);
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
    setRslt3(max);
    console.log(max);
    return maxIndex;
  }

  return (
    <div className='status'>
        <div className='column' id='left'>
            <h2>Let's analyse your <br></br><span>Status</span></h2>
            <div className='resultRow'>
              <div className='resultCol'>
                <div className='resultCard card-1'>
                  <h3 className='resultTitle'>Depression</h3>
                  <div className='resultProgress'>
                    <CircularProgress variant='determinate' size={100} value={rslt1} style={{'color': 'blue'}}/>
                  </div>
                  <h4 className='percent'>{rslt1}%</h4>
                  <h4 className='condition'>{condition1}</h4>
                </div>
              </div>

              <div className='resultCol'>
                <div className='resultCard card-2'>
                  <h3 className='resultTitle'>Emotion</h3>
                  <div className='resultProgress'>
                    <CircularProgress variant='determinate' size={100} value={rslt2} style={{'color': 'green'}}/>
                  </div>
                  <h4 className='percent'>{rslt2}%</h4>
                  <h4 className='condition'>{condition2}</h4>
                </div>
              </div>

              <div className='resultCol'>
                <div className='resultCard card-3'>
                 <h3 className='resultTitle'>Sentiment</h3>
                  <div className='resultProgress'>
                    <CircularProgress variant='determinate' size={100} value={rslt3} style={{'color': 'indigo'}}/>
                  </div>
                  <h4 className='percent'>{rslt3}%</h4>
                  <h4 className='condition'>{condition3}</h4>
                </div>
              </div>

              <div className='resultCol'>
                <div className='resultCard card-4'>
                 <h3 className='resultTitle'>Sucidal</h3>
                  <div className='resultProgress'>
                    <CircularProgress variant='determinate' size={100} value={rslt4} style={{'color': 'red'}}/>
                  </div>
                  <h4 className='percent'>{rslt4}%</h4>
                  <h4 className='condition'>{condition4}</h4>
                </div>
              </div>
            </div>
        </div>
        <div className='column' id='right'>
            <Tabs getResults={getResults} />
        </div>
    </div>
  )
}

export default Status;