export const waitfor = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
