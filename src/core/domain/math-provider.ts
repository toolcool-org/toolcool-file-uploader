// eslint-disable-next-line
export const isNumber = (input: any) => {
  return !isNaN(parseFloat(input)) && isFinite(input);
};
