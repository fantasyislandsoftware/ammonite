import React from 'react';
import { FC } from 'react';
import { EnumScreenModeType, IScreen } from '../../../interface/screen';
import { canvasRenderStyle } from '../styles';
import { EnumOSEventObjectType } from 'interface/event';

interface IProps {
  _ref: React.RefObject<HTMLCanvasElement>;
  screen: IScreen;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
}

const Main: FC<IProps> = ({
  _ref,
  screen,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onMouseLeave,
}) => {
  let width = 0;
  let height = 0;
  if (screen.mode.type === EnumScreenModeType.CLASSIC) {
    width = screen.mode.viewPort.width;
    height = screen.mode.viewPort.height;
  } else {
    width = screen.width;
    height = screen.height;
  }

  return (
    <canvas
      data-id={EnumOSEventObjectType.Screen}
      ref={_ref}
      width={width}
      height={height}
      style={{
        width: '100%',
        height: '100%',
        ...canvasRenderStyle,
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default Main;
