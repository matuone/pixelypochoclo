import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'startup-message',
      configureServer(server) {
        server.httpServer?.once('listening', () => {
          const addr = server.httpServer.address();
          const port = typeof addr === 'object' ? addr.port : addr;
          setTimeout(() => {
            console.log(`\x1b[32m✔ Frontend corriendo en http://localhost:${port}\x1b[0m`);
          }, 100);
        });
      },
    },
  ],
})
