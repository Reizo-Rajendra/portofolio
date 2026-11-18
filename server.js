const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

const server = http.createServer((req, res) => {
  // Normalize URL and remove query string / hash
  let cleanUrl = req.url.split('?')[0].split('#')[0];
  try {
    cleanUrl = decodeURIComponent(cleanUrl);
  } catch (e) {
    cleanUrl = req.url;
  }

  // Handle Resend Email Contact API endpoint
  if (cleanUrl === '/api/contact') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          const { name, email, message } = JSON.parse(body || '{}');
          if (!name || !email || !message) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, message: 'Harap lengkapi semua data formulir.' }));
            return;
          }

          let apiKey = process.env.RESEND_API_KEY;
          if (!apiKey) {
            try {
              const envContent = fs.readFileSync(path.join(ROOT_DIR, '.env'), 'utf8');
              const match = envContent.match(/RESEND_API_KEY=([^\r\n]+)/);
              if (match) apiKey = match[1].trim();
            } catch (e) {}
          }
          if (apiKey) {
            try {
              const { Resend } = require('resend');
              const resend = new Resend(apiKey);
              await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: ['reizorjnda@gmail.com'],
                replyTo: email,
                subject: `📬 [Merpati Pos Reizo] Surat Baru dari ${name}`,
                html: `<p><strong>Pengirim:</strong> ${name} (${email})</p><p>${message}</p>`,
              });
            } catch (resendErr) {
              console.error('[Resend Error]:', resendErr);
            }
          } else {
            console.log('[Dev Resend Server] Message received:', { name, email, message });
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, message: 'Surat berhasil dikirimkan via Resend API!' }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, message: err.message }));
        }
      });
      return;
    }
  }

  if (cleanUrl === '/' || cleanUrl === '') {
    cleanUrl = '/index.html';
  }

  // Prevent directory traversal
  const safePath = path.normalize(cleanUrl).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(ROOT_DIR, safePath);

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback: check if requested in /assets or relative
      if (!cleanUrl.startsWith('/assets/')) {
        const altAssetPath = path.join(ROOT_DIR, 'assets', safePath);
        if (fs.existsSync(altAssetPath) && fs.statSync(altAssetPath).isFile()) {
          filePath = altAssetPath;
        } else {
          // Serve index.html for SPA fallback
          filePath = path.join(ROOT_DIR, 'index.html');
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found: ' + cleanUrl);
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    });

    const stream = fs.createReadStream(filePath);
    stream.on('error', (streamErr) => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error: ' + streamErr.message);
    });
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Portofolio Localhost Server berjalan di:`);
  console.log(`   👉 http://localhost:${PORT}`);
  console.log(`   Tekan Ctrl + C untuk mematikan server`);
  console.log(`====================================================`);
});
