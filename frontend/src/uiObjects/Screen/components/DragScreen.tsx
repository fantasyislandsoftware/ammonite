import React, { FC } from 'react';
import { IScreen } from 'interface/screen';

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
      }}
    >
      {children}
    </div>
  );
};

export default DragScreen;
