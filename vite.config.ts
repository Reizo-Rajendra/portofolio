import { defineConfig, type Plugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

function getResendApiKey(): string {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY;
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/RESEND_API_KEY=([^\r\n]+)/);
      if (match && match[1]) return match[1].trim();
    }
  } catch (e) {
    // ignore
  }
  return '';
}

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

              const apiKey = getResendApiKey();
              let resendResult = null;

              if (apiKey) {
                const resend = new Resend(apiKey);
                const sendResponse = await resend.emails.send({
                  from: 'onboarding@resend.dev',
                  to: 'reizorjnda@gmail.com',
                  replyTo: email,
                  subject: `📬 [Merpati Pos Reizo] Surat Baru dari ${name}`,
                  html: `
                    <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #fbf6ec; color: #352b21; border-radius: 8px; border: 2px solid #c9b084;">
                      <h2 style="color: #3b5038; margin-top: 0; border-bottom: 2px solid #e1caa1; padding-bottom: 10px;">🕊️ Surat Baru dari Merpati Pos Desa</h2>
                      <p><strong>Pengirim:</strong> ${name}</p>
                      <p><strong>Email Pengirim:</strong> <a href="mailto:${email}">${email}</a></p>
                      <hr style="border: 0; border-top: 1px solid #d9c5a3; margin: 18px 0;" />
                      <h3 style="color: #6a5332; margin-bottom: 8px;">Isi Pesan / Surat:</h3>
                      <div style="white-space: pre-wrap; background: #ffffff; padding: 16px; border: 1px solid #d9cbaf; border-radius: 6px; font-size: 14px; line-height: 1.6;">${message}</div>
                      <hr style="border: 0; border-top: 1px solid #d9c5a3; margin: 18px 0;" />
                      <small style="color: #8c764e; font-size: 11px;">Surat ini dikirim langsung melalui integrasi Resend API pada Reizo's Village Portfolio.</small>
                    </div>
                  `,
                });
                resendResult = sendResponse.data;
                console.log('[Resend Delivered Successfully!]:', sendResponse);
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  ok: true,
                  message: 'Surat berhasil dikirim ke Reizo via Resend API!',
                  data: resendResult,
                })
              );
            } catch (err: any) {
              console.error('[Resend Error]:', err);
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
