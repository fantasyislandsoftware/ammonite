import React from 'react';
import { Screen } from './components/Screen';
import { app } from './components/Screen/constants';
import { useScreenStore } from './components/Screen/useScreenStore';

const App = () => {
  const { screens } = useScreenStore();

  return (
    <>
      <div style={{ padding: `${app.margin}%` }}>
        {screens.map((screen, index) => (
          <Screen key={index} screen={screen} />
        ))}
      </div>
    </>
  );
};

export default App;
