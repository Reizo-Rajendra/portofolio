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

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        ok: false,
        message: 'Mohon isi nama, email, dan pesan Anda dengan lengkap.',
      });
    }

    const apiKey = getResendApiKey();
    if (!apiKey) {
      console.log('[Dev Resend Mock] Message received:', { name, email, message });
      return res.status(200).json({
        ok: true,
        message: 'Surat simulasi berhasil dicatat (Set RESEND_API_KEY di .env atau dashboard hosting untuk pengiriman email nyata).',
      });
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: 'Portfolio Visitor <onboarding@resend.dev>',
      to: ['reizorjnda@gmail.com'],
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

    return res.status(200).json({
      ok: true,
      message: 'Surat berhasil dikirim ke Reizo via Resend API!',
      data: result.data,
    });
  } catch (error: any) {
    console.error('[Resend API Error]:', error);
    return res.status(500).json({
      ok: false,
      message: error.message || 'Gagal mengirim email melalui Resend.',
    });
  }
}
