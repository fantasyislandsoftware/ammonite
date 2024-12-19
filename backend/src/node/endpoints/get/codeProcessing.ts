export const removeComments = (string: string) => {
  return string.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g, "").trim(); //Strip comments
};
