import React from 'react'
import {  Typography, Box, Divider} from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import timeSince from '../../utility/timeSince';
interface StyledGameItemProps {
    src: string;
    game_name: string;
    user_name?: string;
    game_id: number;
    price?: number;
    created_date: Date;
}

const GameItemContainer = styled(Box)({
    backgroundColor: '#35354584',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '15px',
    margin: '10px 0px',
    borderRadius: 12,
    cursor: 'pointer'
})

const GameItemTitle = styled(Typography)({
  fontSize: 16,
  marginTop: 10,
})

const GameItemSubTitle = styled(Typography)({
  margin: '5px 0px 2px 0px',
  fontSize: 12,
  color: '#C0C0C0',
})


export default function GameItem({ src, user_name, game_name, game_id, price, created_date }: StyledGameItemProps) {
    return (
        <Box>
            <Link href={`/game/${game_id}`} passHref>
                <GameItemContainer>
                    <Image src={src} layout="responsive" alt={src} width={180} height={200} />
                    <GameItemTitle>{game_name.length>16? (game_name.substring(0,15).concat("..." )): game_name}</GameItemTitle>
                    <Divider style={{ backgroundColor: '#999999'}}/>
                    {price && <GameItemTitle>HKD ${price}</GameItemTitle>}
                    <Typography sx={{color:'#C0C0C0', fontSize:12, marginTop:'5px'}}>Provided By:</Typography>
                    {user_name && <GameItemTitle sx={{marginTop:0}}>{user_name}</GameItemTitle>}
                    <Box sx={{display:'flex', justifyContent:"space-between"}}>
                      <Box></Box>
                      {created_date && <GameItemSubTitle>{timeSince(created_date)} ago</GameItemSubTitle>}
                    </Box>
                </GameItemContainer>
            </Link>
        </Box>
    )
}
