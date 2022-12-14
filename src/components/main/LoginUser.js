
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';  
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';


export default function LoginUser() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const theme = createTheme();

    function clearStorage() {
        localStorage.removeItem('userInfo');
    }

    useEffect(()=>{
        console.log(localStorage.getItem("rememberMe"))
        if(localStorage.getItem("rememberMe") === "false"){
        window.addEventListener('load', clearStorage);}
    })

    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            history("/home")
        }
    },[history])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const config ={
                headers:{
                    "Content-type" : "application/json",
                }
            }
            setLoading(true);

            const {data} = await axios.post("http://localhost:3001/api/users/login-user",{
                email,
                password
            },
            config);
            
            console.log(data)
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false)
            setError(false)
            history("/home")
        }catch(error){
            setError(error.response.data.message)
        }

    };
        
    return(
        <div>
        
        {/* {loading? <LinearProgress/>: null} */}
        {error? <Alert severity="error">{error}</Alert>: null}
        
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                    control={<Checkbox  color="primary" onChange={(e) => localStorage.setItem('rememberMe', JSON.stringify(e.target.checked))}/>}
                    label="Remember me"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                    {/* <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid> */}
                    <Grid item >
                        <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
 
        </div>
    )
}