import { Box, Grid, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import React,{useEffect} from 'react';
import StyledBanner from '../../components/template/StyledBanner';
import StyledGameItem from '../../components/template/StyledGameItem';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { fetchGameListAction } from '../../store/action/gameList';
import GameItem from '../../components/template/gameItem';
import { CenterFocusStrong } from '@mui/icons-material';

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
interface GameListProps{
  id : number,
  name: string,
  image_url: string,
  console_Id : number
}
const GameListPagination = styled(Pagination)({
  ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff"
      }
  },
  marginBottom: 20,
})

const FilterRow = ({brand}: FilterRowProps) => {
  const gameList = useSelector((state:RootState) => state.gameList);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchGameListAction());
  },[])
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
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
      {/* Post */}
      <Grid item sm={12} mt={2}>
        <Grid container spacing={15}>
          {gameList.map(({id,name,image_url,console_Id}: GameListProps)=>{
            return (
            <GameItem key={id} name={name} src="/game_sample.png" />
            )})}
        </Grid>
      </Grid>
      <Grid justifyContent={'center'} width='100%' alignItems={'center'} display={'flex'} mt={10}>
        <GameListPagination color="primary" count={Math.ceil(gameList.length / 12) } page={page} onChange={handleChange} showFirstButton showLastButton/>
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
