import React,{useState,useEffect,useRef} from "react";
import SelectedPlayListSong from "../SelectedPlayListSong";
import Player from "../Player"
import axios from "axios";
import {withStyles} from "@material-ui/styles"
import "./Moods.css"

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
function SadPlaylist({emotion}){
    const [playingList, setPlayingList] = useState(null);
    const [playListPlayingTrack, setPlayListPlayingTrack] = useState();
    const [emotion_id, setEmotion] = useState("");

    let spotify_token_local = sessionStorage.getItem("spotify_token");
    let emotion_local = localStorage.getItem("emotion");
    useEffect(()=>{
        if(!emotion_local){
            window.location = "/voice"
        }else if(!spotify_token_local ){
            window.location = "/music"
        }
        if(emotion === "sad"){
            setEmotion("672GK9427nOL16d8e5JgYT")
        }else if(emotion === "angry"){
            setEmotion("4HpjFirkG4yMSFzEAMEvKr")
        }else if(emotion === "disgusted"){
            setEmotion("4TKbNFQickrjVKinpkslM5")
        }else if(emotion === "nuetral"){
            setEmotion("24K9P9PDifTWQYzwwcpjhC")
        }else if(emotion === "happy"){
            setEmotion("1yI068UaqX6dJ3aiqyVkdb")
        }else if(emotion === "surprise"){
            setEmotion("2ObSVPuKrt0cuyWaPJJ5f2")
        }else if(emotion === "fear"){
            setEmotion("5N2bo2HDwLzGMpkRp1cIkI")
        }

    },[emotion])
    
    function choosePlayListTrack(track) {
        setPlayListPlayingTrack(track)
          }


    useEffect(() =>{
        async function getData(){
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${emotion_id}`,{
                headers:{
                    Authorization:"Bearer " + spotify_token_local,
                },
            })
            let selectedPlayList = response.data
            setPlayingList(selectedPlayList)
        }
        getData();
    },[emotion_id]);


    if(!playingList){
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
        
        <div className="music-body" style={{backgroundImage:'linear-gradient(to top,#11162A 50%, #000428 )'}} >
            {console.log(emotion_id)}
            <div className="sigle-list" style={{height:'86.3vh'}}>
                <div className="parent">
                <div className="FixedHeightContainer"> 
                    <div className="songlist">{playingList.tracks.items.map(each => <SelectedPlayListSong choosePlayListTrack={choosePlayListTrack} trackPlayList={each.track} key={each.track.uri} />) }</div>
                </div>
                {/* {console.log(playingList)} */}
                <div className="playinglist-name">{playingList.name} Playlist</div>
                <div className="playingtrack-img">{playListPlayingTrack? <img src={playListPlayingTrack.album.images[0].url} height={"300px"}  width={"300px"}/>   :<img src={playingList.images[0].url} height={"300px"}  width={"300px"}/> }</div>
                <div className="playingtrack-artist">{playListPlayingTrack? <h2>{playListPlayingTrack.name}</h2> : null}</div>
                </div>
            </div>
            <div className="playlist-player"><Player style={{  }} accessToken={spotify_token_local} trackUri={playListPlayingTrack?.uri}/></div>
        </div>
    )}
}

export default withStyles(styles)(SadPlaylist)