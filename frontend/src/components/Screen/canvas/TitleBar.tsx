import React from 'react';
import { type FC, useEffect, useRef } from 'react';
import { IScreen } from '../interface';
import { useScreenStore } from '../useScreenStore';
import { canvasRenderStyle } from '../styles';
import { screenDefault } from '../constants';
interface IProps {
  screen: IScreen;
}

const TitleBar: FC<IProps> = ({ screen }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { screens, setScreens } = useScreenStore((state) => state);

  useEffect(() => {
    const { width, titleBar, palette } = screen;

    if (ref.current) {
      const ctx = ref.current.getContext('2d');

      if (!ctx || !titleBar) return;

      /* Set font and get metrics */
      const metrics = ctx.measureText(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdfghijklmnopqrstuvwxyz'
      );
      const height =
        Math.floor(
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent * 2
        ) + 1;

      /* Set canvas dimensions dependant on font size and text */
      ctx.canvas.width = width;
      ctx.canvas.height = height;
      ctx.fillStyle = palette[screenDefault.titleBar.backgroundColor];
      ctx.fillRect(0, 0, screen.width, height - 1);

      /* TitleBar border */
      ctx.fillStyle = palette[screenDefault.titleBar.borderColor];
      ctx.fillRect(0, height - 1, screen.width, 1);

      /* Draw text */
      ctx.font = `${titleBar.font.size}px ${titleBar.font.name}`;
      ctx.fillStyle = palette[screenDefault.titleBar.fontColor];
      ctx.fillText(
        titleBar.title,
        0,
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
      );

      /* Update screen store */
      screens.map((_screen) => {
        if (_screen.id === screen.id && _screen.titleBar) {
          _screen.canvasBuffers.titleBarContext = ctx;
          _screen.titleBar.height = height;
        }
      });
      setScreens([...screens]);
    }
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        display: 'none',
        ...canvasRenderStyle,
      }}
    ></canvas>
  );
};

export default TitleBar;
