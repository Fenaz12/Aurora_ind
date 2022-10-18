import React from "react"
import "./styles/TrackInd.css"
import { FaPlay } from 'react-icons/fa';

export default function TrackInd({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
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
      className="wrapper"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img className="track-img" src={track.album.images[0].url} style={{ height: "70px", width: "70px" }} />
        <div className="track-title ml-3">{track.name}</div>
        <div className="track-artist text-muted">{track.artists[0].name}</div>
        <div className="track-time">{millisToMinutesAndSeconds(track.duration_ms)}</div>
        <div className="play-button"><FaPlay size="20px" color="#b4b4b4"/></div>
    </div>
  )
}