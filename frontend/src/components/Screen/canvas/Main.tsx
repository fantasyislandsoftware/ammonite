import React from 'react';
import { FC } from 'react';
import { IScreen } from '../interface';
import { canvasRenderStyle } from '../styles';

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
  return (
    <canvas
      ref={_ref}
      width={screen.width}
      height={screen.height}
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
