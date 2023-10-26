import React, { useState } from 'react'
import { Grid, Typography, Box, Divider, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';

import CircleIcon from '@mui/icons-material/Circle';
import { StyledHoverImage } from './StyledImage';

interface StyledGameItemProps {
    game_id: number;
    image_src: string;
    name: string;
    price: number;
    location : string;
    brand: string;
}

const GameItemContainer = styled(Box)({
    // backgroundColor: 'var(--mainLightGrey)',
    color: 'var(--black)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    width: '300px',
    height: '400px',
    paddingBottom: 8,
    cursor:'pointer',
    margin:'0 auto'
})

const GameItemTitle = styled(Typography)({
    fontSize: 25,
    marginTop: 10,
    padding: '0px 8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'bolder'
})

const GameItemSubTitle = styled(Typography)({
    margin: '5px 0px 0px 2px',
    padding: '0px 8px',
    fontSize: 15,
    color: 'var(--black)',
    fontWeight: 'bold'
})

const GameItemThirdTitle = styled(Typography)({
    fontSize: 12,
    color: 'var(--black)',
})

const Ball = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--mainGreen)',
    fontSize: 10
})

const Tags = styled(Typography)({
    color: 'var(--white)'
})

export default function TodaysPickGameItem({game_id,image_src, name, price, location, brand }: StyledGameItemProps) {

    const [isHoever, setIsHover] = useState<boolean>(false);

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
            <GameItemContainer onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=> setIsHover(false)}>
                <StyledHoverImage src={image_src} alt={image_src} width={'200px'} height={'280px'} isHoever={isHoever}/>
                <GameItemTitle>{price === 0 ? 'Free !' : `$${price}`}</GameItemTitle>
                <Box display={'flex'} justifyContent='space-between' alignItems='center'>
                    <GameItemSubTitle paddingX={1}>{name}</GameItemSubTitle>
                    <Box textAlign='center' width={50} bgcolor={colorCode} borderRadius={1}>
                        <Tags>{consoleCode()}</Tags>
                    </Box>
                </Box>
                <Box display={'flex'} alignItems='center' sx={{margin: '5px 0px 0px 2px', padding: '0px 8px',}}>
                    <Ball>
                        <CircleIcon fontSize="inherit"/>
                    </Ball>
                    <GameItemThirdTitle paddingX={1}>Available at: <span style={{fontWeight: 'bold'}}>{location}</span></GameItemThirdTitle>
                </Box>
            </GameItemContainer>
        </Link>
    </>

  )
}
