import Minesweeper, {
  BOMB,
  CellCoordinates,
  GameParameters,
  GameState,
} from "./Minesweeper";

function countBombs(board: Minesweeper["board"]): number {
  let bombs = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === undefined) {
      continue;
    }
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === BOMB) {
        bombs++;
      }
    }
  }
  return bombs;
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

const params: GameParameters = { rows: 20, columns: 20, bombs: 300 };
// const params: GameParameters = { rows: 100, columns: 200, bombs: 2000 };
function getRandomCellCoordinates(): CellCoordinates {
  return [
    Math.floor(Math.random() * params.rows),
    Math.floor(Math.random() * params.columns),
  ];
}

it("creates a board with provided game parameters and starts a game and distribute bombs when open a first cell", () => {
  const minesweeper = new Minesweeper(params);
  expect(minesweeper.state).toBe(GameState.NotStarted);
  minesweeper.check(getRandomCellCoordinates());
  expect(minesweeper.state).toBe(GameState.Started);
  expect(minesweeper.board.length).toBe(params.rows);
  expect(minesweeper.board.find((row) => row !== undefined)?.length).toBe(
    params.columns
  );
  expect(countBombs(minesweeper.board)).toBe(params.bombs);
});

it('sets the game state to "Game Lost" when open a cell with a bomb', () => {
  const minesweeper = new Minesweeper(params);
  minesweeper.check(getRandomCellCoordinates());
  const [row, column] = findACellWith(
    minesweeper.board,
    (val) => val === BOMB
  ) as number[];
  minesweeper.check([row, column]);
  expect(minesweeper.state).toBe(GameState.Lost);
});

it('sets the game state to "Game Won" when open all the cells without bombs', () => {
  const minesweeper = new Minesweeper(params);
  minesweeper.check(getRandomCellCoordinates());
  const hintCellsCoordinates = findAllCellWith(
    minesweeper.board,
    (val) => val < BOMB
  );
  hintCellsCoordinates?.forEach((coordinates) =>
    minesweeper.check(coordinates)
  );
  expect(minesweeper.state).toBe(GameState.Won);
});
