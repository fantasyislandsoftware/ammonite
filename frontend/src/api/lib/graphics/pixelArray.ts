export const initPixelArray = (
  width: number,
  height: number,
  colourIndex: number
): number[][] => {
  const array: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(colourIndex);
    }
    array.push(row);
  }
  return array;
};

export const pixelMerge = (
  from: number[][],
  to: number[][],
  offsetX: number,
  offsetY: number
) => {
  const width = from[0].length;
  const height = from.length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      try {
        to[y + offsetY][x + offsetX] = from[y][x];
      } catch (error) {
        () => {};
      }
    }
  }
  return to;
};
