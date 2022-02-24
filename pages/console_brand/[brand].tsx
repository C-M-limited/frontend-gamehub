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
import Link from 'next/link';
import StyledMenu from '../../components/template/StyledMenu';
import { fetchGameSalePostListThunk } from '../../store/action/gameSalePost';

const FilterButton = styled(Box)<{ active?: boolean }>(({active}) => ({
  position: 'relative',
  backgroundColor: active ? '#6100FF' : '#353545',
  color: '#ffffff',
  marginRight: 20,
  padding: '10px 20px',
  borderRadius: '10px',
  cursor: 'pointer'
}))

const filterList = [
  {name: "All", brand: 'all', src: "/console_brand/all" },
  {name: "Play station", brand: "playstation", src: "/console_brand/playstation" },
  {name: "Nintendo", brand: "nintendo", src: "/console_brand/nintendo" },
  {name: "X Box", brand: "xbox", src: "/console_brand/xbox" },
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
  const response = useSelector((state:RootState) => state.gameSalePostList);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchGameSalePostListThunk({page:page-1,size:16,sortBy:'id', category: brand}));
    // dispatch(fetchGameListThunk({page:page-1,size:16,sortBy:'id', category: "all"}));
    console.log(response)
  },[page,brand])
  
  const handleChange = (_event: any, value: number) => {
    setPage(value);
    window.scrollTo(0, 0)
  };
  return (
    <>
      <Grid container>
        <Grid item sm={12} display="flex" alignItems="center" mt={3}>
          <Grid item sm={8} display="flex">
            {
              filterList.map((item)=>(
                  <Link href={item.src}>
                      <FilterButton key={item.src}  active={brand===item.brand}>{item.name}</FilterButton>
                  </Link>
              ))
            }
          </Grid>
          <Grid item sm={4} display="flex" justifyContent="flex-end">
            <StyledMenu />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
          {response.gameSalePostList.content?.map(({id,name,image_url,console_Id}: GameListProps)=>{
            return (
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <GameItem key={id} name={name} src="/game_sample.png" game_id={id} />
              </Grid>
            )})}
      </Grid>
      <Grid justifyContent={'center'} width='100%' alignItems={'center'} display={'flex'} mt={10}>
        <GameListPagination color="primary" count={Math.ceil(response.gameSalePostList?.pageable?.pageSize) || 10 } page={page} onChange={handleChange} showFirstButton showLastButton/>
      </Grid>
      </>
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
