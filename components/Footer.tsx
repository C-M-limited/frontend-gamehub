import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import { styled } from '@mui/system';
import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';

const IconButton = styled(Button)({
  position: 'relative',
  backgroundColor: '#8d8d8d',
  color: '#ffffff',
  width: 30,
  height: 50,
  margin: '20px 10px 20px 0px',
})

const FooterTitle = styled(Typography)({
  fontSize: 20,
  fontWeight: 700,
  marginBottom: 20,
})

const FooterContent = styled(Typography)({
  fontSize: 16,
  marginBottom: 20,
  fontWeight: 100,
  cursor: 'pointer',
  '&:hover': {
    color: 'var(--mainGrey)'
  }
})

const filterList = [
  { name: "All", brand: 'all', src: "/console_brand/all" },
  { name: "Play station", brand: "playstation", src: "/console_brand/ps" },
  { name: "Nintendo", brand: "nintendo", src: "/console_brand/nintendo" },
  { name: "X Box", brand: "xbox", src: "/console_brand/xbox" },
]
// #151520
const Footer = () => {
  return (
    <Grid container spacing={1} bgcolor="#151520" display="flex" justifyContent="center" mt={5}>
      <Grid item xs={11} lg={8} display="flex" justifyContent="center" mt={2}>
        <Grid item xs={12} lg={6} display="flex"  flexDirection={'column'} alignItems="center">
          <Grid>
            <FooterTitle>Game Hub</FooterTitle>
            <Typography>Help you find your dream game</Typography>
            {/* <Box display="flex" alignItems="center" sx={{flexDirection: { xs: 'column', sm: 'row'}}} >
              <IconButton>
                <TwitterIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
              <IconButton>
                <GoogleIcon />
              </IconButton>
            </Box> */}
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3} display="flex"  flexDirection={'column'} alignItems="center">
          <Grid>
            <FooterTitle>My account</FooterTitle>
            <Link href={'/profile/me'} passHref><FooterContent>Profile</FooterContent></Link>
            <FooterContent><Link href="/add_game" passHref>Sell my game</Link></FooterContent>
            {/* <FooterContent>Browse random game</FooterContent> */}
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3} display="flex"  flexDirection={'column'} alignItems="center">
          <Grid>
            <FooterTitle>Resource</FooterTitle>
            {
              filterList.map((item)=>(
                <Link key={item.src} href={item.src} passHref>
                  <FooterContent>{item.name}</FooterContent>
                </Link>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default Footer;
