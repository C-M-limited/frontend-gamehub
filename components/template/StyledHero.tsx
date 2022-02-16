import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import React from 'react'

const Title = styled(Typography)({
    color: '#ffffff',
    fontSize: 36,
    zIndex: 2,
})

const gameConsoleList = [
    "/xbox_logo.png",
    "/nintendo_logo.svg",
    "/play_station_logo.png"
]

const StyledHero = () => {
  return (
    <>

        <Grid container>
            
            <Grid item sm={12} display="flex" flexDirection="column" alignItems="center">
                
                <Title>Game Hub helps you find your game</Title>
                    <Box display="flex">
                        {[gameConsoleList.map((item)=> (
                            <Image key={item} src={item} layout="intrinsic" width={60} height={60}/>
                        ))]}
                    </Box>
            </Grid>
        </Grid>
    </>
  )
}

export default StyledHero