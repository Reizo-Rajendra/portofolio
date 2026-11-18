<script lang="ts">
  import { onMount } from 'svelte';
  import { sound } from '../lib/audioEffects.js';

  interface Props {
    night: boolean;
  }

  let { night }: Props = $props();

  let open = $state(false);
  let isMuted = $state(false);
  let isPlaying = $state(false);
  let currentTheme = $state('auto');
  let volume = $state(75);
  let trackInfo = $state(sound.getCurrentTrack());
  let containerEl = $state<HTMLElement | null>(null);
  let triggerEl = $state<HTMLButtonElement | null>(null);

  onMount(() => {
    sound.initFromStorage();
    isMuted = sound.isMuted();
    volume = Math.round(sound.getVolume() * 100);
    currentTheme = sound.getTheme();
    isPlaying = sound.isBgmPlaying();
    trackInfo = sound.getCurrentTrack();

    // Check periodically for track/playback state
    const interval = setInterval(() => {
      isPlaying = sound.isBgmPlaying();
      trackInfo = sound.getCurrentTrack();
    }, 1000);

    return () => clearInterval(interval);
  });

  $effect(() => {
    sound.setNightMode(night);
    trackInfo = sound.getCurrentTrack();
  });

  function toggleMute() {
    isMuted = sound.toggleMute();
    if (!isMuted) {
      sound.playBell();
      if (!sound.isBgmPlaying()) {
        sound.startBgm();
        isPlaying = true;
      }
    }
  }

  function togglePlayPause() {
    sound.playClick();
    isPlaying = sound.toggleBgm();
  }

  function changeTheme(newTheme) {
    sound.playClick();
    sound.setTheme(newTheme);
    currentTheme = newTheme;
    trackInfo = sound.getCurrentTrack();
    if (!sound.isBgmPlaying() && !isMuted) {
      sound.startBgm();
      isPlaying = true;
    }
  }

  function handleVolumeChange(e) {
    const val = parseInt(e.target.value, 10);
    volume = val;
    sound.setVolume(val / 100);
    if (isMuted && val > 0) {
      isMuted = sound.toggleMute();
    }
  }

  function handleClickOutside(e) {
    if (open && containerEl && !containerEl.contains(e.target)) {
      open = false;
    }
  }

  function handleBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      open = false;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      e.preventDefault();
      open = false;
      triggerEl?.focus();
    }
  }
</script>

<svelte:document onpointerdown={handleClickOutside} />
<svelte:window onkeydown={handleKeydown} />

<div
  bind:this={containerEl}
  class="sound-widget-container"
  role="region"
  aria-label="Sound and background music controls"
>
  <button
    bind:this={triggerEl}
    type="button"
    class={`sound-widget-trigger ${isPlaying && !isMuted ? 'playing' : ''} ${isMuted ? 'muted' : ''}`}
    aria-label={`Sound settings: ${isMuted ? 'Muted' : 'Playing ' + trackInfo.title}. Click to configure audio.`}
    aria-expanded={open}
    aria-controls="sound-options-menu"
    onclick={() => (open = !open)}
    title={isMuted ? 'Audio: Muted (Click for music menu)' : `Now playing: ${trackInfo.title}`}
  >
    <span class="sound-speaker-icon" aria-hidden="true">
      {isMuted ? '🔇' : '🔊'}
    </span>

    <div class="sound-wave-bars" aria-hidden="true">
      <span class="sound-bar bar-1"></span>
      <span class="sound-bar bar-2"></span>
      <span class="sound-bar bar-3"></span>
    </div>

    <span class="sound-label-text">
      {isMuted ? 'Muted' : trackInfo.id === 'night' ? 'Night BGM' : 'Day BGM'}
    </span>

    <span class="sound-caret" aria-hidden="true">▾</span>
  </button>

  {#if open}
    <div
      class="sound-options-menu"
      id="sound-options-menu"
      role="group"
      aria-label="Village sound & background music settings"
    >
      <div class="sound-menu-header">
        <span class="sound-menu-title">✦ VILLAGE MUSIC</span>
        <button
          type="button"
          class="sound-menu-close"
          aria-label="Tutup menu musik"
          onclick={() => (open = false)}
        >
          ✕
        </button>
      </div>

      <!-- Current Track Card -->
      <div class="sound-track-card">
        <div class="sound-track-info">
          <span class="sound-track-name">
            {trackInfo.id === 'night' ? '🌙' : '☀️'} {trackInfo.title}
          </span>
          <span class="sound-track-sub">{trackInfo.subtitle}</span>
        </div>
        <button
          type="button"
          class={`sound-btn-pill ${isPlaying && !isMuted ? 'active' : ''}`}
          onclick={togglePlayPause}
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying && !isMuted ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>

      <!-- Quick Actions (Mute / Unmute) -->
      <div class="sound-action-row">
        <button
          type="button"
          class={`sound-toggle-action ${isMuted ? 'is-muted' : ''}`}
          onclick={toggleMute}
        >
          <span aria-hidden="true">{isMuted ? '🔇 Sound: OFF' : '🔊 Sound: ON'}</span>
          <span class="sound-action-hint">{isMuted ? '(Muted)' : '(Aktif)'}</span>
        </button>
      </div>

      <!-- Volume Slider -->
      <div class="sound-volume-group">
        <div class="sound-volume-header">
          <span>VOLUME</span>
          <span>{volume}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={volume}
          class="sound-slider"
          oninput={handleVolumeChange}
          aria-label="Master volume slider"
        />
      </div>

      <!-- Theme Selector -->
      <div class="sound-themes-group">
        <span class="sound-section-label">SELECT BGM THEME</span>
        {#each [
          { id: 'auto', symbol: '◈', label: 'Auto (Day/Night cycle)' },
          { id: 'day', symbol: '☀️', label: 'Cozy Village (Day Theme)' },
          { id: 'night', symbol: '🌙', label: 'Starry Lullaby (Night Theme)' }
        ] as opt}
          <button
            type="button"
            class="sound-theme-btn"
            aria-pressed={currentTheme === opt.id}
            onclick={() => changeTheme(opt.id)}
          >
            <span aria-hidden="true">{opt.symbol}</span>
            <span>{opt.label}</span>
            <span class="sound-theme-selected" aria-hidden="true">
              {currentTheme === opt.id ? '◆' : ''}
            </span>
          </button>
        {/each}
      </div>

      <div class="sound-menu-footer">
        <span>Cozy 16-Bit Web Audio Engine</span>
      </div>
    </div>
  {/if}
</div>
