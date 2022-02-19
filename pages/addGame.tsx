import React from 'react';
import { useForm , SubmitHandler} from 'react-hook-form';
import axios from 'axios';
import { server } from '../config'
import styles from './addGame.module.css'
const gameList = [
  {
    id: 1,
    name: 'GTA5'
  },
  {
    id:2,
    name:'Pokemon'
  }  
]

interface AddGameFormInput {
  game_id: number;
  price: number;
  place_for_transaction: String;
  description?: String;
  contact_method: String
}

export default function AddGame() {
  const { register, handleSubmit, watch,formState: { errors }} = useForm({
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
  
  return (
    <div style={{justifyContent:'center', width:'100%' , display:'flex', flexDirection:'column', alignItems:'center'}}>
      <h2 style={{color:'var(--white'}}>ADD GAME</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={addGameFromStyle} id="addGameForm">
        {/* Game */}
        <h4>Game :</h4>
        <select {...register("game_id", { required: true,min: 1 })} style={addGameInputStyle}>
          {gameList.map((game,index)=><option key={index} value={game.id}>{game.name}</option>)}
        </select>
        {errors.game_id && <p style={addGameWarningFont}>⚠This field is required</p>}
        {/* Price */}
        <h4>Price :</h4>
        <input type="number" {...register("price", {required: true, max: 2000, min: 0})} style={addGameInputStyle}/>
        {errors.price && <p style={addGameWarningFont}>⚠This field is required</p>}
        {/* Place for Transaction */}
        <h4>Place for Transaction :</h4>
        <input type="text" {...register("place_for_transaction", {required: true})} style={addGameInputStyle}/>
        {errors.place_for_transaction && <p style={addGameWarningFont}>⚠This field is required</p>}
        {/* Contact Method */}
        <h4>Contact Method : </h4>
        <input type="text" {...register("contact_method", { required: true })}  style={addGameInputStyle}/>
        {errors.contact_method && <p style={addGameWarningFont}>⚠This field is required</p>}
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
  paddingLeft: '20px',
  paddingRight:'20px',
  borderRadius:'30px',
  width:'60%',
  maxWidth:'600px'
}

const addGameInputStyle : React.CSSProperties={
  backgroundColor:'var(--mainBackground)',
  borderRadius:'10px',
  color: 'var(--white)',
  padding:'5px'
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
