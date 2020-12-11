import { CSSProperties, HTMLProps, useContext } from "react";
import { GridChildComponentProps } from "react-window";
import { BOMB, OPENED, GameState } from "../lib/Minesweeper";
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

  let className = "button";

  let val: undefined | number =
    minesweeper.board[rowIndex] && minesweeper.board[rowIndex][columnIndex];
  let body: undefined | string | number = val;

  if (
    minesweeper.state === GameState.Lost ||
    minesweeper.state === GameState.Won
  ) {
    if (val === BOMB) {
      body = "💣";
    }
    switch (val) {
      case BOMB:
        body = "💣";
        break;
      case OPENED:
      case undefined:
        body = undefined;
        break;

      default:
        if (val < BOMB) {
          body = val * -1 - 1;
        }
        break;
    }
  } else if (flag && (val < OPENED || val === undefined)) {
    body = "🚩";
  } else if (val <= BOMB) {
    body = undefined;
  } else if (val === OPENED) {
    body = undefined;
  }

  return (
    <div className="cell" style={style}>
      <button
        data-row={rowIndex}
        data-column={columnIndex}
        style={CELL_STYLE}
        className={className}
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
