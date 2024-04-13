import { Link } from "react-router-dom";

import { BASE_URL, GAMES_URL } from '../services/api/constants'

import Badge from "../components/ui/Badge";
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

const GameCard = React.forwardRef(({ game, mode }, ref) => {
    // console.log(game)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState('')

    const editLink = useMemo(() => {
        return mode === 'editLink';
    }, [])

    const editMode = useMemo(() => {
        return mode === 'edit';
    }, [])

    useEffect(() => {
        if (game) {
            setTitle(game?.title);
            setDescription(game?.description);
        }
    }, [game])

    if (!game) {
        return (
            <p>No game</p>
        )
    }

    const handleSubmit = () => {
        const formdata = new FormData();
        formdata.append('title', title);
        formdata.append('description', description);
        formdata.append('_method', 'PUT');

        const updateGame = async () => {
            try {
                const res = await fetch(`${GAMES_URL}/${game.slug}`, {
                    method: 'POST',
                    body: formdata,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const resData = await res.json();
                console.log(resData);
                setSuccess('updated successfully')
            } catch (error) {
                console.error(error);
            }
        }
        updateGame();
    }

    const handleDelete = async () => {
        const formdata = new FormData();
        formdata.append('_method', 'DELETE');

        try {
            const res = await fetch(`${GAMES_URL}/${game.slug}`, {
                method: 'POST',
                body: formdata,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const resData = await res.json();
            console.log(resData);
            setSuccess('Deleted successfully')
        } catch (error) {
            console.error(error);
        }
    }

    const handleFile = async (e) => {
        console.log('file')
        const file = e.target.files[e.target.files.length - 1];
        const formdata = new FormData();
        formdata.append('zipfile', file);
        formdata.append('token', localStorage.getItem('token'));

        try {
            const res = await fetch(`${GAMES_URL}/${game.slug}/upload`, {
                method: 'POST',
                body: formdata,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    // 'Accept': 'application/json'
                }
            })
            // const resData = await res.json();
            if (res.status === 201) {
                setSuccess('Uploaded successfully');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <li className="list-none rounded overflow-hidden game-card" ref={ ref }>
            {game.thumbnail 
                ?   <img className="object-cover w-full h-[200px] sm:h-[400px] block" src={ `${BASE_URL}/game/` + game.slug + '/thumbnail.png' } alt={ 'image for ' + game.title } />
                : <div className="w-full h-[200px] sm:h-[400px] bg-gray-700 text-white flex items-center justify-center">Game</div>
            }
            <div className="relative">
                <div className="bg-gray-800 absolute bottom-[85%] left-2 p-1 rounded-full">
                    <Badge color={'bg-red-500'}>Game</Badge>
                </div>
                <div className="bg-gray-800 absolute bottom-[85%] right-2 p-1 rounded-full">
                    <Badge color={'bg-blue-500'}>Score: { game.scoreCount }</Badge>
                </div>
                <div className="bg-gray-800 py-10 px-2">
                    {editMode ? (
                        <div className="flex flex-col gap-4">
                            <input className="text-dark " value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)} />
                            <input className="text-dark opacity-90" value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    )
                    :
                    <>
                    <h2 className="text-white font-bold"><span className="font-normal opacity-70">Title:</span> { game.title }</h2>
                    <p className="text-white opacity-90"><span className="font-normal opacity-70">Description:</span> { game.description }</p>
                    </>
                }
                </div>
                <div className="px-2 bg-gray-800"><div className="block bg-white opacity-50 w-full h-[1px]"></div></div>
                <div className="flex justify-between p-2 bg-gray-800">
                    {game.author
                        ?
                        <>
                        <div className="bg-gray-800 text-white flex-grow">
                        <span className="font-normal opacity-70">Author: </span>
                        { game.author }
                        </div>
                        <div className="w-[1px] bg-white opacity-50"></div>
                        </>
                        :
                        ''
                    }
                    {editLink
                        ? <Link to={'/game/' + game.slug + '/edit'} className="ml-auto px-3 py-1 mx-2 bg-blue-500 text-white rounded-full">Edit</Link>
                        :  
                    editMode
                        ?  <button className="px-3 py-1 mx-2 bg-green-400 rounded-full" onClick={handleSubmit}>Save</button> 
                        : <Link to={'/game/' + game.slug} className="px-3 py-1 mx-2 bg-green-400 rounded-full">Play</Link>
                        }
                    {editMode
                        ?   <button className="px-3 py-1 mx-2 bg-red-400 rounded-full" onClick={handleDelete}>Delete</button>
                        : '' 
                    }
                </div>
            </div>
            {success 
                        ? <p className="text-green-400 bg-gray-800 px-2">{success}</p>
                        : ''}
            {editMode && <input className="my-2" type="file" onChange={handleFile} />}
        </li>
    );
})

export default GameCard;