import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import Row from "./row.js";

const rows = 6;
const cols = 7;
const checkElements = arr => /([12]),\1,\1,\1/.test(arr.toString());

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1,
      player2: 2,
      currPlayer: null, // current player's turn
      board: [], // current state of board
      gameOver: false
    };

    this.placeToken = this.placeToken.bind(this);
  }
  /**
   * @function createBoard()
   * generates empty connect 4 board and stores it as state.
   */
  createBoard() {
    let board = [];
    for (let x = 0; x < rows; x++) {
      board[x] = new Array(cols).fill(null);
    }
    this.setState({
      board,
      currPlayer: this.state.player1,
      gameOver: false
    });
  }

  placeToken(col) {
    const { gameOver, board, currPlayer, player1, player2 } = this.state;
    let newBoard = board;
    if (!gameOver) {
      for (let row = 5; row >= 0; row--) {
        if (newBoard[row][col] === null) {
          newBoard[row][col] = currPlayer;
          break;
        }
      }
      const nextPlayer = currPlayer === player1 ? player2 : player1;
      this.setState({ board: newBoard, currPlayer: nextPlayer });
    }
  }

  checkColumns(table) {
    return table.reduce(
      (hasMatch, column) => hasMatch || checkElements(column),
      false
    );
  }

  checkRows(table) {
    for (let i = 0; i < table[0].length; ++i) {
      let rowArray = table.map(column => column[i]);
      if (checkElements(rowArray)) return true;
    }
    return false;
  }

  checkTable(table) {
    return this.checkRows(table) || this.checkColumns(table);
  }

  componentDidMount() {
    this.createBoard();
  }

  componentDidUpdate(prevProps, prevState) {
    const { board, gameOver } = this.state;
    if (this.checkTable(board) && !gameOver) {
      this.setState({ gameOver: true });
    }
  }

  render() {
    const { board, currPlayer, gameOver } = this.state;
    const playerColor = gameOver
      ? currPlayer === 1
        ? "yellow"
        : "red"
      : currPlayer === 1
      ? "red"
      : "yellow";
    return (
      <React.Fragment>
        <div className="flex justify-center">
          <Button
            color="primary"
            className="btn-block"
            onClick={() => {
              this.createBoard();
            }}
          >
            New Game
          </Button>
        </div>
        <div className="flex justify-center">
          <Table style={{ marginBottom: "0px" }} className="w-30 b--light-blue">
            <thead></thead>
            <tbody>
              {board.map((row, i) => (
                <Row key={i} row={row} placeToken={this.placeToken} />
              ))}
            </tbody>
          </Table>
          <h2 className={`flex justify-center w-20 ${playerColor}`}>
            {gameOver
              ? `Player ${currPlayer === 1 ? "2" : "1"} Won!`
              : `Player ${currPlayer}'s Turn!`}
          </h2>
        </div>
      </React.Fragment>
    );
  }
}

export default Board;
