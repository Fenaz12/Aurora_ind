import React, { Component } from 'react';
import TopSection from './TopSection';
import './Chat.css';
import BottomSection from './BottomSection';

export default class Chat extends Component {
  render() {
    return (
      <div className='Chatbot-cover'>
          <div className='chat-container'>
              <TopSection/>
              <BottomSection/>
          </div>
      </div>
    )
  }
}
