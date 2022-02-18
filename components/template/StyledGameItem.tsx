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

const GameItemContainer = styled(Box)({
    backgroundColor: '#353545',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '8px 8px',
    margin: '10px 0px',
    borderRadius: 4,
})

const GameItemTitle = styled(Typography)({
    fontSize: 24,
})

const GameItemSubTitle = styled(Typography)({
    margin: '5px 0px 2px 0px',
    fontSize: 14,
    color: '#C0C0C0',
})

const StyledGameItem = ({ src, name, price, location }: StyledGameItemProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
        {Array.from('x'.repeat(50)).map((item, key)=>(
            <Grid key={key} item xs={12} sm={6} md={3} lg={2}>
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