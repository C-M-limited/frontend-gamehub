import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Toolbar from '@mui/material/Toolbar';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Grid, Typography, Box, Divider } from '@mui/material';
import jwt from 'jwt-decode';

import Image from 'next/image';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { axiosInstance, server } from '../../config';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { CharacterImageList } from '../../public/user_icon/user_icon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { OpenAlertAction } from '../../store/action/alert';
import { RootState } from '../../store/reducer';
import timeSince from '../../utility/timeSince';

const drawerWidth = 375;
// const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  gameDetails: any;
  postList: any;
  gameInfo: gameInfoProps;
}

interface postProps  {
  id: number;
  seller: string;
  location: string;
  price: number;
  imageKey: string;
}
interface gameInfoProps{
  id: number;
  name: string;
  image_url: string;
  console_Id: number;
}

interface userProfileProps{
  role  : string;
  id    : number;
  email : string;
  name  : string;
  imageKey: string;
}

interface tagsProps {
	tags: string;
	variable: string | number;
}

const Tags = ({tags, variable}: tagsProps)=> {
  return (
	<Box>
		<Typography color={"var(--mainGrey)"} style={{fontWeight: 'bolder'}}>{tags}</Typography>
		<Typography ml={2} color={'var(--black)'}>{variable}</Typography>
	</Box>
  );
}

