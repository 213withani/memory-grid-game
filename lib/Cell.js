class Cell extends React.Component {
  active() {

    return this
      .props
      .activeCells
      .indexOf(this.props.id) >= 0;
  }
  handleClick() {
    if (this.guessState() === undefined && this.props.gameState === "recall") {
      this
        .props
        .recordGuess({
          cellId: this.props.id,
          userGuessIsCorrect: this.active()
        });
    }
  }
  guessState() {
    if (this.props.correctGuesses.indexOf(this.props.id) >= 0) {
      return true;
    } else if (this.props.wrongGuesses.indexOf(this.props.id) >= 0) {
      return false;
    }
  }
  showActiveCells() {
    // If the the game state is in the array return number > -1
    return ["memorize", "lost"].indexOf(this.props.gameState) >= 0;
  }

  render() {
    let classToHighlightCell = "cell";
    if (this.showActiveCells() && this.active()) {
      classToHighlightCell += " active";
    }

    if (this.props.gameState === "memorize" && this.active()) {
      classToHighlightCell += " active";
    }
    classToHighlightCell += " guess-" + this.guessState();
    return (
      <div
        className={classToHighlightCell}
        onClick={this  
        .handleClick
        .bind(this)}></div>
    );
  }
}
export default Cell;