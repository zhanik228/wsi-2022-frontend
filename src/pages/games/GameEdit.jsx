import { useParams } from 'react-router-dom';

import GameCard from "../../components/GameCard";
import { useEffect } from 'react';
import { GAMES_URL } from '../../services/api/constants';
import { useState } from 'react';

const GameEdit = () => {
    const [game, setGame] = useState(null);
    const params = useParams();

    useEffect(() => {
        const getGame = async () => {
            try {
                const res = await fetch(`${GAMES_URL}/${params.slug}`)
                const resData = await res.json();
                setGame(resData);
                // console.log(resData)
            } catch (error) {
                console.error(error);
            }
        }
        getGame();
    }, [])

    return (
        <>
            <h2 className="p-2 text-xl">Manage Game</h2>
            <div className='flex items-center justify-center'>
                <GameCard mode="edit" game={ game } />
            </div>
        </>
    );
}

export default GameEdit;