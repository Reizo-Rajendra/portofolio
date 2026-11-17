<script>
  import HomeSection from './sections/HomeSection.svelte';
  import ProjectsSection from './sections/ProjectsSection.svelte';
  import SkillsSection from './sections/SkillsSection.svelte';
  import ContactSection from './sections/ContactSection.svelte';
  import { BUILDINGS, BUILDING_COPY } from '../lib/portfolioData.js';

  let { activeSection = $bindable(null), onClose } = $props();

  let building = $derived(BUILDINGS.find((b) => b.id === activeSection));
  let copy = $derived(activeSection ? BUILDING_COPY[activeSection] : '');

  function handleClose() {
    activeSection = null;
    if (onClose) onClose();
  }
</script>

<dialog id="panel" data-section={activeSection} aria-labelledby="panel-title">
  <div class="panel-shell">
    <div class="panel-art">
      <img
        id="panel-building"
        src={building ? `/assets/buildings/${building.asset}.png` : ''}
        alt={building ? `${building.name} pixel-art exterior` : ''}
      />
      <span id="panel-location">{building ? building.name : ''}</span>
      <div class="panel-art-copy">{copy}</div>
    </div>
    <div class="panel-main" tabindex="-1">
      <button
        id="close-panel"
        type="button"
        class="close-panel"
        aria-label="Close panel"
        onclick={handleClose}
      >
        ×
      </button>

      <div id="panel-content">
        {#if activeSection === 'home'}
          <HomeSection />
        {:else if activeSection === 'projects'}
          <ProjectsSection />
        {:else if activeSection === 'skills'}
          <SkillsSection />
        {:else if activeSection === 'contact'}
          <ContactSection />
        {/if}
      </div>

      <footer class="panel-footer">
        <span>REIZO'S VILLAGE</span>
        <button id="return-village" type="button" onclick={handleClose}>
          Back to the village ↗
        </button>
      </footer>
    </div>
  </div>
</dialog>
