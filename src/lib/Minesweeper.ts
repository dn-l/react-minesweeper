export interface GameParameters {
  rows: number;
  columns: number;
  mines: number;
}

export type CellCoordinates = number[];

export const MINE = -1;
export const OPENED = 0;

export enum GameState {
  NotStarted = "Game not started",
  Started = "Game started",
  Lost = "Game lost",
  Won = "Game won",
}

// Possible values (numbers) that could be placed on the board:
// -1 is a mine
// 0 is an open cell
// everything lower than -1 is a hint of nearby mine, example:
//   -3 shows that there're 2 mines nearby
//   -2 shows that there's 1 mine nearby
// positive numbers show that the hint cell is opened, example:
//    2 shows that there's 2 mines nearby

class Minesweeper {
  state: GameState = GameState.NotStarted;
  board: number[][] = [];
  private mines: number = 0;
  private rows: number = 0;
  private columns: number = 0;
  private maxCol: number = 0;
  private maxRow: number = 0;
  private nearbyHidden: number = 0;

  constructor({ rows, columns, mines }: GameParameters) {
    this.rows = rows;
    this.columns = columns;
    this.maxCol = columns - 1;
    this.maxRow = rows - 1;
    this.mines = this.getMaximumNumberOfMines({ rows, columns, mines });
  }

  check(start: CellCoordinates): GameState {
    const [row, column] = start;

    switch (this.state) {
      case GameState.Lost:
      case GameState.Won:
        break;

      case GameState.NotStarted:
        this.distribute(start);
        this.state = GameState.Started;
        this.openCells(start);
        break;

      default:
        if (this.board[row] !== undefined && this.board[row][column] === MINE) {
          this.state = GameState.Lost;
          return this.state;
        }
        this.openCells(start);
        break;
    }
    return this.state;
  }

  // http://www.minesweeper.info/custom.php
  // The maximum number of mines is determined by ( x-1 )( y-1 )
  private getMaximumNumberOfMines({ rows, columns, mines }: GameParameters) {
    const maxMines = (rows - 1) * (columns - 1);
    return Math.min(maxMines, mines);
  }

  private openCells([row, column]: CellCoordinates) {
    const queue: number[] = [row, column];

    let i: number;
    let j: number;
    while (queue.length > 1) {
      j = queue.pop() as number;
      i = queue.pop() as number;

      if (this.board[i] === undefined) {
        this.board[i] = [];
      }

      if (this.board[i][j] < MINE) {
        this.board[i][j] = this.board[i][j] * -1 - 1;
        this.nearbyHidden--;
        if (this.nearbyHidden === 0) {
          this.state = GameState.Won;
          return;
        }
        continue;
      }

      if (this.board[i][j] === undefined) {
        this.board[i][j] = 0;
        if (
          i - 1 >= 0 &&
          (this.board[i - 1] === undefined ||
            this.board[i - 1][j] === undefined ||
            this.board[i - 1][j] < MINE)
        ) {
          queue.push(i - 1, j);
        }
        if (
          i + 1 <= this.maxRow &&
          (this.board[i + 1] === undefined ||
            this.board[i + 1][j] === undefined ||
            this.board[i + 1][j] < MINE)
        ) {
          queue.push(i + 1, j);
        }
        if (
          j - 1 >= 0 &&
          (this.board[i] === undefined ||
            this.board[i][j - 1] === undefined ||
            this.board[i][j - 1] < MINE)
        ) {
          queue.push(i, j - 1);
        }
        if (
          j + 1 <= this.maxCol &&
          (this.board[i] === undefined ||
            this.board[i][j + 1] === undefined ||
            this.board[i][j + 1] < MINE)
        ) {
          queue.push(i, j + 1);
        }
      }
    }
  }

  private distribute(start: CellCoordinates) {
    // if (this.rows * this.columns - this.mines < this.mines) {
    //   this.distributeEmptyCells(start);
    // } else {
    this.distributeMines(start);
    // }
  }

  private distributeEmptyCells(start: CellCoordinates) {
    // TODO: implement bombs distribution when the number of bombs
    //       is higher than the number of empty cells
    throw new Error("Not implemented");
  }

  private distributeMines([row, column]: CellCoordinates) {
    let minesLeft = this.mines;
    let mineRow: number;
    let mineColumn: number;
    while (minesLeft > 0) {
      mineRow = Math.floor(Math.random() * this.maxRow);
      mineColumn = Math.floor(Math.random() * this.maxCol);
      if (
        (mineRow === row && mineColumn === column) ||
        (this.board[mineRow] !== undefined &&
          this.board[mineRow][mineColumn] === MINE)
      ) {
        continue;
      }
      if (this.board[mineRow] === undefined) {
        this.board[mineRow] = [];
      }
      if (this.board[mineRow][mineColumn] < MINE) {
        this.nearbyHidden--;
      }
      this.board[mineRow][mineColumn] = MINE;
      this.initNearbyCells([mineRow, mineColumn]);
      minesLeft--;
    }
  }

  private initNearbyCells([row, column]: CellCoordinates) {
    for (let i = row - 1; i < row + 2; i++) {
      for (let j = column - 1; j < column + 2; j++) {
        if (
          (i === row && j === column) ||
          i < 0 ||
          j < 0 ||
          i > this.maxRow ||
          j > this.maxCol
        ) {
          continue;
        }
        if (this.board[i] === undefined) {
          this.board[i] = [];
        }
        switch (this.board[i][j]) {
          case MINE:
            break;
          case undefined:
            this.board[i][j] = -2;
            this.nearbyHidden++;
            break;

          default:
            this.board[i][j] -= 1;
            break;
        }
      }
    }
  }
}

export default Minesweeper;
