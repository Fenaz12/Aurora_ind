import React,{useState} from "react"
import "./styles/SelectedPlayListSong.css"
import { FaPlay } from 'react-icons/fa';

export default function SelectedPlayListSong({trackPlayList, choosePlayListTrack,playingSong}) {
  
  
  function handlePlayPlayList() {
    choosePlayListTrack(trackPlayList)
    // setIsPlaying(currentisPlaying => !currentisPlaying)
   
  }
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
        seconds === 60 ?
        (minutes+1) + ":00" :
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }

  return (
    <div
      className={!(playingSong) ? "playlistsong-wrapper" :"playlistsong-wrapper playing" }
      style={{ cursor: "pointer" }}
      onClick={handlePlayPlayList}
    >
      <img className="playlistsong-img" src={trackPlayList.album.images[0].url} style={{ height: "70px", width: "70px" }} />
        <div className="playlistsong-title ml-3">{trackPlayList.name}</div>
        <div className="playlistsong-artist">{trackPlayList.artists[0].name}</div>
        <div className="playlistsong-time">{millisToMinutesAndSeconds(trackPlayList.duration_ms)}</div>
        <div className="play-button"><FaPlay size="20px" color="#b4b4b4"/></div>
    </div>
  )
}