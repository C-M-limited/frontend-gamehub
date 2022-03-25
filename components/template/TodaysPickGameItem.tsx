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
    backgroundColor: '#232432',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    width: '300px',
    paddingBottom: 8,
})

const GameItemTitle = styled(Typography)({
    fontSize: 20,
    marginTop: 20,
    padding: '0px 8px',
})

const GameItemSubTitle = styled(Typography)({
    margin: '5px 0px 2px 0px',
    padding: '0px 8px',
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
    <>
        <Link href={`/game/${game_id}`} passHref>
        <GameItemContainer style={{ border: `3px solid ${colorCode()}` , cursor:'pointer',backgroundColor: '#232432', margin:'0 auto'}} >
            <Image src={image_src} layout="intrinsic" width={300} height={300} alt={image_src} placeholder="blur" blurDataURL="/blur.png"/>
            <GameItemTitle>{name.length>15? (name.substring(0,14).concat("..." )): name}</GameItemTitle>
            <Divider style={{ backgroundColor: '#525252ab', height: 3 }}/>
            <>
                <Box display={'flex'} justifyContent='space-between' alignItems='center'>
                    <GameItemSubTitle>Price</GameItemSubTitle>
                    <Box textAlign='center' width={50} bgcolor={colorCode} borderRadius={1}>
                        <Tags>{consoleCode()}</Tags>
                    </Box>
                </Box>
                <Typography paddingX={1}>{price} HKD</Typography>
            </>
            <>
                <GameItemSubTitle>Location</GameItemSubTitle>
                <Typography paddingX={1}>{location}</Typography>
            </>
        </GameItemContainer>
        </Link>
    </>

  )
}
