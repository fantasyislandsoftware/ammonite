import React, { useEffect, useState } from 'react';
import { Screen } from './uiObjects/Screen';
import { processObjectEvents } from 'functions/events/events';
import { useScreenStore } from 'stores/useScreenStore';
import ShadowBuffer from 'ShadowBuffer';
import { openScreen } from 'api/os/screen';
import { full, hi, interlaced, low, med } from 'uiObjects/Screen/screenModes';
import { EnumOSEventType } from 'interface/event';
import { renderScreen } from 'functions/screen';
import { getDirList, getFile } from 'api/os/fileIO';
import { detect, parse } from 'api/lib/iff';
import BinaryStream from 'api/lib/binarystream';
import { fileTypes } from 'api/lib/iff';
import hello from './resource/gfx/gui.iff';

const App = () => {
  const [init, setInit] = useState(false);
  const { screens, setScreens } = useScreenStore();

  function toArrayBuffer(buffer: Buffer) {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return arrayBuffer;
  }

  /*const test = async () => {
    const z = await fetch(hello);
    const data = await z.arrayBuffer();
    const file = BinaryStream(data.slice(0, data.byteLength), true);
    const fileType = detect(file);
    const _data = parse(file, true, fileType);
    console.log(_data);
  };*/

  window.onresize = () => {
    setScreens(screens);
  };

  window.onload = () => {
    document.body.addEventListener('keydown', function (e) {
      if (e.keyCode === 32) {
        console.log(screens);
      }
    });
    setScreens(screens);
  };

  useEffect(() => {
    if (!init) {
      setInit(true);
      //openScreen(window.innerWidth, window.innerHeight, full, 'Full Screen');
      //openScreen(640, 512, hi, 'Hi Res');
      //openScreen(320, 512, interlaced, 'Interlaced');
      //openScreen(640, 256, med, 'Med Res');
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
