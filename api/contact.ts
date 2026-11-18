import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
// (Falls back to development placeholder if key is not yet set)
const resendApiKey = process.env.RESEND_API_KEY || 're_123456789_placeholder';
const resend = new Resend(resendApiKey);

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

    // Jika belum ada RESEND_API_KEY yang valid, simulasi kirim sukses untuk development
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('placeholder')) {
      console.log('[Dev Resend Mock] Received message from:', name, email, message);
      return res.status(200).json({
        ok: true,
        message: `[Simulasi Resend Berhasil] Pesan dari ${name} (${email}) telah diterima! (Tambahkan RESEND_API_KEY di .env untuk pengiriman nyata)`,
      });
    }

    // Pengiriman nyata via Resend API
    const data = await resend.emails.send({
      from: 'Portfolio Visitor <onboarding@resend.dev>',
      to: ['reizorjnda@gmail.com'],
      replyTo: email,
      subject: `[Portfolio Contact] Pesan Baru dari ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fcf4e3; color: #302e27; border-radius: 8px;">
          <h2 style="color: #334a35; border-bottom: 2px solid #dcb26b; padding-bottom: 8px;">📬 Surat Baru dari Reizo's Village</h2>
          <p><strong>Pengirim:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: 0; border-top: 1px solid #d7cab1; margin: 16px 0;" />
          <h3 style="color: #654e35;">Isi Pesan:</h3>
          <p style="white-space: pre-wrap; background: #fff; padding: 12px; border: 1px solid #e2d2b5; border-radius: 4px;">${message}</p>
          <hr style="border: 0; border-top: 1px solid #d7cab1; margin: 16px 0;" />
          <small style="color: #8b713f;">Dikirim melalui integrasi Resend API pada Reizo's Village Portfolio</small>
        </div>
      `,
    });

    return res.status(200).json({
      ok: true,
      message: 'Surat berhasil dikirim ke Reizo via Resend API!',
      data,
    });
  } catch (error: any) {
    console.error('[Resend API Error]:', error);
    return res.status(500).json({
      ok: false,
      message: error.message || 'Gagal mengirim email melalui Resend.',
    });
  }
}
