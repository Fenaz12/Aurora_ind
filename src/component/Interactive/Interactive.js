import React from 'react';
import intImg from '../../images/objimg.png';
import './Interactive.css';
import Slide from 'react-reveal/Slide';

const Interactive = (props) => {
    return (
        <section className='interactive' ref={props.refProp}>
          <div>
              <Slide left>
                <img src={intImg} alt=''/>
              </Slide>
          </div>
          <div className='interactive-text'>
              <Slide right>
                <h2>What Is Aurora?</h2>
              </Slide>
              <Slide right>
              <p>Aurora is a Multimodal Depression and Emotion Detection and Diagnosis cross platform Application which provides
                vast range of services for it's users with magical experiences which you never being exposed before.<br></br>
                Aurora is the first ever application which detects depression using multiple methods.<br></br>
                Don't let problems to judge your life
              </p>
              </Slide>
              
          </div>
        </section>
      );
};

export default Interactive;



