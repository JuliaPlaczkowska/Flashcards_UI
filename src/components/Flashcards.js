import React, {useEffect, useState} from 'react';
import AuthService from "../service/auth.service";
import SetFinished from "./SetFinished";

const Flashcards = (props) => {


    const [flashcardsInitial, setFlashcardsInitial] = useState(props.location.state.set.flashcards);
    const [flashcards, setFlashcards] = useState(props.location.state.set.flashcards);
    const initialCount = 0;
    const [count, setCount] = useState(initialCount);
    const initialSide = 0;
    const [side, setSide] = useState(initialSide);
    const [points, setPoints] = useState(0);
    const [minId, setMinId] = useState(0)


    let currentFlashcard = flashcards[count];


    useEffect(() => {
    }, [])


    if (flashcards.length === 0) {


        let user = AuthService.getCurrentUser();
        user.roles = [
            {
                "id": 2,
                "name": "ROLE_USER"
            }
        ]
        const dateString = new Date().toDateString();

        console.log("date string: " + dateString);
        console.log("date from string: " + new Date(dateString));

        return <SetFinished game={
            {
                points: (100 + points - flashcardsInitial.length),
                ranking: false,
                setOfFlashcards: props.location.state.set,
                userDto: user
            }
        }
        />

    } else {

        const next = () => {

            if (count < flashcards.length - 1)
                setCount(prevCount => prevCount + 1);
            else
                setCount(initialCount);

            console.log("flashcards to learn:" + flashcards.map(f => {
                return f.id
            }))

            currentFlashcard = flashcards[count]

            setSide(0);

            console.log("points: " + points);

        }

        const flip = () => {
            if (side === 0)
                setSide(1);
            if (side === 1)
                setSide(0);
        }

        const mastered = () => {
            setPoints(points + 1)

            const filteredList = flashcards.filter(p => {
                return p !== currentFlashcard;
            });

            setFlashcards(filteredList);


            next();
        }

        const notMastered = () => {

            if (currentFlashcard)
                setPoints(points - 0.5)

            next();
        }

        if (count <= flashcards.length + 1)
            return (
                <div className="ui segment">
                    <div>
                        <div className="ui divided items">
                            {currentFlashcard ?
                                <div className="ui card centered">
                                    <div className="top centered content">

                                        <div>
                                            {side === 0 &&
                                            <div>
                                                <p>Q:</p>
                                                <strong> {currentFlashcard.question} </strong>
                                            </div>}
                                            {side === 1 &&
                                            <div>
                                                <p>A:</p>
                                                <strong> {currentFlashcard.answer} </strong>
                                            </div>}

                                        </div>
                                    </div>
                                    <div className="ui button gray" onClick={flip}>Flip</div>

                                    <div className="ui button green" align="right" onClick={mastered}>Mastered</div>
                                    <div className="ui button delete red" onClick={notMastered}>Next</div>

                                </div> : next()}
                            <p>{props.location.state.set.name}</p>
                            <p>left to learn: {flashcards.length}</p>
                        </div>
                    </div>
                </div>
            )

    }

}


export default Flashcards;