import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import { Box } from '@mui/system';
import { Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { CloseAlertAction } from '../../store/action/alert';
interface alertProps{
  // children: React.PropsWithChildren<{}>;
  type : any;
  content: string;
}
export default function StyledAlert() {
    const dispatch= useDispatch();
    const isOpenAlert = useSelector((state: RootState) => state.alertRedux);
    const handleClose = ()=>{
        dispatch(CloseAlertAction())
    }
  return (
    <Snackbar open={isOpenAlert.isOpen} autoHideDuration={4000} onClose={handleClose}>
      <Box sx={{width:'200px', position:'fixed', zIndex:'100', left:'50%' ,marginLeft:'-100px', top:'10%'}}>
        <Alert  variant="filled"  severity={isOpenAlert.type}>{isOpenAlert.content}</Alert>
      </Box>
      </Snackbar>
  )
}
