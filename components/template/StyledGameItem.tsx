import { Grid, Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import React from 'react'

interface StyledGameItemProps {
    src: string;
    name: string;
    price: number;
    location: string;
}

const GameItemContainer = styled(Grid)({
    postion: 'relaive',
    backgroundColor: '#353545',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 14px',
    margin: '10px 0px',
    borderRadius: 20,
})

const GameItemTitle = styled(Typography)({
    fontSize: 28,
})

const GameItemSubTitle = styled(Typography)({
    margin: '5px 0px 2px 0px',
    fontSize: 14,
    color: '#C0C0C0',
})

const StyledGameItem = ({ src, name, price, location }: StyledGameItemProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
        {[1,2,3,4].map(item=>(
            <Grid key={item} item sm={6} lg={3}>
                <GameItemContainer>
                    <Image src={src} layout="responsive" width={180} height={200} />
                    <GameItemTitle>{name}</GameItemTitle>
                    <Divider style={{ backgroundColor: '#fff'}}/>
                    <>
                        <GameItemSubTitle>Price</GameItemSubTitle>
                        <Typography>{price} HKD</Typography>
                    </>
                    <>
                        <GameItemSubTitle>Location</GameItemSubTitle>
                        <Typography>{location}</Typography>
                    </>
                </GameItemContainer>
            </Grid>
        ))}
        </Grid>
    </Box>
  )
}

export default StyledGameItem