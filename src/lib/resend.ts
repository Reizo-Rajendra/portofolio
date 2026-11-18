import type { ContactFormData, ContactApiResponse } from './types.js';

/**
 * Resend Email Client Service
 * Mengirimkan pesan kontak langsung ke email Reizo menggunakan Resend API.
 */
export async function sendEmailWithResend(data: ContactFormData): Promise<ContactApiResponse> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Gagal mengirim email via Resend');
    }

    return {
      ok: true,
      message: result.message || 'Surat berhasil dikirim ke Reizo via Resend!',
    };
  } catch (error: any) {
    console.error('[Resend Service Error]:', error);
    return {
      ok: false,
      message: error.message || 'Terjadi kesalahan saat mengirim via Resend. Silakan coba lagi atau gunakan email langsung.',
    };
  }
}
