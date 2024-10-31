import React from 'react';
import { FC } from 'react';
import { canvasRenderStyle } from '../../_props/styles';
import { EnumOSEventObjectType } from 'functions/events/IEvents';
import { baseContainerBuildEvents } from 'Objects/UIBase/container/eventHandlers/baseContainerBuildEvents';
import { EnumScreenModeType, IScreen } from '../../_props/screenInterface';
import { getHighestScreenZIndex } from '../../_props/screenFunctions';

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
      onMouseDown={(event) => baseContainerBuildEvents(event, screen)}
      onMouseUp={(event) => baseContainerBuildEvents(event, screen)}
      onMouseMove={(event) => baseContainerBuildEvents(event, screen)}
      onMouseLeave={(event) => baseContainerBuildEvents(event, screen)}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export default Main;
