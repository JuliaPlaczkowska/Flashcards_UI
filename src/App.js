import React, {Component} from "react";
import {Switch, Route, Link, BrowserRouter} from "react-router-dom";
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./service/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import SetsList from "./components/SetsList";
import MainMenu from "./components/Main";
import Flashcards from "./components/Flashcards";
import Progress from "./components/Progress";
import Ranking from "./components/Ranking";
import AddNewSet from "./components/AddNewSet";
import ProposeNewSet from "./components/ProposeNewSet";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const {currentUser, showAdminBoard} = this.state;

        return (
            <div>

                <BrowserRouter>
                    <nav className="navbar navbar-expand navbar-dark bg-dark " >
                        <Link to={"/"} className="navbar-brand">
                            FlashcardsApp
                        </Link>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                    Home
                                </Link>
                            </li>


                            {showAdminBoard && (
                                <li className="nav-item">
                                    <Link to={"/newset"} className="nav-link">
                                        New Set
                                    </Link>
                                </li>
                            )}
                            {(currentUser && !showAdminBoard) && (

                                    <li className="nav-item">
                                        <Link to={"/progress"} className="nav-link">
                                            Progress
                                        </Link>
                                    </li>
                            )}

                            {(currentUser && !showAdminBoard) && (
                                    <li className="nav-item">
                                        <Link to={"/sets"} className="nav-link">
                                            Sets
                                        </Link>
                                    </li>

                            )}

                            {(currentUser && !showAdminBoard) && (
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">

                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={MainMenu}/>
                            <Route exact path="/sets" component={SetsList}/>
                            <Route exact path="/set/propose" component={ProposeNewSet}/>
                            <Route exact path="/game"
                                   render={(props) => <Flashcards {...props}/>}/>
                            <Route exact path="/ranking"
                                   render={(props) => <Ranking {...props}/>}/>
                            <Route exact path="/progress" component={Progress}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route path="/newset" component={AddNewSet}/>
                        </Switch>
                    </div>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;
