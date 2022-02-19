import React from 'react'
import { Grid, Typography, Box, Divider, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';

interface StyledGameItemProps {
    src: string;
    name: string;
}

const GameItemContainer = styled(Box)({
    backgroundColor: '#35354584',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0px 15px 15px 15px',
    margin: '10px 0px',
    borderRadius: 20,
    width: '200px',
    height: '300px'
})

const GameItemTitle = styled(Typography)({
    fontSize: 20,
    marginTop: 20,
})

export default function GameItem({src, name}: StyledGameItemProps) {
  return (
    <Grid item xs={12} sm={6} md={3} lg={2}>
        <GameItemContainer>
            <Image src={src} layout="responsive" width={180} height={200} />
            <GameItemTitle>{name}</GameItemTitle>
        </GameItemContainer>
    </Grid>

  )
}
