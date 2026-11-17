<script>
  import { SKILL_CATEGORIES } from '../../lib/portfolioData.js';
</script>

<span class="eyebrow">03 / WORKSHOP / MY TOOLKIT</span>
<h2 id="panel-title">Skills & tools.</h2>
<p class="lead">
  Technologies and tools I use across frontend development, backend integration, cloud services, and game content.
</p>

{#each SKILL_CATEGORIES as cat (cat.title)}
  <div class="skill-row">
    <span aria-hidden="true">{cat.icon}</span>
    <div>
      <h3>{cat.title}</h3>
      <div class="tag-list" role="list">
        {#each cat.items as item}
          <span class="tag" role="listitem">{item}</span>
        {/each}
      </div>
    </div>
  </div>
{/each}
