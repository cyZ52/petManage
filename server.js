const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // 设置代理规则
  server.use('/api', createProxyMiddleware({
    target: 'http://localhost:3001', // 后端服务地址
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // 重写请求路径，例如将 /api/login 重写为 /login
    },
  }));

  // 处理 Next.js 请求
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // 启动服务器
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
