import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Title = styled(Typography)({
    color: '#ffffff',
    fontSize: 36,
    zIndex: 2,
})

const gameConsoleList = [
    {src: "/xbox_logo.png", url: "/console_brand/xbox"},
    {src: "/nintendo_logo.svg", url: "/console_brand/nintendo"},
    {src: "/play_station_logo.png", url: "/console_brand/playstation"},
]

const StyledHero = () => {
  return (
    <>
        <Grid container>
            <Grid item sm={12} display="flex" flexDirection="column" alignItems="center">
                <Title>Game Hub helps you find your game</Title>
                    <Box display="flex">
                        {[gameConsoleList.map((item, key)=> (
                            <Box key={key} mr={2} mt={3} style={{ cursor: 'pointer' }}>
                                <Link href={item.url} passHref>
                                    <Image src={item.src} layout="intrinsic" width={60} height={60}/>
                                </Link>
                            </Box>
                        ))]}
                    </Box>
            </Grid>
        </Grid>
    </>
  )
}

export default StyledHero