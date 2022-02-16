import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import StyledBanner from '../components/template/StyledBanner'
import StyledButtonList from '../components/template/StyledButtonList'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  return (
    <>
      <StyledBanner />
      <StyledButtonList />
    </>
  )
}

export default Home
