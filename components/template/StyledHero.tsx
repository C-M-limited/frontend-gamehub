import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { makeStyles } from '@material-ui/styles';

const Title = styled(Typography)({
    color: '#ffffff',
    fontSize: 36,
    zIndex: 2,
    textShadow: '0px 1px 2px #000',
})

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    imageContainer: {
        position: 'absolute',
        width: '100vw !important',
        height: '33.3vw',
    },
    gameIconButton: {
        position: 'relative',
        width: 80,
        height: 80,
        borderRadius: 'var(--space-8)',
        padding: 'var(--space-8)',
        backgroundColor: 'var(--color-gray-5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        bottom: 0,
        transition: 'bottom .2s',
        '&:hover': {
            backgroundColor: 'var(--color-gray-6)',
            bottom: 'var(--space-8)'
        }
    }
});

const gameConsoleList = [
    { src: "/xbox_logo.png", url: "/console_brand/xbox" },
    { src: "/nintendo_logo.svg", url: "/console_brand/nintendo" },
    { src: "/play_station_logo.png", url: "/console_brand/playstation" },
]

const StyledHero = () => {
    const classes = useStyles();
    return (
        <>
            <Grid container position='relative' height="33.3vw" mb={2}>
                <Grid item sm={12} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Title>All your games in one place.</Title>
                    <Box className={classes.imageContainer} zIndex={1}>
                        <Image src="/banner.jpg" layout="fill" />
                    </Box>
                    <Box display="flex" zIndex={2}>
                        {[gameConsoleList.map((item, key) => (
                            <Box key={key} mr={5} mt={3} className={classes.gameIconButton}>
                                <Link href={item.url} passHref>
                                    <Image src={item.src} alt={`${item.src}`} layout="intrinsic" width={60} height={60} />
                                </Link>
                            </Box>
                        ))]}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default StyledHero