// Retro 16-bit Cozy RPG Synthesizer & Soundtrack Engine using Web Audio API
// 100% self-contained, zero external audio files needed.
// Inspired by classic cozy RPG village themes (Stardew Valley, Pokémon Town, Chrono Trigger).

let audioCtx = null;
let isMuted = false;
let masterVolume = 0.75;
let musicEnabled = true;
let isNight = false;
let userTheme = 'auto'; // 'auto' | 'day' | 'night'
let isPlayingBgm = false;

// Audio routing nodes
let masterGain = null;
let musicGain = null;
let sfxGain = null;
let delayNode = null;
let delayFeedback = null;
let delayFilter = null;

// Scheduler state
let timerID = null;
let nextBarTime = 0;
let currentBar = 0;
const LOOKAHEAD_MS = 80;
const SCHEDULE_AHEAD_TIME = 0.25; // seconds

// Note Frequencies in Hz
const NOTE = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, Csharp4: 277.18, D4: 293.66, Eflat4: 311.13, E4: 329.63, F4: 349.23,
  Fsharp4: 369.99, G4: 392.00, Aflat4: 415.30, A4: 440.00, Bflat4: 466.16, B4: 493.88,
  C5: 523.25, D5: 587.33, Eflat5: 622.25, E5: 659.25, F5: 698.46, Fsharp5: 739.99,
  G5: 783.99, A5: 880.00, Bflat5: 932.33, B5: 987.77,
  C6: 1046.50, D6: 1174.66, E6: 1318.51, F6: 1396.91, G6: 1567.98, A6: 1760.00, B6: 1975.53
};

