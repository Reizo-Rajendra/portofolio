<script lang="ts">
  import { CONTACT_INFO } from '../../lib/portfolioData.js';
  import { sendEmailWithResend } from '../../lib/resend.js';
  import type { ContactFormData } from '../../lib/types.js';

  const ICONS: Record<string, string> = {
    pigeon:
      'M9 2h3v1H9zM12 3h2v3h-2zM8 3h1v3H8zM14 4h2v1h-2zM7 6h5v1H7zM5 7h7v1H5zM3 8h10v2H3zM2 9h2v2H2zM1 10h2v2H1zM4 10h8v1H4zM5 11h6v1H5zM6 12h1v2H6zM9 12h1v2H9z',
    mail: 'M2 4h12v1H2zM1 5h1v7H1zM14 5h1v7h-1zM2 12h12v1H2zM2 5h2v1H2zM4 6h2v1H4zM6 7h4v1H6zM10 6h2v1h-2zM12 5h2v1h-2z',
    youtube:
      'M2 3h10v1h-10zM1 4h12v1h-12zM0 5h16v1h-16zM0 6h6v1h-6zM8 6h8v1h-8zM0 7h6v1h-6zM10 7h6v1h-6zM0 8h6v1h-6zM10 8h6v1h-6zM0 9h6v1h-6zM8 9h8v1h-8zM0 10h16v1h-16zM1 11h12v1h-12zM2 12h10v1h-10z',
    linkedin:
      'M2 2h2v2H2zM2 6h2v8H2zM6 6h2v1h1V6h3v1h1v1h1v6h-2V9h-1V8H9v1H8v5H6z',
    github:
      'M3 2h2v1h6V2h2v5h1v4h-1v1h-2v3H9v-3H7v3H5v-3H3v-1H2V7h1zM4 7v3h1v1h6v-1h1V7h-2v2H9V7H7v2H6V7zM1 11h1v2h3v1H2v-1H1z',
    instagram:
      'M4 1h8v1H4zM2 2h2v1H3v1H2zM12 2h2v2h-1V3h-1zM1 4h1v8H1zM14 4h1v8h-1zM2 12h1v1h1v1H2zM13 12h1v2h-2v-1h1zM4 14h8v1H4zM6 5h4v1H6zM5 6h1v4H5zM10 6h1v4h-1zM6 10h4v1H6zM11 4h1v1h-1z',
    threads:
      'M5 1h6v1H5zM3 2h2v1H3zM2 3h1v9H2zM3 12h2v1H3zM5 13h6v1H5zM11 11h2v2h-2zM12 3h1v2h-1zM11 2h1v1h-1zM6 5h4v1H6zM10 6h1v5h-1zM6 7h6v1H6zM5 8h1v2H5zM6 10h4v1H6zM12 8h1v3h-1z',
  };

  let showPigeonForm = $state(false);
  let isSending = $state(false);
  let statusMessage = $state<{ text: string; type: 'success' | 'error' } | null>(null);

  let formState: ContactFormData = $state({
    name: '',
    email: '',
    message: '',
  });

  async function handleSendLetter(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      statusMessage = {
        text: 'Mohon lengkapi semua kolom surat sebelum mengirim.',
        type: 'error',
      };
      return;
    }

    isSending = true;
    statusMessage = null;

    const res = await sendEmailWithResend(formState);
    isSending = false;

    if (res.ok) {
      statusMessage = { text: res.message, type: 'success' };
      formState = { name: '', email: '', message: '' };
    } else {
      statusMessage = { text: res.message, type: 'error' };
    }
  }
</script>

<span class="eyebrow">04 / PIGEON COOP / SAY HELLO</span>
<h2 id="panel-title">Send a little hello.</h2>
<p class="lead">
  Ada ide proyek, tawaran kolaborasi, atau sekadar ingin menyapa? Silakan kirim email ke Reizo atau kunjungi media sosial di bawah ini.
</p>

