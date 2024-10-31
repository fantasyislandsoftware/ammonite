import { IPixelArray } from 'functions/graphics/IGraphics';
import { useBufferStore } from 'stores/useBufferStore';

export const measureText = (text: string, font: string, size: number) => {
  const { buffer } = useBufferStore.getState();
  if (buffer === null) return { width: 0, height: 0, top: 0 };

  buffer.font = `${size}px ${font}`;
  const data = buffer.measureText(text);
  const {
    actualBoundingBoxAscent,
    fontBoundingBoxAscent,
    fontBoundingBoxDescent,
    width,
  } = data;

  const height = fontBoundingBoxAscent + fontBoundingBoxDescent;
  return {
    width: Math.floor(width + 2),
    height: height,
    top: actualBoundingBoxAscent,
  };
};

export const textOut = (
  pixels: IPixelArray,
  x: number,
  y: number,
  text: string,
  fgColorIndex: number,
  bgColorIndex: number,
  fontName: string,
  fontSize: number
) => {
  const { buffer } = useBufferStore.getState();
  const { width, height, top } = measureText(text, fontName, fontSize);

  if (buffer === null) return;
  buffer.canvas.width = width;
  buffer.canvas.height = height;
  buffer.font = `${fontSize}px ${fontName}`;
  buffer.fillStyle = 'black';
  buffer.fillRect(0, 0, width, height);
  buffer.fillStyle = 'white';
  buffer.fillText(text, 0, top);

  const imgData: ImageData = buffer.getImageData(0, 0, width, height);

  const c = 0;
  let n = 0;
  for (let _y = 0; _y < height; _y++) {
    for (let _x = 0; _x < width; _x++) {
      const c = imgData.data[n * 4] === 255 ? fgColorIndex : bgColorIndex;
      n++;
      try {
        pixels[_y + y][_x + x] = c;
      } catch (error) {
        () => {};
      }
    }
  }
};
