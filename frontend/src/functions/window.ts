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
  const { width, height, titleBar, position, borderThickness } = window;
  const { x, y } = position;
  const { title, font } = titleBar;

  const win = createPixelBuffer(width, height);

  /* Border */
  fillRect(win, 0, 0, width, height, 0);

  /* Bar */
  const barWidth = width - borderThickness * 2;
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
    button.boundBox = {
      x: barWidth - index * barHeight - barHeight,
      y: 0,
      width: barHeight,
      height: barHeight,
    };
    drawImage(
      bar,
      guiIcons[titleBar ? imageIndex : 0],
      button.boundBox.x,
      button.boundBox.y,
      button.boundBox.width,
      button.boundBox.height
    );
  });

  const canvas = createPixelBuffer(
    width - borderThickness * 2,
    height - barHeight - borderThickness * 2
  );

  drawPixelBuffer(win.pixels, bar, borderThickness, borderThickness);
  drawPixelBuffer(
    win.pixels,
    canvas,
    borderThickness,
    barHeight + borderThickness
  );
  drawPixelBuffer(screen.pixels, win, x, y);
};
