import { Box, Grid, Typography } from '@mui/material'
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
export default function Me() {
    const fetchData= async()=>{
        // ${userProfile.id}
        await axios.get(`${server}/api/v1/game_sale_post/user/${userProfile.id}`)

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
const [imageLocation,setImagLocation] = useState("/user_icon/noUserImage.jpeg");
const userProfile = useSelector((state: RootState) => state.userProfile);
const [posts,setPosts] = useState([]);
const handleUserImage = ()=>{
    CharacterImageList.forEach(data =>{
    if (data.image_key===userProfile.imageKey){
        setImagLocation(data.image_url);  
    }
    } )
}
  return (
    <Box>
        <Box sx={{margin: '20px 0px 0px 30px'}}>
            <img src={imageLocation} onLoad={()=>handleUserImage()} width={'200px'} height={'200px'} style={{borderRadius: "20px",overflow: "hidden",}}/>
        </Box>
        <Grid container spacing={2}  justifyContent="center" >
              {posts.map((post: gameProps) => {
                const { game_sale_post, user_name, game_name, image_url, console_brand_name } = post;
                const { id, price, place_for_transaction, created_date, description, contact_method, user_Id, games_ID } = game_sale_post
                return (
                  <Grid item key={id}>
                      <Box>
                        <UserProfileItem post_id={id} game_id={games_ID} name={game_name} image_src={image_url} price={price} location={place_for_transaction} brand={console_brand_name} contact_method={contact_method} description={description}/>
                      </Box>

                  </Grid>
                )
              })}
        </Grid>
    </Box>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const userProfile = useSelector((state: RootState) => state.userProfile);
//     const token:string=localStorage.getItem("access-token") || "";
//     const user:any = jwt(token);
  
//     const [postDetails] = await (await axios.get(`${server}/api/v1/game_sale_post/user/${userProfile.id}`)).data

//     return {
//         props: {
//             postDetails: {
//                 ...postDetails.postDetails,

//             }
//         }
//     }
//   }

//                   // user_name: gameDetails.user_name,
                // game_name: gameDetails.game_name,