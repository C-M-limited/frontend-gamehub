import { Box, Grid, Rating, Typography } from '@mui/material'
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TodaysPickGameItem from '../components/template/TodaysPickGameItem';
import UserProfileItem from '../components/template/UserProfileItem';
import userProfileItem from '../components/template/UserProfileItem';
import { axiosInstance, server } from '../config';
import { CharacterImageList } from '../public/user_icon/user_icon';
import { RootState } from '../store/reducer';
import { styled } from '@mui/system'
import Image from "next/image";
import jwt from 'jwt-decode';


interface gameProps {
    game_sale_post: postDetailProps;
    user_name: string;
    game_name: string;
    image_url: string;
    console_brand_name: string;
  }
interface postDetailProps {
    id: number;
    price: number,
    place_for_transaction: string;
    created_date: string;
    description?: string;
    contact_method: string;
    user_Id: number;
    games_ID: number;
}

interface userProfileProps{
  role  : string;
  id    : number;
  email : string;
  name  : string;
  imageKey: string;
}

const Name = styled(Typography)({
  fontSize: 24,
  color: '#ffffff',
  height: 36,
  background: 'var(--gradientBlue)',
  borderRadius: 4,
  padding: '8px 20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '200px',
  margin: '10px',
  border: '2px solid gold'
})

export default function Likes() {
  const user:userProfileProps = useSelector((state: RootState) => state.userProfile);
  const loginStatus = useSelector((state: RootState) => state.auth);
  const [posts,setPosts] = useState([]);
    const fetchData= async()=>{
        await axiosInstance.get(`/subscribed_post/user/${user.id}`)
        .then((res)=>{
            setPosts(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        fetchData();
    },[])


  return (
    <Box>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:{xs:'column',sm:'row'}}} m={5}>
        <Box justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
          <Box sx={{width: '150px', height: '150px', position: 'relative', bgcolor: 'var(--mainLightGrey)', padding: '20px', borderRadius: "20px",overflow: "hidden"}}>
            <Image 
                src={user.imageKey || "/user_icon/noUserImage.jpg"}
                alt="game image"
                placeholder="blur" 
                blurDataURL="/blur.png"
                layout="fill"
                objectFit='contain'
            />
          </Box>
        </Box>
        <Box sx={{marginLeft:{xs:0,sm:10},display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}  >
          <Name>{user.name}</Name>
          <Typography fontSize={20}>You have liked {posts.length} games</Typography>
        </Box>
        
      </Box>
      <Box paddingX={5} sx={{display:{xs:'none',sm:'flex'}, justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
        <Box >
        <Grid container spacing={2}  >
              {posts.map((post: gameProps) => {
                const { game_sale_post, user_name, game_name, image_url, console_brand_name } = post;
                const { id, price, place_for_transaction, created_date, description, contact_method, user_Id, games_ID } = game_sale_post
                return (
                  <Grid item key={id} >
                      <Box>
                        <TodaysPickGameItem  game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name}/>
                      </Box>

                  </Grid>
                )
              })}
        </Grid>
        </Box>
      </Box>
      {/* Small Screen */}
      <Box paddingX={5} sx={{display:{xs:'block',sm:'none'}}}>
        <Grid container spacing={2} sx={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}} >
              {posts.map((post: gameProps) => {
                const { game_sale_post, user_name, game_name, image_url, console_brand_name } = post;
                const { id, price, place_for_transaction, created_date, description, contact_method, user_Id, games_ID } = game_sale_post
                return (
                  <Grid item key={id}>
                      <Box>
                        <TodaysPickGameItem  game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name} />
                      </Box>

                  </Grid>
                )
              })}
        </Grid>
      </Box>

    </Box>
  )
}
