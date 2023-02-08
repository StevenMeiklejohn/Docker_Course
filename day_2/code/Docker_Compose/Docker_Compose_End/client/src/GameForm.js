import {useState} from "react";

import {postGame} from "./GamesService";

const GameForm = ({addGame}) =>{
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        formData["players"] = {};
        formData["players"]["max"] = formData.maxNumPlayers;
        formData["players"]["min"] = formData.minNumPlayers;
        postGame(formData).then((data) => {
            addGame(data);
        });
    }

    const onChange = (e) => {
        formData[e.target.id] = e.target.value;
        setFormData(formData);
    }

    return (
        <form className="" onSubmit={handleSubmit} method="post">
            <label htmlFor="name">Name:</label>
            <input  onChange={onChange}type="text" id="name" v-model="name" required/>

            <label htmlFor="playingTime">Playing Time:</label>
            <input  onChange={onChange}type="number" id="playingTime"  required/>

            <label htmlFor="minNumPlayers">Min Players:</label>
            <input  onChange={onChange}type="number" id="minNumPlayers" required/>

            <label htmlFor="maxNumPlayers">Max Players:</label>
            <input  onChange={onChange}type="number" id="maxNumPlayers"  required/>

            <input type="submit" value="Save" id="save"/>

        </form>
    )
}
export default GameForm;