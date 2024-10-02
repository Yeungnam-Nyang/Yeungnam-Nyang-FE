import proxy from 'http-proxy-middleware';

// src/setupProxy.js
export default function(app) {
    app.use(
        proxy('/api', {
            target: 'https://localhost:8080', // 비즈니스 서버 URL 설정
            changeOrigin: true
        })
    );
}