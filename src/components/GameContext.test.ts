import Minesweeper, {
  CellCoordinates,
  GameParameters,
} from "../lib/Minesweeper";
import { ActionType, reducer, State } from "./GameContext";

const params: GameParameters = {
  rows: 10,
  columns: 10,
  mines: 1,
};
const initialState: State = {
  params,
  minesweeper: new Minesweeper(params),
};

it(`sets state on ${ActionType.SetParams} action and creates new minesweeper instance`, () => {
  const payload: GameParameters = { rows: 2, columns: 2, mines: 2 };
  const result = reducer(initialState, {
    type: ActionType.SetParams,
    payload,
  });

  expect(result.params).toBe(payload);
  expect(result.minesweeper).not.toBe(initialState.minesweeper);
});

it(`calls minesweeper.check on ${ActionType.Check} action`, () => {
  initialState.minesweeper.check = jest.fn();

  const payload: CellCoordinates = [1, 1];
  reducer(initialState, {
    type: ActionType.Check,
    payload,
  });

  expect(initialState.minesweeper.check).toBeCalledWith([1, 1]);
});
