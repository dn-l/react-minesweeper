export interface GameParameters {
  rows: number;
  columns: number;
  bombs: number;
}

export type CellCoordinates = number[];

export const BOMB = -1;
export const OPENED = 0;

export enum GameState {
  NotStarted = "Game not started",
  Started = "Game started",
  Lost = "Game lost",
  Won = "Game won",
}

// Possible values (numbers) that could be placed on the board:
// -1 is a bomb
// 0 is an open cell
// everything lower than -1 is a hint of nearby bomb, example:
//   -3 shows that there're 2 bombs nearby
//   -2 shows that there's 1 bomb nearby
// positive numbers show that the hint cell is opened, example:
//    2 shows that there's 2 bombs nearby

class Minesweeper {
  state: GameState = GameState.NotStarted;
  board: number[][] = [];
  private bombs: number = 0;
  private maxCol: number = 0;
  private maxRow: number = 0;
  private nearbyHidden: number = 0;

  constructor({ rows, columns, bombs }: GameParameters) {
    this.maxCol = columns - 1;
    this.maxRow = rows - 1;
    const maxBombs = rows * columns - 1;
    this.bombs = bombs > maxBombs ? maxBombs : bombs;
  }

  check([row, column]: CellCoordinates): GameState {
    switch (this.state) {
      case GameState.Lost:
      case GameState.Won:
        break;

      case GameState.NotStarted:
        this.distributeBombs(row, column);
        this.state = GameState.Started;
        this.openCells(row, column);
        break;

      default:
        if (this.board[row] !== undefined && this.board[row][column] === BOMB) {
          this.state = GameState.Lost;
          return this.state;
        }
        this.openCells(row, column);
        break;
    }
    return this.state;
  }

  private openCells(row: number, column: number) {
    const queue: number[] = [row, column];

    let i: number;
    let j: number;
    while (queue.length > 1) {
      j = queue.pop() as number;
      i = queue.pop() as number;

      if (this.board[i] === undefined) {
        this.board[i] = [];
      }

      if (this.board[i][j] < BOMB) {
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
            this.board[i - 1][j] < BOMB)
        ) {
          queue.push(i - 1, j);
        }
        if (
          i + 1 <= this.maxRow &&
          (this.board[i + 1] === undefined ||
            this.board[i + 1][j] === undefined ||
            this.board[i + 1][j] < BOMB)
        ) {
          queue.push(i + 1, j);
        }
        if (
          j - 1 >= 0 &&
          (this.board[i] === undefined ||
            this.board[i][j - 1] === undefined ||
            this.board[i][j - 1] < BOMB)
        ) {
          queue.push(i, j - 1);
        }
        if (
          j + 1 <= this.maxCol &&
          (this.board[i] === undefined ||
            this.board[i][j + 1] === undefined ||
            this.board[i][j + 1] < BOMB)
        ) {
          queue.push(i, j + 1);
        }
      }
    }
  }

  private distributeBombs(row: number, column: number) {
    let bombsLeft = this.bombs;
    let bombRow: number;
    let bombColumn: number;
    while (bombsLeft > 0) {
      bombRow = Math.floor(Math.random() * this.maxRow);
      bombColumn = Math.floor(Math.random() * this.maxCol);
      if (
        (bombRow === row && bombColumn === column) ||
        (this.board[bombRow] !== undefined &&
          this.board[bombRow][bombColumn] === BOMB)
      ) {
        continue;
      }
      if (this.board[bombRow] === undefined) {
        this.board[bombRow] = [];
      }
      if (this.board[bombRow][bombColumn] < BOMB) {
        this.nearbyHidden--;
      }
      this.board[bombRow][bombColumn] = BOMB;
      this.initNearbyCells([bombRow, bombColumn]);
      bombsLeft--;
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
          case BOMB:
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
