import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../service/auth.service";

import UserService from "../service/user.service";

function startGame(index) {

}

export default class SetsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            sets: []
        };
    }

    componentDidMount() {

        UserService.getAllSets().then(
            response => {
                this.setState(
                    {
                        sets: response.data
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

        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({redirect: "/home"});
        this.setState({
            currentUser: currentUser,
            userReady: true,
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }


        return (
            <div className="ui container" style={{marginTop: '10 px'}}>
                {(this.state.userReady) ?
                    <div className="ui card centered">
                        <div className="top centered content">
                        <p>select flashcard set to start</p>
                        <strong>SETS:</strong>
                        <p></p>
                        <p></p>
                        <ul>
                            {this.state.sets &&
                            this.state.sets.map((set, index) =>
                                <div className="ui divided items">
                                    <div className="ui card centered">
                                        <div className="top centered content">
                                            <div className="ui button green"
                                                onClick={(event) =>
                                                    this.setState({
                                                        redirect: {
                                                            pathname: "/game",
                                                            state:
                                                                {set: this.state.sets[index]}
                                                        }
                                                    })
                                                }
                                            >
                                                {set.name}
                                            </div>
                                            <p></p>
                                            <div className="ui button gray"
                                                onClick={(event) =>
                                                    this.setState({
                                                        redirect: {
                                                            pathname: "/ranking",
                                                            state:
                                                                {setId: this.state.sets[index].id}
                                                        }
                                                    })
                                                }
                                            >
                                                RANKING
                                            </div>
                                            <p></p>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            )
                            }
                        </ul>
                        </div>
                    </div> : null}
            </div>
        );
    }

}
