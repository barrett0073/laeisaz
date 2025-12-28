require('dotenv').config();
const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port80 = process.env.PORT_HTTP || 80;
const port443 = process.env.PORT_HTTPS || 443;

app.prepare().then(() => {
  const server = express();

  // Explicitly serve static files from public folder
  // This ensures PDFs and other static files are accessible
  server.use(express.static(path.join(__dirname, 'public'), {
    maxAge: dev ? '0' : '1y',
    immutable: !dev
  }));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start HTTP (80)
  server.listen(port80, (err) => {
    if (err) throw err;
    console.log(`> HTTP ready on port ${port80}`);
  });

  // Start "HTTPS" listener (443) but without SSL
  server.listen(port443, (err) => {
    if (err) throw err;
    console.log(`> HTTP ready on port ${port443} (SSL off, CDN handles HTTPS)`);
  });
});