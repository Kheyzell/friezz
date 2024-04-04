import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@freizz/client': '/src',
            },
        },
        server: {
            host: true,
            strictPort: true,
            port: env.CLIENT_PORT ?? 5701,
            proxy: {
                '/api': {
                    target: `http://${env.SERVER_HOST ?? 'localhost'}:${env.SERVER_PORT ?? 5700}`,
                    changeOrigin: true,
                },
            },
        },
    };
});
