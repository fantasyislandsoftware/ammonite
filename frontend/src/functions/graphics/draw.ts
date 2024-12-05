import { IPixelArray } from 'functions/graphics/IGraphics';

export const plot = (
  pixels: IPixelArray,
  x: number,
  y: number,
  colorIndex: number
) => {
  if (y >= 0 && y < pixels.length && x >= 0 && x < pixels[0].length) {
    pixels[y][x] = colorIndex;
  }
};

export const drawLine = (
  pixels: IPixelArray,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  colorIndex: number
) => {
  const dx = Math.abs(x1 - x0);
  const sx = x0 < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y0);
  const sy = y0 < y1 ? 1 : -1;
  let error = dx + dy;

  const x = 0;
  while (x === 0) {
    plot(pixels, x0, y0, colorIndex);
    if (x0 == x1 && y0 == y1) break;
    const e2 = 2 * error;
    if (e2 >= dy) {
      if (x0 == x1) break;
      error = error + dy;
      x0 = x0 + sx;
    }
    if (e2 <= dx) {
      if (y0 == y1) break;
      error = error + dx;
      y0 = y0 + sy;
    }
  }
};

export const drawFillRect = (
  pixels: IPixelArray,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colorIndex: number
) => {
  for (let y = y1; y < y2; y++) {
    for (let x = x1; x < x2; x++) {
      plot(pixels, x, y, colorIndex);
    }
  }
};
