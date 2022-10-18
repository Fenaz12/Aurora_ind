import React from "react";
import './styles/SelectedPlayingList.css'
import SelectedPlayListSong from "../music/SelectedPlayListSong";
import { useState } from 'react';
import Player from "../music/Player";
export default function SelectedPlayList(playingList,accessToken){
    {console.log(accessToken + " token in selectedplaylist")}
    const selectedSong = playingList.playing;
    const [playingTrack, setPlayingTrack] = useState()

    function chooseTrack(track) {
        setPlayingTrack(track)
      }

    return(
        <div>
            <h1>{selectedSong.name}</h1>
            {selectedSong.tracks.items.map(each => <SelectedPlayListSong chooseTrack={chooseTrack} trackPlayList={each.track}/>)}
            <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
        </div>
    )
} 