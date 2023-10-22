import * as React from "react";
import Image from "next/image";
//material ui
import { styled, alpha } from "@mui/material/styles";
import Dialog from '@mui/material/Dialog'
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from '@mui/material/Grid'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {StyledButton, StyledLoadingButton} from "./StyledButton";
import StyledInput from "./StyledInput";
import { useDispatch, useSelector } from "react-redux";
import { login, logOut } from "../store/action/auth";
import { registerThunk } from "../store/action/registration";
import { RootState } from "../store/reducer";
import { fetchSearchListThunk } from "../store/action/search";
import { useState } from "react";
import {CharacterImageList} from '../public/user_icon/user_icon'
import SearchComponent from "./SearchComponent";
import { useRouter } from "next/router";
import { OpenAlertAction } from "../store/action/alert";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const TagToChangeForm = styled("a")(({theme})=>({
  cursor: "pointer", 
  border: "2px solid white",
  padding: "3px",
  marginLeft:'4px',
  borderRadius:'5px',

  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.45),
  },
}))

export default function Navbar() {
  const router = useRouter()
  const loginStatus = useSelector((state: RootState) => state.auth);
  const userProfile = useSelector((state: RootState) => state.userProfile);
  //search function
  const [keyword, setKeyword] = React.useState("");
  const dispatch = useDispatch();
  const searchList = useSelector((state: RootState) => state.searchList);
  React.useEffect(() => {
    dispatch(fetchSearchListThunk({ page: 0, keyword: keyword }));
    // console.log(searchList.searchList.content)
  }, [keyword]);
  const [problem, setProblem] = React.useState<boolean>(false);
  const [problemDetail, setProblemDetail] = React.useState<string>("");
  //provided by marterial ui
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  //PopUpWindow
  const [openLoginDialog, setOpenLoginDialog] = React.useState<boolean>(false);
  const [openRegisterDialog, setOpenRegisterDialog] =
    React.useState<boolean>(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
    if (type === "login") setOpenLoginDialog(true);
    if (type === "register") setOpenRegisterDialog(true);
  };

  const handleDialogClose = (type: string) => {
    if (type === "login") setOpenLoginDialog(false);
    if (type === "register") setOpenRegisterDialog(false);
  };

  React.useEffect(()=>{
    // console.log(loginStatus)
    if (router.query?.showLoginForm) setOpenLoginDialog(true)
  },[router.query])

  const [isHoverHeart, setIsHoverHeart] = useState<boolean>(false);
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
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
    const loginStatus = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
    const onSubmit = (data: any) => {
      dispatch(login(data))
      handleDialogClose("login")
    };

    return (
      <Dialog open={openLoginDialog} onClose={() => handleDialogClose("login")}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: 400, maxWidth: "100%" }}
        >
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <StyledInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              register={register}
              required
              error={!!errors.email}
              helperText="Email is required"
              type="email"
            />
            <StyledInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              register={register}
              required
              error={!!errors.password}
              helperText="Password is required"
              type="password"
            />
            <p>
              Don{"'"}t have an account?{" "}
              <TagToChangeForm
                onClick={() => {
                  handleDialogClose("login");
                  handleDialogOpen("register");
                }}
              >
                Register
              </TagToChangeForm>
            </p>
          </DialogContent>
          {problem && (
            <Typography variant="body1" color="red" mb={2} align="center">
              {problemDetail}
            </Typography>
          )}
          <DialogActions>
            <StyledButton onClick={() => handleDialogClose("login")}>
              Cancel
            </StyledButton>
            <StyledButton type="submit">Submit</StyledButton>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  const RegisterForm = () => {
    const registerStatus:any = useSelector((state: RootState) => state.register);
    const dispatch = useDispatch();
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
    const [imageKey, setImageKey] = useState("");
    const onSubmit = (data: any) => {
      if (imageKey === "") {
        dispatch(OpenAlertAction({type:"error", content: "Please Select an User image"}))
        return;
      }else if (data.password !==data.confirmPassword){
        dispatch(OpenAlertAction({type:"error", content: "Password & Confirm Password should be the same"}))
        return;
      }
      dispatch(registerThunk(data, imageKey));
    };
    return (
      <Dialog
        open={openRegisterDialog}
        onClose={() => handleDialogClose("register")}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: 400, maxWidth: "100%" }}
        >
          <DialogTitle>
            Register
          </DialogTitle>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {CharacterImageList.map((charactor) => {
              return (
                <Grid
                  item
                  key={charactor.id}
                  onClick={() => {
                    setImageKey(charactor.image_key);
                  }}
                >
                  <Box
                    style={{
                      border: ` ${
                        imageKey === charactor.image_key
                          ? "5px solid purple"
                          : "3px solid white"
                      }`,
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    <Image
                      layout="intrinsic"
                      src={charactor.image_url}
                      alt={charactor.image_key}
                      width="100%"
                      height="100%"
                      objectFit="contain"
                      placeholder="blur" 
                      blurDataURL="/blur.png"
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
            <StyledInput
              label="first name"
              name="firstName"
              placeholder="Enter your first name"
              register={register}
              required
              error={!!errors.first_name}
              helperText="First name is required"
              type="text"
            />
            <StyledInput
              label="last name"
              name="lastName"
              placeholder="Enter your last name"
              register={register}
              required
              error={!!errors.last_name}
              helperText="Last name is required"
              type="text"
            />
            <StyledInput
              label="email"
              name="email"
              placeholder="Enter your email"
              register={register}
              required
              error={!!errors.email}
              helperText="Email is required"
              type="email"
            />
            <StyledInput
              label="password"
              name="password"
              placeholder="Enter your password"
              register={register}
              required
              error={!!errors.password}
              helperText="Password is required"
              type="password"
            />
            <StyledInput
              label="confirm password"
              name="confirmPassword"
              placeholder="Enter your confirm password"
              register={register}
              required
              error={!!errors.confirm_password}
              helperText="Confirm password is required"
              type="password"
            />
            <p>
              Already have an account?{" "}
              <TagToChangeForm
                onClick={() => {
                  handleDialogClose("register");
                  handleDialogOpen("login");
                }}
              >
                Login
              </TagToChangeForm>
            </p>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={() => handleDialogClose("register")}>
              Cancel
            </StyledButton>
            {/* <StyledButton type="submit">Submit</StyledButton> */}
            <StyledLoadingButton type="submit" loading={registerStatus.loading} >Submit</StyledLoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar style={{ position: "sticky", backgroundColor: 'white' }}>
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
            <SearchComponent/>
            {Object.keys(loginStatus).length > 1 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ marginRight: "20px", borderRadius: 5, overflow: 'hidden' , cursor:'pointer'}}>
                  <Link href={'/profile/me'} passHref>
                    <Image src={userProfile.imageKey || "/user_icon/noUserImage.jpg"} alt='user icon' width={50} height={50} placeholder="blur" blurDataURL="/blur.png"/>
                  </Link>
                </Typography>
                <button  onMouseOver={()=>setIsHoverHeart(true)} onMouseLeave={()=>setIsHoverHeart(false)} style={{background:'none', border:'none',marginRight:'10px',cursor:'pointer'}} onClick={()=>router.push("/likes")}  >
                  {isHoverHeart 
                  ?
                  <FavoriteIcon sx={{ color: 'white' }}/>
                  :
                  <FavoriteBorderIcon sx={{ color: 'white' }}/>
                  }             
                </button>
                {/* <Box mr={1}>
                  <Link href="/add_game" passHref>
                    <StyledButton>add games</StyledButton>
                  </Link>
                </Box> */}
                <StyledButton 
                onClick={() => {
                  dispatch(logOut())
                  router.push("/")
                  }}>
                  LogOut
                </StyledButton>
              </Box>
            ) : (
              <StyledButton onClick={() => handleDialogOpen("login")}>
                Login
              </StyledButton>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <LoginForm />
      <RegisterForm />
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}