<!-- Top Email Direct Action Card -->
<div class="contact-card">
  <div class="contact-pigeon-wrapper">
    <img
      src="/assets/animals/pigeon-white.png"
      alt="A little white pigeon"
      class="contact-pigeon-img"
    />
  </div>
  <div class="contact-card-actions">
    <a class="contact-send" href={`mailto:${CONTACT_INFO.email}`} title="Klik untuk membuka aplikasi email">
      <svg
        class="contact-pixel-icon"
        viewBox="0 0 16 16"
        width="24"
        height="24"
        fill="currentColor"
        shape-rendering="crispEdges"
        aria-hidden="true"
        focusable="false"
      >
        <path d={ICONS.mail} />
      </svg>
      <span>
        Send an email
        <small>{CONTACT_INFO.email}</small>
      </span>
      <span aria-hidden="true">→</span>
    </a>
  </div>

  <!-- Resend Interactive Pigeon Form Toggle -->
  <button
    type="button"
    class="pigeon-form-toggle"
    onclick={() => (showPigeonForm = !showPigeonForm)}
    aria-expanded={showPigeonForm}
  >
    <svg
      class="contact-pixel-icon"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
      shape-rendering="crispEdges"
      aria-hidden="true"
    >
      <path d={ICONS.pigeon} />
    </svg>
    <span>{showPigeonForm ? 'Tutup Formulir Surat' : 'Kirim Surat Merpati (via Resend)'}</span>
  </button>

  {#if showPigeonForm}
    <div class="pigeon-letter-box transition-all duration-200">
      <form onsubmit={handleSendLetter} class="flex flex-col gap-1">
        <div class="pigeon-form-field">
          <label for="pigeon-name">Nama Pengirim:</label>
          <input
            id="pigeon-name"
            type="text"
            bind:value={formState.name}
            placeholder="Nama Anda atau institusi..."
            required
            disabled={isSending}
          />
        </div>

        <div class="pigeon-form-field">
          <label for="pigeon-email">Email Anda:</label>
          <input
            id="pigeon-email"
            type="email"
            bind:value={formState.email}
            placeholder="nama@email.com"
            required
            disabled={isSending}
          />
        </div>

        <div class="pigeon-form-field">
          <label for="pigeon-msg">Pesan / Surat:</label>
          <textarea
            id="pigeon-msg"
            rows="3"
            bind:value={formState.message}
            placeholder="Tuliskan pesan Anda di sini..."
            required
            disabled={isSending}
          ></textarea>
        </div>

        <div class="flex items-center justify-between gap-3 mt-1">
          <button
            type="submit"
            class="pigeon-submit-btn font-mono"
            disabled={isSending}
          >
            <svg
              class="contact-pixel-icon"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
              shape-rendering="crispEdges"
              aria-hidden="true"
            >
              <path d={ICONS.mail} />
            </svg>
            <span>{isSending ? 'Mengirim via Resend...' : 'Terbangkan Surat (Resend)'}</span>
          </button>
          <small class="text-xs text-amber-900 font-mono opacity-75">Powered by Resend API</small>
        </div>

        {#if statusMessage}
          <div class={`pigeon-status-msg ${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        {/if}
      </form>
    </div>
  {/if}

  <p class="contact-location">{CONTACT_INFO.location}</p>
</div>

<!-- Social Links Grid -->
<div class="contact-links" style="margin-top: 24px;">
  {#each CONTACT_INFO.socials as h}
    <a href={h.href} target="_blank" rel="noopener noreferrer">
      <svg
        class="contact-pixel-icon"
        viewBox="0 0 16 16"
        width="24"
        height="24"
        fill="currentColor"
        shape-rendering="crispEdges"
        aria-hidden="true"
        focusable="false"
      >
        <path d={ICONS[h.icon] || ICONS.mail} />
      </svg>
      <span>
        {h.name}
        <small>{h.description}</small>
      </span>
      <span aria-hidden="true">↗</span>
    </a>
  {/each}
</div>
