import React, {useState} from 'react'
import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, CardHeader,Collapse,Avatar, CardActionArea} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/Nearby-list.css'
import BusinessIcon from '@mui/icons-material/Business';
import GradeIcon from '@mui/icons-material/Grade';
import {gsap} from 'gsap';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function PlaceDetails({place, selected, refProp, setChildOver,setSelectedCard}){
    
    const [expanded, setExpanded] = useState(false);
    const [changeBg, setChangeBg] = useState(false)
    function handleExpandClick() {
        setExpanded(!expanded);
     
      };

    function handleClickMarker(){

      selected = true      
      setChildOver(place.geometry.location.lat())
    }
    
    if(selected) {
        refProp?.current?.scrollIntoView({behavior:"smooth", block:"start"})
      }
    return(
 
        <div>
        <Card sx={selected ?{ maxWidth: 300 , backgroundColor:'#c1c1c1'}:{maxWidth: 300 , backgroundColor:'white'}} onClick={()=> handleClickMarker()}
          >
          <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {place.name.charAt(0)}
            </Avatar>
          }
          title={place.name}
          subheader={place.opening_hours && place.opening_hours.isOpen()? "Open Now": "Closed Now"}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{display: 'flex',justifyContent: 'space-between'}}>
            <BusinessIcon sx={{m:1}}/>
            <Typography align={'right'}>{place.vicinity}</Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{display: 'flex',justifyContent: 'space-between'}}>
            <PhoneIcon sx={{m:1}}/>
            <Typography align={'right'} sx={{p:1}}>{place.formatted_phone_number}</Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{display: 'flex',justifyContent: 'space-between'}}>
            <GradeIcon sx={{m:1}}/>
            <Rating align={'right'} sx={{p:1}} value={place.rating} readOnly></Rating>
          </Typography>
        </CardContent>
        </CardActionArea>
  
      </Card>
      </div>
    )
}