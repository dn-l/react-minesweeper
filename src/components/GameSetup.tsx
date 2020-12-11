import React, { FormEvent, useContext, useState } from "react";
import { GameParameters, GameState } from "../lib/Minesweeper";
import parsePositiveNumber from "../utils/parsePositiveNumber";
import GameContext, { ActionType } from "./GameContext";

function GameSetup() {
  const { state, dispatch } = useContext(GameContext);
  const [formData, setFormData] = useState<GameParameters>(state.params);
  const handleChange = ({
    target: { id, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [id]: parsePositiveNumber(value) });
  };

  const formIsValid = Object.values(formData).every((value: number) => value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formIsValid) {
      dispatch({ type: ActionType.SetParams, payload: formData });
    }
  };

  let startButtonBody;
  switch (state.minesweeper.state) {
    case GameState.Lost:
      startButtonBody = "😵";
      break;

    case GameState.Won:
      startButtonBody = "😎";
      break;

    default:
      startButtonBody = "😀";
      break;
  }

  return (
    <form className="container pb-3" onSubmit={handleSubmit}>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label" htmlFor="rows">
              Rows
            </label>
            <div className="control">
              <input
                id="rows"
                name="rows"
                type="number"
                className="input"
                autoComplete="off"
                value={formData?.rows.toString()}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="column">
          <div className="field">
            <label className="label" htmlFor="columns">
              Columns
            </label>
            <div className="control">
              <input
                id="columns"
                name="columns"
                className="input"
                autoComplete="off"
                type="number"
                value={formData?.columns.toString()}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="column">
          <div className="field">
            <label className="label" htmlFor="bombs">
              Bombs
            </label>
            <div className="control">
              <input
                id="bombs"
                name="bombs"
                className="input"
                autoComplete="off"
                type="number"
                value={formData?.bombs.toString()}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="has-text-centered">
        <button
          className="button is-primary is-large"
          disabled={!formIsValid}
          type="submit"
        >
          {startButtonBody}
        </button>
      </div>
    </form>
  );
}

export default GameSetup;
