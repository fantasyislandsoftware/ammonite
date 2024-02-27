import React, { FC } from 'react';
import { IWindow } from 'interface/window';

interface IProps {
  window: IWindow;
}

const UIWindow: FC<IProps> = ({ window }) => {
  console.log('test');
  return <div>test</div>;
};

export default UIWindow;
