import { useMemo } from "react";

const Leaderboard = ({ gameVisible, scores, userScore, isLimited, title }) => {

    return (
            <div className='sm:flex-[75%] bg-white p-2'>
                <h3 className='bg-gray-800 text-white p-2 rounded'>{ title }</h3>
                {scores.length && scores.map((score, index) => {
                    if ((index >= 10) && isLimited) return;
                    if (score.username === localStorage.getItem('username')) {
                        if (gameVisible) {
                            return (
                                <p 
                                    key={ index }
                                    className={`font-bold bg-gray-800 text-white rounded my-2 flex justify-between p-2`} 
                                ><span>{score.title}</span> <span>{score.score}</span></p>
                            )
                        } else {
                            return (
                                <p 
                                    key={ index }
                                    className={`font-bold bg-gray-800 text-white rounded my-2 flex justify-between p-2`} 
                                ><span># {index + 1} You</span> <span>{score.score}</span></p>
                            )
                        }
                    }

                    if (gameVisible) {
                        return (
                            <p 
                            className='my-2 flex justify-between'
                            key={ index } 
                            ><span>{score.game.title}</span> <span>{score.score}</span></p>
                        )
                    }

                    return (
                        <p 
                            className='my-2 flex justify-between'
                            key={ index } 
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
    )
}

export default Leaderboard;