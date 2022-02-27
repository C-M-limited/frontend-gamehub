import { Grid, Typography } from '@mui/material'
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
  return (
    <>
      <StyledHero/>
      <Grid container display="flex" justifyContent="center">
        <Grid item lg={10}>
          <SubTitle>Today{"'"}s Picks</SubTitle>
          <TodaysPickGameItem name="GTA-5" image_src="/game_sample.png" price={200} location="Yau Tong"/>
        </Grid>
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <Grid item lg={10}>
          <SubTitle>Today{"'"}s Picks</SubTitle>
          <TodaysPickGameItem name="GTA-5" image_src="/game_sample.png" price={200} location="Yau Tong"/>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
