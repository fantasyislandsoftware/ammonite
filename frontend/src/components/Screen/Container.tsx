import { FC, useEffect, useRef, useState } from 'react';
import { IScreen } from './interface';
import Main from './canvas/Main';
import TitleBar from './canvas/TitleBar';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IOSEvent,
  osEventHandler,
} from '../../handlers/events';
import { getMouse } from '../../handlers/mouse';

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
    }
  }, [ref, ctx]);

  const processEvent = (
    event: any,
    osEventHandler: (osEvent: IOSEvent) => void,
    eventType: EnumOSEventType,
    screen: IScreen,
  ) => {
    const mouse = getMouse(event, screen);
    /* Screen */
    osEventHandler({
      object: EnumOSEventObjectType.Screen,
      id: screen.id,
      type: eventType,
      mouse: mouse,
    });
    /* Titlebar or Client */
    if (screen.titleBar?.height) {
      /* Titlebar */
      if (mouse.screen.y <= screen.titleBar.height - 1) {
        osEventHandler({
          object: EnumOSEventObjectType.Titlebar,
          type: eventType,
          mouse: mouse,
          parent: {
            object: EnumOSEventObjectType.Screen,
            id: screen.id,
          },
        });
        /* Client */
      } else {
        osEventHandler({
          object: EnumOSEventObjectType.Client,
          type: eventType,
          mouse: mouse,
          parent: {
            object: EnumOSEventObjectType.Screen,
            id: screen.id,
          },
        });
      }
    }
  };

  return (
    <div
      style={{
        background: '#404040',
        position: 'fixed',
        top: `${screen.position.y}px`,
        zIndex: `${screen.position.z}`,
      }}
    >
      <Main
        _ref={ref}
        screen={screen}
        onMouseDown={(event) => {
          processEvent(
            event,
            osEventHandler,
            EnumOSEventType.MouseDown,
            screen,
          );
        }}
        onMouseUp={(event) =>
          processEvent(event, osEventHandler, EnumOSEventType.MouseUp, screen)
        }
        onMouseMove={(event) =>
          processEvent(event, osEventHandler, EnumOSEventType.MouseMove, screen)
        }
        onMouseLeave={(event) =>
          processEvent(event, osEventHandler, EnumOSEventType.MouseMove, screen)
        }
      />
      <TitleBar screen={screen} />
    </div>
  );
};

export default Container;
