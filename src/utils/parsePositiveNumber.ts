function parsePositiveNumber(input: string) {
  const result = parseInt(input, 10);
  if (!result || result < 0) {
    return 0;
  }
  return result;
}

export default parsePositiveNumber;
