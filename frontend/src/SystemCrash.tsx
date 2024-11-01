import { error } from 'console';
import React, { FC, useEffect, useState } from 'react';
import { useErrorStore } from 'stores/useErrorStore';

const SystemCrash = () => {
  const [init, setInit] = useState(false);
  const [showBorder, setShowBorder] = useState(false);

  const { systemCrash } = useErrorStore();

  useEffect(() => {
    if (init) {
      console.log('once');
      setInterval(() => {
        setShowBorder((prevShowBorder) => !prevShowBorder);
      }, 800);
    }
    setInit(true);
  }, [init]);

  return (
    <div
      style={{
        borderStyle: 'solid',
        borderWidth: 6,
        borderColor: showBorder ? 'red' : 'transparent',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div>Software Faliure: Press left mouse button to continue</div>
      <br></br>
      <div>{systemCrash.message}</div>
    </div>
  );
};

export default SystemCrash;
