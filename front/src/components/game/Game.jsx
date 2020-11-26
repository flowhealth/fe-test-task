import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import debounce from "lodash/debounce";
import ApiHandler from "../../utils/api/apiHandler";
import GameLogger from "../../utils/gameLog/gameLogger";
import Board from "../board/Board";
import { BOARD_ROW_SIZE, MARK_TYPES, PLAYER_TYPES } from "../common/constants";
import Mark from "../common/mark/Mark";
import Title, { TITLE_SIZES } from "../common/Title/Title";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Log from "../log/Log";

class Game extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerMarkType: undefined,
      board: undefined,
      winner: undefined,
      isFinished: false,
    };

    GameLogger.reset();

    this.makeMove = debounce(this.makeMove.bind(this), 200);
    this.startNewGame = this.startNewGame.bind(this);
  }

  makeMove(index) {
    const { playerMarkType, board } = this.state;
    const updatedBoard = [ ...board ];
    const flatIndex = index - 1;
    const row = Math.floor(flatIndex/BOARD_ROW_SIZE);
    const col = (flatIndex) - row * BOARD_ROW_SIZE;

    updatedBoard[row][col] = MARK_TYPES[playerMarkType];

    GameLogger.addToLog(index, PLAYER_TYPES.USER);

    this.setState({
      board: [ ...updatedBoard ],
    }, () => {
      ApiHandler.makeMove(index).then((gameState) => {
        const { isFinished, board } = gameState;
        const { board: previousBoard } = this.state;
        const aiMoveIndex = this.getChangedCellIndex(previousBoard, board);

        if (Boolean(aiMoveIndex)) {
          GameLogger.addToLog(aiMoveIndex, PLAYER_TYPES.AI);
        }

        if (isFinished) {
          this.getGameState();
        } else {
          this.setGameState(gameState);
        }
      }).catch((err) => {
        console.log('@Error: ', err);
      });
    })
  }

  getChangedCellIndex(prevBoardState, nextBoardState) {
    const prevIndexSum = this.getCellsIndexesSum(prevBoardState);
    const nextIndexSum = this.getCellsIndexesSum(nextBoardState);

    return prevIndexSum - nextIndexSum;
  }

  getCellsIndexesSum(board) {
    if (!Array.isArray(board)) return 0;

    return board.flat().reduce((sum, value) => {
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);
  }

  getGameState() {
    ApiHandler.getGameState().then((gameState) =>
      this.setGameState(gameState)
    ).catch((err) => {
      console.log('@Error: ', err);
    });
  }

  setGameState(newGameState) {
    this.setState({
      ...this.state,
     ...newGameState,
    });
  }

  startNewGame(e) {
    e.preventDefault();

    ApiHandler.startNewGame().then((gameState) => {
      GameLogger.reset();
      this.setGameState(gameState);
    }).catch((err) => {
      console.log('@Error: ', err);
    });
  }

  componentDidMount() {
    this.getGameState();
  }

  render() {
    if (!this.state.board) return null;

    const { board, isFinished, playerMarkType, winner } = this.state;

    return (
      <React.Fragment>
        <Header>
          <Title tag='h1' size={TITLE_SIZES.LG}>Tic-tac-toe</Title>
          <Link to="/stats" className="nav-button">
            Go to stats
          </Link>
        </Header>
        <section>
          <Row>
            <Col sm={8} xs={12}>
              <p>
                Your mark : <Mark className="mark-for-player" type={MARK_TYPES[playerMarkType]} />
              </p>
              <Board board={board}
                     playerMarkType={playerMarkType}
                     winner={winner}
                     isFinished={isFinished}
                     retryClickHandler={this.startNewGame}
                     cellClickHandler={this.makeMove} />
            </Col>
            <Col sm={4} xs={12}>
              <Log size={GameLogger.log.length}
                   playerMarkType={playerMarkType} />
            </Col>
          </Row>
        </section>
      </React.Fragment>
    )
  }
}

export default Game;