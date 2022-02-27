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
  user_name: string;
  game_name: string;
  image_url: string;
}
const Home: NextPage = ({latestGames}:any) => {
  // console.log(latestGames.gameDetails)
  return (
    <>
      <StyledHero/>
      <Grid container display="flex" justifyContent="center">
        <Grid item lg={10}>
          <SubTitle>Today{"'"}s Picks</SubTitle>
          <TodaysPickGameItem name="GTA-5" image_src="/game_sample.png" price={200} location="Yau Tong"/>
        </Grid>
      </Grid>
      {/* Latest Post */}
      <Grid container display="flex" justifyContent="center">
        <Grid item lg={10}>
          <SubTitle>Latest Posts</SubTitle>
          <Grid container spacing={2} display={"flex"} justifyContent="center">
          {latestGames.map((game:gameProps)=>{
            const { game_sale_post,user_name,game_name,image_url } = game;
            const {id,price,place_for_transaction,created_date,description,contact_method,user_Id,games_ID } = game_sale_post
            return(
              <Grid item>
              <TodaysPickGameItem name={game_name} image_src={image_url} price={price} location={place_for_transaction}/>
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

  const res = await (await axios.get(`${server}/api/v1/game_sale_post/latestPost`))
  const latestGames = res.data.content;
  return {
      props: {
            latestGames
      }
  }
}