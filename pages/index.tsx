import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import StyledBanner from '../components/template/StyledBanner'
import StyledButtonList from '../components/template/StyledButtonList'
import StyledGameItem from '../components/template/StyledGameItem'
import StyledHero from '../components/template/StyledHero'
import TodaysPickGameItem from '../components/template/TodaysPickGameItem'
import styles from '../styles/Home.module.css'

const SubTitle = styled(Typography)({
  fontSize: 24,
  color: '#ffffff',

})

const Home: NextPage = () => {

  return (
    <>
      <StyledHero/>
      <SubTitle>Today's Picks</SubTitle>
      <TodaysPickGameItem name="GTA-5" image_src="/game_sample.png" price={200} location="Yau Tong"/>
    </>
  )
}

export default Home
