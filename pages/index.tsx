import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/system'
import type { NextPage } from 'next'
import StyledHero from '../components/template/StyledHero'
import TodaysPickGameItem from '../components/template/TodaysPickGameItem'
import { axiosInstance, server } from '../config'
import StyledCarousel from '../components/StyledCarousel'

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
  const ChangeLaterToday = () => {
    if(todaysGames.length>0){
      const { game_sale_post, game_name, image_url, console_brand_name } = todaysGames[0]
      const { id, price, place_for_transaction } = game_sale_post;
      return (
        <TodaysPickGameItem key={id} game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name} />
      )
    }

  }
  const ChangeLaterLatest = () => {
    if (latestGames.length>0){
      const { game_sale_post, game_name, image_url, console_brand_name } = latestGames[0];
      const { id, price, place_for_transaction } = game_sale_post
      return (
        <TodaysPickGameItem key={id} game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name} />
      )
    }
  }
  return (
    <>
      <StyledHero />
      {
        todaysGames.length > 0
        &&
        <Box paddingX={10} mt={3}>
          <SubTitle>Today{"'"}s Picks</SubTitle>
          <Box>
            <StyledCarousel length={todaysGames.length}>
              {todaysGames.map((game: gameProps) => {
                const { game_sale_post, game_name, image_url, console_brand_name } = game;
                const { id, price, place_for_transaction } = game_sale_post
                return (
                  <TodaysPickGameItem key={id} game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name} />
                )
              })}
            </StyledCarousel>
          </Box>
          </Box>}
      {latestGames.length > 0
        &&
        <Box paddingX={10} mt={4}>
            <SubTitle>Latest Posts</SubTitle>
            <StyledCarousel length={todaysGames.length}>
              {latestGames.map((game: gameProps) => {
                const { game_sale_post, game_name, image_url, console_brand_name } = game;
                const { id, price, place_for_transaction } = game_sale_post
                return (
                  <TodaysPickGameItem key={id} game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name} />
                )
              })}
            </StyledCarousel>
        </Box>}
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