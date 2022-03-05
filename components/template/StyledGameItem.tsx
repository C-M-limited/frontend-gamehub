import { Grid, Typography, Box, Divider, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import React from 'react'

interface StyledGameItemProps {
    src: string;
    name: string;
    price: number;
    location: string;
}

const GameItemContainer = styled(Box)({
    backgroundColor: '#35354584',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '8px 8px',
    margin: '10px 0px',
    borderRadius: 4,
})

const GameItemTitle = styled(Typography)({
    fontSize: 24,
})

const GameItemSubTitle = styled(Typography)({
    margin: '5px 0px 2px 0px',
    fontSize: 14,
    color: '#C0C0C0',
})

const GameListPagination = styled(Pagination)({
    position: 'relative',
    ul: {
        "& .MuiPaginationItem-root": {
          color: "#fff"
        }
    },
    marginBottom: 20,
})

const StyledGameItem = ({ src, name, price, location }: StyledGameItemProps) => {
    const [page, setPage] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
        {Array.from(Array(100).keys()).slice(12*(page-1), 12*page).map((item, key)=>(
            <Grid key={key} item xs={12} sm={6} md={3} lg={2}>
                <GameItemContainer>
                    <Image src={src} layout="responsive" width={180} height={200} alt={"Game Image"}/>
                    <GameItemTitle>{name} - {item}</GameItemTitle>
                    <Divider style={{ backgroundColor: '#fff'}}/>
                    <>
                        <GameItemSubTitle>Price</GameItemSubTitle>
                        <Typography>{price} HKD</Typography>
                    </>
                    <>
                        <GameItemSubTitle>Location</GameItemSubTitle>
                        <Typography>{location}</Typography>
                    </>
                </GameItemContainer>
            </Grid>
        ))}
        </Grid>
        <GameListPagination color="primary" count={Math.ceil(Array.from(Array(100).keys()).length / 12) } page={page} onChange={handleChange} showFirstButton showLastButton/>
    </Box>
  )
}

export default StyledGameItem