<script lang="ts">
  import { ABOUT_ME, EXPERIENCES } from '../../lib/portfolioData.js';
  import type { Experience } from '../../lib/types.js';

  // Sort order: 'newest' (2026 -> 2022, default) or 'chronological' (2022 -> 2026)
  let sortOrder = $state<'newest' | 'chronological'>('newest');

  let displayedExperiences: Experience[] = $derived(
    sortOrder === 'newest' ? [...EXPERIENCES] : [...EXPERIENCES].reverse()
  );

  function toggleSort(): void {
    sortOrder = sortOrder === 'newest' ? 'chronological' : 'newest';
  }
</script>

<div class="about-hero">
  <div class="about-hero-text">
    <span class="eyebrow">{ABOUT_ME.eyebrow}</span>
    <h2 id="panel-title">
      {ABOUT_ME.title}<br />
      {ABOUT_ME.titleSub}
    </h2>
    <p class="lead">{ABOUT_ME.lead}</p>
  </div>

  <div class="about-hero-photo">
    <div class="developer-photo-card">
      <img
        src="/assets/profile/reizo-avatar.webp"
        alt="Reizo Rajendra"
        class="developer-photo-img"
        width="135"
        height="135"
        loading="eager"
      />
      <div class="developer-photo-caption">
        <span class="status-pulse-dot" aria-hidden="true"></span>
        <span>Reizo Rajendra</span>
      </div>
    </div>
  </div>
</div>

<div class="about-note">
  <span aria-hidden="true">✦</span>
  <p>{ABOUT_ME.note}</p>
</div>

<div class="tag-list" role="list">
  {#each ABOUT_ME.coreStack as tag}
    <span class="tag" role="listitem">{tag}</span>
  {/each}
</div>

<hr class="section-divider" />

<div class="journey-header-row">
  <h3 class="content-heading" style="margin: 0;">Experience & Journey</h3>
  <button
    type="button"
    class="journey-sort-btn"
    onclick={toggleSort}
    title="Klik untuk membalik urutan tahun"
  >
    {#if sortOrder === 'newest'}
      <span>▾ Terbaru ke Lama (2026 → 2022)</span>
    {:else}
      <span>▴ Kronologis (2022 → 2026)</span>
    {/if}
  </button>
</div>

<div class="experience-list">
  {#each displayedExperiences as exp (exp.id)}
    <article class="experience-item">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
        <span class="experience-period">{exp.period}</span>
        {#if exp.id === 'snapandev-lead'}
          <span style="font-size: 10px; font-weight: 700; letter-spacing: 0.8px; color: #354e38; background: #d7e8d2; padding: 2px 7px; border-radius: 3px; border: 1px solid #9bbd94;">
            ✦ ACTIVE LEAD
          </span>
        {/if}
      </div>
      <h4>{exp.role}</h4>
      <p class="experience-company">{exp.company}</p>
      <p>{exp.summary}</p>

      {#if exp.placement || exp.highlights?.length || exp.stack?.length}
        <details class="experience-details" open={exp.id === 'snapandev-lead'}>
          <summary>Details & highlights</summary>
          {#if exp.placement}
            <p class="placement">{exp.placement}</p>
          {/if}
          {#if exp.highlights?.length}
            <ul>
              {#each exp.highlights as hl}
                <li>{hl}</li>
              {/each}
            </ul>
          {/if}
          {#if exp.stack?.length}
            <div class="tag-list" role="list">
              {#each exp.stack as s}
                <span class="tag" role="listitem">{s}</span>
              {/each}
            </div>
          {/if}
        </details>
      {/if}
    </article>
  {/each}
</div>

<hr class="section-divider" />

<h3 class="content-heading">Education & Academic Background</h3>
<div class="education-list">
  {#each ABOUT_ME.education as edu}
    <div class="education-note" style="margin-bottom: 20px;">
      <span class="small-label">{edu.year}</span>
      <h4>{edu.degree}</h4>
      <p>
        <strong>{edu.institution}</strong><br />
        <span style="color: #637042; font-weight: 500;">{edu.status}</span>
      </p>
      <p>{edu.details}</p>
    </div>
  {/each}
</div>
