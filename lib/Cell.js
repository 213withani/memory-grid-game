class Cell extends React.Component {
  idInCellsToBeHighlighted() {
    // Check for id in randomly created array to be highlighted in UI.
    // Correct or wrong guess.
    return this
      .props
      .activeCells
      .indexOf(this.props.id) >= 0;
  }

  handleClick() {
    if (this.correctOrWrongGuess() === undefined && this.props.gameState === "recall") {
      this
        .props
        .recordGuess({
          cellId: this.props.id,
          userGuessIsCorrect: this.idInCellsToBeHighlighted()
        });
    }
  }

  correctOrWrongGuess() {
    if (this.props.correctGuesses.indexOf(this.props.id) >= 0) {
      return true;
    } else if (this.props.wrongGuesses.indexOf(this.props.id) >= 0) {
      return false;
    }
  }

  render() {
    let classToHighlightCell = "cell";

    if (this.props.showActiveCells && this.idInCellsToBeHighlighted()) {
      classToHighlightCell += " active";
    }

    // set class cell to be highlighted
    if (this.props.gameState === "memorize" && this.idInCellsToBeHighlighted()) {
      classToHighlightCell += " active";
    }
    
    classToHighlightCell += " guess-" + this.correctOrWrongGuess();

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