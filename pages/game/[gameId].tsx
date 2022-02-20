import { Grid, Typography, Box, Divider, Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import Image from 'next/image';
import { SellRounded } from '@mui/icons-material';
interface postProps{
    seller: string,
    location: string,
    price: number,
    image: string,
    decription?: string,
    date: string
}
const Game = () => {
    const router = useRouter()
    const gameId= router.query.gameId
    const posts=[
        {
            seller:'mandy',
            location:'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        },
        {
            seller:'mandy',
            location:'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        },
        {
            seller:'mandy',
            location:'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        },
        {
            seller:'mandy',
            location:'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        },
        {
            seller:'mandy',
            location:'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        },
        {
            seller:'mandy',
            location:'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        },
        {
            seller:'mandy',
            location:'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        },
        {
            seller:'mandy',
            location:'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        },
        {
            seller:'mandy',
            location:'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        },
        {
            seller:'mandy',
            location:'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        },
        {
            seller:'mandy',
            location:'yau tong',
            price: 200,
            image: '/user_sample.jpg',
            decription: 'find me on whatsapp',
            date: '18/9/21'
        },

    ]
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center',width:'100%', height:'100vh' }} bgcolor={'white'} >
            <Box sx={{width: '40%',overflowY: 'scroll'}} bgcolor={'green'}>
                <Image src="/game_sample.png"  width={'150px'} height={'200px'}/>
                {posts.map((post:postProps)=> {
                    const {seller,location,price,image,decription,date}= post;
                    return(
                        <Box sx={{display:'flex', justifyContent:'space-Between',width:'100%'}} bgcolor={"var(--mainGrey)"} mt={5}>
                            <Box sx={{position: 'relative', borderRadius:'20px'}} ml={-3} mt={-3}>
                            <Image src={image} width={'50px'} height={'50px'}/>
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
            </Box>
            <Box sx={{width: '60%'}} bgcolor={'blue'}>
                <Image src="/game_sample.png" width={'150px'} height={'200px'}/>
            </Box>
        </Box>
    )
}
export default Game;
