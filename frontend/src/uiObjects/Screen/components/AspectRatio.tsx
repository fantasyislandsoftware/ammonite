import { EnumScreenModeType, IScreen } from 'interface/screen';
import React, { FC } from 'react';

interface IProps {
  screen: IScreen;
  children?: React.ReactNode;
}

const AspectRatio: FC<IProps> = ({ screen, children }) => {
  const { innerWidth, innerHeight } = window;
  const ref = React.useRef<any>(null);

  let margin = 0;
  let width = 0;
  let height = 0;

  if (screen.mode.type === EnumScreenModeType.CLASSIC) {
    if (ref.current) {
      width = innerHeight * 1.2;
      height = innerHeight;
      margin = innerWidth - ref.current.clientWidth;
    }
  } else {
    width = screen.width;
    height = screen.height;
    //margin = innerWidth - screen.width;
  }

  return (
    <div
      ref={ref}
      style={{
        width: width,
        height: height,
        marginLeft: margin / 2,
      }}
    >
      {children}
    </div>
  );
};

export default AspectRatio;
