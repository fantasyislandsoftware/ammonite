import { FC, useEffect, useRef, useState } from 'react';
import { EnumScreenModeType, IScreen } from '../../../interface/screen';
import Main from '../canvas/Main';
import React from 'react';
import { processObjectEvents } from 'handlers/events';
import { EnumOSEventType } from 'handlers/events/interface';
import { getTextInfo, renderScreen } from 'handlers/screen';
import { useScreenStore } from 'stores/useScreenStore';
import DragScreen from './DragScreen';
import AspectRatio from './AspectRatio';

interface IProps {
  screen: IScreen;
}

const Container: FC<IProps> = ({ screen }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const { screens, setScreens } = useScreenStore((state) => state);

  useEffect(() => {
    if (ref.current) {
      setCtx(ref.current.getContext('2d'));
    }
    if (ctx) {
      screens.map((_screen) => {
        if (_screen.id === screen.id) {
          _screen.ctx = ctx;
          if (_screen.titleBar) {
            const { height } = getTextInfo(
              _screen.titleBar.title,
              `${_screen.titleBar.font.size}px ${_screen.titleBar.font.name}`
            );
            _screen.titleBar.height = height;
          }
        }
      });

      renderScreen(screen);
    }
  }, [ref, ctx]);

  return (
    <DragScreen screen={screen}>
      <AspectRatio screen={screen}>
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
      </AspectRatio>
    </DragScreen>
  );
};

export default Container;
