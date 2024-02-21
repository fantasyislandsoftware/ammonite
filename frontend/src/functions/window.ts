import { IScreen } from 'interface/screen';
import { IWindow } from 'interface/window';
import {
  createPixelBuffer,
  drawImage,
  drawLine,
  drawPixelBuffer,
  drawText,
  fillRect,
  getTextInfo,
} from './graphics';
import { useIntuitionStore } from 'stores/useIntuitionStore';

export const renderWindow = (screen: IScreen, window: IWindow) => {
  const { guiIcons } = useIntuitionStore.getState();
  const { width, height, titleBar, position } = window;
  const { x, y } = position;
  const { title, font } = titleBar;

  const win = createPixelBuffer(width, height);

  /* Border */
  fillRect(win, 0, 0, width, height, 1);
  drawLine(win, 0, 0, width, 0, 0);
  drawLine(win, 0, 0, 0, height, 0);
  drawLine(win, 0, height - 1, width, height - 1, 0);
  drawLine(win, width - 1, 0, width - 1, height - 1, 0);

  /* Bar */
  const barWidth = width - 2;
  const textInfo = getTextInfo(
    titleBar.title,
    `${titleBar.font.size}px ${titleBar.font.name}`
  );
  const barHeight = textInfo.height;
  const bar = createPixelBuffer(barWidth, barHeight);
  fillRect(bar, 0, 0, barWidth, barHeight, 4);
  drawText(bar, title, `${font.size}px ${font.name}`, 1, 0, 4, 0);
  drawLine(bar, 0, barHeight - 1, barWidth, barHeight - 1, 0);

  /* Buttons */
  titleBar.buttons.map((button, index) => {
    const imageIndex = button.imageIndex[button.currentImageIndex];
    /*button.boundBox = {
      x: x,
      y: y,
      width: barHeight,
      height: barHeight,
    };*/
    /*drawImage(
      bar,
      guiIcons[titleBar ? imageIndex : 0],
      button.boundBox.x,
      button.boundBox.y,
      button.boundBox.width,
      button.boundBox.height
    );*/
  });

  drawPixelBuffer(win.pixels, bar, 1, 1);

  drawPixelBuffer(screen.pixels, win, x, y);
};
