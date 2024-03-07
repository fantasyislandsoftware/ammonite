import React, { useEffect, useRef } from 'react';
import { baseContainerEvents } from 'UIObjects/UIBase/container/baseContainerEvents';
import { EnumOSEventObjectType } from 'interface/event';
import { canvasRenderStyle } from 'UIObjects/UIScreen/styles';

export const Backdrop = () => {
  return (
    <div
      data-id={EnumOSEventObjectType.Backdrop}
      style={{
        width: '100%',
        height: '100%',
        zIndex: -1000,
      }}
      onMouseUp={(event) => baseContainerEvents(event)}
      onMouseMove={(event) => baseContainerEvents(event)}
      onContextMenu={(e) => e.preventDefault()}
    >
      Font test
    </div>
  );
};
