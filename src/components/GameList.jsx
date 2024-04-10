import GameCard from "./GameCard";

const GameList = ( { games, lastCardRef, lastCardStyles, isLoading } ) => {

    if (isLoading) {
        return (
            <h2>Loading...</h2>
        )
    }

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
                <li key={game.title} className="game-card" ref={ index === games.length - 1 ? lastCardRef : null }>
                    <GameCard slug={ game.slug } title={ game.title } description={ game.description } scoreCount={ game.scoreCount } author={ game.author } />
                </li>
            ))}
        </ul>
    );
}

export default GameList;