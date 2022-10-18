import React, { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
import  {Routes, Route} from 'react-router-dom';
import SideBar from './components/main/SideBar';
import TopNavBar from './components/main/TopNavBar';
import Home from './components/main/Home'
import Error from './components/main/Error'
import Packages from './components/main/Packages'
import Dashboard from './components/music/Dashboard';
import SongList from './components/music/SongList';
import SadPlaylist from './components/music/moods/SadPlaylist';
import Login from './components/music/Login';
import LoginUser from './components/main/LoginUser'
import SignUp from './components/main/SignUp'
import Recorder from './components/voice/Recorder';
import LoginError from './components/main/LoginError';
import PreimumUser from './components/main/PreimumUser';
import Nearby from './components/nearby/Nearby';
import LogoutUser from './components/main/LogoutUser';
import GlobalStyle from './globalStyles';
import HomePage from './Pages/HomePage';
import Questions from './component/Questions/Questions';
import VirtualWalk from './component/VirtualWalk/VirtualWalk';
import Chat from './component/Chatbot/Chat';
import Twitter from './component/Twitter/Twitter'
import Status from './component/Status/Status';
import FaceStream from './component/Facial/FaceStream';
import Interactive from './component/Interactive/Interactive';
import Mobile from './component/Mobile/Mobile';
import NavigatorButton from './components/AiNavigator/NavigatorButton'; 


const code = new URLSearchParams(window.location.search).get('code')
function App () {
  NavigatorButton();
  const [showBar, setShowBar] = useState(false);
  const [currentPos, setCurrentPos] = useState({lat:0, lng:0})
  const [loginState, setLoginState] = useState(false)
  const [premUser, setPremUser] = useState(false)
  const [getLocation, setGetLocation] = useState(false)
  const pathnames = ["/voice","/home"]
  const history = useNavigate();
  const spotify_token_local = sessionStorage.getItem("spotify_token");
  let emotion_local = localStorage.getItem("emotion")

  // useEffect(()=>{
  //   if(localStorage.getItem("rememberMe") === "false"){
  //     window.addEventListener('load', clearUserInfo);}
  // })


  useEffect(()=>{
    if(window.location.pathname === "/"){
    history("/home")}
  },[history])

  useEffect(()=>{
    if(localStorage.getItem('userInfo')) {
      setLoginState(true)
      let userDetails = localStorage.getItem('userInfo')
      if(userDetails.isPremium){
        setPremUser(true)
      }
    } else{
      setLoginState(false)
    }
    console.log(loginState)
  },[history])


  useEffect(()=>{
    if(currentPos.lat === 0 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPos({
              lat: position.coords.latitude,
              lng: position.coords.longitude,})
        },
      );
    } 
  },[history])


  useEffect(()=>{

  },[currentPos])

  function clearUserInfo() {
    localStorage.removeItem('userInfo');
}

  function sideBarChanger(){
    setShowBar(prevshowBar => !prevshowBar)
  }

  function clearStorage() {
      sessionStorage.removeItem('spotify_token');
      localStorage.removeItem('emotion');
}

setTimeout(() => {
  sessionStorage.removeItem('spotify_token');
}, 180 * 10000)

window.addEventListener('load', clearStorage);
    return (
      <div className="App">
        <div onClick={()=> setShowBar(false)}className={showBar?'overlay':'not-overlay'} >   </div> 
        {window.location.pathname === '/home' ? <HomePage className=""/>:null}


        <div className="grid">
          <div className="navbar-1"> <SideBar showBar={showBar} sideBarChanger={sideBarChanger}/> </div>
          
         {pathnames.includes(window.location.pathname)?null :<div className="navbar-2"> <TopNavBar/> </div>} 
         <GlobalStyle/>

          <Routes>
             {/* <Route exact className="home"  path='/home' element={<HomePage/>}/> */}
         
            <Route exact className="aboutus"  path='/aboutus'/>
            <Route exact className="test"  path='/test'/>

            <Route exact className="packages"  path='/login' element={<LoginUser/>}/>
            <Route exact className="packages"  path='/signup' element={<SignUp/>}/>
            <Route exact className="packages"  path='/logout' element={<LogoutUser/>}/>

            <Route exact className="packages"  path='/packages' element={<Packages/>}/>
            <Route exact className="packages"  path='/questions' element={loginState? <Questions/> : <LoginError/>}/>
            <Route exact className="packages"  path='/aboutus' element={<Interactive/>}/>
            <Route exact className="packages"  path='/mobile' element={<Mobile/>}/>


            <Route exact className="packages"  path='/status' element={loginState? <Status/> : <LoginError/>}/>
            <Route exact className="packages"  path='/facial' element={<FaceStream/>}/>

            <Route exact className="packages"  path='/virtualWalk' element={loginState? <VirtualWalk/> : <LoginError/>}/>
            <Route exact className="packages"  path='/chat' element={loginState? <Chat/> : <LoginError/> }/>

            <Route exact className="packages"  path='/twitter' element={loginState? <Twitter/> : <LoginError/>}/>
            <Route exact className="packages"  path='/voice' element={loginState? <Recorder/> : <LoginError/>}/>
            <Route exact className=""  path='/nearby' element={loginState? <div><Nearby currentPos={currentPos}/></div> : <LoginError/> }/>

            {loginState? <Route exact className="music" path='/music' element={spotify_token_local? <Dashboard code={code} /> : <>{code? <Dashboard code={code} /> : <Login/>}</>} />:
              <Route exact className=""  path='/music' element={<LoginError/>}/>}

            {loginState? <Route exact className="music" path='/customplaylist' element={spotify_token_local? <SadPlaylist code={code} emotion={emotion_local} /> : <>{code? <SadPlaylist code={code} emotion={emotion_local}/> : <Login/>}</>} /> :
              <Route exact className="packages"  path='/music' element={<LoginError/>}/>}
            {/* <Route exact className="music" path='/music' element={code? <Dashboard code={code} /> : <Login/>} /> */}

            {/* <Route exact className="packages"  path='/voice2' element={<Voice/>}/> */}




             <Route path="*" element={<Error/>} />
          </Routes>
           
        </div>
      </div>
    );
}

export default App;
