import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    lib: {
      entry: 'src/main.ts',
      name: 'arsenal',
      fileName: (format) => `arsenal.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
        },
      },
    },
  },
  plugins: [
    dts(),
  ],
})
