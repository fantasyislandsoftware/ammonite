import { IPixelArray } from 'interface/graphics';

export interface IPixelArrayDimensions {
  width: number;
  height: number;
}

export const initPixelArray = (
  width: number,
  height: number,
  colourIndex: number
): IPixelArray => {
  const array: IPixelArray = [];
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
  from: IPixelArray,
  to: IPixelArray,
  offsetX: number,
  offsetY: number,
  transparentIndex: number | null
) => {
  const width = from[0].length;
  const height = from.length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      try {
        if (from[y][x] === transparentIndex) {
          continue;
        }
        if (to[y + offsetY][x + offsetX] !== from[y][x]) {
          to[y + offsetY][x + offsetX] = from[y][x];
        }
      } catch (error) {
        () => {};
      }
    }
  }
  return to;
};

export const getPixelArrayDimensions = (
  pixels: IPixelArray
): IPixelArrayDimensions => {
  return {
    width: pixels[0].length,
    height: pixels.length,
  };
};
