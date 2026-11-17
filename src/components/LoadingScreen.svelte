<script>
  import { ASSET_LIST, loadAsset } from '../lib/gameEngine.js';

  let { onReady } = $props();

  let loaded = $state(0);
  let failed = $state(false);
  let retryCount = $state(0);

  $effect(() => {
    const _retry = retryCount;
    let cancelled = false;
    loaded = 0;
    failed = false;
    let count = 0;

    Promise.allSettled(
      ASSET_LIST.map(async (asset) => {
        await loadAsset(asset);
        if (!cancelled) {
          loaded = ++count;
        }
      })
    ).then((results) => {
      if (!cancelled) {
        if (results.some((r) => r.status === 'rejected')) {
          failed = true;
        } else {
          onReady();
        }
      }
    });

    return () => {
      cancelled = true;
    };
  });

  let progress = $derived(Math.floor((loaded / (ASSET_LIST.length || 1)) * 100));
</script>

<main class="game-loading">
  <div class="loading-simple">
    <p class="loading-text" role="status">
      {failed ? 'Could not load assets.' : 'Loading...'}
    </p>
    <div
      class="loading-track"
      role="progressbar"
      aria-label="Loading assets"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={progress}
    >
      <div style="width: {progress}%;"></div>
    </div>
    {#if failed}
      <button class="loading-retry" onclick={() => retryCount++}>
        Try again
      </button>
    {/if}
  </div>
</main>
