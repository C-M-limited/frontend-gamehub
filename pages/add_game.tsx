import React,{useEffect, useState} from 'react';
import { useForm , SubmitHandler} from 'react-hook-form';
import axios from 'axios';
import { server } from '../config'
import { Autocomplete, Typography, TextField, styled, Box, Grid } from '@mui/material';
import {StyledButton} from '../components/StyledButton';
import { OpenAlertAction } from '../store/action/alert';
import { useDispatch } from 'react-redux';
import RefreshTokenFunction from '../utility/refreshTokenFunction';
import Image from 'next/image';

interface AddGameFormInput {
  game_id: number;
  price: number;
  place_for_transaction: String;
  description?: String;
  contact_method: String
}
interface GameListProps{
  id: number;
  name: string;
  image_url: string;
}

const AddGameSubTitleTextStyle = styled(Typography)({
  fontSize: 12,
  margin: '4px 0px',
  color: 'var(--mainGrey)'
});

const AddGameInputStyle = styled(TextField)({
  backgroundColor:'var(--mainLightGrey)',
  borderWidth: 0,
  borderRadius:'4px',
  color: 'var(--back) !important',
  border: 'none',
  "& fieldset": { border: 'none' },
  marginBottom: '8px'
});

const AddGameInputTextStyle = styled('textarea')({
  backgroundColor:'var(--mainLightGrey)',
  borderRadius:'4px',
  borderWidth: 0,
  minHeight: 80,
  color: 'var(--black)',
  padding:'12px',
  resize: 'none',
  marginBottom: '18px'
})

export default function AddGame() {
  const dispatch = useDispatch();
  const [newGameId,setNewGameId] = useState<any>(-1);
  const [gameError,setGameError] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<any>();
  const [options,setOptions] = useState<GameListProps[]>([]);

  const { register, handleSubmit, getValues, formState: { errors }} = useForm({
    defaultValues: {
      game_id: 0,
      price: 0,
      place_for_transaction: "",
      description: "",
      contact_method: ""
    }
  });

  const handleOnChangeGame = (id: number | undefined) => {
    setImageSrc(options.find((element) => element.id === id)?.image_url);
    setNewGameId(id);
  };

  const onSubmit : SubmitHandler<AddGameFormInput> = data => {
    const {price,place_for_transaction,description,contact_method}= data
    if (newGameId===-1){
      setGameError(true);
    }else {
      setGameError(false);
    }
    const dataToSend = 
    {
      "price": price,
      "place_for_transaction": place_for_transaction,
      "description" : description,
      "contact_method": contact_method,
    }
    addPost(dataToSend);
  
  };

  const addPost = async(dataToSendWithoutGameId:any) =>{
    const id= newGameId
    const dataToSend={
      ...dataToSendWithoutGameId,
      games:{
        id
      }
    }
    const accessToken = localStorage.getItem('access-token');
    const headers:any = { 
      'Authorization': accessToken,
    };
    axios.post(`${server}/api/v1/game_sale_post`, dataToSend, { headers })
    .then(response => {
      // console.log("I success")
      dispatch(OpenAlertAction({type:"success",content: "Successfully Added Post"}))
    })
    .catch((error) => {
      console.log(error)
      console.log("I fail")
      if(error.response.status === 403){
        if (error.response?.data==='Expired JWT token'){
          // console.log("I expired")
            RefreshTokenFunction(addPost,dataToSend);
        }
      }
    })
  }

  const fetchGameList=async()=>{
    axios.get(`${server}/api/v1/games/all`)
    .then(response =>{
      const sortedData = response.data.sort((a : any,b: any) => a.name.localeCompare(b.name));
      setOptions(sortedData);
      // console.log(response.data)
    })
    .catch((error)=> {})
  }

  useEffect (()=>{
    fetchGameList();
  },[]);

  
  return (
    <div style={{justifyContent:'center', width:'100%' , display:'flex', flexDirection:'column', alignItems:'center'}}>
      <Box width={'100%'} maxWidth={'var(--pageMaxWidth)'} display={"flex"} flexDirection={"column"} alignItems={"center"} padding={2}>
        <h2 style={{color:'var(--black'}}>ADD GAME</h2>
        <Grid container md={8}>
          <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box sx={{width: {xs: '150px', md: '300px'}, height: {xs: '150px', md: '300px'}, position: 'relative', borderRadius: '5px', backgroundColor: 'var(--mainLightGrey)', padding: '10px', border: '2px dashed var(--mainDarkerGrey)'}}>
                <Image 
                    src={imageSrc || require("../public/favicon.png")}
                    placeholder="blur" 
                    blurDataURL="/blur.png"
                    alt="game image"
                    layout="fill"
                    objectFit='contain'
                />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <form onSubmit={handleSubmit(onSubmit)} style={addGameFormStyle} id="addGameForm">
              {/* Game */}
              <AddGameSubTitleTextStyle>Game*</AddGameSubTitleTextStyle>
              <Autocomplete 
                disablePortal
                size="small"
                renderInput={(params) => <AddGameInputStyle {...params} />}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                onChange={(event, value) => handleOnChangeGame(value?.id)}
                getOptionLabel={(option) => option.name}
                options={options}
              />
              {gameError && <AddGameSubTitleTextStyle style={addGameWarningFont}>⚠This field is required</AddGameSubTitleTextStyle>}
              {/* Price */}
              <AddGameSubTitleTextStyle>Price*</AddGameSubTitleTextStyle>
              <AddGameInputStyle size="small" type="number" {...register("price", {required: true, max: 2000, min: 0})} />
              {errors.price && <AddGameSubTitleTextStyle style={addGameWarningFont}>⚠ This field is required</AddGameSubTitleTextStyle> }
              {/* Place for Transaction */}
              <AddGameSubTitleTextStyle>Place for Transaction*</AddGameSubTitleTextStyle>
              <AddGameInputStyle size="small" placeholder='e.g. Richmond' type="text" {...register("place_for_transaction", {required: true})} />
              {errors.place_for_transaction && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
              {/* Contact Method */}
              <AddGameSubTitleTextStyle>Contact Method* </AddGameSubTitleTextStyle>
              <AddGameInputStyle size="small" placeholder='+1 (XXX) XXX - XXXX' type="text" {...register("contact_method", { required: true })}  />
              {errors.contact_method && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
              {/* Description */}
              <AddGameSubTitleTextStyle >Description : </AddGameSubTitleTextStyle>
              <AddGameInputTextStyle {...register("description", {})} placeholder="Optional"/>
              <StyledButton type="submit" form="addGameForm">Submit</StyledButton>
            </form>
          </Grid>
        </Grid>
      </Box>
      
    </div>
  );
}

const addGameFormStyle : React.CSSProperties={
  justifyContent: 'center',
  display:'flex',
  flexDirection:'column',
  padding:'20px 20px 32px 20px',
  width:'60%',
  minWidth: '300px',
  maxWidth:'600px'
}

const addGameWarningFont : React.CSSProperties={
  color:'var(--warningRed)'
}
