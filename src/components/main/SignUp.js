import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Image from '@mui/icons-material/Image';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


const theme = createTheme();

export default function SignUp() {
  const history = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [pic, setPic] = useState('https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg');
  const [message,setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [picMessage, setPicMessage] = useState(null);
  const [errorName,setErrorName] = useState(false);
  const [errorEmail,setErrorEmail] = useState(false);
  const [errorPassword,setErrorPassword] = useState(false);
  const [helperName, setHelperName] = useState('');
  const [helperEmail, setHelperEmail] = useState('');
  const [helperPassword, setHelperPassword] = useState('');
  const [disableSignUp, setDisableSignUp] = useState('');
  const [showPassword,setShowPassword] = useState(false);

  useEffect(()=>{
    const userInfo = localStorage.getItem("userInfo");
    if(userInfo){
        history("/home")
    }
},[history])
  const handleSubmit = async(event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    if(password !== confirmpassword){
      setMessage("Passwords do not match")
      setError(false)
    }
    else{
      setMessage(false)
      try{
        const config ={
          headers:{
              "Content-type" : "application/json",
          }
      }
        const {data} = await axios.post("http://localhost:3001/api/users/",{
            name,pic,email,password
        },
        config);
        localStorage.setItem("userInfo", JSON.stringify(data))
        window.location = "/home"
        setError(false)
      }catch(error){
        if(error.response.data.message === 'User Already Exists')
        setError(error.response.data.message)
        else{
          setError("Please fill the required fields")
        }
      }
    }
  };

  const postDetails = (pics) =>{
    if(!pics){
      return setPicMessage("Please Select an Image")
    }
    setPicMessage(null)
    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data = new FormData();
      data.append('file',pics)
      data.append('upload_preset','aurora')
      data.append('cloud_name', 'fenaz')
      fetch("https://api.cloudinary.com/v1_1/fenaz/image/upload",{
        method:"post",
        body:data,
      }).then((res) =>res.json())
      .then((data)=>{
        console.log(data);
        setPic(data.url.toString());
      }).catch((err) =>{
        console.log(err);
      })
    }else{
      setPicMessage("Please select a valid image")
    }

  }
  function validateEmail(email) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

  function handleText(e){
    setName(e.target.value)
    if
      (e.target.value.length === 0){
        setErrorName(true)
        setHelperName('Enter Valid Name')
        setDisableSignUp(true)
      }else{
        setErrorName(false)
        setHelperName('')
        setDisableSignUp(false)

      }
  }
  function handleEmail(e){
    setEmail(e.target.value)
    if
      (e.target.value.length === 0){
        setErrorEmail(true)
        setHelperEmail('Enter Valid Email')
        setDisableSignUp(true)
      }else if(!validateEmail(e.target.value)){
        setErrorEmail(true)
        setHelperEmail('Enter Valid Email')
        setDisableSignUp(true)

      }
      else{
        setErrorEmail(false)
        setHelperEmail('')
        setDisableSignUp(false)

      }
  }

  const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {message? <Alert severity="error">{message}</Alert>: null}
    {error? <Alert severity="error">{error}</Alert>: null}
    {picMessage? <Alert severity="error">{picMessage}</Alert>: null}

    <ThemeProvider theme={theme}>
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                  error = {errorName}
                  helperText ={helperName}
                  value={name}
                  onChange={(e) => handleText(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  error = {errorEmail}
                  helperText ={helperEmail}
                  onChange={(e) => handleEmail(e)}
                  type='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <Box sx={{  height:'1.4em',p: 3.2, border: '1px solid #c4c4c4',borderRadius:'4px'  }}>
              <div className='image-input' >
              <p style={{position:'relative', top:'-12px', left:'-12px', color:'#666666'}}>Profile Picture</p>
              <input
                color="primary"
                accept="image/jpeg,png"
                type="file"
                id="icon-button-file"
                style={{ display: 'none', }}
                onChange={(e) => postDetails(e.target.files[0])}
              />
              <label htmlFor="icon-button-file">
                <Button
                style={{position:'relative', top:'-60px', left:'295px'}}
                  variant="contained"
                  component="span"
                  size="large"
                  color="primary"
                  
                >
                  <Image />
                </Button>
              </label>
              </div>
              </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disableSignUp}
            >
              Sign Up
            </Button>
  
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}