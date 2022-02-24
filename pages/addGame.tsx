import React,{useEffect, useState} from 'react';
import { useForm , SubmitHandler} from 'react-hook-form';
import axios from 'axios';
import { server } from '../config'
import { Typography } from '@mui/material';

interface AddGameFormInput {
  game_id: number;
  price: number;
  place_for_transaction: String;
  description?: String;
  contact_method: String
}

export default function AddGame() {
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
    const {game_id,price,place_for_transaction,description,contact_method}= data
    const dataToSend = 
    {
      "price": price,
      "place_for_transaction": place_for_transaction,
      "description" : description,
      "contact_method": contact_method,
      "games":{
          "id":game_id
      }
  
  }
    console.log(dataToSend)
    addPost(dataToSend);
  
  };
  console.log(errors);
  const addPost = async(dataToSend:any) =>{
    const accessToken = localStorage.getItem('access-token');
    const headers:any = { 
      'Authorization': accessToken,
    };
    axios.post(`${server}/api/v1/game_sale_post`, dataToSend, { headers })
    .then(response => {
      console.log(response)
      window.alert("Successfully Added Post")
    })
    .catch((error) => {
      if(error.response.status === 403){
        if (error.response.data==='Expired JWT token'){
            refreshToken(dataToSend);
        }
      }
    })
  }
  const refreshToken =async(dataToSend:any)=>{
    const refreshToken = `Bearer ${localStorage.getItem('refresh-token')}`;
    console.log(refreshToken)
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
  const [gameList,setGameList] = useState<any[]>([]);
  const fetchGameList=async()=>{
    axios.get(`${server}/api/v1/games/all`)
    .then(response =>{
      setGameList(response.data);
      console.log(response.data)
    })
    .catch((error)=> window.alert("Sorry, Server is down right now"))
  }
  useEffect (()=>{
    fetchGameList();
  },[])
  return (
    <div style={{justifyContent:'center', width:'100%' , display:'flex', flexDirection:'column', alignItems:'center'}}>
      <h2 style={{color:'var(--white'}}>ADD GAME</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={addGameFromStyle} id="addGameForm">
        {/* Game */}
        <Typography>Game :</Typography>
        <select {...register("game_id", { required: true,min: 1 })} style={addGameInputStyle}>
          <>
            <option>find your game</option>
            {gameList.map((game,index)=><option key={index} value={game.id}>{game.name}</option>)}
          </>
        </select>
        {errors.game_id && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
        {/* Price */}
        <Typography>Price :</Typography>
        <input type="number" {...register("price", {required: true, max: 2000, min: 0})} style={addGameInputStyle}/>
        {errors.price && <Typography style={addGameWarningFont}>⚠ This field is required</Typography> }
        {/* Place for Transaction */}
        <Typography>Place for Transaction :</Typography>
        <input type="text" {...register("place_for_transaction", {required: true})} style={addGameInputStyle}/>
        {errors.place_for_transaction && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
        {/* Contact Method */}
        <Typography>Contact Method : </Typography>
        <input type="text" {...register("contact_method", { required: true })}  style={addGameInputStyle}/>
        {errors.contact_method && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
        {/* Description */}
        <h4>Description : </h4>
        <textarea {...register("description", {})} placeholder="Optional" style={addGameInputTextStyle}/>

        
      </form>
      <button type="submit" form="addGameForm" style={addGameSubmitStyle}>Submit</button>
    </div>
  );
}

const addGameFromStyle : React.CSSProperties={
  backgroundColor:'var(--mainGrey)',
  justifyContent: 'center',
  display:'flex',
  flexDirection:'column',
  padding:'20px',
  borderRadius:'30px',
  width:'60%',
  maxWidth:'600px'
}

const addGameInputStyle : React.CSSProperties={
  backgroundColor:'var(--mainBackground)',
  borderRadius:'4px',
  color: 'var(--white)',
  padding:'5px',
}
//Todo
// const addGameInputStyle :-internal-autofill-selected : React.CSSProperties={

// }


const addGameInputTextStyle : React.CSSProperties={
  backgroundColor:'var(--mainBackground)',
  borderRadius:'10px',
  color: 'var(--white)',
  padding:'5px',
  resize: 'none',
  marginBottom: '50px'
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
