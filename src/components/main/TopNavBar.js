import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import HomePage from '../../Pages/HomePage';
import Logout from '@mui/icons-material/Logout';
import '../styles/TopNavBar.css'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const pages = ['Products', 'Pricing', 'Blog'];

function TopNavBar(props){
    const history = useNavigate();
    const[musicOn, setMusicOn] = useState(false)
    const[loginState, setLoginState] = useState(false)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [name, setName] = useState("User Name")
    const [pic, setPic] = useState("User Name")
    const [premium, setPremium] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    useEffect(()=>{
      if(localStorage.getItem("userInfo")){
          const userInfo = localStorage.getItem("userInfo")
          setName(JSON.parse(userInfo).name)
          setPic(JSON.parse(userInfo).pic)
          setPremium(JSON.parse(userInfo).isPremium)
      }
      else{
          setName("User Name")
      }
      },[history])

    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            setLoginState(true)
        }else{
            setLoginState(false)
        }
    },[history])

        return(
            <div >
 <AppBar elevation={3} position="static" sx={{ background: 'transparent', minWidth:'95vw',position:'relative', zIndex:'15'  }}>
      <Container maxWidth="xl" sx={{margin:'0px'}}>
        <Toolbar disableGutters sx={{ minWidth:'90vw', zIndex:'1'}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }}}
            color="black"
          >
            <NavLink style={{position:'relative', left:'15px', minWidth:'125px'}} className={'topbar-name'}  exact to="/home"> Aurora </NavLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="info"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography  textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            color="black"
          >
            <NavLink style={{}} className={'topbar-name'} sx exact to="/home"> Aurora </NavLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'space-between' }}>

            <div className="alllinks">
                <NavLink className={musicOn? "navlinksWhite":"navlinks" } exact to="/home"> Home</NavLink>
                <NavLink className={musicOn? "navlinksWhite":"navlinks"} exact to="/home"> About Us</NavLink>
                <NavLink className={musicOn? "navlinksWhite":"navlinks"} exact to="/home"> Overview</NavLink>
                <NavLink className={musicOn? "navlinksWhite":"navlinks"} exact to="/home"> Aurora Mobile</NavLink>
                <NavLink className={musicOn? "navlinksWhite":"navlinks"} exact to="/packages">Pricing</NavLink>

            </div>
            {loginState?
            <div>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                <Avatar sx={{  bgcolor: '#1E319D', width: 42, height: 42 }}>{name.charAt(0)}</Avatar>
                </StyledBadge>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                > </Badge>
              </IconButton>
            </Tooltip>
          </Box>
            <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> {name}
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <WorkspacePremiumIcon fontSize="small" />
              </ListItemIcon>
              {premium? 'Premium User' : 'Upgrade to Premium'}
            </MenuItem>
            <NavLink exact to={'/logout'}>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
                Logout
            </MenuItem>
            </NavLink>
          </Menu>
          </div>
       : <NavLink exact to={'/login'}>
              <button className="button-signup">LOG IN</button>
            </NavLink>
            }
            
            

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    {/* <div className="home-page"> {window.location.pathname === '/home' ? <HomePage scrollDown={scrollDown}/>:null}</div> */}
                </div>
        )
}

export default TopNavBar;