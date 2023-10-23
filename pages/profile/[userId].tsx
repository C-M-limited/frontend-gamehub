import { Box, Grid, Typography } from '@mui/material'
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TodaysPickGameItem from '../../components/template/TodaysPickGameItem';
import UserProfileItem from '../../components/template/UserProfileItem';
import userProfileItem from '../../components/template/UserProfileItem';
import { server } from '../../config';
import { CharacterImageList, defaultImage } from '../../public/user_icon/user_icon';
import { RootState } from '../../store/reducer';
import { styled } from '@mui/system';
import Image from "next/image";

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
  marginTop: '10px',
  marginBottom: '10px',
  border: '2px solid gold'
})
export default function OthersProfile({postList,userInfo}:any) {

  const [imageLocation,setImagLocation] = useState(defaultImage);
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const handleUserImage = ()=>{
      CharacterImageList.forEach(data =>{
      // console.log(userInfo.imageKey)
      if (data.image_key===userInfo.imageKey){
          setImagLocation(data.image_url);  
      }
      } )
  }
  return (
    <Box>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:{xs:'column',sm:'row'}}} m={5}>
        <Box sx={{width: '150px', height: '150px', position: 'relative', bgcolor: 'var(--mainLightGrey)', padding: '20px', borderRadius: "20px",overflow: "hidden"}}>
            <Image 
                src={imageLocation}
                onLoad={()=>handleUserImage()}
                alt="game image"
                placeholder="blur" 
                blurDataURL="/blur.png"
                layout="fill"
                objectFit='contain'
            />
        </Box>
        <Box sx={{marginLeft:{xs:0,sm:10},display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}} >
          <Name>{userInfo.firstName}</Name>
          <Typography fontSize={20}>This user have posted {postList.length} games</Typography>
        </Box>
      </Box>
      <Box paddingX={5} sx={{display: 'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
        <Box >
          <Grid container spacing={2} maxWidth={'var(--pageMaxWidth)'}>
              {postList.map((post: gameProps) => {
                  const { game_sale_post, user_name, game_name, image_url, console_brand_name } = post;
                  const { id, price, place_for_transaction, created_date, description, contact_method, user_Id, games_ID } = game_sale_post
                  return (
                  <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
                      <Box display={"flex"} sx={{width:'100%', justifyContent:'center', alignItems: 'center'}}>
                          <TodaysPickGameItem  game_id={id} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name}  />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { userId } = context.query
    const postList = await (await axios.get(`${server}/api/v1/game_sale_post/user/${userId}`)).data
    //correct it later, should only fetch the image
    const userInfo = await (await axios.get(`${server}/api/v1/user_profile/${userId}`)).data
    return {
        props: {
            postList,
            userInfo
        }
    }
  }