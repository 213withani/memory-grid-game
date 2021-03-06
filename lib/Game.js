import Row from "./Row";
import Cell from "./Cell";
import Footer from "./Footer";
import _ from "lodash";

class Game extends React.Component {
  createMatrix() {
    this.matrix = [];

    for (let r = 0; r < this.props.rows; r++) {
      let row = [];
      for (let c = 0; c < this.props.columns; c++) {
        row.push(`${r}${c}`);
      }
      this
        .matrix
        .push(row);
    }

    //let flatMatrix = _.flatten(this.matrix);
    let flatMatrix = this
      .matrix
      .reduce((currentFlatMatrix, currentRowInMatrix) => currentFlatMatrix.concat(currentRowInMatrix), []);
    this.cellsToHighlightRandomly = _.sampleSize(flatMatrix, this.props.numberOfCellsToMemorize);

  }

  constructor(props) {
    super(props);

    this.createMatrix();

    this.state = {
      gameState: "ready",
      wrongGuesses: [],
      correctGuesses: []
    };
  }

  recordGuessAndState({cellId, userGuessIsCorrect}) {
    let {wrongGuesses, correctGuesses, gameState} = this.state;

    if (userGuessIsCorrect) {
      correctGuesses.push(cellId);

      if (correctGuesses.length === this.props.numberOfCellsToMemorize) {
        gameState = "won";
      }
    } else {
      wrongGuesses.push(cellId);

      if (wrongGuesses.length > this.props.allowedWrongAttempts) {
        gameState = "lost";
      }
    }

    this.setState({correctGuesses, wrongGuesses, gameState});
  }

  startRecallMode() {
    this.setState({
      gameState: 'recall'
    }, () => {
      this.secondsRemaining = this.props.timeoutSeconds;
      setInterval(() => {
        if (--this.secondsRemaining === 0) {
          this.setState({gameState: "lost"});
        }
      }, 1000);
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        gameState: 'memorize'
      }, () => {
        setTimeout(this.startRecallMode.bind(this), 2000);
      });
    }, 2000);
  }

  render() {
    let showActiveCells = ["memorize", "lost"].indexOf(this.state.gameState) >= 0;

    return (
      <div className="grid">
        {this
          .matrix
          .map((rowInMatrix, ri) => (
            <Row key={ri}>
              {rowInMatrix.map(cellIdInMatrix => <Cell
                key={cellIdInMatrix}
                id={cellIdInMatrix}
                showActiveCells={showActiveCells}
                activeCells={this.cellsToHighlightRandomly}
                recordGuess={this
                .recordGuessAndState
                .bind(this)}
                {...this.state}/>)}
            </Row>
          ))}
        <Footer
          {...this.state}
          numberOfCellsToMemorize={this.props.numberOfCellsToMemorize}/>
      </div>
    );
  }
}

Game.defaultProps = {
  allowedWrongAttempts: 2,
  timeoutSeconds: 10
};

export default Game;