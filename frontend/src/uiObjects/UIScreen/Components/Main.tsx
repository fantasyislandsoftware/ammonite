import React from 'react';
import { FC } from 'react';
import { EnumScreenModeType, IScreen } from '../../../interface/screen';
import { canvasRenderStyle } from '../styles';
import { EnumOSEventObjectType } from 'interface/event';
import { getHighestScreenZIndex } from 'functions/screen';
import { delegateEvents } from 'functions/events/eventDelegator';

interface IProps {
  _ref: React.RefObject<HTMLCanvasElement>;
  screen: IScreen;
  children?: React.ReactNode;
}

const Main: FC<IProps> = ({ _ref, screen, children }) => {
  let width = 0;
  let height = 0;
  if (screen.mode.type === EnumScreenModeType.CLASSIC) {
    width = screen.mode.viewPort.width;
    height = screen.mode.viewPort.height;
  } else {
    width = screen.width;
    height = screen.height;
  }

  const highestZorder = getHighestScreenZIndex();

  return (
    <canvas
      data-id={EnumOSEventObjectType.Screen}
      ref={_ref}
      width={width}
      height={height}
      style={{
        width: '100%',
        height: '100%',
        opacity: screen.zIndex === highestZorder ? 1 : 0.5,
        ...canvasRenderStyle,
      }}
      onMouseDown={(event) => delegateEvents(event, screen)}
      onMouseUp={(event) => delegateEvents(event, screen)}
      onMouseMove={(event) => delegateEvents(event, screen)}
      onMouseLeave={(event) => delegateEvents(event, screen)}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export default Main;
