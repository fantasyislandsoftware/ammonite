import { FC, useEffect, useRef, useState } from 'react';
import { EnumScreenModeType, IScreen } from '../../../interface/screen';
import Main from './Main';
import React from 'react';
import DragScreen from './DragScreen';
import AspectRatio from './AspectRatio';
import { getTextInfo } from 'functions/graphics';
import { screenContainerRender } from '../container/screenContainerRender';

interface IProps {
  screen: IScreen;
  children?: React.ReactNode;
}

const UIScreen: FC<IProps> = ({ screen, children }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const { innerWidth, innerHeight } = window;

  const calculateAspect = () => {
    let margin = 0;
    let width = 0;
    let height = 0;
    if (screen.mode.type === EnumScreenModeType.CLASSIC) {
      if (ref.current) {
        width = innerHeight * 1.27;
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
      screenContainerRender(screen);
    }
  }, [ref, ctx]);

  screen.aspect = calculateAspect();

  return (
    <DragScreen screen={screen}>
      <AspectRatio aspect={screen.aspect}>
        <Main _ref={ref} screen={screen}>
          {children}
        </Main>
      </AspectRatio>
    </DragScreen>
  );
};

export default UIScreen;