// 16-Bar Day Theme: "Cozy Village Morning" (94 BPM)
// Warm Japanese RPG town progression with marimba/kalimba lead & lush vintage EPiano pad
const DAY_TEMPO = 94; // BPM
const DAY_BARS = [
  // 1: Fmaj7
  {
    bass: NOTE.F2,
    pad: [NOTE.F3, NOTE.C4, NOTE.E4, NOTE.A4],
    lead: [
      { beat: 0, note: NOTE.C5, dur: 0.8 },
      { beat: 1, note: NOTE.E5, dur: 0.8 },
      { beat: 2, note: NOTE.G5, dur: 0.8 },
      { beat: 3, note: NOTE.A5, dur: 0.9 }
    ]
  },
  // 2: G7
  {
    bass: NOTE.G2,
    pad: [NOTE.G3, NOTE.B3, NOTE.D4, NOTE.F4],
    lead: [
      { beat: 0, note: NOTE.B5, dur: 1.2 },
      { beat: 1.5, note: NOTE.G5, dur: 0.8 },
      { beat: 2.5, note: NOTE.D5, dur: 1.2 }
    ]
  },
  // 3: Em7
  {
    bass: NOTE.E2,
    pad: [NOTE.E3, NOTE.B3, NOTE.D4, NOTE.G4],
    lead: [
      { beat: 0, note: NOTE.G5, dur: 0.8 },
      { beat: 1, note: NOTE.E5, dur: 0.8 },
      { beat: 2, note: NOTE.D5, dur: 0.8 },
      { beat: 3, note: NOTE.E5, dur: 0.9 }
    ]
  },
  // 4: Am7
  {
    bass: NOTE.A2,
    pad: [NOTE.A3, NOTE.C4, NOTE.E4, NOTE.G4],
    lead: [
      { beat: 0, note: NOTE.C5, dur: 1.2 },
      { beat: 1.5, note: NOTE.D5, dur: 0.4 },
      { beat: 2, note: NOTE.E5, dur: 0.8 },
      { beat: 3, note: NOTE.G5, dur: 0.9 }
    ]
  },
  // 5: Dm7
  {
    bass: NOTE.D2,
    pad: [NOTE.D3, NOTE.A3, NOTE.C4, NOTE.F4],
    lead: [
      { beat: 0, note: NOTE.F5, dur: 0.8 },
      { beat: 1, note: NOTE.A5, dur: 0.8 },
      { beat: 2, note: NOTE.C6, dur: 0.8 },
      { beat: 3, note: NOTE.A5, dur: 0.9 }
    ]
  },
  // 6: G7
  {
    bass: NOTE.G2,
    pad: [NOTE.G3, NOTE.B3, NOTE.D4, NOTE.F4],
    lead: [
      { beat: 0, note: NOTE.B5, dur: 1.2 },
      { beat: 1.5, note: NOTE.C6, dur: 0.8 },
      { beat: 2.5, note: NOTE.D6, dur: 1.2 }
    ]
  },
  // 7: Cmaj7
  {
    bass: NOTE.C2,
    pad: [NOTE.C3, NOTE.G3, NOTE.B3, NOTE.E4],
    lead: [
      { beat: 0, note: NOTE.C6, dur: 0.9 },
      { beat: 1, note: NOTE.G5, dur: 0.9 },
      { beat: 2, note: NOTE.E5, dur: 0.9 },
      { beat: 3, note: NOTE.D5, dur: 0.9 }
    ]
  },
  // 8: C7 (turnaround)
  {
    bass: NOTE.C2,
    pad: [NOTE.C3, NOTE.G3, NOTE.Bflat3 || 233.08, NOTE.E4],
    lead: [
      { beat: 0, note: NOTE.C5, dur: 1.5 },
      { beat: 2, note: NOTE.E5, dur: 0.8 },
      { beat: 3, note: NOTE.G5, dur: 0.9 }
    ]
  },
  // 9: Fmaj7 (Part B - uplifting variation)
  {
    bass: NOTE.F2,
    pad: [NOTE.F3, NOTE.C4, NOTE.E4, NOTE.A4],
    lead: [
      { beat: 0, note: NOTE.A5, dur: 0.8 },
      { beat: 1, note: NOTE.C6, dur: 0.8 },
      { beat: 2, note: NOTE.E6, dur: 0.8 },
      { beat: 3, note: NOTE.D6, dur: 0.9 }
    ]
  },
  // 10: G7
  {
    bass: NOTE.G2,
    pad: [NOTE.G3, NOTE.B3, NOTE.D4, NOTE.F4],
    lead: [
      { beat: 0, note: NOTE.B5, dur: 1.2 },
      { beat: 1.5, note: NOTE.G5, dur: 0.8 },
      { beat: 2.5, note: NOTE.E5, dur: 1.2 }
    ]
  },
  // 11: Em7
  {
    bass: NOTE.E2,
    pad: [NOTE.E3, NOTE.B3, NOTE.D4, NOTE.G4],
    lead: [
      { beat: 0, note: NOTE.G5, dur: 0.8 },
      { beat: 1, note: NOTE.B5, dur: 0.8 },
      { beat: 2, note: NOTE.D6, dur: 0.8 },
      { beat: 3, note: NOTE.C6, dur: 0.9 }
    ]
  },
  // 12: A7
  {
    bass: NOTE.A2,
    pad: [NOTE.A3, NOTE.Csharp4, NOTE.E4, NOTE.G4],
    lead: [
      { beat: 0, note: NOTE.A5, dur: 1.2 },
      { beat: 1.5, note: NOTE.E5, dur: 0.8 },
      { beat: 2.5, note: NOTE.G5, dur: 1.2 }
    ]
  },
  // 13: Dm7
  {
    bass: NOTE.D2,
    pad: [NOTE.D3, NOTE.A3, NOTE.C4, NOTE.F4],
    lead: [
      { beat: 0, note: NOTE.F5, dur: 0.8 },
      { beat: 1, note: NOTE.G5, dur: 0.8 },
      { beat: 2, note: NOTE.A5, dur: 0.8 },
      { beat: 3, note: NOTE.C6, dur: 0.9 }
    ]
  },
  // 14: G7
  {
    bass: NOTE.G2,
    pad: [NOTE.G3, NOTE.B3, NOTE.D4, NOTE.F4],
    lead: [
      { beat: 0, note: NOTE.B5, dur: 1.2 },
      { beat: 1.5, note: NOTE.A5, dur: 0.8 },
      { beat: 2.5, note: NOTE.B5, dur: 1.2 }
    ]
  },
  // 15: Cmaj7
  {
    bass: NOTE.C2,
    pad: [NOTE.C3, NOTE.G3, NOTE.B3, NOTE.E4],
    lead: [
      { beat: 0, note: NOTE.C6, dur: 1.5 },
      { beat: 2, note: NOTE.G5, dur: 0.9 },
      { beat: 3, note: NOTE.E5, dur: 0.9 }
    ]
  },
  // 16: Cmaj7 (Loop wrap)
  {
    bass: NOTE.C2,
    pad: [NOTE.C3, NOTE.G3, NOTE.C4, NOTE.E4],
    lead: [
      { beat: 0, note: NOTE.C5, dur: 1.5 },
      { beat: 2, note: NOTE.E5, dur: 0.8 },
      { beat: 3, note: NOTE.G5, dur: 0.9 }
    ]
  }
];

