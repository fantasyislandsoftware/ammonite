import React, { useEffect, useRef } from 'react';
import { canvasRenderStyle } from '../../_props/styles';
import { useBufferStore } from 'stores/useBufferStore';

const ShadowBuffer = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { setBuffer } = useBufferStore((state) => state);
  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      setBuffer(ctx);
    }
  }, [ref]);
  return (
    <canvas
      id={'canvas_shadow'}
      ref={ref}
      style={{
        display: 'none',
        ...canvasRenderStyle,
      }}
    ></canvas>
  );
};

export default ShadowBuffer;
