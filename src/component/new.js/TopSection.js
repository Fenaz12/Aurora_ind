import React, { Component } from 'react';
import './Chat.css';
import chatty from '../../images/Chatbot.png';

class TopSection extends Component {
  render() {
    return (
      <div className='top-Container'>
          <div className='top-col avatar'>
              <img className='user-img' src={chatty} alt='chatty'/>
          </div>
          <div className='top-col top-title'>
              <h4>Eliza</h4>
          </div>
      </div>
    )
  }
}

export default TopSection;
