import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom'
import { GAMES_URL, BASE_URL } from '../../services/api/constants';

const GamePage = () => {
    const [loading, setLoading] = useState(true);
    const [scores, setScores] = useState([]);
    const [game, setGame] = useState(null);

    const params = useParams()

    const userScore = useMemo(() => {
        const user = scores.find((score) => score.username === localStorage.getItem('username'))
        const index = scores.findIndex((score) => score.username === localStorage.getItem('username'))
        if (index >= 10) {
            return user;
        }
        return null;
    }, [scores])

    useEffect(() => {
        const messageListener = (event) => {
            console.log(event.data.event_type)
        }
        window.addEventListener('message', messageListener);

        return () => window.removeEventListener('message', messageListener);
    }, [])

    useEffect(() => {
        const getGame = async () => {
            try {
                const res = await fetch(GAMES_URL + '/' + params.slug);
                const resData = await res.json();
                setGame(resData)
                setLoading(false);
            } catch (error) {
                console.log(error.message)
                console.error(error);
                setLoading(false)
            }
        }

        const getGameScores = async () => {
            try {
                const res = await fetch(GAMES_URL + '/' + params.slug + '/scores');
                const resData = await res.json();
                setScores(resData.scores);
                console.log(resData)
            } catch (error) {
                console.log(error.message)
                console.error(error);
            }
        }

        const getGameFrame = async () => {
            try {
                const res = await fetch(`${BASE_URL}/game/` + params.slug + '/index.html')
                console.log(await res.json())
            } catch (error) {
                console.error(error);
            }
        }

        // получить игру и очки
        getGame();
        // getGameFrame()
        getGameScores();
    }, [])

    if (loading) {
        return (<p>Loading...</p>);
    }

    if (!game) {
        return (<p>No game</p>);
    }

    return (
        <div className="p-2">
            <h2 className='text-2xl'>{ game.title }</h2>
            <div className='shadow rounded-xl bg-gray-800 p-2'>
                <h3 className='text-center text-white text-xl mb-2'>Game</h3>
                <iframe className='w-full bg-white h-[300px]' src={`${BASE_URL}/game/` + game.slug + '/index.html'}></iframe>
            </div>
            <div className='sm:flex justify-between w-full gap-2 my-2 bg-gray-800 p-2'>
                <div className='sm:flex-[50%] bg-white p-2'>
                    <h3 className='bg-gray-800 text-white p-2 rounded'>Top 10 Leaderboard</h3>
                    {scores.length && scores.map((score, index) => {
                        if (index >= 10) return;
                        if (score.username === localStorage.getItem('username')) {
                            return (
                                <p 
                                    key={ score.username }
                                    className={`font-bold bg-gray-800 text-white rounded my-2 flex justify-between p-2`} 
                                ><span># {index + 1} You</span> <span>{score.score}</span></p>
                            )
                        }
                        return (
                            <p 
                                className='my-2 flex justify-between'
                                key={ score.username } 
                            ><span># {index + 1} {score.username}</span> <span>{score.score}</span></p>
                        )
                    })}
                    {userScore
                        ? 
                            <p 
                                className={`font-bold bg-gray-800 text-white rounded my-2 flex justify-between p-2`} 
                            >
                                <span>{userScore.username}</span> <span>{userScore.score}</span>
                            </p>
                        :
                        <p></p>
                    }
                </div>
                <div className='sm:flex-[50%] bg-white p-2'>
                    <h3 className='bg-gray-800 text-white p-2 rounded'>Description</h3>
                    <p className='my-2'>{ game.description }</p>
                </div>
            </div>
        </div>
    );
}

export default GamePage;