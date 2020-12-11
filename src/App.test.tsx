import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

jest.mock("use-resize-observer", () => {
  return jest.requireActual("use-resize-observer/polyfilled");
});

it("renders Minesweeper game", () => {
  const { getByText } = render(<App />);
  const heroElement = getByText(/Minesweeper Game/i);
  expect(heroElement).toBeInTheDocument();
});
