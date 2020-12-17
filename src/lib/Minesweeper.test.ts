import Minesweeper, {
  MINE,
  CellCoordinates,
  GameParameters,
  GameState,
} from "./Minesweeper";

function countMines(board: Minesweeper["board"]): number {
  let mines = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === undefined) {
      continue;
    }
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === MINE) {
        mines++;
      }
    }
  }
  return mines;
}

function findAllCellWith(
  board: Minesweeper["board"],
  predicate: (value: number) => boolean
): number[][] | undefined {
  const result = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === undefined) {
      continue;
    }
    for (let j = 0; j < board[i].length; j++) {
      if (predicate(board[i][j])) {
        result.push([i, j]);
      }
    }
  }
  return result;
}

function findACellWith(
  board: Minesweeper["board"],
  predicate: (value: number) => boolean
): number[] | undefined {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === undefined) {
      continue;
    }
    for (let j = 0; j < board[i].length; j++) {
      if (predicate(board[i][j])) {
        return [i, j];
      }
    }
  }
  return undefined;
}

const params: GameParameters = { rows: 20, columns: 20, mines: 300 };
// const params: GameParameters = { rows: 100, columns: 200, mines: 2000 };
function getRandomCellCoordinates(): CellCoordinates {
  return [
    Math.floor(Math.random() * params.rows),
    Math.floor(Math.random() * params.columns),
  ];
}

it("creates a board with provided game parameters and starts a game and distribute mines when open a first cell", () => {
  const minesweeper = new Minesweeper(params);
  expect(minesweeper.state).toBe(GameState.NotStarted);
  minesweeper.check(getRandomCellCoordinates());
  expect(minesweeper.state).toBe(GameState.Started);
  expect(minesweeper.board.length).toBe(params.rows);
  expect(minesweeper.board.find((row) => row !== undefined)?.length).toBe(
    params.columns
  );
  expect(countMines(minesweeper.board)).toBe(params.mines);
});

it('sets the game state to "Game Lost" when open a cell with a mine', () => {
  const minesweeper = new Minesweeper(params);
  minesweeper.check(getRandomCellCoordinates());
  const [row, column] = findACellWith(
    minesweeper.board,
    (val) => val === MINE
  ) as number[];
  minesweeper.check([row, column]);
  expect(minesweeper.state).toBe(GameState.Lost);
});

it('sets the game state to "Game Won" when open all the cells without mines', () => {
  const minesweeper = new Minesweeper(params);
  minesweeper.check(getRandomCellCoordinates());
  const hintCellsCoordinates = findAllCellWith(
    minesweeper.board,
    (val) => val < MINE
  );
  hintCellsCoordinates?.forEach((coordinates) =>
    minesweeper.check(coordinates)
  );
  expect(minesweeper.state).toBe(GameState.Won);
});
