import { ICanvasTextInfo } from 'interface/canvas';
import { IScreen } from 'interface/screen';
import { useBufferStore } from 'stores/useBufferStore';
import guiIconsPath from '../assets/gfx/gui.iff';
import BinaryStream from 'api/lib/binarystream';
import { detect, parse } from 'api/lib/iff';
import { IBrush } from 'interface/graphics';

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
  y: number
) => {
  for (let _y = 0; _y < image.height; _y++) {
    for (let _x = 0; _x < image.width; _x++) {
      const c = image.pixels[_y][_x];
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
  const image: IBrush = {
    width: 64,
    height: 64,
    pixels: initPixelArray(64, 64),
  };
  for (let y = 0; y < 64; y++) {
    for (let x = 0; x < 64; x++) {
      const c = iff.pixels[y][x];
      image.pixels[y][x] = c;
    }
  }
  console.log(image);
  return image;
};
