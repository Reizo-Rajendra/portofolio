<script>
  import { formatTime, formatDate } from '../lib/gameEngine.js';

  let { now, mode, night, onChangeMode } = $props();

  let open = $state(false);
  let containerEl = $state(null);
  let buttonEl = $state(null);

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
    e.stopPropagation();
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      open = false;
      buttonEl?.focus();
    }
  }
</script>

<svelte:document onpointerdown={handleClickOutside} />

<div
  bind:this={containerEl}
  class="clock-controls"
  onblur={handleBlur}
  onkeydown={handleKeydown}
  onkeyup={(e) => e.stopPropagation()}
  role="region"
  aria-label="Clock and lighting"
>
  <div class="village-clock">
    <button
      bind:this={buttonEl}
      type="button"
      class={`clock-icon lighting-trigger ${night ? 'clock-moon' : 'clock-sun'}`}
      aria-label={`Village lighting: ${mode}. Change lighting`}
      aria-expanded={open}
      aria-controls="lighting-options"
      onclick={() => (open = !open)}
    >
      <img
        src={`/assets/ui/clock/${night ? 'moon' : 'sun'}.png`}
        alt=""
        width="32"
        height="32"
      />
      <span class="lighting-caret" aria-hidden="true">▾</span>
    </button>

    <section
      class="clock-text"
      role="timer"
      aria-live="off"
      aria-label={`Local time: ${formatTime(now)}, ${formatDate(now)}`}
      title="Your local time"
    >
      <span class="clock-date">{formatDate(now)}</span>
      <time datetime={now.toISOString()}>{formatTime(now)}</time>
    </section>
  </div>

  {#if open}
    <div
      class="lighting-options"
      id="lighting-options"
      role="group"
      aria-label="Village lighting"
    >
      <span class="lighting-title">VILLAGE LIGHT</span>
      {#each [
        { id: 'auto', symbol: '◈', label: 'Auto' },
        { id: 'day', symbol: '☀', label: 'Day' },
        { id: 'night', symbol: '☾', label: 'Night' }
      ] as opt}
        <button
          type="button"
          aria-pressed={mode === opt.id}
          onclick={() => {
            onChangeMode(opt.id);
            open = false;
            buttonEl?.focus();
          }}
        >
          <span aria-hidden="true">{opt.symbol}</span>
          <span>{opt.label}</span>
          <span class="lighting-selected" aria-hidden="true">
            {mode === opt.id ? '◆' : ''}
          </span>
        </button>
      {/each}
    </div>
  {/if}
</div>
