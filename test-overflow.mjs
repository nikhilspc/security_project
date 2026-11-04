import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const distDir = path.resolve('dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

// 1. Static file server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(distDir, reqPath);

  // If path doesn't exist, check in public
  if (!fs.existsSync(filePath)) {
    filePath = path.join(path.resolve('public'), reqPath);
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(4173, '127.0.0.1', async () => {
  console.log('Static server listening on http://127.0.0.1:4173');

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeArgs = [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-background-networking',
    '--disable-default-apps',
    '--disable-extensions',
    '--disable-sync',
    '--disable-translate',
    '--metrics-recording-only',
    '--no-first-run',
    'http://127.0.0.1:4173',
  ];

  const edgeProcess = spawn(edgePath, edgeArgs);

  // Wait for Edge to open debug port
  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 300));
    try {
      const resp = await fetch('http://127.0.0.1:9222/json/list');
      const list = await resp.json();
      if (list && list.length > 0 && list[0].webSocketDebuggerUrl) {
        wsUrl = list[0].webSocketDebuggerUrl;
        break;
      }
    } catch {}
  }

  if (!wsUrl) {
    console.error('Failed to connect to Edge CDP');
    edgeProcess.kill();
    server.close();
    process.exit(1);
  }

  console.log('Connected to Edge via CDP:', wsUrl);

  const ws = new WebSocket(wsUrl);

  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });

  let idCounter = 1;
  function sendCdp(method, params = {}) {
    return new Promise((resolve) => {
      const id = idCounter++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Wait for page load
  await sendCdp('Page.enable');
  await new Promise((r) => setTimeout(r, 2000));

  const widths = [320, 360, 375, 390, 412, 430, 768, 1024, 1440];
  const results = {};

  for (const width of widths) {
    // Set device metrics
    await sendCdp('Emulation.setDeviceMetricsOverride', {
      width,
      height: 800,
      deviceScaleFactor: 1,
      mobile: width < 1024,
    });

    // Give DOM time to reflow
    await new Promise((r) => setTimeout(r, 400));

    // Evaluate the exact required expression
    const evalRes = await sendCdp('Runtime.evaluate', {
      expression: `
        (() => {
          const overflowing = [...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > innerWidth);
          return overflowing.map(e => ({
            tag: e.tagName,
            id: e.id,
            className: (typeof e.className === 'string' ? e.className : '').slice(0, 60),
            right: Math.round(e.getBoundingClientRect().right * 10) / 10,
            innerWidth: window.innerWidth,
            overflowBy: Math.round((e.getBoundingClientRect().right - window.innerWidth) * 10) / 10
          }));
        })()
      `,
      returnByValue: true,
    });

    results[width] = evalRes.result?.value || [];
  }

  console.log('=== OVERFLOW TEST RESULTS ===');
  let hasAnyOverflow = false;
  for (const width of widths) {
    const list = results[width];
    if (list.length === 0) {
      console.log(`[PASS] Width ${width}px: 0 overflowing elements (NO horizontal scroll)`);
    } else {
      hasAnyOverflow = true;
      console.log(`[FAIL] Width ${width}px: ${list.length} overflowing elements:`, list);
    }
  }

  console.log('=== SUMMARY: ' + (hasAnyOverflow ? 'FAIL' : 'ALL PASSED') + ' ===');

  ws.close();
  edgeProcess.kill();
  server.close();
  process.exit(hasAnyOverflow ? 2 : 0);
});

