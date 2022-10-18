import { useState, useEffect } from "react"
import axios from "axios"
import SpotifyWebApi from "spotify-web-api-node"


export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  const spotify_token_local = sessionStorage.getItem("spotify_token");


  useEffect(() => {
    if(!code){
      setAccessToken(spotify_token_local)
    }
    if(spotify_token_local){
      setAccessToken(spotify_token_local)

    }
    else{
    axios
      .post("http://localhost:3001/music/login", {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, "/music")
        sessionStorage.setItem('spotify_token', res.data.accessToken);
      })
      .catch(() => {
        window.location = "/music"
      })}
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/music/refresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
          sessionStorage.setItem('spotify_token', res.data.accessToken);
        })
        .catch(() => {
          window.location = "/music"
        })
    }, (expiresIn - 60) * 1000)

    return () => 
    clearInterval(interval)
  }, [refreshToken, expiresIn])



  return accessToken
}