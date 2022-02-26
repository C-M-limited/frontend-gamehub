import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import type { NextPage } from 'next'
import StyledHero from '../components/template/StyledHero'
import TodaysPickGameItem from '../components/template/TodaysPickGameItem'
const playstation = require('../public/game_list/playstation.json')
const nintendo = require('../public/game_list/nintendo_test.json')

const SubTitle = styled(Typography)({
  fontSize: 24,
  color: '#ffffff',

})

const Home: NextPage = () => {
  console.log(playstation.results.map((i:any)=>[i.name, i.background_image]))
  console.log(nintendo.results.map((i:any)=>[i.name, i.background_image]))
  return (
    <>
      <StyledHero/>
      <SubTitle>Today{"'"}s Picks</SubTitle>
      <TodaysPickGameItem name="GTA-5" image_src="/game_sample.png" price={200} location="Yau Tong"/>
    </>
  )
}

export default Home
