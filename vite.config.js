import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import headlinesHandler from './api/headlines.js'

const localHeadlinesApi = {
  name: 'local-headlines-api',
  configureServer(server) {
    server.middlewares.use('/api/headlines', (request, response, next) => {
      if (request.method !== 'GET') {
        response.statusCode = 405;
        response.setHeader('Allow', 'GET');
        response.end();
        return;
      }
      return headlinesHandler(request, response, next);
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localHeadlinesApi],
})
