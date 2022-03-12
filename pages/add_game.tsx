import React,{useEffect, useState} from 'react';
import { useForm , SubmitHandler} from 'react-hook-form';
import axios from 'axios';
import { server } from '../config'
import { Autocomplete, Typography, TextField } from '@mui/material';
import StyledButton from '../components/StyledButton';

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
export default function AddGame() {
  const [newGameId,setNewGameId] = useState<any>(-1);
  const [gameError,setGameError] = useState<boolean>(false);
  const { register, handleSubmit, getValues, formState: { errors }} = useForm({
    defaultValues: {
      game_id: 0,
      price: 0,
      place_for_transaction: "",
      description: "",
      contact_method: ""
    }
  });
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
      // console.log(response)
      window.alert("Successfully Added Post")
    })
    .catch((error) => {
      console.log(error)
      if(error.response.status === 403){
        if (error.response.data==='Expired JWT token'){
            refreshToken(dataToSend);
        }
      }
    })
  }
  const refreshToken =async(dataToSend:any)=>{
    const refreshToken = `Bearer ${localStorage.getItem('refresh-token')}`;
    // console.log(refreshToken)
    const headers:any = { 
      'refreshToken': refreshToken,
    };
    axios.post(`${server}/api/v1/token/refresh`,{}, { headers })
      .then(response => {
        localStorage.setItem('access-token',response.data.AUTHORIZATION );
        addPost(dataToSend);

      })
      .catch((error =>{
        console.log("Problem:")
        console.log(error.response.data);
        if(error.response.status === 403){
          if (error.response.data==='Expired JWT token'){
              //send to login
          }
        }
      }))
  }
  const [options,setOptions] = useState<GameListProps[]>([]);
  const fetchGameList=async()=>{
    axios.get(`${server}/api/v1/games/all`)
    .then(response =>{
      setOptions(response.data);
      // console.log(response.data)
    })
    .catch((error)=> {})
  }
  useEffect (()=>{
    fetchGameList();
  },[])

  
  return (
    <div style={{justifyContent:'center', width:'100%' , display:'flex', flexDirection:'column', alignItems:'center'}}>
      <h2 style={{color:'var(--white'}}>ADD GAME</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={addGameFormStyle} id="addGameForm">
        {/* Game */}
        <Typography style={addGameSubTitleTextStyle}>Game name:</Typography>
        <Autocomplete 
          style={addGameInputStyle}
          disablePortal
          size="small"
          renderInput={(params) => <TextField {...params}  label="Game" />}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onChange={(event, value) => setNewGameId(value?.id)}
          getOptionLabel={(option) => option.name}
          options={options}
        />
        {gameError && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
        {/* Price */}
        <Typography style={addGameSubTitleTextStyle}>Price :</Typography>
        <TextField size="small" type="number" {...register("price", {required: true, max: 2000, min: 0})} style={addGameInputStyle}/>
        {errors.price && <Typography style={addGameWarningFont}>⚠ This field is required</Typography> }
        {/* Place for Transaction */}
        <Typography style={addGameSubTitleTextStyle}>Place for Transaction :</Typography>
        <TextField size="small" placeholder='e.g. Kowloon' type="text" {...register("place_for_transaction", {required: true})} style={addGameInputStyle}/>
        {errors.place_for_transaction && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
        {/* Contact Method */}
        <Typography style={addGameSubTitleTextStyle}>Contact Method : </Typography>
        <TextField size="small" placeholder='e.g. (+852) 12345678' type="text" {...register("contact_method", { required: true })}  style={addGameInputStyle}/>
        {errors.contact_method && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
        {/* Description */}
        <Typography style={addGameSubTitleTextStyle}>Description : </Typography>
        <textarea {...register("description", {})} placeholder="Optional" style={addGameInputTextStyle}/>
        <StyledButton type="submit" form="addGameForm">Submit</StyledButton>
      </form>
      
    </div>
  );
}

const addGameFormStyle : React.CSSProperties={
  backgroundColor:'var(--mainGrey)',
  justifyContent: 'center',
  display:'flex',
  flexDirection:'column',
  padding:'20px 20px 32px 20px',
  borderRadius:'12px',
  width:'60%',
  minWidth: '300px',
  maxWidth:'600px'
}

const addGameInputStyle : React.CSSProperties={
  backgroundColor:'var(--mainBackground)',
  borderWidth: 0,
  borderRadius:'4px',
  color: 'var(--white) !important',
  padding:'8px',
}
//Todo
// const addGameInputStyle :-internal-autofill-selected : React.CSSProperties={

// }

const addGameSubTitleTextStyle : React.CSSProperties={
  fontSize: 12,
  margin: '4px 0px',
  color: 'var(--mainDarkerGrey)'
}

const addGameInputTextStyle : React.CSSProperties={
  backgroundColor:'var(--mainBackground)',
  borderRadius:'10px',
  borderWidth: 0,
  minHeight: 80,
  color: 'var(--white)',
  padding:'12px',
  marginBottom: 12,
  resize: 'none',
}

const addGameSubmitStyle : React.CSSProperties={
  backgroundColor:'var(--mainPurple)',
  borderRadius:'10px',
  color: 'var(--white)',
  padding:'10px 30px 10px 30px',
  margin:'20px',
  marginTop:'-20px',
  maxWidth:'150px',
  fontSize:'20px',
  position: 'relative',
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer'
}
const addGameWarningFont : React.CSSProperties={
  color:'var(--warningRed)'
}
