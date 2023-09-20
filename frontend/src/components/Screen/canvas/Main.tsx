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
  const style = { width: '100%', height: `${screen.mode.height / 3}vw` };
  return (
    <canvas
      ref={_ref}
      width={screen.mode.width}
      height={screen.mode.height}
      style={{ ...style, ...canvasRenderStyle }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default Main;
