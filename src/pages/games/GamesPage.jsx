import { useEffect, useMemo, useRef, useState } from "react";
import useGames from "../../hooks/useGames";

import GameCard from "../../components/GameCard";
import GameList from "../../components/GameList";


const GamesPage = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState();
    const [sortBy, setSortBy] = useState();
    const [sortDir, setSortDir] = useState();
    const { availableGames, isLoading, hasMore, gameContents } = useGames( { page, size, sortBy, sortDir } );

    const observer = useRef(null);
    const lastCardRef = useRef(null);
    
    const lastCardStyles = useMemo(() => {
        return {
          position: 'sticky',
          bottom: 0,
          width: "100%",
        };
      }, []);

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
            <h1 className="p-2">Available Games: { availableGames }</h1>
            <GameList games={ gameContents } lastCardRef={ lastCardRef } lastCardStyles={ lastCardStyles } isLoading={ isLoading } />
        </>
    );
}

export default GamesPage;