import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { makeStyles } from '@material-ui/styles';

const Title = styled(Typography)({
    color: '#ffffff',
    fontSize: '4rem',
    fontWeight: 600,
    textAlign: 'center',
    zIndex: 2,
    // backgroundColor: 'rgb(181, 181, 181,30%)'
})

const SubTitle = styled(Typography)({
    color: '#ffffff',
    fontSize: '1.6rem',
    fontWeight: 600,
    textAlign: 'center',
    zIndex: 2,
    // backgroundColor: 'rgb(181, 181, 181,30%)'
})

const BannerWrapper = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundImage: 'url(hero.jpg)',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    filter: 'brightness(0.7)',
  }));

const ButtonWrapper =styled(Box)(({ theme }) => ({
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 'var(--space-8)',
    padding: 'var(--space-8)',
    backgroundColor: 'var(--color-gray-6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    bottom: 0,
    transition: 'bottom .2s',
    '&:hover': {
        backgroundColor: 'var(--color-gray-6)',
        bottom: 'var(--space-8)'
    }
  }));
const gameConsoleList = [
    { src: "/xbox_logo.png", url: "/console_brand/xbox" },
    { src: "/nintendo_logo.svg", url: "/console_brand/nintendo" },
    { src: "/play_station_logo.png", url: "/console_brand/ps" },
]

const StyledHero = () => {
    return (
        <Grid container position='relative' mb={2}>
            <Grid item sm={12} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} paddingY={20}>
                <Title>All your games in one place.</Title>
                <SubTitle>Pick you favourite</SubTitle>
                <BannerWrapper zIndex={1} />
                <Box width='100vw' display="flex" zIndex={2} justifyContent="center" alignItems="center">
                    {[gameConsoleList.map((item, key) => (
                        <Link key={key} href={item.url} passHref>
                            <ButtonWrapper  mx={2} mt={3} >                   
                                    <Image priority={true} src={item.src} alt={`${item.src}`} layout="intrinsic" width={60} height={60} />                                
                            </ButtonWrapper>
                        </Link>
                    ))]}
                </Box>
            </Grid>
        </Grid>
    )
}

export default StyledHero