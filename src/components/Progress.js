import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../service/auth.service";

import UserService from "../service/user.service";

function startGame(index) {

}

export default class Progress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            games: []
        };
    }

    componentDidMount() {


        const currentUser = AuthService.getCurrentUser();


        if (!currentUser) this.setState({redirect: "/home"});

        this.setState({
            currentUser: currentUser,
            userReady: true,
        })

        UserService.getAllGames().then(
            response => {

                const userGames = response.data.filter((g) => {
                        return g.userDto.id === currentUser.id
                    }
                )

                this.setState(
                    {
                        games: userGames
                    }
                )
            },
            error => {
                this.setState({
                    sets: [
                        {name: error.toString()}
                    ]
                });
            }
        )

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }


        return (
            <div className="ui container" >
                {(this.state.userReady) ?
                    <div>
                        <strong>Your progress</strong>
                        <p></p>
                        <p>GAMES PLAYED:</p>
                        <ul>
                            {this.state.games ?
                            this.state.games.reverse().map((game, index) =>
                                <div className="ui divided items">
                                    <div className="ui card centered">
                                        <div className="top centered content">
                                            <strong> {game.setOfFlashcards.name}</strong>
                                            <p> category: {game.setOfFlashcards.category}</p>
                                            <p> points: {game.points}</p>
                                            <button
                                                onClick={(event) =>
                                                    this.setState({
                                                        redirect: {
                                                            pathname: "/game",
                                                            state:
                                                                {set: game.setOfFlashcards}
                                                        }
                                                    })
                                                }
                                            >
                                                RETAKE
                                            </button>
                                            <button
                                                onClick={(event) =>
                                                    this.setState({
                                                        redirect: {
                                                            pathname: "/ranking",
                                                            state:
                                                                {setId: game.setOfFlashcards.id}
                                                        }
                                                    })
                                                }
                                            >
                                                RANKING
                                            </button>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            ):<div> 0 </div>}
                        </ul>
                    </div> : null}
            </div>
        );
    }
}
