import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"


export default function Player({ accessToken, trackUri,nextTracks }) {

  const [play, setPlay] = useState(false);
  const [first, setFirst] = useState()
  const [third, setThird] = useState()
  // useEffect(()=>{
  //   setPlay(true)
  //   let second = "spotify:track:31sSFHIe4NaxltVFOEIcTa"
  //   setFirst(trackUri)
  //   setThird([first,second])
  // },trackUri)

  useEffect(()=>{
    setPlay(true)
  }, [trackUri])
  
  
  if (!accessToken) return null
  return (
    <>

    <SpotifyPlayer
    styles={{
      width: '100%',
      bgColor:'#1f284d',
      trackNameColor:'#ffffff',
      trackArtistColor:'#b3b3b3',
      height:'100px',
      color:'#000000'
    }}
    
      token={accessToken}
      autoPlay={false}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}

      play={play}
      
      previous={true}
      uris={trackUri}
      
    />
    </>
  )
}