import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import { Grid, Typography, Box, Divider } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';

import Image from 'next/image';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { axiosInstance, server } from '../../config';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { CharacterImageList, defaultImage } from '../../public/user_icon/user_icon';
import { useDispatch, useSelector } from 'react-redux';
import { OpenAlertAction } from '../../store/action/alert';
import { RootState } from '../../store/reducer';
import timeSince from '../../utility/timeSince';
import styled from '@emotion/styled';

const drawerWidth = 375;

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

const ImageContainer = styled(Grid)({

});

const Information = styled(Grid)({
  padding: 4,
  width: '100%'
});

const Ball = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'var(--mainGreen)',
  fontSize: 10
})

const ThirdTitle = styled(Typography)({
  fontSize: 12,
  color: 'var(--black)',
})

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
  const { window, gameDetails, postList, gameInfo } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState<any>([]);
  const [isHoverHeart, setIsHoverHeart] = React.useState<boolean>(false);
  const [isLiked,setIsLiked] = React.useState<boolean>(false);

  React.useEffect(()=>{
    fetchIsLikedPost()
  },[gameDetails.id]);

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

  const [imageLocation,setImagLocation] = React.useState<string>(defaultImage);
  const [drawerImageLocation, setDrawerImageLocation] =  React.useState<string[]>(Array(postList.length).fill(defaultImage) || [defaultImage]);
  const handleUserImage = (imageKey:string, isDrawerImage: boolean = false, index: number = 0)=>{
    CharacterImageList.forEach(data =>{
      if (data.image_key===imageKey){
        if (isDrawerImage){
          let newDrawerImageLocation = drawerImageLocation;
          newDrawerImageLocation[index] = data.image_url;
          setDrawerImageLocation(newDrawerImageLocation);
        }else{
          setImagLocation(data.image_url);  
        }
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
      <Toolbar sx={{ display: { md: 'none' } }}>          
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2}}
          >            
          <ArrowLeftIcon sx={{fontSize:'36px'}} />
        </IconButton>

      </Toolbar>
      <Divider/>
      {/* <List sx={{justifyContent:'center',display:'flex'}}>
        <Box>
          <Image layout="intrinsic" src={gameInfo.image_url} alt="game image" width={'150px'} height={'200px'} placeholder="blur" blurDataURL="/blur.png"/>
        </Box>
      </List>
      <Divider /> */}
      <List sx={{justifyContent:'center',display:'flex', flexDirection:'column', alignItems:'center'}}>
      {postList.map((post:postProps,index:number) => {
                    const { id,seller, location, price, imageKey } = post;
                    return (
                      <Link href={`/game/${id}`} key={index} passHref>
                        <Box  sx={{ display: 'flex', justifyContent: 'space-Between', width: '80%', borderRadius: 2, padding: 1 ,cursor: 'pointer'}} bgcolor={"var(--mainLightGrey)"} mt={5}>
                            <Box sx={{ position: 'relative', width: 50, height: 50, borderRadius: 2, overflow: 'hidden' }} ml={-3} mt={-3}>
                              <Image layout="fill" src={drawerImageLocation[index]} onLoad={()=>handleUserImage(imageKey, true, index)} alt="user icon" placeholder="blur" blurDataURL="/blur.png"/>
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
        {/* <Navbar/> */}
        <Toolbar 
          sx={
            { 
              display: { xs: 'flex',sm: 'flex', md: 'none',lg:'none', xl: 'none' },
              alignItems:'center',
              position:'absolute',
              backgroundColor:'var(--mainGrey)', 
              top: 'var(--navBarHeight)',
              height: 'var(--navBarHeight)',
              width:'100%'}
          }>
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
      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
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
        {/* Desktop Drawer */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            boxShadow: 'var(--mainShadow)',
            width: drawerWidth,
            height: '100vh',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Box>
      </Box>
      {/* Game Post Detail */}
      <Box
        component="main"
        sx={{ flexGrow: 1, padding: 1, width: { md: `calc(100% - ${drawerWidth}px)` }, mt: 'var(--navBarHeight)', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid container sx={{ overflowY: 'hidden', maxWidth: '900px'}}>
          <ImageContainer item xs={12} sm={12} md={6}>
            <Box position='relative' style={{marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Box width={'300px'} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <Box sx={{width: '200px', height: '280px', position: 'relative', bgcolor: 'var(--mainLightGrey)', padding: '20px', borderRadius: '10px', overflow:'hidden'}}>
                    <Image 
                        src={gameInfo.image_url}
                        alt="game image"
                        placeholder="blur" 
                        blurDataURL="/blur.png"
                        layout="fill"
                        objectFit='contain'
                    />
                </Box>
                <Box position="relative" bottom={70} right={-100} sx={{}} padding={1}>
                  <Box sx={{width: '100px', height: '100px', position: 'relative', padding: '20px', borderRadius: 5, overflow:'hidden'}}>
                      <Image 
                          src={imageLocation} onLoad={()=>handleUserImage(imageKey)} 
                          alt="user icon"
                          placeholder="blur" 
                          blurDataURL="/blur.png"
                          layout="fill"
                          objectFit='contain'
                      />
                  </Box>
                </Box>
              </Box>
            </Box>
          </ImageContainer>
          <Information item sm={12} md={6}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography sx={{fontSize: '40px', fontWeight: 'bolder'}}>${price}</Typography>
              <Box>
                {contact_method &&
                  <a href={`https://wa.me/${contact_method}`}>
                      <WhatsAppIcon sx={{ color: 'var(--black)' }} />
                  </a>
                }
                <button  onMouseOver={()=>setIsHoverHeart(true)} onMouseLeave={()=>setIsHoverHeart(false)} style={{background:'none', border:'none',cursor:'pointer'}} onClick={()=>handleSubscribe()} >
                  {isHoverHeart || isLiked
                  ?
                  <FavoriteIcon sx={{ color: 'var(--black)' }}/>
                  :
                  <FavoriteBorderIcon sx={{ color: 'var(--black)' }}/>
                  }             
                </button>
              </Box>
            </Box>
            <Box display={'flex'} alignItems='center' sx={{margin: '5px 0px 0px 2px',}}>
                <Ball>
                    <CircleIcon fontSize="inherit"/>
                </Ball>
                <ThirdTitle paddingX={1}>Available at: <span style={{fontWeight: 'bold'}}>{place_for_transaction}</span></ThirdTitle>
            </Box>
            {/* Description */}
            <Box display={"flex"} flexDirection={"column"} style={{ color: "var(--black)", marginTop: 10}}>
              <Typography style={{fontWeight: 'bolder'}}>Description:</Typography>
              <Typography>{description === "" ? "This guy is so lasy, he didn't put down anything." : description}</Typography>
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Box sx={{backgroundColor:'var(--mainBlue)',borderRadius: 1}} padding={1} marginTop={4}>
                    Posted {timeSince(created_date)} ago
                </Box>
              </Box>
            </Box>
          </Information>
        </Grid>
      </Box>
    </Box>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.query;

  const [gameDetails] = await (await axios.get(`${server}/api/v1/game_sale_post/id/${postId}`)).data;
  const gameInfo = await (await axios.get(`${server}/api/v1/games/byId/${gameDetails.game_sale_post.games_ID}`)).data;
  const postList = await (await axios.get(`${server}/api/v1/game_sale_post/games/${gameDetails.game_sale_post.games_ID}`)).data;

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
