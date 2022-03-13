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

import Image from 'next/image';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { server } from '../../config';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { CharacterImageList } from '../../public/user_icon/user_icon';
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

export default function ResponsiveDrawer(props: Props) {
  const { window, gameDetails,postList,gameInfo } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState<any>([]);
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
          <Image layout="intrinsic" src={gameInfo.image_url} alt="game image" width={'150px'} height={'200px'} placeholder={"blur"}/>
        </Box>
      </List>
      <Divider />
      <List sx={{justifyContent:'center',display:'flex', flexDirection:'column', alignItems:'center'}}>
      {postList.map((post:postProps,index:number) => {
                    const { id,seller, location, price, imageKey } = post;
                    return (
                      <Link href={`/game/${id}`} key={index} passHref>
                        <Box  sx={{ display: 'flex', justifyContent: 'space-Between', width: '80%', borderRadius: 2, padding: 1 ,cursor: 'pointer'}} bgcolor={"var(--mainGrey)"} mt={5}>
                            <Box sx={{ position: 'relative', width: 50, height: 50, borderRadius: 2, overflow: 'hidden' }} ml={-3} mt={-3}>
                              <Image layout="fill" src={imageLocation} onLoad={()=>handleUserImage(imageKey)} alt="user icon" />
                            </Box>
                            <Box>
                                <Typography color={"#C0C0C0"}>Seller</Typography>
                                <Typography ml={2}>{seller}</Typography>
                            </Box>
                            <Box>
                                <Typography color={"#C0C0C0"}>Location</Typography>
                                <Typography ml={2}>{location}</Typography>
                            </Box>
                            <Box>
                                <Typography color={"#C0C0C0"}>Price</Typography>
                                <Typography ml={2}>${price}</Typography>
                            </Box>
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
                <Typography bgcolor='var(--mainPurple)' paddingX={1} mt={-1} zIndex={2} sx={{borderRadius:2, cursor: 'pointer'}}>{user_name}</Typography>
              </Link>

            </Box>

            {contact_method &&
                <a href={`https://wa.me/${contact_method}`}>
                    <WhatsAppIcon style={{ width: 50, height: 50, marginLeft: 40, color: '#fff', backgroundColor: 'var(--mainGrey)', padding: 4, borderRadius: 4 }} />
                </a>
            }
          </Box>
            <Grid container spacing={1} display="flex" alignItems='center'>
                <Grid item lg={6} >
                    <Box style={{ color: '#fff', backgroundColor: 'var(--mainGrey)', padding: 12, borderRadius: 4 }}>
                        ${price}
                    </Box>
                </Grid>
                <Grid item lg={6} >
                    <Box style={{ color: '#fff', backgroundColor: 'var(--mainGrey)', padding: 12, borderRadius: 4 }}>
                        {place_for_transaction}
                    </Box>
                </Grid>
            </Grid>
            {/* Description */}
            <Grid container display="flex" alignItems='center' mt={2} >
                <Grid item  xs={12} sm={12} md={10} lg={6} xl={4}>
                    <Box position='relative' style={{ color: '#fff', backgroundColor: 'var(--mainGrey)', padding: '12px 24px 36px 12px', borderRadius: 4 }}>
                        Description:
                        <br /><br />
                        {description === "" ? "This guy didn't say anything left" : description}
                        <Box position="absolute" bottom={-18} right={-18} sx={{backgroundColor:'var(--mainPurple)'}} padding={1}>
                            {new Date(new Date(created_date).getTime()).toLocaleString("en-US")}
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