// 8-Bar Night Theme: "Starry Night Lullaby" (68 BPM)
// Peaceful, celestial music box notes over warm filtered twilight pads
const NIGHT_TEMPO = 68; // BPM
const NIGHT_BARS = [
  // 1: Cmaj9
  {
    bass: NOTE.C2,
    pad: [NOTE.C3, NOTE.G3, NOTE.B3, NOTE.D4, NOTE.E4],
    lead: [
      { beat: 0, note: NOTE.E6, dur: 1.4 },
      { beat: 2, note: NOTE.G6, dur: 1.0 },
      { beat: 3, note: NOTE.D6, dur: 0.9 }
    ]
  },
  // 2: Am9
  {
    bass: NOTE.A2,
    pad: [NOTE.A2, NOTE.E3, NOTE.G3, NOTE.B3, NOTE.C4],
    lead: [
      { beat: 0, note: NOTE.C6, dur: 1.4 },
      { beat: 2, note: NOTE.B5, dur: 0.8 },
      { beat: 3, note: NOTE.A5, dur: 0.9 }
    ]
  },
  // 3: Fmaj7#11
  {
    bass: NOTE.F2,
    pad: [NOTE.F2, NOTE.C3, NOTE.E3, NOTE.B3, NOTE.A3],
    lead: [
      { beat: 0, note: NOTE.E6, dur: 1.0 },
      { beat: 1.5, note: NOTE.D6, dur: 0.8 },
      { beat: 2.5, note: NOTE.C6, dur: 0.8 },
      { beat: 3.5, note: NOTE.B5, dur: 0.6 }
    ]
  },
  // 4: G6/9
  {
    bass: NOTE.G2,
    pad: [NOTE.G2, NOTE.D3, NOTE.A3, NOTE.B3, NOTE.E4],
    lead: [
      { beat: 0, note: NOTE.A5, dur: 1.8 },
      { beat: 2.5, note: NOTE.G5, dur: 1.4 }
    ]
  },
  // 5: Em7
  {
    bass: NOTE.E2,
    pad: [NOTE.E2, NOTE.B2, NOTE.D3, NOTE.G3],
    lead: [
      { beat: 0, note: NOTE.B5, dur: 1.2 },
      { beat: 1.5, note: NOTE.D6, dur: 1.0 },
      { beat: 3, note: NOTE.E6, dur: 1.0 }
    ]
  },
  // 6: Am7
  {
    bass: NOTE.A2,
    pad: [NOTE.A2, NOTE.E3, NOTE.G3, NOTE.C4],
    lead: [
      { beat: 0, note: NOTE.G6, dur: 1.2 },
      { beat: 1.5, note: NOTE.E6, dur: 1.0 },
      { beat: 3, note: NOTE.C6, dur: 1.0 }
    ]
  },
  // 7: Dm9
  {
    bass: NOTE.D2,
    pad: [NOTE.D2, NOTE.A2, NOTE.C3, NOTE.E3, NOTE.F3],
    lead: [
      { beat: 0, note: NOTE.F6, dur: 1.0 },
      { beat: 1.5, note: NOTE.E6, dur: 0.8 },
      { beat: 2.5, note: NOTE.D6, dur: 0.8 },
      { beat: 3.5, note: NOTE.C6, dur: 0.6 }
    ]
  },
  // 8: G13sus
  {
    bass: NOTE.G2,
    pad: [NOTE.G2, NOTE.F3, NOTE.A3, NOTE.C4, NOTE.E4],
    lead: [
      { beat: 0, note: NOTE.D6, dur: 1.4 },
      { beat: 2, note: NOTE.B5, dur: 0.9 },
      { beat: 3, note: NOTE.C6, dur: 1.1 }
    ]
  }
];

