import { FC, useEffect, useRef, useState } from 'react';
import { IScreen } from './interface';
import Main from './canvas/Main';
import TitleBar from './canvas/TitleBar';
import { app } from './constants';
import React from 'react';
import { processObjectEvents } from 'handlers/events';
import { EnumOSEventType } from 'handlers/events/interface';

interface IProps {
  screen: IScreen;
}

const Container: FC<IProps> = ({ screen }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (ref.current) {
      setCtx(ref.current.getContext('2d'));
    }
    if (ctx) {
      if (screen.canvasBuffers.titleBarContext) {
        ctx.drawImage(screen.canvasBuffers.titleBarContext.canvas, 0, 0);
      }
      ctx.fillStyle = 'blue';
      ctx.fillRect(0 + 20, 0 + 20, 100 + 20, 100 + 20);
    }
  }, [ref, ctx]);

  const height = (screen.height / screen.mode.maxHeight) * 100;

  return (
    <div
      style={{
        width: `${100 - app.margin * 2}%`,
        height: `${screen.mode.maxWidth / screen.mode.verticalStretchRatio}vw`,
        background: 'darkgray',
        position: 'fixed',
        top: `${screen.position.y}px`,
        zIndex: `${screen.position.z}`,
      }}
    >
      <div
        style={{
          width: '100%',
          height: `${height}%`,
          backgroundColor: 'black',
        }}
      >
        <Main
          _ref={ref}
          screen={screen}
          onMouseDown={(event) => {
            processObjectEvents(event, EnumOSEventType.MouseDown, screen);
          }}
          onMouseUp={(event) =>
            processObjectEvents(event, EnumOSEventType.MouseUp, screen)
          }
          onMouseMove={(event) =>
            processObjectEvents(event, EnumOSEventType.MouseMove, screen)
          }
          onMouseLeave={(event) =>
            processObjectEvents(event, EnumOSEventType.MouseLeave, screen)
          }
        />
        <TitleBar screen={screen} />
      </div>
    </div>
  );
};

export default Container;
