import { ICanvasTextInfo } from 'interface/canvas';
import { IScreen } from 'interface/screen';
import { fill } from 'lodash';
import { useBufferStore } from 'stores/useBufferStore';
import { useScreenStore } from 'stores/useScreenStore';

export const screenIdToIndex = (id: number): number | undefined => {
  const { screens } = useScreenStore.getState();
  let result;
  screens.map((screen: IScreen, index: number) => {
    if (screen.id === id) result = index;
  });
  return result;
};

export const initPixelArray = (width: number, height: number): number[] => {
  const pixelArray = [];
  for (let n = 0; n < width * height; n++) {
    pixelArray.push(2);
  }
  return pixelArray;
};

const fillRect = (
  screen: IScreen,
  x: number,
  y: number,
  w: number,
  h: number,
  c: number
) => {
  for (let _y = y; _y < y + h; _y++) {
    for (let _x = x; _x < x + w; _x++) {
      screen.pixels[_y * screen.width + _x] = c;
    }
  }
};

const drawText = (
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
      screen.pixels[_y * screen.width + _x] = c;
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

export const renderScreen = (screen: IScreen): void => {
  const { ctx } = screen;

  if (ctx === null) return;

  if (screen.titleBar) {
    fillRect(screen, 0, 0, screen.width, screen.titleBar.height, 1);
    fillRect(screen, 0, screen.titleBar.height, screen.width, 1, 0);
    drawText(
      screen,
      screen.titleBar.title,
      0,
      0,
      `${screen.titleBar.font.size}px ${screen.titleBar.font.name}`,
      1,
      0
    );
  }

  const imgData: ImageData = ctx.createImageData(screen.width, screen.height);
  for (let n = 0; n < screen.pixels.length; n++) {
    const pixelIndex = screen.pixels[n];
    const color = screen.palette[pixelIndex];
    for (let i = 0; i < 4; i++) {
      imgData.data[n * 4 + i] = color[i];
      //imgData.data[n * 4 + i] = Math.floor(Math.random() * 255);
    }
  }
  ctx.putImageData(imgData, 0, 0);
};
