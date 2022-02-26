import { Box, Grid, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import React,{useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import Link from 'next/link';
import StyledMenu from '../../components/template/StyledMenu';
import { fetchGameSalePostListThunk } from '../../store/action/gameSalePost';
import GameItem from '../../components/template/GameItem';

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
  {name: "Play station", brand: "ps", src: "/console_brand/ps" },
  {name: "Nintendo", brand: "nintendo", src: "/console_brand/nintendo" },
  {name: "X Box", brand: "xbox", src: "/console_brand/xbox" },
]

interface FilterRowProps {
  brand: string;
}
interface GameListProps{
  id : number,
  user_name: string,
  game_name: string,
  image_url: string,
  console_Id: number,
  created_date: Date,
  asc: boolean,
  game_sale_post: {
    id: number,
    price: number,
    created_date: Date,
  }
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
  const [filterData, setFilterData] = React.useState({
    index: 0,
    sortBy: 'id',
    asc: true
  })
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const { sortBy, asc } = filterData
    dispatch(fetchGameSalePostListThunk({page:page-1,size:16, sortBy, asc, category: brand}));
    // dispatch(fetchGameListThunk({page:page-1,size:16,sortBy:'id', category: "all"}));
    console.log(response)
  },[page,brand,filterData])

  const handleUpdateFilterData = (index: number, sortBy: string, asc: boolean) => {
    setFilterData({index, sortBy, asc})
    dispatch(fetchGameSalePostListThunk({page:page-1,size:16, sortBy, asc, category: brand}));
  }
  
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
                  <Link href={item.src} key={item.src}>
                      <FilterButton key={item.src}  active={brand===item.brand}>{item.name}</FilterButton>
                  </Link>
              ))
            }
          </Grid>
          <Grid item sm={4} display="flex" justifyContent="flex-end">
            <StyledMenu 
              selectIndex={filterData.index}
              handleChange={handleUpdateFilterData}
              nameList={[
                { name: "Lowest ID", asc: true, sortBy: 'id' },
                { name: "Highest ID", asc: false, sortBy: 'id' },
                { name: "Lowest Price", asc: true, sortBy: 'price' },
                { name: "Highest Price", asc: false, sortBy: 'price' },
                { name: "Latest", asc: false, sortBy: 'created_date' },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
          {response.gameSalePostList.content?.map(({id,user_name, game_name ,game_sale_post, image_url}: GameListProps)=>{
            return (
              <Grid item xs={12} sm={6} md={3} lg={2} key={id}>
                <GameItem 
                  key={game_sale_post.id} 
                  game_id={game_sale_post.id} 
                  user_name={user_name} 
                  game_name={game_name} 
                  price={game_sale_post.price} 
                  created_date={game_sale_post.created_date} 
                  src={image_url} 
                />
              </Grid>
            )})}
      </Grid>
      <Grid justifyContent={'center'} width='100%' alignItems={'center'} display={'flex'} mt={10}>
        <GameListPagination color="primary" count={Math.ceil(response.gameSalePostList?.totalPages / 16) || 1 } page={page} onChange={handleChange} showFirstButton showLastButton/>
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
