import React from 'react'
import { Grid, Typography, Box, Divider, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
interface StyledGameItemProps {
    src: string;
    name: string;
    game_id: number
}

const GameItemContainer = styled(Box)({
    backgroundColor: '#35354584',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '15px',
    margin: '10px 0px',
    borderRadius: 20,
    cursor: 'pointer'
})

const GameItemTitle = styled(Typography)({
    fontSize: 20,
    marginTop: 20,
})

export default function GameItem({ src, name, game_id }: StyledGameItemProps) {
    return (
        <Box>
            <Link href={`/game/${game_id}`}>
                <GameItemContainer>
                    <Image src={src} layout="responsive" width={180} height={200} />
                    <GameItemTitle>{name}</GameItemTitle>
                </GameItemContainer>
            </Link>
        </Box>
    )
}
