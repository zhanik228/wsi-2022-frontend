import { useEffect, useState } from "react";

import { GAMES_URL } from "../services/api/constants";

const useGames = ({ page = 0, size = 10, sortBy, sortDir }) => {
    const [availableGames, setAvailableGames] = useState(0)
    const [isLoading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [gameContents, setGameContents] = useState([]);

    useEffect(() => {
        setGameContents([]);

        localStorage.setItem('sort_settings', JSON.stringify({
            sortBy,
            sortDir
        }))
    }, [sortDir, sortBy])
    
    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${GAMES_URL}?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const gamesData = await response.json();
                setAvailableGames(gamesData.totalElements);
                setGameContents(prevContents => {gamesData.content.map((game) => prevContents.push(game)); return prevContents});
                setHasMore(gamesData.content.length > 0);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching games:', error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [page, size, sortBy, sortDir]);

    return {
        availableGames,
        isLoading,
        hasMore,
        gameContents
    }
}

export default useGames;