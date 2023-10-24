import { FC, useEffect, useRef, useState } from 'react';
import { EnumScreenModeType, IScreen } from '../../../interface/screen';
import Main from '../canvas/Main';
import React from 'react';
import { processObjectEvents } from 'functions/events/events';
import { renderScreen } from 'functions/screen';
import { useScreenStore } from 'stores/useScreenStore';
import DragScreen from './DragScreen';
import AspectRatio from './AspectRatio';
import { EnumOSEventType } from 'interface/event';
import { getTextInfo } from 'functions/graphics';

interface IProps {
  screen: IScreen;
}

const Container: FC<IProps> = ({ screen }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const { innerWidth, innerHeight } = window;

  const calculateAspect = () => {
    let margin = 0;
    let width = 0;
    let height = 0;
    if (screen.mode.type === EnumScreenModeType.CLASSIC) {
      if (ref.current) {
        width = innerHeight * 1.25;
        height = innerHeight;
        margin = innerWidth - ref.current.clientWidth;
      }
    } else {
      width = screen.width;
      height = screen.height;
      margin = innerWidth - screen.width;
    }
    return { margin, width, height };
  };

  useEffect(() => {
    if (ref.current) {
      setCtx(ref.current.getContext('2d'));
    }
    if (ctx) {
      screen.ctx = ctx;
      if (screen.titleBar) {
        const { height } = getTextInfo(
          screen.titleBar.title,
          `${screen.titleBar.font.size}px ${screen.titleBar.font.name}`
        );
        screen.titleBar.height = height;
      }
      renderScreen(screen);
    }
  }, [ref, ctx]);

  screen.aspect = calculateAspect();

  return (
    <DragScreen screen={screen}>
      <AspectRatio aspect={screen.aspect}>
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
