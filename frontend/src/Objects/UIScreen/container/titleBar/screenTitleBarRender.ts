import { IScreen } from 'Objects/UIScreen/screenInterface';
import { textOut } from 'api/lib/graphics/text';
import { drawLine } from 'api/lib/graphics/draw';

export const screenTitleBarRender = (pixels: number[][], screen: IScreen) => {
  const { titleBar } = screen;
  if (!titleBar) return pixels;

  textOut(
    titleBar.pixels,
    0,
    0,
    titleBar.title,
    0,
    1,
    titleBar.font.name,
    titleBar.font.size
  );
  drawLine(
    titleBar.pixels,
    0,
    titleBar.height - 1,
    screen.width,
    titleBar.height - 1,
    0
  );

  return pixels;
};
