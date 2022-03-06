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
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Image from 'next/image';
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import { server } from '../../../config';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { string } from 'yup';
import { CharacterImageList } from '../../../public/user_icon/user_icon';
const drawerWidth = 375;

interface Props {
  window?: () => Window;
  postList: any;
}
interface postProps  {
  id: number;
  seller: string;
  location: string;
  price: number;
  imageKey: string,
}

export default function ResponsiveDrawer(props: Props) {
  const { window, postList } = props;
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
    <div >
      <Toolbar >          
        <IconButton
            color="inherit"
            aria-label="close drawer"
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
          <Image layout="intrinsic" src="/game_sample.png" alt="game image" width={'150px'} height={'200px'} />
        </Box>
      </List>
      <Divider />
      <List sx={{justifyContent:'center',display:'flex', flexDirection:'column', alignItems:'center'}}>
      {postList.map((post:postProps,index: number) => {
                    const { id ,seller, location, price, imageKey} = post;
                    return (
                      <Link href={`/game/${id}`} key={index} passHref>
                        <Box sx={{ display: 'flex', justifyContent: 'space-Between', width: '80%', borderRadius: 2, padding: 1 ,cursor: 'pointer'}} bgcolor={"var(--mainGrey)"} mt={5}>
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
  // const { contact_method, created_date, description, place_for_transaction, price, user_name, game_name } = gameDetails;
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
        sx={{ width: {md: drawerWidth }, flexShrink: { md: 0 } }}
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
            display: { xs: 'block', sm: 'block', md: 'none',lg:'none', xl: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'none' , md: 'block',lg:'block', xl: 'block'},
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
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* Right Hand side */}
        <Grid item xs={12} md={12} lg={8} sx={{ height: '100vh', overflowY: 'hidden'}}>
          {/* Big Screen */}
          {<Box sx={{display: { xs: 'none',sm: 'none', md: 'flex',lg:'flex', xl: 'flex' }, justifyContent:'center', alignItems:'center',height:'60vh'}}>
            <Box mr={5}>
             <KeyboardDoubleArrowLeftIcon fontSize='large'/>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
              <Typography>Start Browssing</Typography>
              <Typography> Post Here</Typography>
            </Box>
          </Box>}
          {/* Screen Screen */}
          {<Box sx={{display: { xs: 'flex',sm: 'flex', md: 'none',lg:'none', xl: 'none' },flexDirection:'column', justifyContent:'center', alignItems:'center',height:'60vh'}}>
            <Box sx={{transform: 'rotate(315deg)'}}mb={2}>
             <KeyboardDoubleArrowUpIcon fontSize='large'/>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
              <Typography>Start Browssing</Typography>
              <Typography> Post Here</Typography>
            </Box>
          </Box>}
        </Grid>
      </Box>
    </Box>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context.query)
  const { gameId } = context.query

  const postList = await (await axios.get(`${server}/api/v1/game_sale_post/games/${gameId}`)).data
  // console.log(gameDetails.game_sale_post.games_ID)
  // const gamePostList = await(await axios.get(`${server}/games/1`)).data
  return {
      props: {
          postList
      }
  }
}