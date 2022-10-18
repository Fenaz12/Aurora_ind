import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"

import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import MusicRecommendation from "./MusicRecommendation.js"

const spotifyApi = new SpotifyWebApi({
  clientId: "57036486fbe64b72adc79b3dae4473d7",
})

export default function Dashboard({ code }) {
  const spotify_token_local = sessionStorage.getItem("spotify_token");
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  
  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }


  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
  //   <Container className="d-flex flex-column py-2" style={{ height: "50vh" }}>
  //   <Form.Control
  //     type="search"
  //     placeholder="Search Songs/Artists"
  //     value={search}
  //     onChange={e => setSearch(e.target.value)}
  //   />
  //   <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
  //     {searchResults.map(track => (
  //       <TrackSearchResult
  //         track={track}
  //         key={track.uri}
  //         chooseTrack={chooseTrack}
  //       />
  //     ))}
  //     {/* {searchResults.length === 0 && (
  //       <div className="text-center" style={{ whiteSpace: "pre" }}>
  //         {lyrics}
  //       </div>
  //     )} */}
  //   </div>
  //   <div>
  //     <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
  //   </div>
  // </Container>
        //   {/*  {(accessToken === undefined)?null :<TrackLoader  style={{ height: "50vh" }} accessToken={accessToken}/>}
        //  {(accessToken === undefined)? null : <PlayList accessToken={accessToken}/>} */}
    <div style={{ maxHeight: "90vh"}}>
         {(accessToken === undefined)?null :<MusicRecommendation  style={{ height: "50vh" }} accessToken={accessToken}/>}
    </div>
    
  )
}