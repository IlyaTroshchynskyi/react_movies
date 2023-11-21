import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ command, mode }) => {

  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    define: {
      VITE_API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL),
    },
    plugins: [react()],
  }
})
