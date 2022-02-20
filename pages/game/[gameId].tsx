import { useRouter } from 'next/router';
import React from 'react'

const Game = () => {
    const router = useRouter()
    return (
        <h1>{router.query.gameId}</h1>
    )
}
export default Game;