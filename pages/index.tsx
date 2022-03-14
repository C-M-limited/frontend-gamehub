import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/system'
import axios from 'axios'
import type { NextPage } from 'next'
import StyledHero from '../components/template/StyledHero'
import TodaysPickGameItem from '../components/template/TodaysPickGameItem'
import { axiosInstance, server } from '../config'
import Carousel from 'react-material-ui-carousel'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// const playstation = require('../public/game_list/playstation.json')
// const nintendo = require('../public/game_list/nintendo_test.json')

const SubTitle = styled(Typography)({
  fontSize: 24,
  color: '#ffffff',
  height: 36,
  background: 'linear-gradient(90deg, rgba(102,0,255,1) 0%, rgba(180,28,255,1) 100%)',
  borderRadius: 4,
  padding: '8px 20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '200px',
  marginBottom: '30px',
  border: '2px solid gold'
})

interface gameProps {
  game_sale_post: postDetailProps;
  user_name: string;
  game_name: string;
  image_url: string;
  console_brand_name: string;
}
interface postDetailProps {
  id: number;
  price: number,
  place_for_transaction: string;
  created_date: string;
  description?: string;
  contact_method: string;
  user_Id: number;
  games_ID: number;
}

const Home: NextPage = ({ latestGames, todaysGames }: any) => {
  // console.log(latestGames.gameDetails)
  return (
    <>
      <StyledHero />
      {
        todaysGames.length > 0
        &&
        <Grid container display="flex" justifyContent="center">
          <Grid item lg={10}>
            <SubTitle sx={{marginTop:{xs:'30px',sm:'0'}}}>Today{"'"}s Picks</SubTitle>
            {/* show 5 on xl */}
            <Grid container spacing={2} sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' } }} justifyContent="center" >
              {todaysGames.map((game: gameProps) => {
                const { game_sale_post, user_name, game_name, image_url, console_brand_name } = game;
                const { id, price, place_for_transaction, created_date, description, contact_method, user_Id, games_ID } = game_sale_post
                return (
                  <Grid item key={id}>

                    <TodaysPickGameItem game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name} />

                  </Grid>
                )
              })}
            </Grid>
            {/* show carousel on small screen */}
            <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' } }} >
              <Carousel NextIcon={<KeyboardArrowRightIcon />} PrevIcon={<KeyboardArrowLeftIcon />}>
                {todaysGames.map((game: gameProps) => {
                  const { game_sale_post, game_name, image_url, console_brand_name } = game;
                  const { id, price, place_for_transaction } = game_sale_post
                  return (
                    <TodaysPickGameItem key={id} game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name} />
                  )
                })}
              </Carousel>
            </Box>
          </Grid>
        </Grid>}
      {latestGames.length > 0
        &&
        <Grid container display="flex" justifyContent="center" mt={5}>
          <Grid item lg={10}>
            <SubTitle>Latest Posts</SubTitle>
            <Grid container spacing={2} sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' } }} justifyContent="center">
              {latestGames.map((game: gameProps) => {
                const { game_sale_post, user_name, game_name, image_url, console_brand_name } = game;
                const { id, price, place_for_transaction, created_date, description, contact_method, user_Id, games_ID } = game_sale_post
                return (
                  <Grid item key={id}>
                    <TodaysPickGameItem game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name} />
                  </Grid>
                )
              })}
            </Grid>
            {/* show carousel on small screen */}
            <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' } }}>
              <Carousel NextIcon={<KeyboardArrowRightIcon />} PrevIcon={<KeyboardArrowLeftIcon />}>
                {latestGames.map((game: gameProps) => {
                  const { game_sale_post, user_name, game_name, image_url, console_brand_name } = game;
                  const { id, price, place_for_transaction, created_date, description, contact_method, user_Id, games_ID } = game_sale_post
                  return (
                    <TodaysPickGameItem key={id} game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name} />
                  )
                })}
              </Carousel>
            </Box>
          </Grid>
        </Grid>}
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
  let latestGames = []
  let todaysGames = []

  try {
    const latestRes = await axiosInstance.get('game_sale_post/latestPost')
    const todaysRes = await axiosInstance.get('post_click_rate')
    latestGames = latestRes.data.content;
    todaysGames = todaysRes.data.content;
    console.log(latestRes)
  }
  catch (err) {
    console.log(err)
  }

  return {
    props: {
      latestGames,
      todaysGames
    }
  }
}