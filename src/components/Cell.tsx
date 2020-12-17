import { CSSProperties, HTMLProps, useContext } from "react";
import { GridChildComponentProps } from "react-window";
import { MINE, OPENED, GameState } from "../lib/Minesweeper";
import GameContext from "./GameContext";

export const CELL_SIZE = 50;
const CELL_STYLE: CSSProperties = { width: CELL_SIZE, height: CELL_SIZE };

interface Props
  extends GridChildComponentProps,
    Pick<HTMLProps<HTMLButtonElement>, "onClick" | "onContextMenu"> {
  flag?: boolean;
}

function Cell({
  rowIndex,
  columnIndex,
  style,
  onClick,
  onContextMenu,
  flag = false,
}: Props) {
  const {
    state: { minesweeper },
  } = useContext(GameContext);

  let val: undefined | number =
    minesweeper.board[rowIndex] && minesweeper.board[rowIndex][columnIndex];
  let body: undefined | string | number = val;

  if (
    minesweeper.state === GameState.Lost ||
    minesweeper.state === GameState.Won
  ) {
    switch (val) {
      case MINE:
        body = "💣";
        break;
      case OPENED:
      case undefined:
        body = undefined;
        break;

      default:
        if (val < MINE) {
          body = val * -1 - 1;
        }
        break;
    }
  } else if (flag && (val < OPENED || val === undefined)) {
    body = "🚩";
  } else if (val <= MINE) {
    body = undefined;
  } else if (val === OPENED) {
    body = undefined;
  } else if (val > OPENED) {
  }

  return (
    <div className="cell" style={style}>
      <button
        data-row={rowIndex}
        data-column={columnIndex}
        style={CELL_STYLE}
        className="button"
        onClick={onClick}
        onContextMenu={onContextMenu}
        disabled={
          val === OPENED ||
          val > 0 ||
          minesweeper.state === GameState.Lost ||
          minesweeper.state === GameState.Won
        }
      >
        {body}
      </button>
    </div>
  );
}

export default Cell;
