import GameCard from "./GameCard";

const GamesGrid = ({games, deleteGame}) =>{
    if (!games)return <h2>Loading</h2>
    const gamesList = games.map((game)=>{
        return (
            <>
                <GameCard game={game} deleteGame={deleteGame} key={game._id}/>
                <hr/>
            </>
        )
    });
    return (
        <>
            {gamesList}
        </>
    );
}

export default GamesGrid;