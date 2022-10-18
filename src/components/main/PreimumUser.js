import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { NavLink, useNavigate } from 'react-router-dom';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '../styles/TopNavBar.css'
import activeImg from '../../images/anime.gif'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PreimumUser() {
  const [open, setOpen] = React.useState(true);
  const history = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location = "/home"
  };

  return (
    <div>

      <Dialog
        maxWidth={'xl'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <Box sx={{ 
          flexGrow: 1,
          backgroundColor:'red',
          minWidth: '830px',
          minHeight: '380px',
          backgroundImage:"linear-gradient(to top, #C5A6CA 50%, #ffdde1)"
          }}
          >
        <Grid  sx={{width:'inherit', position:'absolute',left:'50%', top:'50%', transform: 'translate(-50%, -50%)' }}justifyContent="space-evenly" container spacing={2}   alignItems="center">
        <Grid item alignItems="center"  sx={{position:'absolute',left:'-1%', top:'45%', transform: 'translate(-50%, -50%)'}}>
            <Paper sx={{height:'280px', width:'280px'}}> 
                <Img width={'inherit'} height={'inherit'}alt="complex" src={activeImg} /> </Paper>
        </Grid>
        <Grid item xs={12} sm container alignItems="center">
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs maxWidth={'lg'} sx={{position:'relative', left:'40%', top:'-10px', backgroundColor:''}}>
              <Typography gutterBottom variant="h5" component="div" sx={{color:'', fontWeight:'600', marginLeft:'20px'}}>
                You discovered a Premium Feature, You must have a Premium Account to unlock it.
              </Typography>
              <Typography sx={{postition:'relative', left:'300px'}}>
              <NavLink exact to={'/home'}>
                <button className="button-signup loginError" style={{width:'auto', margin:'30px', marginLeft:'100px', backgroundColor:'#1E319D', color:'white'}}>CONTACT US</button>
              </NavLink>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
        </Box>
        <DialogActions sx={{backgroundColor:'transparent',opacity:'',position:'relative',right:'40%', }}> 
          <Button sx={{fontWeight:'bold'}} onClick={handleClose}>Back to Home</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
