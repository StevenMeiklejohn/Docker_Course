import './App.css';
import { useEffect, useState } from 'react';

import {getGames, deleteGame as apiDeleteGame} from "./GamesService";
import GameForm from "./GameForm";
import GamesGrid from "./GamesGrid";

function App() {
  const [games, setGames] = useState([]);
  useEffect(()=>{
    getGames()
    .then((data)=>{
      console.log(data);
      setGames(data)
    })
  },[]);

  const addGame = (game) => {
    let temp = games.map(g => g);
    temp.push(game);
    setGames(temp);
  }

  const deleteGame = (id) => {
    apiDeleteGame(id).then(()=>{
      let temp = games.map(g=>g);
      const toDel = games.map(g =>g._id).indexOf(id);
      temp.splice(toDel, 1);
      setGames(temp);
    })

  }
  
  if (!games) return <h1>Loading</h1>
  return (
    <div className="App">
        <GameForm  addGame={addGame}/>
        <GamesGrid games={games} deleteGame={deleteGame} />
    </div>
  );
}

export default App;
