import { defineConfig } from 'vitest/config';
import ViteTSconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [ViteTSconfigPaths()],
  test: {
    // ...
  },
});
