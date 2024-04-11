import { useEffect } from "react";
import { useMemo } from "react";
import { GAMES_URL, USER_URL } from "../../services/api/constants";
import { useState } from "react";
import GameList from "../../components/GameList";
import Leaderboard from "../../components/Leaderboard";

const Profile = () => {
    const [authoredGames, setAuthoredGames] = useState([]);
    const [highscores, setHighscores] = useState([]);
    const token = useMemo(() => {
        return localStorage.getItem('token');
    }, [])

    const username = useMemo(() => {
        return localStorage.getItem('username');
    }, [])

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await fetch(`${USER_URL}/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const resData = await res.json();
                resData.authoredGames.forEach( async (game) => {
                    const scoreCount = await getGameScore(game.slug);
                    game['scoreCount'] = scoreCount;
                    setAuthoredGames((prevGames) => [...prevGames, game]);
                })
                setHighscores(resData.highscores);
            } catch (error) {
                console.error(error);
            }
        }

        const getGameScore = async (slug) => {
            try {
                const res = await fetch(`${GAMES_URL}/${slug}`)
                const resData = await res.json();
                return resData.scoreCount;
            } catch (error) {
                console.error(error)
            }
        }

        getUserInfo();
    }, [])

    return (
        <>
            <GameList mode={'editLink'} games={ authoredGames } listTitle={'Authored Games'}/>
            <h2 className="p-2 text-xl">Highscores per Game</h2>
            <Leaderboard title={'User Scores'} gameVisible={ true } scores={ highscores } />
        </>
    );
}

export default Profile;