<script>
  import { onMount } from 'svelte';
  import ClockWidget from './ClockWidget.svelte';
  import SoundWidget from './SoundWidget.svelte';
  import HomeSection from './sections/HomeSection.svelte';
  import ProjectsSection from './sections/ProjectsSection.svelte';
  import SkillsSection from './sections/SkillsSection.svelte';
  import ContactSection from './sections/ContactSection.svelte';
  import { initGameEngine, BUILDING_COPY_DATA } from '../lib/gameEngine.js';
  import { sound } from '../lib/audioEffects.js';

  let { villageTime } = $props();

  let activeSection = $state(null);
  let buildingCopy = $derived(activeSection ? BUILDING_COPY_DATA[activeSection] || '' : '');

  onMount(() => {
    sound.initFromStorage();
    sound.setNightMode(villageTime.night);
    if (!sound.isMuted() && !sound.isBgmPlaying()) {
      sound.startBgm();
    }

    const cleanup = initGameEngine((sectionId) => {
      activeSection = sectionId;
      const panel = document.querySelector('#panel');
      if (panel && !panel.open) {
        sound.playChime();
        panel.showModal();
        document.querySelector('.panel-main')?.scrollTo(0, 0);
        document.querySelector('.panel-main')?.focus({ preventScroll: true });
      }
    });

    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  });

  function handleDialogBackdrop(e) {
    if (e.target && (e.target.id === 'panel' || e.target.id === 'menu')) {
      e.target.close();
    }
  }
</script>

<main id="world" aria-label="Interactive portfolio village">
  <canvas
    id="village"
    tabindex="0"
    aria-label="Village. Use arrow keys or WASD to walk, click anywhere to move, E to interact. Use the navigation buttons for direct access."
  ></canvas>

  <div class="vignette"></div>

  <header class="topbar">
    <a class="identity" href="#" aria-label="Return to the village">
      <span class="leaf">✦</span>
      <span>
        Reizo's <b>Village</b>
        <small>Full Stack Developer & Gaming Creator · Semarang, Indonesia</small>
      </span>
    </a>

    <div class="header-actions">
      <SoundWidget night={villageTime.night} />

      <ClockWidget
        now={villageTime.now}
        mode={villageTime.mode}
        night={villageTime.night}
        onChangeMode={villageTime.changeMode}
      />
    </div>
  </header>

  <div class="chapter exploring">
    <span>THE PORTFOLIO VILLAGE</span>
    <p>Work & experience.</p>
    <small>Explore my projects, skills, and background.</small>
  </div>

  <div class="welcome" id="welcome" hidden>
    <span>✦ WELCOME, TRAVELER</span>
    <p>Make yourself at home.</p>
    <small>Walk to a building, or choose a destination below.</small>
    <button id="begin" type="button">
      Let's explore <span>→</span>
    </button>
  </div>

  <div class="building-labels" id="labels"></div>

  <div class="interaction" id="interaction" hidden>
    <div class="interaction-prompt">
      <kbd>E</kbd>
      <span id="interaction-label"></span>
    </div>
  </div>

  <p id="cat-status" class="sr-only" role="status" aria-live="polite"></p>

  <div class="controls-hint">
    <span>
      <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> /
      <kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd> / click to move
    </span>
    <span><kbd>E</kbd> interact</span>
    <span><kbd>Esc</kbd> close</span>
  </div>

  <nav class="destinations" aria-label="Quick navigation">
    <span class="nav-intro">WHERE TO?</span>
    <button type="button" data-section="home">
      <img src="/assets/ui/icons/home.png" alt="" />
      <span>Home<small>About me</small></span>
      <i>01</i>
    </button>
    <button type="button" data-section="projects">
      <img src="/assets/ui/icons/projects.png" alt="" />
      <span>Gallery<small>Selected work</small></span>
      <i>02</i>
    </button>
    <button type="button" data-section="skills">
      <img src="/assets/ui/icons/workshop.png" alt="" />
      <span>Workshop<small>My toolkit</small></span>
      <i>03</i>
    </button>
    <button type="button" data-section="contact">
      <img src="/assets/ui/icons/contact.png" alt="" />
      <span>Pigeon Coop<small>Say hello</small></span>
      <i>04</i>
    </button>
  </nav>

  <div class="mobile-controls">
    <div
      class="joystick"
      id="joystick"
      role="group"
      aria-label="Movement joystick: drag in any direction to walk"
    >
      <span class="joystick-ring" aria-hidden="true"></span>
      <span class="joystick-knob" aria-hidden="true"><span></span></span>
      <span class="joystick-hint" aria-hidden="true">DRAG TO MOVE</span>
    </div>
    <button id="mobile-interact" type="button" aria-label="Interact" disabled>
      <svg
        width="27"
        height="27"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M8 13V7a1.5 1.5 0 0 1 3 0v5m0-4a1.5 1.5 0 0 1 3 0v4m0-2a1.5 1.5 0 0 1 3 0v3m0-1a1.5 1.5 0 0 1 3 0v4a6 6 0 0 1-6 6h-1c-2 0-3.4-.8-4.5-2.3L5 15.5a1.5 1.5 0 0 1 2.2-2L9 15"
        ></path>
        <path d="m4 2 .7 2.3L7 5l-2.3.7L4 8l-.7-2.3L1 5l2.3-.7Z"></path>
      </svg>
    </button>
  </div>

  <div id="loading" role="status">
    <img src="/assets/ui/icons/home.png" alt="" />
    <span>Opening the village gates…</span>
    <small>The village is coming to life.</small>
  </div>

  <!-- Building Panel Dialog -->
  <dialog
    id="panel"
    data-section={activeSection}
    aria-labelledby="panel-title"
    onclose={() => (activeSection = null)}
    onclick={handleDialogBackdrop}
  >
    <div class="panel-shell">
      <div class="panel-art">
        <img id="panel-building" alt="" />
        <span id="panel-location"></span>
        <div class="panel-art-copy">{buildingCopy}</div>
      </div>
      <div class="panel-main" tabindex="-1">
        <button id="close-panel" type="button" class="close-panel" aria-label="Close panel">
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
          <button id="return-village" type="button">Back to the village ↗</button>
        </footer>
      </div>
    </div>
  </dialog>

  <!-- Mobile / Navigation Menu Dialog -->
  <dialog
    id="menu"
    aria-labelledby="menu-title"
    onclick={handleDialogBackdrop}
  >
    <button class="close-panel" id="close-menu" type="button" aria-label="Close menu">
      ×
    </button>
    <span class="eyebrow">NAVIGATION</span>
    <h2 id="menu-title">Explore the portfolio.</h2>
    <p>Choose a section below.</p>
    <div class="menu-links">
      <button type="button" data-section="home">
        01 — About me <span>↗</span>
      </button>
      <button type="button" data-section="projects">
        02 — Selected work <span>↗</span>
      </button>
      <button type="button" data-section="skills">
        03 — My toolkit <span>↗</span>
      </button>
      <button type="button" data-section="contact">
        04 — Say hello <span>↗</span>
      </button>
    </div>
    <button id="reset-position" type="button">↻ Return to village square</button>
    <small>Keyboard: WASD / arrows to move · E to interact</small>
  </dialog>
</main>
