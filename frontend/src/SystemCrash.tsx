import React, { useEffect, useState } from 'react';
import { useErrorStore } from 'stores/useErrorStore';

const SystemCrash = () => {
  const [init, setInit] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const [counter, setCounter] = useState(0);

  const { systemCrash, setSystemCrash } = useErrorStore();

  useEffect(() => {
    if (init) {
      setInterval(() => {
        setShowBorder((prevShowBorder) => !prevShowBorder);
      }, 800);
      document.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
          setCounter(5);
          setSystemCrash({
            ...systemCrash,
            message: 'Rebooting System...',
          });
          setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
          }, 1000);
        }
      });
    }
    setInit(true);
  }, [init]);

  useEffect(() => {
    if (counter < 0) {
      window.location.reload();
    }
  }, [counter]);

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
        userSelect: 'none',
      }}
    >
      <div>Software Faliure: Press left mouse button to continue</div>
      <br></br>
      <div>
        {systemCrash.message}
        {counter > 0 && counter}
      </div>
    </div>
  );
};

export default SystemCrash;
