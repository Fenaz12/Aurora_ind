import axios from 'axios';
import React, { Component } from 'react';
import './Chat.css';

class BottomSection extends Component {
    state ={
        chat:[],
        msg:''
    }

    handlingChange = (e) => {
        console.log(e.target.value);
        this.setState({msg:e.target.value});
    }

    handlingSend = ()=>{
        const Msgsend = {
            "msg": this.state.msg
        }
        axios.post('http://localhost:80/response',null,{params:Msgsend}).then((response) =>{
            console.log(response);
        });
    }
  render() {
    return (
      <div>
          <div className='chat-msgSec'>
            {
                this.state.chat.map((msg)=>{
                    if(msg.from == 'cb'){
                    return <div className='response'></div>
                    } else{
                        return <div className='send'>{this.state.msg}</div>
                    }
                })
            }
          </div>
          <div className='chat-inSec' id='eliza'>
               <input type='text' name='msg' onChange={(e) => this.handlingChange(e)} value={this.state.msg} className='chat-control' placeholder='type a message...'/>
               <button onClick={() => this.handlingSend()} className='chat-send'>Send</button>
          </div>
      </div>
    )
  }
}

export default BottomSection;
