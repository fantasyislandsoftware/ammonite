import { type FC, useEffect, useRef } from 'react';
import { IScreen } from '../interface';
import { useScreenStore } from '../useScreenStore';
import { canvasRenderStyle } from '../styles';
import { ScreenDefault } from '../constants';

interface IProps {
  screen: IScreen;
}

const TitleBar: FC<IProps> = ({ screen }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { screens, setScreens } = useScreenStore((state) => state);
  const style = { display: 'none' };

  useEffect(() => {
    const { titleBar, palette, mode } = screen;

    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      if (!ctx || !titleBar) return;

      /* Set font and get metrics */
      ctx.font = `${titleBar.font.size}px ${titleBar.font.name}`;
      const metrics = ctx.measureText(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdfghijklmnopqrstuvwxyz',
      );
      const height =
        Math.floor(
          metrics.actualBoundingBoxAscent +
            metrics.actualBoundingBoxDescent * 2,
        ) + 1;

      /* Set canvas dimensions dependant on font size and text */
      //ctx.canvas.width = screen.mode.width;
      //ctx.canvas.height = height;
      ctx.fillStyle = palette[ScreenDefault.titleBar.backgroundColor];
      ctx.fillRect(0, 0, mode.width, height);

      /* Draw text */
      ctx.fillStyle = palette[ScreenDefault.titleBar.fontColor];
      ctx.fillText(
        titleBar.title,
        0,
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
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
      width={screen.mode.width}
      height={screen.mode.height}
      style={{ ...style, ...canvasRenderStyle }}
    ></canvas>
  );
};

export default TitleBar;
