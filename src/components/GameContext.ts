import { createContext, Dispatch } from "react";
import Minesweeper, {
  GameParameters,
  CellCoordinates,
} from "../lib/Minesweeper";

export interface State {
  params: GameParameters;
  minesweeper: Minesweeper;
}

export enum ActionType {
  SetParams = "SET_PARAMS",
  Check = "CHECK",
}

interface GenericAction<TType, TPayload> {
  payload: TPayload;
  type: TType;
}

type Action =
  | GenericAction<ActionType.SetParams, GameParameters>
  | GenericAction<ActionType.Check, CellCoordinates>;

const GameContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({ state: {} as State, dispatch: () => null });

export function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case ActionType.SetParams:
      return {
        ...state,
        params: payload as GameParameters,
        minesweeper: new Minesweeper(payload as GameParameters),
      };

    case ActionType.Check:
      state.minesweeper.check(payload as CellCoordinates);
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default GameContext;
