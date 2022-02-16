import { Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import StyledBanner from '../../components/template/StyledBanner';
import StyledGameItem from '../../components/template/StyledGameItem';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const FilterButton = styled('a')<{ active?: boolean }>(({active}) => ({
  position: 'relative',
  backgroundColor: active ? '#6100FF' : '#353545',
  color: '#ffffff',
  marginRight: 20,
  padding: '10px 20px',
  borderRadius: '10px',
}))

const filterList = [
  { name: "All", brand: 'all', src: "/console_brand/all" },
  { name: "Play station", brand: "playstation", src: "/console_brand/playstation" },
  { name: "Nintendo", brand: "nintendo", src: "/console_brand/nintendo" },
  { name: "X Box", brand: "xbox", src: "/console_brand/xbox" },
]

interface FilterRowProps {
  brand: string;
}

const FilterRow = ({brand}: FilterRowProps) => {
  return (
    <Grid container>
      <Grid item sm={12} display="flex" alignItems="center">
      </Grid>
      <Grid item sm={12} display="flex" alignItems="center">
        <Grid item sm={8}>
          {
            filterList.map((item)=>(
              <FilterButton key={item.src} href={item.src} active={brand===item.brand}>{item.name}</FilterButton>
            ))
          }
        </Grid>
        <Grid item sm={4} display="flex" justifyContent="flex-end">
          <FilterButton>
            <Box display="flex" alignItems="center">
              Sort by
              <KeyboardArrowDownRoundedIcon/>
            </Box>
          </FilterButton>
        </Grid>
      </Grid>
      <Grid item sm={12} mt={2}>
        <StyledGameItem name="GTA-5" src="/game_sample.png" price={200} location="Yau Tong"/>
      </Grid>
    </Grid>
  )
}

const ConsoleBrand = () => {
  const router = useRouter()

  return (
    <>
      <FilterRow brand={String(router.query.brand)}/>
    </>
  )
};

export default ConsoleBrand;
