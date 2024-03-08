import React, { FC } from 'react';
import { IScreenAspect } from '../screenInterface';

interface IProps {
  aspect: IScreenAspect;
  children?: React.ReactNode;
}

const AspectRatio: FC<IProps> = ({ aspect, children }) => {
  const ref = React.useRef<any>(null);

  return (
    <div
      ref={ref}
      style={{
        width: aspect.width,
        height: aspect.height,
        marginLeft: aspect.margin / 2,
      }}
    >
      {children}
    </div>
  );
};

export default AspectRatio;
