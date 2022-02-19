import * as React from 'react';
//material ui
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
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import axios from 'axios';
import StyledButton from './StyledButton';
import StyledInput from './StyledInput';

interface userProfileProps {
  role: string;
  id: number;
  email: string;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  color: alpha(theme.palette.common.white, 1),
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#fff',
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

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 character')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Confirm password is required'),
})

export default function Navbar() {
  const [problem, setProblem] = React.useState<boolean>(false);
  const [problemDetail, setProblemDetail] = React.useState<string>("");
  //provided by marterial ui
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [openLoginDialog, setOpenLoginDialog] = React.useState<boolean>(false)
  const [openRegisterDialog, setOpenRegisterDialog] = React.useState<boolean>(false)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

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

  const LoginForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);
    return (
      <Dialog open={openLoginDialog} onClose={() => handleDialogClose('login')}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: 400 }}>
          <DialogTitle style={{ backgroundColor: '#000' }}>Login</DialogTitle>
          <DialogContent style={{ backgroundColor: '#000' }}>
            <StyledInput
              label="email"
              placeholder='Enter your email'
              register={register}
              required
              error={errors.email}
              helperText="Email is required"
            />
            <StyledInput
              label="password"
              placeholder='Enter your password'
              register={register}
              required
              error={errors.password}
              helperText="Password is required"
            />
            <p>Don't have an account? <a onClick={() => {
              handleDialogClose('login')
              handleDialogOpen('register')
            }}>Register</a></p>
          </DialogContent>
          {problem && <Typography variant="body1" color="red" mb={2} align="center">{problemDetail}</Typography>}
          <DialogActions style={{ backgroundColor: '#000' }}>
            <StyledButton onClick={() => handleDialogClose('login')}>Cancel</StyledButton>
            <StyledButton type="submit">Login</StyledButton>
          </DialogActions>
        </form>
      </Dialog>
    )
  }

  const RegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);
    return (
      <Dialog open={openRegisterDialog} onClose={() => handleDialogClose('register')}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: 400 }}>
          <DialogTitle style={{ backgroundColor: '#000' }}>Register</DialogTitle>
          <DialogContent style={{ backgroundColor: '#000' }}>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
            <StyledInput
              label="first name"
              placeholder='Enter your first name'
              register={register}
              required
              error={errors.first_name}
              helperText="First name is required"
            />
            <StyledInput
              label="last name"
              placeholder='Enter your last name'
              register={register}
              required
              error={errors.last_name}
              helperText="Last name is required"
            />
            <StyledInput
              label="email"
              placeholder='Enter your email'
              register={register}
              required
              error={errors.email}
              helperText="Email is required"
            />
            <StyledInput
              label="password"
              placeholder='Enter your password'
              register={register}
              required
              error={errors.password}
              helperText="Password is required"
            />
            <StyledInput
              label="confirm password"
              placeholder='Enter your confirm password'
              register={register}
              required
              error={errors.confirm_password}
              helperText="Confirm password is required"
            />
            <p>Already have an account? <a onClick={() => {
              handleDialogClose('register')
              handleDialogOpen('login')
            }}>Login</a></p>
          </DialogContent>
          <DialogActions style={{ backgroundColor: '#000' }}>
            <StyledButton onClick={() => handleDialogClose('register')}>Cancel</StyledButton>
            <StyledButton type="submit">Register</StyledButton>
          </DialogActions>
        </form>
      </Dialog>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar style={{ backgroundColor: '#151520' }}>
          <Grid container display='flex' justifyContent='center'>
            <Grid item sm={8} display='flex' alignItems='center'>
              <Box display='flex' alignItems='center'>
                <Link href="/" passHref={true}>
                  <Typography
                    color="#fff"
                    variant="h6"
                    component="div"
                    sx={{ marginRight: 1, cursor: 'pointer' }}
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
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <StyledButton
                onClick={() => handleDialogOpen('login')}
              >
                Login
              </StyledButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <LoginForm />
      <RegisterForm />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
