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
    backgroundColor: 'var(--mainLightGrey)',
    color: 'var(--black)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '15px',
    margin: '10px 0px',
    borderRadius: 12,
    cursor: 'pointer',
})

const GameItemTitle = styled(Typography)({
  fontSize: 16,
  marginTop: 10,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontWeight: 'bolder'
})

const GameItemSubTitle = styled(Typography)({
    fontSize: 12,
    margin: '5px 0px 2px 0px',
    fontWeight: 'bolder'
})

const Content = styled(Typography)({
  fontSize: 14,
  color: 'var(--mainGrey)',
  paddingLeft: '5%'
})


export default function GameItem({ src, user_name, game_name, game_id, price, created_date }: StyledGameItemProps) {
    return (
        <Box>
            <Link href={`/game/${game_id}`} passHref>
                <GameItemContainer>
                    <Image src={src} layout="responsive" alt={src} width={180} height={200} />
                    <GameItemTitle>{game_name}</GameItemTitle>
                    <Divider style={{ display: 'none'}}/>
                    {price && 
                        <Box>
                            <GameItemSubTitle>Price:</GameItemSubTitle>
                            <Content>${price} CAD</Content>
                        </Box>
                    }
                    {user_name && 
                        <Box>
                            <GameItemSubTitle>Provided By:</GameItemSubTitle>
                            <Content sx={{marginTop:0}}>{user_name}</Content>
                        </Box>
                    }
                    <Box sx={{display:'flex', justifyContent:"space-between"}}>
                      <Box></Box>
                      {created_date && <GameItemSubTitle>{timeSince(created_date)} ago</GameItemSubTitle>}
                    </Box>
                </GameItemContainer>
            </Link>
        </Box>
    )
}
