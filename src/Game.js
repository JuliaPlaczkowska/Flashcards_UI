class Game{
    constructor(data) {
        this.points = data.points;
        this.gameMode = data.gameMode;
        this.ranking = data.ranking;
        this.setOfFlashcards = data.setOfFlashcards;
        this.userDto = data.userDto;
    }

    setRanking(ranking){
        this.ranking = ranking;
    }
}
export default Game;