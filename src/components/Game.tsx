import React, { useReducer } from "react";
import Board from "./Board";
import GameContext, { reducer, State } from "./GameContext";
import GameSetup from "./GameSetup";
import "./Game.css";
import Minesweeper, { GameParameters } from "../lib/Minesweeper";

const initialParams: GameParameters = {
  rows: 1000,
  columns: 1000,
  mines: 20000,
};
const initialState: State = {
  params: initialParams,
  minesweeper: new Minesweeper(initialParams),
};

function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <div className="is-flex is-flex-direction-column game">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Minesweeper Game</h1>
              <h2 className="subtitle">
                <a href="https://github.com/dn-l/react-minesweeper">
                  github.com/dn-l/react-minesweeper
                </a>
              </h2>
            </div>
          </div>
        </section>
        <section>
          <GameSetup />
        </section>
        <section className="pb-5" style={{ flex: 1 }}>
          <Board />
        </section>
      </div>
    </GameContext.Provider>
  );
}

export default Game;
