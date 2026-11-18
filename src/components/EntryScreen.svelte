<script lang="ts">
  interface Props {
    onEnter: () => void;
  }

  let { onEnter }: Props = $props();

  let logoError = $state(false);
  let buttonError = $state(false);

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.repeat && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      onEnter();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<main class="entry-screen" aria-labelledby="entry-title">
  <div class="entry-shade" aria-hidden="true"></div>
  <div class="entry-content">
    <p class="entry-eyebrow">Welcome to</p>
    <h1 id="entry-title" class="entry-title">
      {#if logoError}
        <span>Rizki's Village</span>
      {:else}
        <img
          src="/assets/entry-screen/title-logo.png"
          alt="Rizki's Village"
          width="1774"
          height="887"
          fetchpriority="high"
          onerror={() => (logoError = true)}
        />
      {/if}
    </h1>
    <p class="entry-subtitle">
      <span>Explore my work.</span> <span>Get to know me.</span>
    </p>
    <div class="entry-action">
      <button
        type="button"
        class={`entry-button${buttonError ? ' entry-button-fallback' : ''}`}
        onclick={onEnter}
      >
        {#if !buttonError}
          <img
            src="/assets/entry-screen/enter-button.png"
            alt=""
            aria-hidden="true"
            width="2172"
            height="724"
            onerror={() => (buttonError = true)}
          />
        {/if}
        <span>Enter the Village</span>
      </button>
    </div>
  </div>
  <footer class="entry-footer">
    © {new Date().getFullYear()} Reizo Rajendra
  </footer>
</main>
