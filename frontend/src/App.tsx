import React, { useEffect, useState } from 'react';
import { Screen } from './uiObjects/Screen';
import { processObjectEvents } from 'handlers/event';
import { useScreenStore } from 'stores/useScreenStore';
import ShadowBuffer from 'ShadowBuffer';
import { openScreen } from 'api/os/screen';
import { full, hi, interlaced, low, med } from 'uiObjects/Screen/screenModes';
import { EnumOSEventType } from 'interface/event';
import { renderScreen } from 'handlers/screen';

const App = () => {
  const [init, setInit] = useState(false);
  const { screens, setScreens } = useScreenStore();

  window.onresize = () => {
    setScreens(screens);
  };

  window.onload = () => {
    setScreens(screens);
  };

  useEffect(() => {
    if (!init) {
      setInit(true);
      openScreen(window.innerWidth, window.innerHeight, full, 'Full Screen');
      openScreen(640, 512, hi, 'Hi Res');
      openScreen(320, 512, interlaced, 'Interlaced');
      openScreen(640, 256, med, 'Med Res');
      openScreen(320, 256, low, 'Low Res');

      /*setInterval(() => {
        screens.map((screen) => {
          renderScreen(screen);
        });
        console.log('render');
      }, 1);*/
    }
  }, [init]);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
        onMouseMove={(event) =>
          processObjectEvents(event, EnumOSEventType.MouseMove)
        }
      ></div>
      {screens.map((screen, index) => (
        <Screen key={index} screen={screen} />
      ))}
      <ShadowBuffer />
    </>
  );
};

export default App;
