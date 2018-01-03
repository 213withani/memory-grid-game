class Footer extends React.Component {
  remainingCount() {
    if (this.props.gameState !== "recall") {
      return null;
    }
    return (
      <div className="remaining-count">
        {this.props.numberOfCellsToMemorize - this.props.correctGuesses.length}
      </div>
    );
  }
  btnEventHandler(){
    this.props.setState = {
      gameState:"Ready"
    }
  }
  displayBtn() {
    if (this.props.gameState !== "gameOver") {
      return null;
    }
    return (
      <div className="display-btn">
        <button onClick={this.btnEventHandler.bind(this)}>Play Game</button>
      </div>
    );
  }
  render() {
    return (
      <div className="footer">
        <div className="hint">
          {this.props.hints[this.props.gameState]}...
        </div>
        {this.remainingCount()}
        {this.displayBtn()}
      </div>
    );
  }
}

Footer.defaultProps = {
  hints: {
    ready: "Get Ready",
    memorize: "Memorize",
    recall: "Recall",
    won: "Well Played",
    lost: "Game Over"
  }
};

export default Footer;