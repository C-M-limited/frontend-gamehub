import React, {useEffect, useState} from 'react'
import { Grid, Typography, Box, Divider, Pagination,Autocomplete } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {StyledButton} from '../StyledButton';

import { useForm , SubmitHandler} from 'react-hook-form';
import axios from 'axios';
import { server } from '../../config';
import Router from 'next/router'
import { useDispatch } from 'react-redux';
import { OpenAlertAction } from '../../store/action/alert';
import RefreshTokenFunction from '../../utility/refreshTokenFunction';
import RefreshTokenFunctionWithOutData from '../../utility/RefreshTokenFunctionWithOutData';
interface GameListProps{
  id: number;
  name: string;
  image_url: string;
}
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
    // backgroundColor: 'var(--mainLightGrey)',
    color: 'var(--black)',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 15px 0px 15px',
    margin: '10px 0px',
    borderRadius: 10,
    width: '300px',
    height: '500px',
    justifyContent: 'center',
    alignItems: 'center'
  })

const GameItemTitle = styled(Typography)({
    fontSize: 20,
    marginTop: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'bolder'
})

const GameItemSubTitle = styled(Typography)({
    margin: '5px 0px 2px 0px',
    fontSize: 12,
    // color: 'var(--mainDarkerGrey)',
    fontWeight: 'bolder'
})

const Tags = styled(Typography)({
  color: 'var(--white)'
})

