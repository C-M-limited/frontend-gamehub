import { Box, Grid, Rating, Typography } from '@mui/material'
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TodaysPickGameItem from '../../components/template/TodaysPickGameItem';
import UserProfileItem from '../../components/template/UserProfileItem';
import userProfileItem from '../../components/template/UserProfileItem';
import { server } from '../../config';
import { CharacterImageList } from '../../public/user_icon/user_icon';
import { RootState } from '../../store/reducer';
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
export default function Me() {
    const fetchData= async()=>{
        // ${userProfile.id}

        await axios.get(`${server}/api/v1/game_sale_post/user/${user.id}`)

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

    const user = useSelector((state: RootState) => state.userProfile);
    const [posts,setPosts] = useState([]);


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
          <Typography fontSize={20}>You have posted {posts.length} games</Typography>
        </Box>
        
      </Box>
      <Box paddingX={5} sx={{display: "flex", justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
        <Box >
          <Grid container spacing={2} maxWidth={'var(--pageMaxWidth)'}>
                {posts.map((post: gameProps) => {
                  const { game_sale_post, user_name, game_name, image_url, console_brand_name } = post;
                  const { id, price, place_for_transaction, created_date, description, contact_method, user_Id, games_ID } = game_sale_post
                  return (
                    <Grid item key={id} xs={12} sm={6} md={6} lg={6}>
                        <Box display={"flex"} sx={{width:'100%', justifyContent:'center', alignItems: 'center'}}>
                          <UserProfileItem post_id={id} game_id={games_ID} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name} contact_method={contact_method} description={description}/>
                        </Box>
                    </Grid>
                  )
                })}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}


