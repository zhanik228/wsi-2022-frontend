import GameCard from "./GameCard";

const GameList = ( { listTitle, games, lastCardRef, lastCardStyles, isLoading, mode } ) => {
    if (!games?.length) {
        return (
            <h2>
                No game exists
            </h2>
        )
    }

    return (
        <>
        {listTitle && <h2 className="my-2 px-2">{listTitle}</h2>}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
            {games.map((game, index) => (
                <GameCard mode={ mode } key={ game.slug } ref={ index === games.length - 1 ? lastCardRef : null } game={ game } />
            ))}
            {isLoading && <li><h2>Loading...</h2></li> }
        </ul>
        </>
    );
}

export default GameList;