import { defineConfig, type Plugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { Resend } from 'resend';

function resendDevPlugin(): Plugin {
  return {
    name: 'resend-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { name, email, message } = JSON.parse(body || '{}');
              if (!name || !email || !message) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    ok: false,
                    message: 'Harap lengkapi nama, email, dan pesan Anda.',
                  })
                );
                return;
              }

              const apiKey = process.env.RESEND_API_KEY;
              if (apiKey && !apiKey.includes('placeholder')) {
                const resend = new Resend(apiKey);
                await resend.emails.send({
                  from: 'Portfolio Visitor <onboarding@resend.dev>',
                  to: ['reizorjnda@gmail.com'],
                  replyTo: email,
                  subject: `[Portfolio Contact] Pesan Baru dari ${name}`,
                  html: `<p><strong>Pengirim:</strong> ${name} (${email})</p><p>${message}</p>`,
                });
              } else {
                console.log('[Vite Dev Resend Simulation] Received:', { name, email, message });
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  ok: true,
                  message: `Surat berhasil dikirim ke Reizo via Resend API!`,
                })
              );
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false, message: err.message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    svelte(),
    resendDevPlugin(),
  ],
  server: {
    port: 3000,
    open: false,
    host: true,
  },
});
