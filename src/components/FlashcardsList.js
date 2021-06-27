import React from "react";
import 'semantic-ui-css/semantic.min.css';

const FlashcardList = props => {

    const onClicked = (index) => {
        props.onClick(index)
    }

    const prod = props.flashcards.map((p, index) => {

        return (
            <div>
                <div className="ui divided items">
                    <div className="ui card centered">
                        <div className="top centered content">
                            <div className="header"> {index+1}</div>
                        </div>
                        <div className="description"> question: {p.question} </div>
                        <div className="description"> answer: {p.answer}</div>
                        <div className="ui button delete red" onClick={(event) => onClicked(index)}>
                            Delete
                        </div>
                    </div>
                </div>
            </div>
        )

    });

    return(<div>
        {prod}
    </div>)

}
export default FlashcardList;