import React from 'react'
import { Grid, Typography, Box, Divider, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';

interface StyledGameItemProps {
    game_id: number;
    image_src: string;
    name: string;
    price: number;
    location : string;
    brand: string;
}

const GameItemContainer = styled(Box)({
    backgroundColor: '#35354584',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 15px 0px 15px',
    margin: '10px 0px',
    borderRadius: 20,
    width: '200px',
    height: '380px',

})

const GameItemTitle = styled(Typography)({
    fontSize: 20,
    marginTop: 20,
})

const GameItemSubTitle = styled(Typography)({
    margin: '5px 0px 2px 0px',
    fontSize: 12,
    color: '#C0C0C0',
})

const Tags = styled(Typography)({
})

export default function TodaysPickGameItem({game_id,image_src, name, price, location, brand }: StyledGameItemProps) {
    const colorCode = () =>{
        if(brand==="Play Station") { return "#007ABE"}
        else if (brand==="Xbox") { return "#169A00"}
        else if (brand==="Nintendo") {return "#B70505"}

    }
    const consoleCode = ()=>{
        if(brand==="Play Station") { return "PS"}
        else if (brand==="Xbox") { return "Xbox"}
        else if (brand==="Nintendo") {return "NS"} 
    }
  return (
    <Grid item xs={12} sm={6} md={3} lg={2}>
        <Link href={`/game/${game_id}`} passHref>
        <GameItemContainer style={{    border: `3px solid ${colorCode()}` , cursor:'pointer'}} >
            <Image src={image_src} layout="responsive" width={180} height={200} alt={image_src} placeholder="blur" blurDataURL="/blur.png"/>
            <GameItemTitle>{name}</GameItemTitle>
            <Divider style={{ backgroundColor: '#999999'}}/>
            <>
                <Box display={'flex'} justifyContent='space-between' >
                    <GameItemSubTitle>Price</GameItemSubTitle>
                    <Box display={'flex'} justifyContent='center' alignItems='center' bgcolor={colorCode} borderRadius={2} width={50} mt={1} position={'absolute'} ml={14}>
                        <Tags>{consoleCode()}</Tags>
                    </Box>
                </Box>
                <Typography >{price} HKD</Typography>
            </>
            <>
                <GameItemSubTitle>Location</GameItemSubTitle>
                <Typography>{location}</Typography>
            </>
        </GameItemContainer>
        </Link>
    </Grid>

  )
}
