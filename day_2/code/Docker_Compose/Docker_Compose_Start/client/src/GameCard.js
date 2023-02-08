const GameCard = ({game, deleteGame}) =>{
    return (
        <>
            <h1>{game.name}</h1>
            <p>Max Players: {game.players.max}</p>
            <p>Min Players: {game.players.min}</p>
            <p>Playing Time: {game.playingTime}</p>
            <button onClick={()=>deleteGame(game._id)}> 🗑 </button>
        </>
    )
}


export default GameCard;