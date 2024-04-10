import { useEffect, useRef, useState } from "react";
import useGames from "../../hooks/useGames";

import GameList from "../../components/GameList";
import Filter from "../../components/Filter";


const GamesPage = () => {
    // всегда держать скролл когда обновлено на вверху
    useEffect(() => {
        window.onload = function() {
            window.scrollTo(0, 0);
        }
    }, []);
    
    const [page, setPage] = useState(0);
    const [size, setSize] = useState();
    const [sortBy, setSortBy] = useState(JSON.parse(localStorage.getItem('sort_settings')).sortBy || 'title');
    const [sortDir, setSortDir] = useState(JSON.parse(localStorage.getItem('sort_settings')).sortDir || 'asc');
    const { availableGames, isLoading, hasMore, gameContents } = useGames( { page, size, sortBy, sortDir } );

    // для отслеживания последнего элемента игр
    const observer = useRef(null);
    const lastCardRef = useRef(null);

    useEffect(() => {
        console.log('sortBy: ' + sortBy, 'sortDir: ' + sortDir);
    }, [sortBy, sortDir])

    useEffect(() => {
        if (isLoading) return
        observer.current = new IntersectionObserver((entries) => {
            const lastCard = entries[0];
            if (lastCard.isIntersecting && hasMore) {
                console.log('last item is visible');
                setPage((prevPage) => prevPage + 1)
            }
        }, {
            threshold: 1
        })
        const lastCard = lastCardRef.current
        
        if (lastCard) {
            observer.current.observe(lastCard);
        } else {
            console.error('not found')
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        }
    }, [isLoading, hasMore])

    return (
        <>
            <Filter filterBy={ sortBy } filterDir={ sortDir } availableGames={ availableGames } setFilterBy={ setSortBy } setFilterDir={ setSortDir } />
            <GameList games={ gameContents } lastCardRef={ lastCardRef } isLoading={ isLoading } />
        </>
    );
}

export default GamesPage;