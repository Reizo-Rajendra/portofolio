<script lang="ts">
  import { onMount } from 'svelte';
  import LoadingScreen from './components/LoadingScreen.svelte';
  import EntryScreen from './components/EntryScreen.svelte';
  import VillageWorld from './components/VillageWorld.svelte';
  import { isNightTime } from './lib/gameEngine.js';
  import { sound } from './lib/audioEffects.js';

  // App Phases: 'loading' | 'entry' | 'world'
  let phase = $state<'loading' | 'entry' | 'world'>('loading');

  // Time and Lighting State
  let now = $state(new Date());
  let mode = $state<'auto' | 'day' | 'night'>('auto');

  onMount(() => {
    try {
      const saved = localStorage.getItem('village-lighting');
      if (saved === 'day' || saved === 'night' || saved === 'auto') {
        mode = saved;
      }
    } catch (e) {
      // ignore
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      now = new Date();
      clearTimeout(timer);
      timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 10);
    };

    const handleVisibility = () => {
      if (!document.hidden) tick();
    };

    tick();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  });

  function changeMode(newMode: 'auto' | 'day' | 'night'): void {
    mode = newMode;
    try {
      localStorage.setItem('village-lighting', newMode);
    } catch (e) {
      // ignore
    }
  }

  let night = $derived(mode === 'auto' ? isNightTime(now) : mode === 'night');

  $effect(() => {
    document.documentElement.dataset.timeOfDay = night ? 'night' : 'day';
  });

  const villageTime = $derived({
    now,
    mode,
    night,
    changeMode,
    onChangeMode: changeMode,
  });
</script>

{#if phase === 'loading'}
  <LoadingScreen onReady={() => (phase = 'entry')} />
{:else if phase === 'entry'}
  <EntryScreen
    onEnter={() => {
      sound.initFromStorage();
      sound.setNightMode(villageTime.night);
      if (!sound.isMuted()) {
        sound.startBgm();
      }
      phase = 'world';
    }}
  />
{:else if phase === 'world'}
  <VillageWorld {villageTime} />
{/if}
