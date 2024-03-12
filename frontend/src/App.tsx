import React, { useEffect, useRef, useState } from 'react';
import { UIScreen } from './Objects/UIScreen';
import { useScreenStore } from './stores/useScreenStore';
import ShadowBuffer from 'Objects/UIScreen/jsx/ShadowBuffer';
import { openScreen } from 'api/os/screen';
import { full, hi, interlaced, low, med } from './Objects/UIScreen/screenModes';
import { EnumOSEventObjectType } from 'interface/event';
import { getHighestScreenZIndex } from 'functions/screen';
import useGetGuiIcons from 'api/query/useGetGuiIcons';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';
import { baseContainerEvents } from 'Objects/UIBase/container/baseContainerEvents';
import { openWindow } from 'api/os/window';
import useGetFontsList from 'api/query/useGetFontsList';
import { Backdrop } from 'Objects/UIBackdrop/jsx/Backdrop';
import useGetFonts from 'api/query/useGetFonts';
import './css/base.css';

const App = () => {
  const { screens, setScreens, setSelectedScreen } = useScreenStore();

  const ref = useRef<HTMLCanvasElement>(null);

  const getFonts = useGetFonts(ref);

  /*return (
    <>
      <div style={{ font: '8px Amiga Forever' }}>test</div>
    </>
  );*/

  return (
    <>
      {screens.map((screen, index) => (
        <UIScreen key={index} screen={screen} />
      ))}
      <ShadowBuffer />
      <Backdrop />
    </>
  );
};

export default App;