function initAudioGraph() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();

    // Master bus
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(isMuted ? 0 : masterVolume, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // Music bus
    musicGain = audioCtx.createGain();
    musicGain.gain.setValueAtTime(0.42, audioCtx.currentTime);
    musicGain.connect(masterGain);

    // SFX bus
    sfxGain = audioCtx.createGain();
    sfxGain.gain.setValueAtTime(0.35, audioCtx.currentTime);
    sfxGain.connect(masterGain);

    // Delay / Space Bus for rich spatial reverb
    try {
      delayNode = audioCtx.createDelay(1.0);
      delayNode.delayTime.setValueAtTime(0.28, audioCtx.currentTime);

      delayFeedback = audioCtx.createGain();
      delayFeedback.gain.setValueAtTime(0.25, audioCtx.currentTime);

      delayFilter = audioCtx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(2000, audioCtx.currentTime);

      delayNode.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(delayNode);
      delayFilter.connect(masterGain);
    } catch (e) {
      delayNode = null;
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function getEffectiveTheme() {
  if (userTheme === 'day') return 'day';
  if (userTheme === 'night') return 'night';
  return isNight ? 'night' : 'day';
}

// Play a single kalimba / marimba / music-box note
function playTone(freq, time, duration, isNightTheme = false) {
  if (!audioCtx || !musicGain) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Night theme uses crystalline sine chime (music box); day uses warm kalimba
    osc.type = isNightTheme ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isNightTheme ? 3200 : 2200, time);

    const peakGain = isNightTheme ? 0.09 : 0.11;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(peakGain, time + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(musicGain);

    // Subtle spatial delay send
    if (delayNode) {
      const sendGain = audioCtx.createGain();
      sendGain.gain.setValueAtTime(isNightTheme ? 0.35 : 0.22, time);
      gain.connect(sendGain);
      sendGain.connect(delayNode);
    }

    osc.start(time);
    osc.stop(time + duration + 0.05);
  } catch (e) {}
}

// Play a soft warm pad chord
function playChord(notes, time, duration, isNightTheme = false) {
  if (!audioCtx || !musicGain) return;

  notes.forEach((freq) => {
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isNightTheme ? 580 : 920, time);

      const peak = isNightTheme ? 0.024 : 0.032;
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(peak, time + 0.22);
      gain.gain.setValueAtTime(peak * 0.75, time + duration - 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(musicGain);

      osc.start(time);
      osc.stop(time + duration + 0.05);
    } catch (e) {}
  });
}

// Play a warm acoustic / electric bass note
function playBass(freq, time, duration) {
  if (!audioCtx || !musicGain) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.12, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(musicGain);

    osc.start(time);
    osc.stop(time + duration + 0.05);
  } catch (e) {}
}

// Subtle pleasant bird chirp in the day / cricket in the night
function playNatureAmbience(time, isNightTheme) {
  if (!audioCtx || !musicGain) return;

  if (isNightTheme) {
    // Soft distant cricket sound
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(4200, time);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.015, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);

      osc.connect(gain);
      gain.connect(musicGain);
      osc.start(time);
      osc.stop(time + 0.15);
    } catch (e) {}
  } else {
    // Soft sweet bird chirp
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2900, time);
      osc.frequency.exponentialRampToValueAtTime(3900, time + 0.06);
      osc.frequency.exponentialRampToValueAtTime(3200, time + 0.14);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.03, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

      osc.connect(gain);
      gain.connect(musicGain);
      osc.start(time);
      osc.stop(time + 0.2);
    } catch (e) {}
  }
}

// Music Scheduler Loop
function scheduleNextBar() {
  if (!isPlayingBgm || !audioCtx || isMuted) return;

  const currentTheme = getEffectiveTheme();
  const isNightTheme = currentTheme === 'night';
  const tempo = isNightTheme ? NIGHT_TEMPO : DAY_TEMPO;
  const beatSec = 60 / tempo;
  const barSec = beatSec * 4;
  const bars = isNightTheme ? NIGHT_BARS : DAY_BARS;

  while (nextBarTime < audioCtx.currentTime + SCHEDULE_AHEAD_TIME) {
    const barData = bars[currentBar % bars.length];
    const startTime = Math.max(nextBarTime, audioCtx.currentTime + 0.02);

    // 1. Bassline (beat 0 and beat 2)
    playBass(barData.bass, startTime, beatSec * 1.8);
    playBass(barData.bass * 1.5, startTime + beatSec * 2, beatSec * 1.7);

    // 2. Pad Chords (holds for full bar)
    playChord(barData.pad, startTime, barSec * 0.95, isNightTheme);

    // 3. Lead Melody
    if (barData.lead) {
      barData.lead.forEach((item) => {
        const noteTime = startTime + item.beat * beatSec;
        playTone(item.note, noteTime, item.dur * beatSec, isNightTheme);
      });
    }

    // 4. Occasional sweet nature sound every 4 bars
    if (currentBar % 4 === 1) {
      playNatureAmbience(startTime + beatSec * 1.5, isNightTheme);
    }

    currentBar++;
    nextBarTime += barSec;
  }
}

function startScheduler() {
  if (timerID) clearInterval(timerID);
  if (!audioCtx) initAudioGraph();
  if (!audioCtx) return;

  nextBarTime = audioCtx.currentTime + 0.1;
  timerID = setInterval(scheduleNextBar, LOOKAHEAD_MS);
}

