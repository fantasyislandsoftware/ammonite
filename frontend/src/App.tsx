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
import { useTaskStore } from 'stores/useTaskStore';
import { getDirList, getFile } from 'api/os/fileIO';
import { startTask, startTaskProcessor } from 'functions/tasks';
import { useErrorStore } from 'stores/useErrorStore';

const App = () => {
  const { screens, setScreens, setSelectedScreen } = useScreenStore();
  const [ready, setReady] = useState(false);
  const [initBoot, setInitBoot] = useState(true);
  const { systemCrash } = useErrorStore();
  const [taskProcessor, setTaskProcessor] = useState<any>(null);

  useEffect(() => {
    async function boot() {
      startTask('/home/node/app/src/js/boot.js');
    }
    if (initBoot) {
      boot();
      setInitBoot(false);
      setTaskProcessor(startTaskProcessor());
    }
  }, [initBoot]);

  useEffect(() => {
    if (systemCrash.state) {
      clearInterval(taskProcessor);
    }
  }, [systemCrash.state]);

  if (systemCrash.state) {
    return <div>{systemCrash.message}</div>;
  } else {
    return (
      <>
        {screens.map((screen, index) => (
          <UIScreen key={index} screen={screen} />
        ))}
        <ShadowBuffer />
        <Backdrop />
      </>
    );
  }
};

export default App;
