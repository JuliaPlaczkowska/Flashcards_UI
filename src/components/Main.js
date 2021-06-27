import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../service/auth.service";

export default class MainMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            admin: false
        };
    }

    componentDidMount() {

        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({redirect: "/home"})
        else{
            this.setState({
                currentUser: currentUser,
                userReady: true,
                admin: currentUser.roles.includes("ROLE_ADMIN")
            })
        }



    }

    startLearning = () => {
        this.setState({redirect: "/sets"});
    }

    showRanking = () => {
        this.setState({redirect: "/sets"});
    }

    proposeSet = () => {
        this.setState({redirect: "/set/propose"});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        if (this.state.admin)
            return (
                <div>
                    <strong>Hello, admin</strong>
                </div>
            );
        else
            return (
                <div className="container">
                    {(this.state.userReady) ?
                        <div>
                            <strong>MAIN MENU</strong>
                            <ul></ul>
                            <ul>
                                <div className="ui button gray" onClick={this.startLearning}>
                                    START LEARNING
                                </div>
                            </ul>
                            <ul>
                                <div className="ui button gray" onClick={this.showRanking}>
                                    RANKING
                                </div>
                            </ul>
                            <ul>
                                <div className="ui button gray" onClick={this.proposeSet}>
                                    PROPOSE NEW SET
                                </div>
                            </ul>
                            <p></p>
                            <p></p>
                            <ul>
                                <div className="ui button gray">
                                    <a target="_blank"
                                       href="https://en.wikipedia.org/wiki/Flashcard">
                                        Learn more about flashcards</a>
                                </div>
                            </ul>
                        </div> : null}
                </div>
            );
    }

}
