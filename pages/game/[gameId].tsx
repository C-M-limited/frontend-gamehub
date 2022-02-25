import { Grid, Typography, Box, Divider, Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import Image from 'next/image';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import axios from 'axios';
import { server } from '../../config';

interface postProps {
    seller: string,
    location: string,
    price: number,
    image: string,
    decription?: string,
    date: string
}

const Game = ({ gameDetails }) => {
    console.log(gameDetails)
    const { contact_method, created_date, description, place_for_transaction, price, user_name, game_name } = gameDetails

    return (
        <Grid container display='flex' justifyContent='center' my={1} spacing={2}>
            <Grid item xs={12} md={12} lg={8} sx={{ height: '100vh', overflowY: 'hidden' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Image layout="intrinsic" src="/game_sample.png" width={'150px'} height={'200px'} />
                    <Typography ml={2} fontSize={36}>{game_name}</Typography>
                </Box>
                <Box display="flex" alignItems='center'>
                    <Image src="/user_icon/user_1.svg" alt="user icon" width={'150px'} height={'200px'} />
                        <Typography ml={2}>{user_name}</Typography>
                    {contact_method &&
                        <a href={`https://wa.me/${contact_method}`}>
                            <WhatsAppIcon style={{ width: 50, height: 50, marginLeft: 40, color: '#fff', backgroundColor: 'var(--mainGrey)', padding: 4, borderRadius: 4 }} />
                        </a>
                    }
                </Box>
                <Grid container spacing={1} display="flex" alignItems='center'>
                    <Grid item lg={6} >
                        <Box style={{ color: '#fff', backgroundColor: 'var(--mainGrey)', padding: 12, borderRadius: 4 }}>
                            ${price}
                        </Box>
                    </Grid>
                    <Grid item lg={6} >
                        <Box style={{ color: '#fff', backgroundColor: 'var(--mainGrey)', padding: 12, borderRadius: 4 }}>
                            {place_for_transaction}
                        </Box>
                    </Grid>
                </Grid>
                <Grid container display="flex" alignItems='center' mt={2}>
                    <Grid item lg={12} >
                        <Box position='relative' style={{ color: '#fff', backgroundColor: 'var(--mainGrey)', padding: '12px 24px 36px 12px', borderRadius: 4 }}>
                            Description:
                            <br /><br />
                            {description === "" ? "This guy didn't say anything left" : description}
                            <Box position="absolute" bottom={8} right={8}>
                                Updated at {new Date(new Date(created_date).getTime()).toLocaleString("en-US")}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Game;

export const getServerSideProps = async (context) => {
    console.log(context.query)
    const { gameId } = context.query

    const [gameDetails] = await (await axios.get(`${server}/api/v1/game_sale_post/id/${gameId}`)).data
    return {
        props: {
            gameDetails: {
                ...gameDetails.game_sale_post,
                user_name: gameDetails.user_name,
                game_name: gameDetails.game_name,
            }
        }
    }
}