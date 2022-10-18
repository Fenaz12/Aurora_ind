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
            let ch = this.state.chat;
            ch.push({from:'our',msag:this.state.msg});
            ch.push({from:'cb',msag:response.data.text});
            this.setState({chat:ch,msg:''});
            console.log(this.state);
            /*let interval = window.setInterval(function(){
                var elm =  document.getElementById('chatt');
                elm.scrollTop = elm.height;
                window.clearInterval(interval);
            },1000);*/
        }).catch(err=>{
            console.log(err);
        });
    }
  render() {
    return (
      <div>
          -
          <div id='chatt' className='chat-msgSec'>
              <div className='initial-msg'>Hi my name is Eliza. How can I help you?</div>
                {
                    this.state.chat.map((msg)=>{
                        if(msg.from == 'cb'){
                            return <div className='msg-recieve'>{msg.msag}</div>
                        }else{
                            return <div className='msg-send'>{msg.msag}</div>
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