export default function ResponsiveDrawer(props: Props) {
  const dispatch= useDispatch();
  const loginStatus = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.userProfile);
  const { window, gameDetails,postList,gameInfo } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState<any>([]);
  const [isHoverHeart, setIsHoverHeart] = React.useState<boolean>(false);
  const [isLiked,setIsLiked] = React.useState<boolean>(false);

  React.useEffect(()=>{
    fetchIsLikedPost()
  },[gameDetails.id])
  const fetchIsLikedPost= async()=>{
    if (user.id===undefined){return} 
      await (axiosInstance.get(`/subscribed_post/user&post/?userId=${user.id}&postId=${gameDetails.id}`))
        .then((res)=>{
          setIsLiked(res.data);
        })
        .catch((err)=>{
          dispatch(OpenAlertAction({type:"error",content:'Sorry, Subscribe is not working'}))
        })
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [imageLocation,setImagLocation] = React.useState("/user_icon/noUserImage.jpeg");
  const handleUserImage = (imageKey:string)=>{
    CharacterImageList.forEach(data =>{
      if (data.image_key===imageKey){
        setImagLocation(data.image_url);  
      }
    } )
  }
  const handleSubscribe = async()=>{
    // return if the user haven't logIn
    if (Object.keys(loginStatus).length <= 1){
      return dispatch(OpenAlertAction({type:'warning',content:'Please LogIn to use the Subscribe Function'}))
    }
    
    await axiosInstance.post('/subscribed_post',{"userProfile":{"id": user.id}, "gameSalePost":{"id": gameDetails.id}})
      .then((res)=>{
        if (res.data==="Added"){
          dispatch(OpenAlertAction({type:'success', content:'Liked'}))
          setIsLiked(true)
        }else if (res.data==="Deleted"){
          dispatch(OpenAlertAction({type:'success',content:'Cancenled Likes'}))
          setIsLiked(false)
        }
      })
      .catch((err)=>{
        dispatch(OpenAlertAction({type:"error",content:'Sorry, Please Try again later'}))
      })
  }

  const drawer = (
    <div>
      <Toolbar >          
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >            
          <ArrowLeftIcon sx={{fontSize:'36px'}} />
        </IconButton>

      </Toolbar>
      <Divider/>
      <List sx={{justifyContent:'center',display:'flex'}}>
        <Box>
          <Image layout="intrinsic" src={gameInfo.image_url} alt="game image" width={'150px'} height={'200px'} placeholder="blur" blurDataURL="/blur.png"/>
        </Box>
      </List>
      <Divider />
      <List sx={{justifyContent:'center',display:'flex', flexDirection:'column', alignItems:'center'}}>
      {postList.map((post:postProps,index:number) => {
                    const { id,seller, location, price, imageKey } = post;
                    return (
                      <Link href={`/game/${id}`} key={index} passHref>
                        <Box  sx={{ display: 'flex', justifyContent: 'space-Between', width: '80%', borderRadius: 2, padding: 1 ,cursor: 'pointer'}} bgcolor={"var(--mainLightGrey)"} mt={5}>
                            <Box sx={{ position: 'relative', width: 50, height: 50, borderRadius: 2, overflow: 'hidden' }} ml={-3} mt={-3}>
                              <Image layout="fill" src={imageLocation} onLoad={()=>handleUserImage(imageKey)} alt="user icon" placeholder="blur" blurDataURL="/blur.png"/>
                            </Box>
                            <Tags tags={'Seller'} variable={seller}/>
                            <Tags tags={'Location'} variable={location}/>
                            <Tags tags={'Price'} variable={price}/>
                        </Box>
                      </Link>
                    )
                })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  // console.log(gameDetails)
  const { contact_method, created_date, description, place_for_transaction, price, user_name, imageKey, user_Id } = gameDetails;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Navbar/>
        <Toolbar sx={{ display: { xs: 'flex',sm: 'flex', md: 'none',lg:'none', xl: 'none' } ,alignItems:'center',position:'absolute', top:{xs: '7vh', sm: '8vh'},backgroundColor:'var(--mainGrey)',width:'100%' ,borderBottom:'2px solid black'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>

      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Game Post Detail */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Grid item xs={12} md={12} lg={8} sx={{ height: '100vh', overflowY: 'hidden' }}>
          <Box padding={5}>
          <Box display="flex" alignItems='center'>
            <Box display="flex" alignItems='center' flexDirection="column" mb={2}>
              <Box sx={{ position: 'relative', width: 150, height: 150, borderRadius: 5, overflow: 'hidden' }}  >
              <Image src={imageLocation} onLoad={()=>handleUserImage(imageKey)} alt="user icon" width={'200px'} height={'200px'}/>
              </Box>
              <Link href={`/profile/${user_Id}`} passHref>
                <Typography bgcolor='var(--mainBlue)' paddingX={1} mt={-1} zIndex={2} sx={{borderRadius:2, cursor: 'pointer'}}>{user_name}</Typography>
              </Link>

            </Box>

            {contact_method &&
                <a href={`https://wa.me/${contact_method}`}>
                    <WhatsAppIcon style={{ width: 50, height: 50, marginLeft: 40, color: "var(--black)", backgroundColor: "var(--mainLightGrey)", padding: 4, borderRadius: 4 }} />
                </a>
            }
          </Box>
          <Grid container display="flex" alignItems='center' mt={2} >
            <Grid item  xs={12} sm={12} md={10} lg={6} xl={4} display="flex">
              <Grid container spacing={1} display="flex" alignItems='center'>
                  <Grid item  >
                      <Box style={{ color: "var(--black)", backgroundColor: "var(--mainLightGrey)", padding: 12, borderRadius: 4 }}>
                          ${price}
                      </Box>
                  </Grid>
                  <Grid item  >
                      <Box style={{ color: "var(--black)", backgroundColor: "var(--mainLightGrey)", padding: 12, borderRadius: 4 }}>
                          {place_for_transaction}
                      </Box>
                  </Grid>
              </Grid>
              <button  onMouseOver={()=>setIsHoverHeart(true)} onMouseLeave={()=>setIsHoverHeart(false)} style={{background:'none', border:'none',cursor:'pointer'}} onClick={()=>handleSubscribe()} >
                {isHoverHeart || isLiked
                ?
                <FavoriteIcon sx={{ color: 'white' }}/>
                :
                <FavoriteBorderIcon sx={{ color: 'white' }}/>
                }             
              </button>
            </Grid>
          </Grid>

            {/* Description */}
            <Grid container display="flex" alignItems='center' mt={2} >
                <Grid item  xs={12} sm={12} md={10} lg={6} xl={4}>
                    <Box position='relative' style={{ color: "var(--black)", backgroundColor: "var(--mainLightGrey)", padding: '12px 24px 36px 12px', borderRadius: 4 }}>
                        <Box style={{fontWeight: 'bolder'}}>Description:</Box>
                        <br />
                        {description === "" ? "This guy didn't say anything left" : description}
                        <Box position="absolute" bottom={-18} right={-18} sx={{backgroundColor:'var(--mainBlue)',borderRadius: 1}} padding={1}>
                            {/* {new Date(new Date(created_date).getTime()).toLocaleString("en-US")} */}
                            Posted {timeSince(created_date)} ago
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            </Box>
        </Grid>
      </Box>
    </Box>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context.query)
  const { postId } = context.query

  const [gameDetails] = await (await axios.get(`${server}/api/v1/game_sale_post/id/${postId}`)).data
  const gameInfo = await (await axios.get(`${server}/api/v1/games/byId/${gameDetails.game_sale_post.games_ID}`)).data
  const postList = await (await axios.get(`${server}/api/v1/game_sale_post/games/${gameDetails.game_sale_post.games_ID}`)).data
  // console.log(gameDetails.game_sale_post.games_ID)
  // const gamePostList = await(await axios.get(`${server}/games/1`)).data
  return {
      props: {
          gameDetails: {
              ...gameDetails.game_sale_post,
              user_name: gameDetails.user_name,
              game_name: gameDetails.game_name,
              imageKey: gameDetails.user_image_key
          },
          postList,
          gameInfo
      }
  }
}


  // const ISSERVER = typeof window === "undefined";

  // let user:userProfileProps={role:'',id:-1,email:'abc@abc.com',name:'notexist',imageKey:'abc'}
  // if(!ISSERVER) {
  //   if (localStorage.getItem("access-token") !== null){
  //       user = jwt(localStorage.getItem("access-token") || "");
  //   }
  // }