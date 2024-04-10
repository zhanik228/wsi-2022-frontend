import GameCard from "./GameCard";

const GameList = ( { games, lastCardRef, lastCardStyles, isLoading } ) => {
    if (!games?.length) {
        return (
            <h2>
                No game exists
            </h2>
        )
    }

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
            {games.map((game, index) => (
                <GameCard key={ game.slug } ref={ index === games.length - 1 ? lastCardRef : null } game={ game } />
            ))}
            {isLoading && <li><h2>Loading...</h2></li> }
        </ul>
    );
}

export default GameList;