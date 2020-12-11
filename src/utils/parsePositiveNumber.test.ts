import parsePositiveNumber from "./parsePositiveNumber";

it("parses number correctly", () => {
  expect(parsePositiveNumber("12345")).toBe(12345);
});

it("returns 0 when number is negative", () => {
  expect(parsePositiveNumber("-12345")).toBe(0);
});

it("returns 0 when input is not a number", () => {
  expect(parsePositiveNumber("string")).toBe(0);
});
