import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import Game from "../Game";
import AuthService from "../service/auth.service";
import UserService from "../service/user.service";

const SetFinished = (props) => {


    const [game, setGame] = useState(props.game)
    const [ranking, setRanking] = useState(false)
    const [redirect, setRedirect] = useState(null)

    const submit = () =>{

        game.ranking = ranking;
        UserService.postGame(game)
            .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });

        setRedirect({
            pathname: "/",
        })
    }

    if(redirect == null)
    return (
        <div className="ui segment">
            <div>
                <div className="ui divided items">
                    <strong> Congratulations!</strong>
                <p></p>
                    <p> You have finished <strong>{game.setOfFlashcards.name}</strong></p>
                    <p> Your result: {game.points} points</p>
                    <div className="ui card centered">
                        <div className="top centered content">

                            <input type="radio" onChange={event => setRanking(!ranking)}/> Add to ranking
                        <p> </p>
                            <button onClick={submit}>Finish</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    else
        return <Redirect to={redirect}/>


}


export default SetFinished;