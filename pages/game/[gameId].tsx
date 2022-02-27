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
const drawerWidth = 375;
// const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  gameDetails: any;
}

export default function ResponsiveDrawer(props: Props) {
  const { window, gameDetails } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const posts = {
    seller: 'mandy',
    location: 'yau tong',
    price: 200,
    image: '/user_sample.jpg',
    decription: 'find me on whatsapp',
    date: '18/9/21'
}

  const drawer = (
    <div>
      <Toolbar >          
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >            
          <ArrowLeftIcon sx={{fontSize:'36px'}} />
        </IconButton>

      </Toolbar>
      <Divider/>
      <List sx={{justifyContent:'center',display:'flex'}}>
        <Box>
          <Image layout="intrinsic" src="/game_sample.png" width={'150px'} height={'200px'} />
        </Box>
      </List>
      <Divider />
      <List sx={{justifyContent:'center',display:'flex', flexDirection:'column', alignItems:'center'}}>
      {Array.from(Array(9)).map((item) => {
                    const { seller, location, price, image, decription, date } = posts;
                    return (
                        <Box key={image} sx={{ display: 'flex', justifyContent: 'space-Between', width: '80%', borderRadius: 2, padding: 1 }} bgcolor={"var(--mainGrey)"} mt={5}>
                            <Box sx={{ position: 'relative', width: 50, height: 50, borderRadius: 2, overflow: 'hidden' }} ml={-3} mt={-3}>
                                <Image layout="fill" src={image} alt="user icon" />
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
                    )
                })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  // console.log(gameDetails)
  const { contact_method, created_date, description, place_for_transaction, price, user_name, game_name } = gameDetails;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Navbar/>
        <Toolbar sx={{ display: { xs: 'flex', md: 'none',lg:'none', xl: 'none' } ,alignItems:'center'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>

      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
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
        <Grid item xs={12} md={12} lg={8} sx={{ height: '100vh', overflowY: 'hidden' }}>
          <Box padding={5}>
          <Box display="flex" alignItems='center'>
            <Image src="/user_icon/user_1.svg" alt="user icon" width={'150px'} height={'200px'} />
                <Typography ml={2}>{user_name}</Typography>
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
                        <Box position="absolute" bottom={8} right={8}>
                            Updated at {new Date(new Date(created_date).getTime()).toLocaleString("en-US")}
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
  const { gameId } = context.query

  const [gameDetails] = await (await axios.get(`${server}/api/v1/game_sale_post/id/${gameId}`)).data
  return {
      props: {
          gameDetails: {
              ...gameDetails.game_sale_post,
              user_name: gameDetails.user_name,
              game_name: gameDetails.game_name,
          }
      }
  }
}