<script>
  import { PROJECTS } from '../../lib/portfolioData.js';

  const publishedProjects = PROJECTS.filter((p) => p.published !== false);

  let viewState = $state({ type: 'list', projectId: null, index: 0 });

  function openDetail(id) {
    viewState = { type: 'detail', projectId: id, index: 0 };
    document.querySelector('.panel-main')?.scrollTo(0, 0);
  }

  function openImage(id, idx) {
    viewState = { type: 'image', projectId: id, index: idx };
    document.querySelector('.panel-main')?.scrollTo(0, 0);
  }

  function backToDetail(id) {
    viewState = { type: 'detail', projectId: id, index: 0 };
    document.querySelector('.panel-main')?.scrollTo(0, 0);
  }

  function backToList() {
    viewState = { type: 'list', projectId: null, index: 0 };
    document.querySelector('.panel-main')?.scrollTo(0, 0);
  }

  let project = $derived(
    viewState.projectId
      ? PROJECTS.find((p) => p.id === viewState.projectId)
      : null
  );

  let captures = $derived(
    project ? (project.images?.length ? project.images : [project.cover].filter(Boolean)) : []
  );
</script>

<div class="project-showcase">
  {#if viewState.type === 'list' || !project}
    <div class="showcase-heading">
      <div>
        <span class="eyebrow">02 / GALLERY</span>
        <h2 id="panel-title">Selected projects.</h2>
      </div>
    </div>
    <p class="showcase-intro">A few things I've built. Take a look around.</p>

    <div class="project-list">
      {#each publishedProjects as p (p.id)}
        <article class="work-card" aria-labelledby={`project-title-${p.id}`}>
          <button
            type="button"
            class={`work-card-cover${p.cover ? '' : ' work-card-placeholder'}`}
            onclick={() => openDetail(p.id)}
            aria-label={`View ${p.name} project`}
          >
            {#if p.cover}
              <img
                src={p.cover}
                alt={`${p.name} project preview`}
                decoding="async"
                loading="lazy"
              />
            {:else}
              <img src="/assets/ui/icons/projects.png" alt="" width="36" height="36" />
            {/if}
          </button>
          <div class="work-card-body">
            {#if p.category}
              <span class="small-label">{p.category}</span>
            {/if}
            <h3 id={`project-title-${p.id}`}>{p.name}</h3>
            <p>{p.description}</p>

            {#if p.stack?.length}
              <div class="showcase-tags">
                {#each p.stack as s}
                  <span>{s}</span>
                {/each}
              </div>
            {/if}

            <div class="showcase-actions">
              <button
                type="button"
                class="showcase-primary"
                onclick={() => openDetail(p.id)}
              >
                View Project <span aria-hidden="true">→</span>
              </button>
              {#each p.links || [] as link}
                <a
                  class="showcase-visit"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>

    <p class="projects-coming-soon">More projects coming soon...</p>
  {:else if viewState.type === 'image'}
    <button
      type="button"
      class="showcase-back"
      onclick={() => backToDetail(project.id)}
    >
      <span aria-hidden="true">←</span> Back to {project.name}
    </button>
    <h2 id="panel-title" class="showcase-focus-heading">{project.name}</h2>
    <div class="capture-full">
      <img
        src={captures[viewState.index] || project.cover}
        alt={`${project.name} screenshot ${viewState.index + 1}`}
      />
    </div>
    <button
      type="button"
      class="showcase-back capture-bottom-back"
      onclick={() => backToDetail(project.id)}
    >
      <span aria-hidden="true">←</span> Back to {project.name}
    </button>
  {:else}
    <button type="button" class="showcase-back" onclick={backToList}>
      <span aria-hidden="true">←</span> All projects
    </button>

    <div class="project-detail-heading">
      <div>
        {#if project.category}
          <span class="eyebrow">{project.category}</span>
        {/if}
        <h2 id="panel-title" class="showcase-focus-heading">{project.name}</h2>
        {#if project.tagline}
          <p>{project.tagline}</p>
        {/if}
      </div>
      <div class="detail-project-links">
        {#each project.links || [] as link}
          <a
            class="showcase-visit"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        {/each}
      </div>
    </div>

    <p class="project-detail-intro">{project.description}</p>

    {#if captures.length > 0}
      <p class="capture-hint">
        <span class="capture-hint-click">Click any screenshot to enlarge</span>
        <span class="capture-hint-tap">Tap any screenshot to enlarge</span>
        <span aria-hidden="true"> ↗</span>
      </p>

      <div class="project-captures" aria-label={`${project.name} screenshots`}>
        {#each captures as imgUrl, j}
          <button
            type="button"
            class="capture-choice"
            onclick={() => openImage(project.id, j)}
            aria-label={`Enlarge ${project.name} screenshot ${j + 1}`}
          >
            <span class="retro-device retro-phone">
              <span class="retro-device-top" aria-hidden="true"><span></span></span>
              <span class="retro-device-screen">
                <img
                  src={imgUrl}
                  alt={`${project.name} screenshot ${j + 1}`}
                  decoding="async"
                />
              </span>
              <span class="retro-device-bottom" aria-hidden="true">
                <span class="retro-phone-controls">
                  <i></i><i></i><i></i>
                </span>
                <span class="retro-keypad">
                  {#each Array(12) as _}
                    <i></i>
                  {/each}
                </span>
              </span>
            </span>
          </button>
        {/each}
      </div>
    {/if}

    {#if project.highlights?.length || project.stack?.length}
      <div class="project-notes">
        {#if project.highlights?.length}
          <section>
            <h3>Inside the project</h3>
            <ul>
              {#each project.highlights as hl}
                <li>
                  <strong>{hl.title}</strong>
                  <span>{hl.description}</span>
                </li>
              {/each}
            </ul>
          </section>
        {/if}

        {#if project.stack?.length}
          <section>
            <h3>Built with</h3>
            <div class="showcase-tags">
              {#each project.stack as s}
                <span>{s}</span>
              {/each}
            </div>
          </section>
        {/if}
      </div>
    {/if}
  {/if}
</div>