function stopScheduler() {
  if (timerID) {
    clearInterval(timerID);
    timerID = null;
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (audioCtx && audioCtx.state === 'running') {
        audioCtx.suspend().catch(() => {});
      }
    } else {
      if (audioCtx && audioCtx.state === 'suspended' && isPlayingBgm && !isMuted) {
        audioCtx.resume().catch(() => {});
      }
    }
  });
}

export const sound = {
  isMuted() {
    return isMuted;
  },

  getVolume() {
    return masterVolume;
  },

  setVolume(vol) {
    masterVolume = Math.max(0, Math.min(1, vol));
    try {
      localStorage.setItem('village-sound-volume', String(masterVolume));
    } catch (e) {}

    if (masterGain && audioCtx && !isMuted) {
      masterGain.gain.setValueAtTime(masterVolume, audioCtx.currentTime);
    }
    return masterVolume;
  },

  toggleMute() {
    isMuted = !isMuted;
    try {
      localStorage.setItem('village-sound-muted', isMuted ? 'true' : 'false');
    } catch (e) {}

    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(isMuted ? 0 : masterVolume, audioCtx.currentTime);
    }
    return isMuted;
  },

  setTheme(theme) {
    userTheme = theme;
    try {
      localStorage.setItem('village-music-theme', theme);
    } catch (e) {}
    // Reset bar counter for smooth immediate transition
    if (isPlayingBgm && audioCtx) {
      currentBar = 0;
      nextBarTime = audioCtx.currentTime + 0.05;
    }
  },

  getTheme() {
    return userTheme;
  },

  getEffectiveTheme() {
    return getEffectiveTheme();
  },

  setNightMode(night) {
    const changed = isNight !== night;
    isNight = night;
    if (changed && userTheme === 'auto' && isPlayingBgm && audioCtx) {
      currentBar = 0;
      nextBarTime = audioCtx.currentTime + 0.05;
    }
  },

  isBgmPlaying() {
    return isPlayingBgm;
  },

  startBgm(preferTheme = null) {
    if (preferTheme) {
      userTheme = preferTheme;
    }
    const ctx = initAudioGraph();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        isPlayingBgm = true;
        startScheduler();
      }).catch(() => {});
    } else {
      isPlayingBgm = true;
      startScheduler();
    }
  },

  stopBgm() {
    isPlayingBgm = false;
    stopScheduler();
  },

  toggleBgm() {
    if (isPlayingBgm) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return isPlayingBgm;
  },

  getCurrentTrack() {
    const eff = getEffectiveTheme();
    if (eff === 'night') {
      return {
        id: 'night',
        title: 'Starry Night Lullaby',
        subtitle: 'Tranquil music box & midnight pad',
        tempo: '68 BPM'
      };
    }
    return {
      id: 'day',
      title: 'Cozy Village Morning',
      subtitle: 'Warm nostalgic kalimba & acoustic bass',
      tempo: '94 BPM'
    };
  },

  initFromStorage() {
    try {
      isMuted = localStorage.getItem('village-sound-muted') === 'true';
      const savedVol = localStorage.getItem('village-sound-volume');
      if (savedVol !== null) masterVolume = parseFloat(savedVol) || 0.75;
      const savedTheme = localStorage.getItem('village-music-theme');
      if (savedTheme) userTheme = savedTheme;
    } catch (e) {}
  },

  // --- Sound Effects (SFX) ---

  // Soft footstep sound
  playStep() {
    if (isMuted) return;
    const ctx = initAudioGraph();
    if (!ctx || !sfxGain) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110 + Math.random() * 20, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.045, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(sfxGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  },

  // Cheerful retro chime when entering a building or modal
  playChime() {
    if (isMuted) return;
    const ctx = initAudioGraph();
    if (!ctx || !sfxGain) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(sfxGain);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.35);
      });
    } catch (e) {}
  },

  // Soft cat purr / chirp sound
  playCatPurr() {
    if (isMuted) return;
    const ctx = initAudioGraph();
    if (!ctx || !sfxGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.3);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(sfxGain);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  },

  // Water drop / ripple sound
  playWaterDrop() {
    if (isMuted) return;
    const ctx = initAudioGraph();
    if (!ctx || !sfxGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(sfxGain);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  },

  // Clock toggle bell
  playBell() {
    if (isMuted) return;
    const ctx = initAudioGraph();
    if (!ctx || !sfxGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      gain.connect(sfxGain);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch (e) {}
  },

  // Pixel UI button click
  playClick() {
    if (isMuted) return;
    const ctx = initAudioGraph();
    if (!ctx || !sfxGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(sfxGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }
};
