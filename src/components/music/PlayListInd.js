import React,{useState}  from "react";

function PlayListInd({ playList, choosePlayList,randomBgSelector }) {

  const [showPlayListName, setShowPlayListName] = useState(false);


  function handlePlayList() {
        choosePlayList(playList)
      }
  
  function handleChangeBg(){
    randomBgSelector()
  } 
  return (
    <div>
    <div 
      onMouseEnter={()=> setShowPlayListName(true)}
      onMouseLeave={()=> setShowPlayListName(false)}
      onMouseOver={()=>handleChangeBg()}
      className="wrapper-playlist"
      style={{ cursor: "pointer" }}
      onClick={handlePlayList}
    >
      <img className="playlist-img" src={playList.images[0].url} style={{ height: "200px", width: "170px" }} />
      {showPlayListName? <div className="playlist-name">{playList.name}</div>:null}

        {/* <div className="track-artist text-muted">{track.artists[0].name}</div>
        <div className="track-time">{millisToMinutesAndSeconds(track.duration_ms)}</div>
        <div className="play-button"><FiPlay size="25px"/></div> */}
    </div>
     </div>
  )
}

export default PlayListInd;