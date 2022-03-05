import React, {useEffect, useState} from 'react'
import { Grid, Typography, Box, Divider, Pagination,Autocomplete } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import StyledButton from '../StyledButton';

import { useForm , SubmitHandler} from 'react-hook-form';
import axios from 'axios';
import { server } from '../../config';

interface AddGameFormInput {
  newGame_id: number;
  newPrice: number;
  new_place_for_transaction: String;
  new_description?: String;
  new_contact_method: String
}


interface StyledGameItemProps {
    post_id: number;
    game_id: number;
    image_src: string;
    name: string;
    price: number;
    location : string;
    brand: string;
    contact_method: string;
    description?: string;
}

const GameItemContainer = styled(Box)({
    backgroundColor: '#35354584',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 15px 0px 15px',
    margin: '10px 0px',
    borderRadius: 20,
    width: '200px',
    height: '400px',

})

const GameItemTitle = styled(Typography)({
    fontSize: 20,
    marginTop: 20,
})

const GameItemSubTitle = styled(Typography)({
    margin: '5px 0px 2px 0px',
    fontSize: 12,
    color: '#C0C0C0',
})

const Tags = styled(Typography)({
})

export default function UserProfileItem({post_id, game_id,image_src, name, price, location, brand, contact_method,description }: StyledGameItemProps) {
    const colorCode = () =>{
        if(brand==="Ps") { return "#007ABE"}
        else if (brand==="Xbox") { return "#169A00"}
        else if (brand==="ns") {return "#B70505"}

    }
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
      };
    
    const handleCloseEdit = () => {
    setOpenEdit(false);
    };
    const handleClickOpenDelete = () => {
    setOpenDelete(true);
    };

    const handleCloseDelete = () => {
    setOpenDelete(false);
    };


    const { register, handleSubmit, getValues, formState: { errors }} = useForm({
        defaultValues: {
          newGame_id: game_id,
          newPrice: price,
          new_place_for_transaction: location,
          new_description: description,
          new_contact_method: contact_method
        }
      });
    const onSubmit : SubmitHandler<AddGameFormInput> = data => {
        const {newGame_id,newPrice,new_place_for_transaction,new_description,new_contact_method}= data
        const dataToSend = 
        {
            "id" : post_id,
          "price": newPrice,
          "place_for_transaction": new_place_for_transaction,
          "description" : new_description,
          "contact_method": new_contact_method,
          "games":{
              "id":newGame_id
          }
      }
        console.log(dataToSend)
        editPost(dataToSend);
      
    };
    const editPost = async(dataToSend:any) =>{
        const accessToken = localStorage.getItem('access-token');
        const headers:any = { 
          'Authorization': accessToken,
        };
        axios.put(`${server}/api/v1/game_sale_post`, dataToSend, { headers })
        .then(response => {
          window.alert("Successfully Added Post")
          setOpenEdit(false);
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
        const headers:any = { 
          'refreshToken': refreshToken,
        };
        axios.post(`${server}/api/v1/token/refresh`,{}, { headers })
          .then(response => {
            localStorage.setItem('access-token',response.data.AUTHORIZATION );
            editPost(dataToSend);
    
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
    const handleSubmitDelete = () =>{
        const accessToken = localStorage.getItem('access-token');
        const headers:any = { 
          'Authorization': accessToken,
        };
        axios.delete(`${server}/api/v1/game_sale_post/${post_id}`, { headers })
        .then(response => {
          window.alert("Successfully Delete Post")
          setOpenDelete(false);
        })
        .catch((error) => {
          if(error.response.status === 403){
            if (error.response.data==='Expired JWT token'){
                const refreshToken = `Bearer ${localStorage.getItem('refresh-token')}`;
                const headers:any = { 
                'refreshToken': refreshToken,
                };
                axios.post(`${server}/api/v1/token/refresh`,{}, { headers })
                .then(response => {
                    localStorage.setItem('access-token',response.data.AUTHORIZATION );
                    handleClickOpenDelete();
            
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
          }
        })
    }


    //   const onSubmit : SubmitHandler<AddGameFormInput> = data => {
    //     const {game_id,price,place_for_transaction,description,contact_method}= data
    //     const dataToSend = 
    //     {
    //       "price": price,
    //       "place_for_transaction": place_for_transaction,
    //       "description" : description,
    //       "contact_method": contact_method,
    //       "games":{
    //           "id":game_id
    //       }
    //   }

    //     addPost(dataToSend);
      
    //   };


    const [gameList,setGameList] = useState<any[]>([]);
    const fetchGameList=async()=>{
    axios.get(`${server}/api/v1/games/all`)
    .then(response =>{
        setGameList(response.data);
    })
    .catch((error)=> window.alert("Sorry, Server is down right now"))
    }
    useEffect (()=>{
    fetchGameList();
    },[])
    
  return (
      <>
    <Grid item xs={12} sm={6} md={3} lg={2}>
        <GameItemContainer style={{    border: `3px solid ${colorCode()}` , cursor:'pointer'}} >
            <Image src={image_src} layout="responsive" width={180} height={200} />
            <GameItemTitle>{name}</GameItemTitle>
            <Divider style={{ backgroundColor: '#999999'}}/>
            <>
                <Box display={'flex'} justifyContent='space-between' >
                    <GameItemSubTitle>Price</GameItemSubTitle>
                    <Box display={'flex'} justifyContent='center' alignItems='center' bgcolor={colorCode} borderRadius={2} width={50} mt={1} position={'absolute'} ml={14}>
                        <Tags>{brand}</Tags>
                    </Box>
                </Box>
                <Typography >{price} HKD</Typography>
            </>
            <>
                <GameItemSubTitle>Location</GameItemSubTitle>
                <Typography>{location}</Typography>
            </>
            <Box sx={{display: 'flex', justifyContent:'space-around',marginY:'10px' }}>
                <Box onClick={handleClickOpenEdit} sx={{cursor: 'pointer'}}>
                    <EditIcon sx={{color:'green'}}/>
                </Box>
                <Box onClick={handleClickOpenDelete} sx={{cursor: 'pointer'}}>
                    <DeleteForeverIcon sx={{color:'#c80303'}}/>
                </Box>
            </Box>
        </GameItemContainer>
    </Grid>
    {/* Edit page */}
    <Dialog open={openEdit} onClose={handleCloseEdit}>
        <Box sx={{width:'400px',maxWidth:'100%'}}>
            <DialogTitle style={{ backgroundColor: "#000" }}>Update Post</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} style={addGameFormStyle} id="addGameForm">
                {/* Game */}
                <Typography style={addGameSubTitleTextStyle}>Game name:</Typography>
                <Autocomplete {...register("newGame_id", { required: true,min: 1 })} 
                style={addGameInputStyle}
                disablePortal
                size="small"
                renderInput={(params) => <TextField {...params} label="Game" />}
                options={gameList.map((game)=>{
                    let newGame:any = {}
                    newGame['label'] = game.name
                    return newGame
                })}
                />
                {errors.newGame_id && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
                {/* Price */}
                <Typography style={addGameSubTitleTextStyle}>Price :</Typography>
                <TextField size="small" type="number" {...register("newPrice", {required: true, max: 2000, min: 0})} style={addGameInputStyle}/>
                {errors.newPrice && <Typography style={addGameWarningFont}>⚠ This field is required</Typography> }
                {/* Place for Transaction */}
                <Typography style={addGameSubTitleTextStyle}>Place for Transaction :</Typography>
                <TextField size="small" placeholder='e.g. Kowloon' type="text" {...register("new_place_for_transaction", {required: true})} style={addGameInputStyle}/>
                {errors.new_place_for_transaction && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
                {/* Contact Method */}
                <Typography style={addGameSubTitleTextStyle}>Contact Method : </Typography>
                <TextField size="small" placeholder='e.g. (+852) 12345678' type="text" {...register("new_contact_method", { required: true })}  style={addGameInputStyle}/>
                {errors.new_contact_method && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
                {/* Description */}
                <Typography style={addGameSubTitleTextStyle}>Description : </Typography>
                <textarea {...register("new_description", {})} placeholder="Optional" style={addGameInputTextStyle}/>
                <DialogActions style={{ backgroundColor: "#000" }}>
                    <StyledButton onClick={handleCloseEdit}>Cancel</StyledButton>
                    <StyledButton type="submit">Update</StyledButton>
                </DialogActions>
            </form>
      

        </Box>
      </Dialog>
      {/* Delete Page */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <Box sx={{width:'400px',maxWidth:'100%'}}>
            <DialogTitle style={{ backgroundColor: "#000" }}>Deletion Confirm ?</DialogTitle>
            <DialogActions style={{ backgroundColor: "#000" }}>
                <StyledButton onClick={handleCloseDelete}>Cancel</StyledButton>
                <StyledButton onClick={handleSubmitDelete} >Confirm</StyledButton>
            </DialogActions>
        </Box>
      </Dialog>
    </>

  )
}
const addGameFormStyle : React.CSSProperties={
    backgroundColor:'black',
    justifyContent: 'center',
    display:'flex',
    flexDirection:'column',
    padding:'20px 20px 32px 20px',
    width:'100%',

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
  