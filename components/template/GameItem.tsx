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
    width: '300px',
    boxShadow: 'var(--mainShadow)',
    color: 'var(--black)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: 8,
    cursor: 'pointer',
})

const TextContainer = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'    
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
    fontSize: 20,
    margin: '5px 0px 2px 0px',
    fontWeight: 'bolder'
})

const Content = styled(Typography)({
  fontSize: 14,
  color: 'var(--mainGrey)',
})


export default function GameItem({ src, user_name, game_name, game_id, price, created_date }: StyledGameItemProps) {
    return (
        <Box>
            <Link href={`/game/${game_id}`} passHref>
                <GameItemContainer>
                    <Box sx={{width: '200px', height: '280px', position: 'relative'}}>
                        <Image 
                            src={src} 
                            placeholder="blur" 
                            blurDataURL="/blur.png"
                            alt={src}
                            layout="fill"
                            objectFit='contain'
                        />
                    </Box>
                    <TextContainer>
                        <GameItemTitle>{game_name}</GameItemTitle>
                        <Divider style={{ display: 'none'}}/>
                        {price && 
                            <Box>
                                <GameItemSubTitle>${price}</GameItemSubTitle>
                            </Box>
                        }
                        <Box sx={{display:'flex', justifyContent:"space-between", width: '100%', marginTop: 1}}>
                            {user_name &&   <Content>Provided By: <span style={{fontWeight: 'bold'}}>{user_name}</span></Content>}
                            {created_date && <Content>{timeSince(created_date)} ago</Content>}
                        </Box>
                    </TextContainer>
                </GameItemContainer>
            </Link>
        </Box>
    )
}
