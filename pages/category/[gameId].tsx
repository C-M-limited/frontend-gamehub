import { Grid, Typography, Box, Divider, Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import Image from 'next/image';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface postProps {
    seller: string,
    location: string,
    price: number,
    image: string,
    decription?: string,
    date: string
}

const Game = () => {
    const router = useRouter()
    const gameId = router.query.gameId
    const posts = {
            seller: 'mandy',
            location: 'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        }
    
    return (
        <Grid container display='flex' justifyContent='center'my={1} spacing={2}>
            <Grid item xs={12} md={12} lg={4} sx={{ height: '100vh', overflowY: 'scroll',  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box>
                    <Image layout="intrinsic" src="/game_sample.png" width={'150px'} height={'200px'} />
                </Box>
                {Array.from(Array(9)).map((item) => {
                    const { seller, location, price, image, decription, date } = posts;
                    return (
                        <Box key={image} sx={{ display: 'flex', justifyContent: 'space-Between', width: '80%', borderRadius: 2, padding: 1 }} bgcolor={"var(--mainGrey)"} mt={5}>
                            <Box sx={{ position: 'relative', width: 50, height: 50, borderRadius: 2, overflow: 'hidden' }} ml={-3} mt={-3}>
                                <Image layout="fill" src={image} alt="user icon" />
                            </Box>
                            <Box>
                                <Typography color={"#C0C0C0"}>Seller</Typography>
                                <Typography ml={2}>{seller}</Typography>
                            </Box>
                            <Box>
                                <Typography color={"#C0C0C0"}>Location</Typography>
                                <Typography ml={2}>{location}</Typography>
                            </Box>
                            <Box>
                                <Typography color={"#C0C0C0"}>Price</Typography>
                                <Typography ml={2}>${price}</Typography>
                            </Box>
                        </Box>
                    )
                })}
            </Grid>
            <Grid item xs={12} md={12} lg={8} sx={{ height: '100vh', overflowY: 'hidden' }}>
                <Box display="flex" alignItems='center'>
                    <Image src="/user_icon/user_1.svg" alt="user icon" width={'150px'} height={'200px'} />
                    <WhatsAppIcon style={{ width: 50, height: 50, marginLeft: 40, color: '#fff', backgroundColor: 'var(--mainGrey)', padding: 4, borderRadius: 4 }}/>
                </Box>
                <Grid container spacing={1} display="flex" alignItems='center'>
                    <Grid item lg={5} >
                        <Box style={{ color: '#fff', backgroundColor: 'var(--mainGrey)', padding: 12, borderRadius: 4 }}>
                            $200
                        </Box>
                    </Grid>
                    <Grid item lg={5} >
                        <Box style={{ color: '#fff', backgroundColor: 'var(--mainGrey)', padding: 12, borderRadius: 4 }}>
                            Wong Tai Sin
                        </Box>
                    </Grid>
                </Grid>
                <Grid container display="flex" alignItems='center' mt={2}>
                    <Grid item lg={10} >
                        <Box position='relative' style={{ color: '#fff', backgroundColor: 'var(--mainGrey)', padding: '12px 24px 36px 12px', borderRadius: 4 }}>
                            Description:
                            <br/><br/>
                            Find me on Whatsapp
                            <Box position="absolute" bottom={8} right={8}>
                                Updated at 18-9-2021
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Game;

