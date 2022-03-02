import React from 'react'
import { Grid, Typography, Box, Divider, Pagination} from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
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
  fontSize: 20,
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
            <Link href={`/game/${game_id}`}>
                <GameItemContainer>
                    <Image src={src} layout="responsive" width={180} height={200} />
                    <GameItemTitle>{game_name}</GameItemTitle>
                    <Divider style={{ backgroundColor: '#999999'}}/>
                    {price && <GameItemTitle>HKD ${price}</GameItemTitle>}
                    <Typography sx={{color:'#C0C0C0', fontSize:12, marginTop:'5px'}}>Provided By:</Typography>
                    {user_name && <GameItemTitle sx={{marginTop:0, marginLeft: 1}}>{user_name}</GameItemTitle>}
                    <Box sx={{display:'flex', justifyContent:"space-between"}}>
                      <Box></Box>
                      {created_date && <GameItemSubTitle>{timeSince(created_date)} ago</GameItemSubTitle>}
                    </Box>



                </GameItemContainer>
            </Link>
        </Box>
    )
}

function timeSince(date: Date) {
  const currentDate: Date = new Date
  var seconds = Math.floor((currentDate.getTime() - new Date(date).getTime()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
