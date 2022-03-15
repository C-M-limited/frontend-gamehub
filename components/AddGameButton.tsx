import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { styled, alpha } from "@mui/material/styles";
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

const AddGameButtonWrapper =  styled('li')(({ theme }) => ({
    cursor: "pointer",
    position: 'fixed',
    background: 'linear-gradient(90deg, rgba(102,0,255,1) 0%, rgba(180,28,255,1) 100%)',
    height: 36,
    color: 'var(--white)',
    borderRadius: '4px',
    padding: '8px',
    justifyContent:'center',
    alignItems:'center',
    right: '0%',
    bottom: '10%',
    zIndex: 100,
    transition:  theme.transitions.create(['bottom', 'transform'], {
        duration: theme.transitions.duration.standard,
      }),
      "&:hover": {
        // backgroundColor: alpha(theme.palette.common.white, 0.25),
        // padding:'15px',
        bottom: '12%'
       
      },
  }));

  
  

export default function AddGameButton() {
    const router = useRouter();
    const showBlackList = ()=>{
        if (router.pathname==="/add_game"){
            return false;
        }
        else{
            return true;
        }
    }
  return ( 
      <Link href={'/add_game'} passHref>
        <AddGameButtonWrapper sx={{ display:  showBlackList() ? 'flex': 'none'}}>
            <AddIcon  />
            <Typography>ADD</Typography>
        </AddGameButtonWrapper>
      </Link>
//   <Box sx={{ '& > :not(style)': { m: 1 } }} bgcolor={'linear-gradient(90deg, rgba(102,0,255,1) 0%, rgba(180,28,255,1) 100%)'}>
//     <Fab variant="extended" size="small" color="inherit" aria-label="add">
//     <AddIcon sx={{ mr: 1 }} />
//     ADD
//     </Fab>
// </Box>
  )
}
