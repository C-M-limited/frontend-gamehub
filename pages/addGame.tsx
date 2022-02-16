import React from 'react';
import { useForm } from 'react-hook-form';

export default function addGame() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <div style={{justifyContent:'center', width:'100%' , display:'flex', flexDirection:'column', alignItems:'center'}}>
      <h2 style={{color:'var(--white'}}>ADD GAME</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={addGameFromStyle} id="addGameForm">
        <h4>Game :</h4>
        <select {...register("Game", { required: true })} style={addGameInputStyle}>

        </select>
        <h4>Price :</h4>
        <input type="number" {...register("Price", {required: true, max: 2000, min: 0})} style={addGameInputStyle}/>
        <h4>Place fro Transaction :</h4>
        <input type="text" {...register("Place for Transaction", {required: true})} style={addGameInputStyle}/>
        <h4>Description : </h4>
        <textarea {...register("Description", {})} placeholder="Optional" style={addGameInputTextStyle}/>

        
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