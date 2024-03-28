import { ICanvasTextInfo } from '../interface/canvas';
import { useBufferStore } from '..//stores/useBufferStore';
import guiIconsPath from '../assets/gfx/gui.iff';
import BinaryStream from '../api/lib/data/binarystream';
import { detect, parse } from '../api/lib/data/iff';
import { IBrush, IPixelBuffer } from '../interface/graphics';
import { IScreen } from '../Objects/UIScreen/screenInterface';
import { initPixelArray } from 'api/lib/graphics/pixelArray';

export const createPixelBuffer = (
  width: number,
  height: number,
  colourIndex: number
): IPixelBuffer => {
  return {
    width,
    height,
    pixels: initPixelArray(width, height, colourIndex),
  };
};

export const fillRect = (
  buffer: IPixelBuffer,
  x: number,
  y: number,
  w: number,
  h: number,
  c: number
) => {
  for (let _y = y; _y < y + h; _y++) {
    for (let _x = x; _x < x + w; _x++) {
      buffer.pixels[_y + x][_x + x] = c;
    }
  }
};

export const plot = (buffer: IPixelBuffer, x: number, y: number, c: number) => {
  try {
    buffer.pixels[y][x] = c;
  } catch (error) {
    () => {};
  }
};

export const drawLine = (
  buffer: IPixelBuffer,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  c: number
) => {
  const dx = Math.abs(x1 - x0);
  const sx = x0 < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y0);
  const sy = y0 < y1 ? 1 : -1;
  let error = dx + dy;

  const x = 0;
  while (x === 0) {
    plot(buffer, x0, y0, c);
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

export const _drawLine = (
  buffer: IPixelBuffer,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  c: number
) => {
  let dx: number = 0;
  let dy: number = 0;
  let sx: number;
  let sy: number;
  let e2: number;
  let err: number;
  dx = Math.abs(x1 - x0);
  if (x0 < x1) {
    sx = 1;
  } else {
    sx = -1;
  }
  dy = -Math.abs(y1 - y0);
  if (y0 < y1) {
    sy = 1;
  } else {
    sy = -1;
  }
  err = dx + dy;
  while (!(x0 === x1 && y0 === y1)) {
    if (buffer.pixels[x0] !== undefined) {
      if (buffer.pixels[x0][y0] !== undefined) buffer.pixels[x0][y0] = c;
    }
    //if (x0 === x1 && y0 === y1) break;
    e2 = 2 * err;
    if (e2 >= dy) {
      err = err + dy;
      x0 = x0 + sx;
    }

    if (e2 <= dx) {
      err = err + dx;
      y0 = y0 + sy;
    }
  }
};

export const drawRect = (
  screen: IScreen,
  x: number,
  y: number,
  w: number,
  h: number
) => {};

export const drawImage = (
  dst: any,
  image: any,
  x: number,
  y: number,
  w?: number,
  h?: number,
  t?: number
) => {
  const width = w || image.width;
  const height = h || image.height;

  for (let _y = 0; _y < height; _y++) {
    for (let _x = 0; _x < width; _x++) {
      const xx = Math.floor((_x * image.width) / width);
      const yy = Math.floor((_y * image.height) / height);
      const c = image.pixels[yy][xx];
      if (c === t) continue;
      try {
        dst.pixels[_y + y][_x + x] = c;
      } catch (error) {
        () => {};
      }
    }
  }
};

export const drawText = (
  dst: any,
  text: string,
  font: string,
  size: number,
  x: number,
  y: number,
  backgroundColorIndex: number,
  textColorIndex: number
) => {
  const { width, height } = getTextInfo(text, font, size);

  const { buffer } = useBufferStore.getState();

  if (buffer === null) return;
  buffer.canvas.width = width;
  buffer.canvas.height = height;
  buffer.font = `${size}px ${font}`;
  buffer.fillStyle = 'black';
  buffer.fillRect(0, 0, width, height);
  buffer.fillStyle = 'white';
  buffer.fillText(text, 0, 10);

  const imgData: ImageData = buffer.getImageData(0, 0, width, height);

  const clip = () => {};

  const c = 0;
  let n = 0;
  for (let _y = 0; _y < height; _y++) {
    for (let _x = 0; _x < width; _x++) {
      const c =
        imgData.data[n * 4] === 255 ? textColorIndex : backgroundColorIndex;
      n++;
      try {
        dst.pixels[_y + y][_x + x] = c;
      } catch (error) {
        clip();
      }
    }
  }
};

export const getTextInfo = (
  str: string,
  font: string,
  size: number
): ICanvasTextInfo => {
  const { buffer } = useBufferStore.getState();
  if (buffer === null) return { width: 0, height: 0, top: 0 };

  buffer.font = `${size}px ${font}`;
  const {
    actualBoundingBoxAscent,
    fontBoundingBoxAscent,
    fontBoundingBoxDescent,
    width,
  } = buffer.measureText(str);

  //console.log(buffer.measureText(str));

  const height = fontBoundingBoxAscent + fontBoundingBoxDescent;
  return {
    width: Math.floor(width + 2),
    height: height,
    top: actualBoundingBoxAscent,
  };
};

export const loadGuiIcons = async () => {
  const file = await fetch(guiIconsPath);
  const data = await file.arrayBuffer();
  const stream = BinaryStream(data.slice(0, data.byteLength), true);
  const fileType = detect(stream);
  const iff: any = parse(stream, true, fileType);
  const w = 32;
  const h = 32;
  const o = 1;
  const images: IBrush[] = [];
  let ox = o;
  let oy = o;
  for (let cy = 0; cy < 6; cy++) {
    for (let cx = 0; cx < 6; cx++) {
      const image: IBrush = {
        width: w,
        height: h,
        pixels: initPixelArray(32, 32, 0),
      };
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const c = iff.pixels[oy + y][ox + x];
          image.pixels[y][x] = c;
        }
      }
      images.push(image);
      ox += w + 3;
    }
    ox = o;
    oy += h + 3;
  }
  return images;
};

export const drawPixelBuffer = (
  canvas: number[][],
  pixelBuffer: IPixelBuffer,
  x: number,
  y: number
) => {
  for (let _y = 0; _y < pixelBuffer.height; _y++) {
    for (let _x = 0; _x < pixelBuffer.width; _x++) {
      const c = pixelBuffer.pixels[_y][_x];
      try {
        canvas[_y + y][_x + x] = c;
      } catch (error) {
        () => {};
      }
    }
  }
};
