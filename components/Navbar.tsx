import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: alpha(theme.palette.common.black, 1),
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'primary',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [openLoginDialog, setOpenLoginDialog] = React.useState<boolean>(false)
  const [openRegisterDialog, setOpenRegisterDialog] = React.useState<boolean>(false)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: ""
    },
    onSubmit: async (values) => {
      const { email, password } = values
      const res = await axios.post('/api/auth/register', {
        email,
        password
      })

      console.log(res)
    }
  })

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDialogOpen = (type: string) => {
    if (type === 'login') setOpenLoginDialog(true)
    if (type === 'register') setOpenRegisterDialog(true)
  }

  const handleDialogClose = (type: string) => {
    if (type === 'login') setOpenLoginDialog(false)
    if (type === 'register') setOpenRegisterDialog(false)
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: '#fff'}}>
        <Grid container display='flex' justifyContent='center'>
              <Grid item sm={8} display='flex' alignItems='center'>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link href="/" passHref={true}>
            <Typography
              color="#000"
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 0, cursor: 'pointer' }}
            >
              GameHUB
            </Typography>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
                variant="contained"
                style={{ backgroundColor: '#000'}}
                onClick={() => handleDialogOpen('register')}
                sx={{ marginRight: 1 }}
              >
              Register
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: '#000'}}
              onClick={() => handleDialogOpen('login')}
            >
              Login
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Dialog open={openRegisterDialog} onClose={() => handleDialogClose('register')}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="confirm_password"
              label="Confirm password"
              type="password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose('login')}>Cancel</Button>
          <Button type="submit">Register</Button>
        </DialogActions>
        </form>
      </Dialog>
      <Dialog open={openLoginDialog} onClose={() => handleDialogClose('login')}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="confirm_password"
              label="Confirm password"
              type="password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose('login')}>Cancel</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
        </form>
      </Dialog>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
