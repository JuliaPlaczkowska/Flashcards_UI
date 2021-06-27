import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../service/auth.service";

import UserService from "../service/user.service";

export default class Ranking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            setId: props.location.state.setId,
            setName: '',
            games: [],
            set: null
        };
    }

    componentDidMount() {


        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({redirect: "/home"});

        this.setState({
            currentUser: currentUser,
            userReady: true,
        })

        UserService.getRanking(this.state.setId).then(
            response => {
                console.log('ranking.length : ' + response.data.length)
                if (response.data.length > 0) {

                    const rankedGames = response.data.filter((g) => {
                            return g.ranking
                        }
                    )

                    this.setState(
                        {
                            setName: response.data[0].setOfFlashcards.name,
                            games: rankedGames
                        }
                    )
                }


            },
            error => {
                this.setState({
                    sets: [
                        {name: error.toString()}
                    ]
                });
            }
        )

        UserService.getAllSets().then(
            response => {
                if (response.data.length > 0) {

                    response.data.map((s) => {
                        if (s.id == this.state.setId)
                            this.setState({set: s})
                            })
                }
            }
        )

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        if (this.state.games)
            return (
                <div className="ui container" style={{marginTop: '10 px'}}>
                    {(this.state.userReady) ?
                        <div>
                            {(this.state.games !== []) ?
                                <div>
                                    <strong>{this.state.setName} </strong>ranking:

                                    <div className="d-flex justify-content-end">
                                        <div className="ui button blue"
                                             onClick={(event) =>
                                                 this.setState({
                                                     redirect: {
                                                         pathname: "/game",
                                                         state:
                                                             {set: this.state.set}
                                                     }
                                                 })
                                             }
                                        >
                                            PLAY
                                        </div>
                                    </div>

                                    <p></p>


                                    <ul>
                                        {this.state.games &&
                                        this.state.games.map((game, index) =>
                                            <div className="ui divided items">
                                                <div className="ui card centered">
                                                    <div className="top centered content">
                                                        <strong> {index + 1}. </strong>{game.userDto.username}
                                                        <p> category: {game.setOfFlashcards.category}</p>
                                                        <p> points: {game.points}</p>

                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }
                                    </ul>
                                </div> :
                                <div>This ranking is empty.</div>
                            }
                        </div> : null}
                </div>
            );
    }
}
