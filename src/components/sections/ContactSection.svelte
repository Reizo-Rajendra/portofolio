<script>
  import { CONTACT_INFO } from '../../lib/portfolioData.js';

  const ICONS = {
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

  let isCopied = $state(false);

  function copyEmail() {
    navigator.clipboard.writeText(CONTACT_INFO.email).then(() => {
      isCopied = true;
      setTimeout(() => (isCopied = false), 2500);
    });
  }
</script>

<span class="eyebrow">04 / PIGEON COOP / SAY HELLO</span>
<h2 id="panel-title">Send a little hello.</h2>
<p class="lead">
  Ada ide proyek, tawaran kolaborasi, atau sekadar ingin menyapa? Silakan kirim email ke Reizo atau kunjungi media sosial di bawah ini.
</p>

<!-- Top Email Direct Action Card -->
<div class="contact-card">
  <img src="/assets/animals/pigeon-white.png" alt="A little white pigeon" />
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
    <button
      type="button"
      class={`contact-copy-pill${isCopied ? ' copied' : ''}`}
      onclick={copyEmail}
      title="Salin alamat email ke clipboard"
    >
      <span>{isCopied ? '✓ Email Tersalin!' : '📋 Salin Alamat Email'}</span>
    </button>
  </div>
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
