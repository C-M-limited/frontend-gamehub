import * as React from "react";
import Image from "next/image";
//material ui
import { styled} from "@mui/material/styles";
import Grid from '@mui/material/Grid'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Divider, ListItemIcon } from "@mui/material";

import Link from "next/link";
import { StyledCircleButton} from "./StyledButton";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/action/auth";
import { RootState } from "../store/reducer";
import SearchComponent from "./SearchComponent";
import { useRouter } from "next/router";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';

import LoginForm from "./form/LoginForm";
import RegisterForm from "./form/RegisterForm";

const MenuItemWrapper = styled("div")(({theme})=>({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center'
}))

export interface OpenFormInterface {
  loginForm: boolean,
  registerForm: boolean
}

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginStatus = useSelector((state: RootState) => state.auth);
  const userProfile = useSelector((state: RootState) => state.userProfile);

  const isLogin = Object.keys(loginStatus).length > 1;

  //User Icon Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //PopUpWindow
  const [openForm, setOpenForm] = React.useState<OpenFormInterface>({loginForm: false, registerForm: false});

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = ()=> {
    handleMenuClose();
    dispatch(logOut());
    router.push("/");
  };

  const handleOnClickUserIcon = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(()=>{
    if (router.query?.showLoginForm) setOpenForm({...openForm, loginForm: true})
  },[router.query]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
        <MenuItem onClick={handleMenuClose}>
          <Link href={'/profile/me'} passHref>
            <MenuItemWrapper>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItemWrapper>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link href={'/likes'} passHref>
            <MenuItemWrapper>
              <ListItemIcon>
                <FavoriteBorderIcon fontSize="small" />
              </ListItemIcon>
              Favorite
            </MenuItemWrapper>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link href={'/add_game'} passHref>
            <MenuItemWrapper>
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              Add Game
            </MenuItemWrapper>
          </Link>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={handleLogOut}>
          <MenuItemWrapper>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItemWrapper>
        </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar style={{ position: "sticky", backgroundColor: 'white', height: 'var(--navBarHeight)' }}>
          <Grid item width="100%" display="flex" alignItems="center" justifyContent="space-between">
            <div style={{ cursor: 'pointer' }}>
              <Link href="/" passHref={true}>
                <Box display="flex" gap={1}>
                  <Image layout='fixed' src="/favicon.png" alt="logo" width={28} height={28} />
                  <Typography
                    variant="h6"
                    color="#000"
                  >
                    GameHUB
                  </Typography>
                </Box>
              </Link>
            </div>
            <Box sx={{display:{xs:'none',sm:'block'}}}>
              <SearchComponent/>
            </Box>
            <Box display="flex" gap={1}>
              <Box sx={{display:{xs:'block',sm:'none'}}}>
                <SearchComponent/>
              </Box>
              {isLogin ? (
                <StyledCircleButton onClick={handleOnClickUserIcon}>
                  <Image 
                    src={userProfile.imageKey || "/user_icon/noUserImage.jpg"}
                    alt='user icon'
                    placeholder="blur" 
                    blurDataURL="/blur.png"
                    layout="fill"
                    objectFit='contain'/>
                </StyledCircleButton>
              ) : (
                <StyledCircleButton onClick={() => setOpenForm({...openForm, loginForm: true})}>
                  <AccountCircleIcon/>
                </StyledCircleButton>
              )}
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
      <LoginForm 
        openForm={openForm} 
        handleOpenForm={setOpenForm} 
      />
      <RegisterForm 
        openForm={openForm} 
        handleOpenForm={setOpenForm} 
      />
      {renderMenu}
    </>
  );
}