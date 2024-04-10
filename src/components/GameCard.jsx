import { Link } from "react-router-dom";

import { BASE_URL } from '../services/api/constants'

import Badge from "../components/ui/Badge";
import React from "react";

const GameCard = React.forwardRef(({ game }, ref) => {
    return (
        <li className="rounded overflow-hidden game-card" ref={ ref }>
            <img className="object-cover w-full h-[200px] sm:h-[400px] block" src={ `${BASE_URL}/game/` + game.slug + '/thumbnail.png' } alt={ 'image for ' + game.title } />
            <div className="relative">
                <div className="bg-gray-800 absolute bottom-[85%] left-2 p-1 rounded-full">
                    <Badge color={'bg-red-500'}>Game</Badge>
                </div>
                <div className="bg-gray-800 absolute bottom-[85%] right-2 p-1 rounded-full">
                    <Badge color={'bg-blue-500'}>Score: { game.scoreCount }</Badge>
                </div>
                <div className="bg-gray-800 py-4 px-2">
                    <h2 className="text-white font-bold"><span className="font-normal opacity-70">Title:</span> { game.title }</h2>
                    <p className="text-white opacity-90"><span className="font-normal opacity-70">Description:</span> { game.description }</p>
                </div>
                <div className="px-2 bg-gray-800"><div className="block bg-white opacity-50 w-full h-[1px]"></div></div>
                <div className="flex justify-between p-2 bg-gray-800">
                    <div className="bg-gray-800 text-white flex-grow">
                        <span className="font-normal opacity-70">Author: </span>
                        { game.author }
                    </div>
                    <div className="w-[1px] bg-white opacity-50"></div>
                    <Link to={'/game/' + game.slug} className="px-3 py-1 mx-2 bg-green-400 rounded-full">Play</Link>
                </div>
            </div>
        </li>
    );
})

export default GameCard;