export default function UserProfileItem({post_id, game_id,image_src, name, price, location, brand, contact_method,description }: StyledGameItemProps) {
  const [newGameId,setNewGameId] = useState<any>(game_id);
  const [gameError,setGameError] = useState<boolean>(false);
  const [options,setOptions] = useState<GameListProps[]>([]);
  const dispatch = useDispatch();

  const consoleCode = ()=>{
      if(brand==="Play Station") { return "PS"}
      else if (brand==="Xbox") { return "Xbox"}
      else if (brand==="Nintendo") {return "NS"} 
      else {return ""}
  }
    const colorCode = () =>{
      if(brand==="Play Station") { return "#007ABE"}
      else if (brand==="Xbox") { return "#169A00"}
      else if (brand==="Nintendo") {return "#B70505"}

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
        // if (newGameId===-1){
        //   setGameError(true);
        // }else {
        //   setGameError(false);
        // }
        const dataToSend = 
        {
            "id" : post_id,
          "price": newPrice,
          "place_for_transaction": new_place_for_transaction,
          "description" : new_description,
          "contact_method": new_contact_method,
      }
        // console.log(dataToSend)
        editPost(dataToSend);
      
    };

    const editPost = async(dataToSendWithoutGameId:any) =>{
        // console.log(dataToSend.games)
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
        axios.put(`${server}/api/v1/game_sale_post`, dataToSend, { headers })
        .then(response => {
          dispatch(OpenAlertAction({type:"success",content: "Successfully Edited Post"}))
          setOpenEdit(false);
          Router.reload();
        })
        .catch((error) => {
          if(error.response.status === 403){
            if (error.response.data==='Expired JWT token'){
                RefreshTokenFunction(editPost ,dataToSend);
            }
          }
        })
    };

    const handleSubmitDelete = () =>{
        const accessToken = localStorage.getItem('access-token');
        const headers:any = { 
          'Authorization': accessToken,
        };
        axios.delete(`${server}/api/v1/game_sale_post/${post_id}`, { headers })
        .then(response => {
          dispatch(OpenAlertAction({type:"success",content: "Successfully Delete Post"}))
          setOpenDelete(false);
          Router.reload();
        })
        .catch((error) => {
          if(error.response.status === 403){
            if (error.response.data==='Expired JWT token'){
                RefreshTokenFunctionWithOutData(handleClickOpenDelete)
            }
          }
        })
    };

    const fetchGameList=async()=>{
      axios.get(`${server}/api/v1/games/all`)
      .then(response =>{
          setOptions(response.data);
      })
      .catch((error)=> dispatch(OpenAlertAction({type:"warning",content: "Sorry, Server is down"})))
    }
    useEffect (()=>{
    fetchGameList();
    },[])
    
  return (
      <>
    <Box>
        <GameItemContainer style={{cursor:'pointer'}} >
            <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Box sx={{width: '200px', height: '280px', position: 'relative',}}>
                    <Image 
                        src={image_src} 
                        placeholder="blur" 
                        blurDataURL="/blur.png"
                        alt={image_src}
                        layout="fill"
                        objectFit='contain'
                    />
                </Box>
            </Box>
            <GameItemTitle>{name}</GameItemTitle>
            <>
                <Box display={'flex'} justifyContent='space-between' >
                    <GameItemSubTitle>Price</GameItemSubTitle>
                    <Box display={'flex'} justifyContent='center' alignItems='center' bgcolor={colorCode} borderRadius={2} width={50} mt={1} position={'absolute'} ml={11}>
                        <Tags>{consoleCode()}</Tags>
                    </Box>
                </Box>
                <Typography >${price}</Typography>
            </>
            <>
                <GameItemSubTitle>Location</GameItemSubTitle>
                <Typography>{location}</Typography>
            </>
            <Box sx={{display: 'flex', justifyContent:'flex-end', width: '100%',marginY:'10px' }}>
                <Box onClick={handleClickOpenEdit} sx={{cursor: 'pointer',padding:'5px', '&:hover': {backgroundColor:'#35354584',borderRadius:'3px'}}}>
                    <EditIcon sx={{color:'green',}}/>
                </Box>
                <Box onClick={handleClickOpenDelete} sx={{cursor: 'pointer',padding:'5px', '&:hover': {backgroundColor:'#35354584',borderRadius:'3px'}}}>
                    <DeleteForeverIcon sx={{color:'#c80303'}}/>
                </Box>
            </Box>
        </GameItemContainer>
    </Box>
    {/* Edit page */}
    <Dialog open={openEdit} onClose={handleCloseEdit}>
        <Box sx={{width:'400px',maxWidth:'100%'}}>
            <DialogTitle style={{ backgroundColor: "var(--white)" }}>Update Post</DialogTitle>
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
                  defaultValue={{id : game_id, name: name, image_url: image_src }}
                />
                {gameError && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
                {/* Price */}
                <Typography style={addGameSubTitleTextStyle}>Price :</Typography>
                <TextField size="small" type="number" {...register("newPrice", {required: true, max: 2000, min: 0})} style={addGameInputStyle}/>
                {errors.newPrice && <Typography style={addGameWarningFont}>⚠ This field is required</Typography> }
                {/* Place for Transaction */}
                <Typography style={addGameSubTitleTextStyle}>Place for Transaction :</Typography>
                <TextField size="small" placeholder='e.g. Richmond' type="text" {...register("new_place_for_transaction", {required: true})} style={addGameInputStyle}/>
                {errors.new_place_for_transaction && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
                {/* Contact Method */}
                <Typography style={addGameSubTitleTextStyle}>Contact Method : </Typography>
                <TextField size="small" placeholder='e.g. +1 (XXX) XXX - XXXX' type="text" {...register("new_contact_method", { required: true })}  style={addGameInputStyle}/>
                {errors.new_contact_method && <Typography style={addGameWarningFont}>⚠This field is required</Typography>}
                {/* Description */}
                <Typography style={addGameSubTitleTextStyle}>Description : </Typography>
                <textarea {...register("new_description", {})} placeholder="Optional" style={addGameInputTextStyle}/>
                <DialogActions style={{ backgroundColor: "var(--white)" }}>
                    <StyledButton onClick={handleCloseEdit}>Cancel</StyledButton>
                    <StyledButton type="submit">Update</StyledButton>
                </DialogActions>
            </form>
      

        </Box>
    </Dialog>
    {/* Delete Page */}
    <Dialog open={openDelete} onClose={handleCloseDelete}>
      <Box sx={{width:'400px',maxWidth:'100%'}}>
          <DialogTitle style={{ backgroundColor: "var(--white)" }}>Deletion Confirm ?</DialogTitle>
          <DialogActions style={{ backgroundColor: "var(--white)" }}>
              <StyledButton onClick={handleCloseDelete}>Cancel</StyledButton>
              <StyledButton onClick={handleSubmitDelete} >Confirm</StyledButton>
          </DialogActions>
      </Box>
    </Dialog>
    </>

  )
}
const addGameFormStyle : React.CSSProperties={
    backgroundColor:'var(--white)',
    justifyContent: 'center',
    display:'flex',
    flexDirection:'column',
    padding:'20px 20px 32px 20px',
    width:'100%',

  }
  
  const addGameInputStyle : React.CSSProperties={
    backgroundColor:'var(--white)',
    borderWidth: 0,
    borderRadius:'4px',
    color: 'var(--black) !important',
    padding:'8px',
  }

  const addGameSubTitleTextStyle : React.CSSProperties={
    fontSize: 12,
    margin: '4px 0px',
    color: 'var(--mainDarkerGrey)'
  }
  
  const addGameInputTextStyle : React.CSSProperties={
    backgroundColor:'var(--white)',
    borderRadius:'5px',
    borderWidth: 0.5,
    minHeight: 80,
    color: 'var(--black)',
    padding:'12px',
    marginBottom: 12,
    resize: 'none',
  }
  

  const addGameWarningFont : React.CSSProperties={
    color:'var(--warningRed)'
  }
  