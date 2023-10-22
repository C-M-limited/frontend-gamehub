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
    backgroundColor: 'var(--mainLightGrey)',
    color: 'var(--black)',
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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'bolder'
})

const GameItemSubTitle = styled(Typography)({
    margin: '5px 0px 2px 0px',
    padding: '0px 8px',
    fontSize: 12,
    color: 'var(--black)',
    fontWeight: 'bolder'
})

const Tags = styled(Typography)({
    color: 'var(--white)'
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
        <GameItemContainer style={{ border: `3px solid ${colorCode()}` , cursor:'pointer', margin:'0 auto'}} >
            <Image src={image_src} layout="intrinsic" width={300} height={300} alt={image_src} placeholder="blur" blurDataURL="/blur.png"/>
            <GameItemTitle>{name}</GameItemTitle>
            <Divider style={{ backgroundColor: '#525252ab', height: 3, display: 'none' }}/>
            <>
                <Box display={'flex'} justifyContent='space-between' alignItems='center'>
                    <GameItemSubTitle>Price</GameItemSubTitle>
                    <Box textAlign='center' width={50} bgcolor={colorCode} borderRadius={1}>
                        <Tags>{consoleCode()}</Tags>
                    </Box>
                </Box>
                <Typography paddingX={1}>{price} CAD</Typography>
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
