import React, { FC } from 'react';
import { baseContainerBuildEvents } from 'Objects/UIBase/container/eventHandlers/baseContainerBuildEvents';
import { IScreen } from '../../_props/screenInterface';
import { EnumOSEventObjectType } from 'functions/events/IEvents';

interface IProps {
  screen: IScreen;
  children?: React.ReactNode;
}

const DragScreen: FC<IProps> = ({ screen, children }) => {
  return (
    <div
      data-id={EnumOSEventObjectType.ScreenDrag}
      style={{
        borderTop: '1px solid black',
        backgroundColor: 'black',
        position: 'fixed',
        top: `${screen.position.y}px`,
        width: '100%',
        height: '100%',
        zIndex: screen.zIndex,
      }}
      onMouseUp={(event) => {
        baseContainerBuildEvents(event);
      }}
    >
      {children}
    </div>
  );
};

export default DragScreen;
