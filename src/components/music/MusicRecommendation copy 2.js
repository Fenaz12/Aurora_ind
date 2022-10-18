import React,{useState,useEffect,useRef} from "react";
import axios from "axios";
import Player from "./Player"
import TrackInd from "./TrackInd"
import "./styles/TrackLoader.css"
import PlayListInd from "./PlayListInd";
import './styles/PlayListInd.css';
import SelectedPlayListSong from "./SelectedPlayListSong";
import {gsap} from 'gsap';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import {withStyles} from "@material-ui/styles"
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import "./styles/Swiper.css"

const styles = {
    "@global":{

        ".navlinks":{
            color:'white'
        },
        "playlistsong-wrapper":{
            background: '#141414'
        }
    }
}

function MusicRecommendation(accessToken){

    const [number, setNumber] = useState(0);
    const [bgNumber, setBgNumber] = useState(0)
    const [showPlayer, setShowPlayer] = useState(true)
    const [track, setTrack] = useState([]);
    const [trackFirstSix, setTrackFirstSix] = useState([]);
    const [playingTrack, setPlayingTrack] = useState()
    const [numberplaylist, setNumberPlaylist] = useState(0);
    const [playList, setplayList] = useState([]);
    const [playingList, setPlayingList] = useState()
    const [arrayOfPlayLists, setArrayOfPlayLists] = useState([]);
    const [arrayId, setArrayID] = useState(0);
    const [showAllTrack, setShowAllTrack] = useState(false);
    const [playListPlayingTrack, setPlayListPlayingTrack] = useState();
    const [recommendedMusic, setRecommendedMusic] = useState(false)
    const [uriList, setUriList] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const playListIds = ["37i9dQZF1DX1IeqVkK7Ebc", "37i9dQZF1DWX3xqQKu0Sgn", "37i9dQZF1DWU13kKnk03AP", "37i9dQZF1DXdPec7aLTmlC", "37i9dQZF1DXbVipT9CLvYD","37i9dQZF1DX7qK8ma5wgG1"]
    const trackIds = ["1Y0vCaHzLcMSrHm2ftX9C3","5HCyWlXZPP0y6Gqq8TgA20","02VHspkXhhH1QCInRWWIfr","5SRqt66Dhv4yvKbvGbHQsF","5KZyOG8LZsBrHjuEdNyZHa","1Cv1YLb4q0RzL6pybtaMLo","19O4hCGGm95UhvIyhwnNT5","1Srt81FTalOhRw7t7l8Yh8","1qDrWA6lyx8cLECdZE7TV7","7qiZfU4dY1lWllzX7mPBI3","0VjIjW4GlUZAMYd2vXMi3b"]
    const bgColors = ["linear-gradient(to top, #11162A 50% , #203a43)","linear-gradient(to top,#11162A 50%, #000428 )", "linear-gradient(to top, #11162A 50%, #243b55)","linear-gradient(to top, #11162A 50%, #3a6073)"] 
    const headerRef = useRef(null);
    
    useEffect(() =>{
        async function getData(){

            const response = await axios.get(`https://api.spotify.com/v1/tracks?market=ES&ids=${trackIds[0]}%2C${trackIds[1]}%2C${trackIds[2]}%2C${trackIds[3]}%2C${trackIds[4]}%2C${trackIds[5]}%2C${trackIds[6]}%2C${trackIds[7]}%2C${trackIds[8]}%2C${trackIds[9]}%2C${trackIds[10]}`,{
                headers:{
                    Authorization:"Bearer " + accessToken.accessToken,
                },
            })
            let selectedTrack = response.data
            setTrack(selectedTrack)
        }
        getData();
    },[number]);

    useEffect(() =>{
        async function getData(){

            const response = await axios.get(`https://api.spotify.com/v1/tracks?market=ES&ids=${trackIds[0]}%2C${trackIds[1]}%2C${trackIds[2]}%2C${trackIds[3]}%2C${trackIds[4]}%2C${trackIds[5]}`,{
                headers:{
                    Authorization:"Bearer " + accessToken.accessToken,
                },
            })
            let selectedTrack = response.data
            setTrackFirstSix(selectedTrack)
        }
        getData();
    },[number]);
    useEffect(() =>{
        if(numberplaylist < 6){
        async function getData(){
            
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playListIds[arrayId]}`,{
                headers:{
                    Authorization:"Bearer " + accessToken.accessToken,
                },
            })
            let selectedPlayList = response.data
            setplayList(selectedPlayList)
            arrayOfPlayLists.push(selectedPlayList)
        }
        getData();}
    },[numberplaylist]);
    
    useEffect(() => {

        if(numberplaylist <= 5) {
            setTimeout(() => {
                setNumberPlaylist(numberplaylist + 1);
                }, 500);
        }
        if(arrayId !== 5){
            setArrayID(arrayId+1)}
    
      }, [numberplaylist]);


    useEffect(()=>{
        gsap.to(headerRef.current,{
            duration:0.4,
            backgroundImage: `${bgColors[bgNumber]}`,
            ease:'none',
            
        })
    },[bgNumber])


    // useEffect(()=>{
    //     if(playListPlayingTrack !== undefined){
            
    //     var allUris =[playingList.tracks.items.map(e=> e.track.uri)][0]
    //     allUris = allUris.filter(item => item !== playListPlayingTrack.uri)
    //     allUris.unshift(playListPlayingTrack.uri)
    //     setUriList(allUris)
    // }}, [playListPlayingTrack])

    function chooseTrack(track) {
        setPlayingTrack(track)
        setRecommendedMusic(true)
    
      }


      function choosePlayList(playList) {
        setPlayingList(playList)
        setShowPlayer(false)
      }
      
    function choosePlayListTrack(track) {
        setPlayListPlayingTrack(track)
          }
    
    function handleBack(){
        setPlayingList(null)
        setShowAllTrack(false)
        setShowPlayer(true)
    }
    
    function randomBgSelector(){
        var random = Math.floor(Math.random() * 5);
        if(random === bgNumber){
            random = Math.floor(Math.random() * 5);
        }
        setBgNumber(random)
    }
    

    if(!(numberplaylist === 6)){
        return(
            <div class="spinner">
                <div class="r1"></div>
                <div class="r2"></div>
                <div class="r3"></div>
                <div class="r4"></div>
                <div class="r5"></div>
            </div>
        )
    }
    else{
        return(
        
        <div ref={headerRef} className="music-body" style={{backgroundImage:'linear-gradient(to top, #11162A 50% , #203a43)',transitionProperty: "none"}} >
            <div className="music-content">
        
            <div >
            <div className={recommendedMusic? "hide-playlist" : ""}>
            {playingList?<IoChevronBackCircleOutline onClick={()=> handleBack()} className="goback-button" size='50px' color='white'/>:null}

            <div className="playlist-title-front"><h1>Playlists Recommended For you</h1> </div>
    
            <div  className={playingList? "hide-playlist" : "eachBlock-playlist"}>
            <Swiper 
                    style={{transitionProperty: 'none'}}
                    slidesPerView={5}
                    spaceBetween={30}
                    loopPreventsSlide={true}
                    preventInteractionOnTransition={true}
                    className="mySwiper">
                
                {numberplaylist === 6? arrayOfPlayLists.map(each => 
                
                    <SwiperSlide > 
                    <PlayListInd  onClick ={()=> setShowAllTrack(true)} randomBgSelector={randomBgSelector}   playList={each}  key={each.uri} choosePlayList={choosePlayList}/>
                  </SwiperSlide> 
                 ) 
                : null}
            </Swiper>
            </div>
            </div>

            {(!playingList)? null : <div>
                <div className="parent">
                <div className="FixedHeightContainer"> 
                    <div className="songlist">{playingList.tracks.items.map(each => <SelectedPlayListSong choosePlayListTrack={choosePlayListTrack} trackPlayList={each.track} key={each.track.uri} key={each.track.uri} playingSong={isPlaying}/>) }</div>
                </div>
                {/* {console.log(playingList)} */}
                <div className="playinglist-name">{playingList.name}</div>
                <div className="playingtrack-img">{playListPlayingTrack? <img src={playListPlayingTrack.album.images[0].url} height={"300px"}  width={"300px"}/>   :<img src={playingList.images[0].url} height={"300px"}  width={"300px"}/> }</div>
                <div className="playingtrack-artist">{playListPlayingTrack? <h2>{playListPlayingTrack.name}</h2> : null}</div>
                </div>
                <div className="playlist-player">{showPlayer?null:<Player style={{  }} accessToken={accessToken.accessToken} trackUri={playListPlayingTrack?.uri} nextTracks={uriList}/> } </div>
            </div>}
             </div>
            
            <div className={recommendedMusic? "hide-playlist" : ""}>
            <div className={showAllTrack? "hide-playlist" : ""} >
            <h1 className="track-title-front">Music Recommended For you</h1> 
                <div className="eachBlock " > 
                    {(trackFirstSix.length === 0)?null: trackFirstSix.tracks.map(each =>  <TrackInd track={each} chooseTrack={chooseTrack}/>)}
                </div>
            </div>
            </div>
               {(!recommendedMusic)? null: 
               <div className={recommendedMusic? "recom-music" : ""}>
                    <IoChevronBackCircleOutline onClick={()=> setRecommendedMusic(false)} className="goback-button forMusic" size='50px' color='white'/>
                    <h1 className="track-title-front2">Music Recommended For you</h1> 
                    <div className="parent-track">

                    <div className="recom-music-img">{playingTrack? <img src={playingTrack.album.images[0].url} height={"300px"}  width={"300px"}/>   :null}</div>
                    <div className="FixedHeightContainer-track"> 
                        <div className="recom-music-songlist">{(track.length === 0)?null: track.tracks.map(each =>  <TrackInd track={each} chooseTrack={chooseTrack}/>)}</div>
                    </div>
                    </div>
                    <div className="recom-music-player">{showPlayer? <Player style={{ }} accessToken={accessToken.accessToken} trackUri={playingTrack?.uri} />: null}</div>

                </div> }

            </div>

        </div>
    )}
}

export default withStyles(styles)(MusicRecommendation)