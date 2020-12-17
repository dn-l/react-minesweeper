import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { FixedSizeGrid } from "react-window";
import useResizeObserver from "use-resize-observer";
import GameContext, { ActionType } from "./GameContext";
import Cell, { CELL_SIZE } from "./Cell";
import { CellCoordinates } from "../lib/Minesweeper";

function getCoordinates(target: any): CellCoordinates {
  return [
    parseInt(target.dataset["row"], 10),
    parseInt(target.dataset["column"], 10),
  ];
}

interface Flags {
  [row: number]: { [column: number]: boolean };
}

function Board() {
  const { ref, width, height } = useResizeObserver<HTMLDivElement>();
  const [flags, setFlags] = useState<Flags>({});
  const {
    state: { params, minesweeper },
    dispatch,
  } = useContext(GameContext);
  useEffect(() => setFlags({}), [minesweeper]);
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target: any = e.target;
    const [row, column] = getCoordinates(target);
    if (flags[row] && flags[row][column]) {
      return;
    }
    dispatch({
      type: ActionType.Check,
      payload: [row, column],
    });
  };

  const handleContextMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.type === "contextmenu") {
      e.preventDefault();
      const newFlags = {
        ...flags,
      };
      const [row, column] = getCoordinates(e.target);
      if (!newFlags[row]) {
        newFlags[row] = {};
      }
      newFlags[row][column] = !newFlags[row][column];
      setFlags(newFlags);
    }
  };

  return (
    <div ref={ref} className="container full-height">
      {width && height && (
        <FixedSizeGrid
          columnCount={params.columns}
          rowCount={params.rows}
          columnWidth={CELL_SIZE}
          rowHeight={CELL_SIZE}
          width={width}
          height={height}
        >
          {(props) => (
            <Cell
              {...props}
              flag={
                flags[props.rowIndex] &&
                flags[props.rowIndex][props.columnIndex]
              }
              onClick={handleClick}
              onContextMenu={handleContextMenu}
            />
          )}
        </FixedSizeGrid>
      )}
    </div>
  );
}

export default Board;