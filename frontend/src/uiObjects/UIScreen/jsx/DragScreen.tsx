import React, { FC } from 'react';
import { baseContainerEvents } from 'src/UIObjects/UIBase/container/baseContainerEvents';
import { IScreen } from '../screenInterface';

interface IProps {
  screen: IScreen;
  children?: React.ReactNode;
}

const DragScreen: FC<IProps> = ({ screen, children }) => {
  return (
    <div
      style={{
        borderTop: '1px solid black',
        backgroundColor: 'black',
        position: 'fixed',
        top: `${screen.position.y}px`,
        width: '100%',
        height: '100%',
        zIndex: screen.zIndex,
      }}
      onMouseUp={(event) => baseContainerEvents(event)}
    >
      {children}
    </div>
  );
};

export default DragScreen;
