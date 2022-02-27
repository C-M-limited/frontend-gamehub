import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import axios from 'axios'
import type { NextPage } from 'next'
import StyledHero from '../components/template/StyledHero'
import TodaysPickGameItem from '../components/template/TodaysPickGameItem'
import { server } from '../config'
const playstation = require('../public/game_list/playstation.json')
const nintendo = require('../public/game_list/nintendo_test.json')

const SubTitle = styled(Typography)({
  fontSize: 24,
  color: '#ffffff',

})
interface gameProps{
  game_sale_post: postDetailProps;
  user_name: string;
  game_name: string;
  image_url: string;
  console_brand_name: string;
}
interface postDetailProps{
  id: number;
  price: number,
  place_for_transaction: string;
  created_date: string;
  description?: string;
  contact_method: string;
  user_Id: number;
  games_ID: number;
}
const Home: NextPage = ({latestGames,todaysGames}:any) => {
  // console.log(latestGames.gameDetails)
  return (
    <>
      <StyledHero/>
      {/* todays Pick */}
      <Grid container display="flex" justifyContent="center">
        <Grid item lg={10}>
          <SubTitle>Today{"'"}s Picks</SubTitle>
          <Grid container spacing={2} display={"flex"} justifyContent="center">
          {todaysGames.map((game:gameProps)=>{
            const { game_sale_post,user_name,game_name,image_url,console_brand_name } = game;
            const {id,price,place_for_transaction,created_date,description,contact_method,user_Id,games_ID } = game_sale_post
            return(
              <Grid item key={id}>
              <TodaysPickGameItem game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name}/>
              </Grid>
            )
          })}
          </Grid>
        </Grid>
      </Grid>
      {/* Latest Post */}
      <Grid container display="flex" justifyContent="center">
        <Grid item lg={10}>
          <SubTitle>Latest Posts</SubTitle>
          <Grid container spacing={2} display={"flex"} justifyContent="center">
          {latestGames.map((game:gameProps)=>{
            const { game_sale_post,user_name,game_name,image_url,console_brand_name } = game;
            const {id,price,place_for_transaction,created_date,description,contact_method,user_Id,games_ID } = game_sale_post
            return(
              <Grid item key={id}>
              <TodaysPickGameItem game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name}/>
              </Grid>
            )
          })}
          </Grid>

        </Grid>
      </Grid>
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
  // const { gameId } = context.query

  const latestRes = await (await axios.get(`${server}/api/v1/game_sale_post/latestPost`))
  const todaysRes = await (await axios.get(`${server}/api/v1/post_click_rate`))
  const latestGames = latestRes.data.content;
  const todaysGames = todaysRes.data.content;
  return {
      props: {
            latestGames,
            todaysGames
      }
  }
}