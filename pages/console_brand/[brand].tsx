import { Box, Grid, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import React,{useEffect} from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { fetchGameListThunk } from '../../store/action/gameList';
import GameItem from '../../components/template/gameItem';
import { CenterFocusStrong } from '@mui/icons-material';

const FilterButton = styled('a')<{ active?: boolean }>(({active}) => ({
  position: 'relative',
  backgroundColor: active ? '#6100FF' : '#353545',
  color: '#ffffff',
  marginRight: 20,
  padding: '10px 20px',
  borderRadius: '10px',
  cursor: 'pointer'
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
  const response = useSelector((state:RootState) => state.gameList);
  const [brandID,setBrandID] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  useEffect(()=>{
    // switch (brand){
    //   case 'all':
    //     setBrandID(0);
    //     break
    //   case 'playstation':
    //     setBrandID(1);
    //     break
    //   case  'nintendo':
    //     setBrandID(2);
    //     break
    //   case 'xbox':
    //     setBrandID(3);
    //     break
    //   default:
    //     setBrandID(0);
    // }
    dispatch(fetchGameListThunk({page:page-1,size:16,sortBy:'id', category:0}));
  },[page])
  const handleChange = (_event: any, value: number) => {
    setPage(value);
    window.scrollTo(0, 0)
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
          {response.gameList.content?.map(({id,name,image_url,console_Id}: GameListProps)=>{
            return (
              <GameItem key={id} name={name} src="/game_sample.png" game_id={id} />
            )})}
        </Grid>
      </Grid>
      <Grid justifyContent={'center'} width='100%' alignItems={'center'} display={'flex'} mt={10}>
        <GameListPagination color="primary" count={Math.ceil(response.gameList.totalPages ) } page={page} onChange={handleChange} showFirstButton showLastButton/>
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
