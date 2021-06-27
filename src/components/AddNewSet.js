import '../App.css';
import FlashcardsList from "./FlashcardsList";
import InputBar from "./InputBar";
import React, {Component} from "react"
import Flashcard from "../Flashcard";
import Set from "../Set";
import UserService from "../service/user.service";

class AddNewSet extends Component {

    state = {
        name: '',
        category: '',
        flashcards: [],
        sum: 0,
        success: false
    }

    onSearchSubmit = (question, answer) => {
        const flashcard = new Flashcard({question: question, answer: answer})
        console.log("new flashcard: ", question, "  ", answer)
        this.setState({flashcards: [...this.state.flashcards, flashcard], sum: this.state.sum + 1});
    }

    onClickChild = removeCount => {
        const filteredList = this.state.flashcards.filter((p, index) => {
            return index !== removeCount;
        });
        this.setState({flashcards: filteredList});
    }

    onSubmit = () => {
        const newSet = new Set({
            category: this.state.category,
            name: this.state.name,
            flashcards: this.state.flashcards
        })

        UserService.postSet(newSet)
            .then((response) => {
                console.log(response);
                this.setState({success: true})
            }, (error) => {
                console.log(error);
            });


    }

    form = () => {
        return (
            <div className="ui segment">
                <form className="ui form">
                    <div className="field">
                        <label>Set name:</label>
                        <input name="name" type="text" required={true} value={this.state.name} onChange={
                            (event => this.setState({name: event.target.value}))}/>
                    </div>
                    <div className="field">
                        <label>Set category: </label>
                        <input name="category" type="text" required={true} value={this.state.category} onChange={
                            (event => this.setState({category: event.target.value}))}/>
                    </div>
                </form>
            </div>
        );
    }


    render() {

        if (this.state.success) {
            return (
                <div className="ui container" style={{marginTop: '10 px'}}>
                    <div className="top centered content">
                    <header>
                        Set {this.state.name} added successfully!
                    </header>
                    </div>
                </div>
            )
        } else if (this.state.flashcards.length === 0) {

            return (
                <div className="ui container" style={{marginTop: '10 px'}}>

                    {this.form()}
                    <InputBar onSubmit={this.onSearchSubmit}> </InputBar>
                </div>
            );
        } else {

            return (
                <div className="ui container" style={{marginTop: '10 px'}}>

                    {this.form()}

                    <InputBar onSubmit={this.onSearchSubmit}> </InputBar>
                    <p>
                        total flashcards: {this.state.sum}
                    </p>
                    <FlashcardsList flashcards={this.state.flashcards} onClick={this.onClickChild}> </FlashcardsList>
                    <div className="ui button green"
                         onClick={this.onSubmit}>
                        Submit New Set
                    </div>
                </div>
            );
        }
    }
}

export default AddNewSet;
