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

export default function LoginError() {
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
        sx={{borderRadius:'50px'}}
        PaperProps={{
          style: { borderRadius: '40px' }}}
      >
        <Box sx={{ 
          flexGrow: 1,
          minWidth: '830px',
          minHeight: '390px',
          backgroundColor:'white'
        }}
          >
        <Grid  sx={{width:'inherit', position:'absolute',left:'50%', top:'50%', transform: 'translate(-50%, -50%)' }}justifyContent="space-evenly" container spacing={2}   alignItems="center">
        <Grid item alignItems="center"  sx={{position:'absolute',right:'-90%', top:'48%', transform: 'translate(-50%, -50%)'}}>
            <Paper elevation={0} sx={{height:'400px', width:'400px', backgroundColor:'transparent'}}> 
                <Img width={'inherit'} height={'inherit'}alt="complex" src={activeImg} /> </Paper>
        </Grid>
        <Grid item xs={12} sm container alignItems="center">
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs maxWidth={'lg'} sx={{position:'relative', right:'40%',top:'20px', backgroundColor:'', width:'auto'}}>
              <Typography gutterBottom variant="h3" component="div" align="center" sx={{color:'#393737', fontWeight:'800', marginLeft:'20px'}}>
                The feature you are trying to reach is restricted!
              </Typography>

              <Typography variant="" color="text.secondary">
              <NavLink exact to={'/login'}>
                <button className="loginError-button white-button" style={{width:'140px', margin:'20px',fontSize:'20px'}}>LOG IN</button>
              </NavLink>
              </Typography>
              <NavLink exact to={'/signup'}>
                <button className="loginError-button" style={{width:'180px', marginLeft:'20px', height:'40px',fontSize:'20px', color:'white'}}>SIGN UP FREE</button>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
        </Box>
        {/* <DialogActions sx={{backgroundColor:'transparent',opacity:'',position:'relative',right:'40%', }}> 
          <Button sx={{fontWeight:'bold'}} onClick={handleClose}>Back to Home</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
