import { ICanvasTextInfo } from 'interface/canvas';
import { IScreen } from 'interface/screen';
import { useBufferStore } from 'stores/useBufferStore';
import guiIconsPath from '../assets/gfx/gui.iff';
import BinaryStream from 'api/lib/binarystream';
import { detect, parse } from 'api/lib/iff';
import { IBrush } from 'interface/graphics';
import { off } from 'process';

export const initPixelArray = (width: number, height: number): number[][] => {
  const array: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(2);
    }
    array.push(row);
  }
  return array;
};

export const drawPixel = (screen: IScreen, x: number, y: number, c: number) => {
  screen.pixels[y][x] = c;
};

export const fillRect = (
  screen: IScreen,
  x: number,
  y: number,
  w: number,
  h: number,
  c: number
) => {
  for (let _y = y; _y < y + h; _y++) {
    for (let _x = x; _x < x + w; _x++) {
      screen.pixels[_y + x][_x + x] = c;
    }
  }
};

export const drawImage = (
  screen: IScreen,
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
      screen.pixels[_y + y][_x + x] = c;
    }
  }
};

export const drawText = (
  screen: IScreen,
  str: string,
  x: number,
  y: number,
  font: string,
  backgroundColorIndex: number,
  textColorIndex: number
) => {
  const { buffer } = useBufferStore.getState();
  if (buffer === null || screen.ctx === null) return;

  const { width, height } = getTextInfo(str, font);

  buffer.canvas.width = width;
  buffer.canvas.height = height;
  buffer.font = font;
  buffer.fillStyle = 'black';
  buffer.fillRect(0, 0, width, height);
  buffer.fillStyle = 'white';
  buffer.fillText(str, 0, 10);

  const imgData: ImageData = buffer.getImageData(0, 0, width, height);

  const c = 0;
  let n = 0;
  for (let _y = y; _y < y + height; _y++) {
    for (let _x = x; _x < x + width; _x++) {
      const c =
        imgData.data[n * 4] === 255 ? textColorIndex : backgroundColorIndex;
      n++;
      screen.pixels[_y + y][_x + x] = c;
    }
  }
};

export const getTextInfo = (str: string, font: string): ICanvasTextInfo => {
  const { buffer } = useBufferStore.getState();
  if (buffer === null) return { width: 0, height: 0 };

  buffer.font = font;
  const { fontBoundingBoxAscent, fontBoundingBoxDescent, width } =
    buffer.measureText(str);

  const height = fontBoundingBoxAscent + fontBoundingBoxDescent;
  return {
    width: Math.floor(width + 2),
    height: height,
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
        pixels: initPixelArray(32, 32),
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
