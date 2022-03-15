import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import {  grey } from '@mui/material/colors';
import Image from 'next/image';
import 'animate.css';
// import { fadeIn } from 'react-animations'
const FirstLoadingPage = ({children}: React.PropsWithChildren<{}>)=> {
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(false);
    })
    return !loading ? <React.Fragment>{children}</React.Fragment> :  
        (
        <Box bgcolor={grey[900]} width={'100vw'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box className="animate__animated animate__bounce">
            <Image src="/favicon.png" width={'200px'} height={'200px'} />  
            </Box>
        </Box>
        )
}
export default FirstLoadingPage;
// const Layout = ({children}: React.PropsWithChildren<{}>) => {
//     return (
//         <div style={{ backgroundColor: 'var(--color-gray-6)'}}>
//             <Navbar />
//               <Grid container display='flex' justifyContent='center' style={{ overflowX: 'hidden' }}>
//                 <Grid item sm={12}>
//                   {children}
//                 </Grid>
//               </Grid>
//             <Footer />
//         </div>
//     )
//   };
  
//   export default Layout;