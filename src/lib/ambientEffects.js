// Ambient Visual Effects for the 2D Pixel Village
// - Night fireflies with soft luminescence
// - Daytime drifting leaves / cherry petals
// - Central pond water sparkles & ripples
// - Footstep dust puffs
// - Click-to-move target ring marker

const FIREFLY_COUNT = 5;
const LEAF_COUNT = 4;

export class AmbientSystem {
  constructor() {
    this.fireflies = [];
    this.leaves = [];
    this.sparkles = [];
    this.dust = [];
    this.targetMarker = null; // { x, y, time }
    this.dustTimer = 0;
    this.sparkleTimer = 0;
    this.time = 0;

    this.init();
  }

  init() {
    // Initialize fireflies across the village (near trees, pond, buildings)
    this.fireflies = Array.from({ length: FIREFLY_COUNT }, (_, i) => ({
      x: 350 + Math.random() * 800,
      y: 200 + Math.random() * 500,
      baseX: 350 + Math.random() * 800,
      baseY: 200 + Math.random() * 500,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 0.8,
      color: i % 3 === 0 ? '#b2f779' : i % 3 === 1 ? '#ffea78' : '#7fe8ff',
    }));

    // Initialize daytime drifting leaves
    this.leaves = Array.from({ length: LEAF_COUNT }, () => ({
      x: Math.random() * 1280,
      y: Math.random() * 720,
      vx: 12 + Math.random() * 15,
      vy: 8 + Math.random() * 10,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 1.5 + Math.random() * 1.5,
      size: 2 + Math.random() * 2,
      color: Math.random() > 0.4 ? '#88b858' : '#c99661',
    }));
  }

  // Set click destination marker
  setTarget(x, y) {
    this.targetMarker = { x, y, time: 0 };
  }

  clearTarget() {
    this.targetMarker = null;
  }

  // Add dust puff behind player
  addDust(x, y) {
    this.dust.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + 2 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 4,
      vy: -Math.random() * 3,
      size: 2 + Math.random() * 1.5,
      alpha: 0.6,
      life: 0.35,
      maxLife: 0.35,
    });
  }

  update(dt, isNight, playerPos, playerMoving) {
    this.time += dt;

    // Update fireflies (night)
    if (isNight) {
      for (const f of this.fireflies) {
        f.phase += dt * f.speed;
        f.x = f.baseX + Math.sin(f.phase) * 25 + Math.sin(f.phase * 0.4) * 15;
        f.y = f.baseY + Math.cos(f.phase * 0.7) * 18 + Math.cos(f.phase * 0.3) * 10;

        // Gentle drift of base
        f.baseX += f.vx * dt;
        f.baseY += f.vy * dt;
        if (f.baseX < 300) f.vx = Math.abs(f.vx);
        if (f.baseX > 1150) f.vx = -Math.abs(f.vx);
        if (f.baseY < 180) f.vy = Math.abs(f.vy);
        if (f.baseY > 700) f.vy = -Math.abs(f.vy);
      }
    } else {
      // Update leaves (day)
      for (const l of this.leaves) {
        l.sway += dt * l.swaySpeed;
        l.x += (l.vx + Math.sin(l.sway) * 8) * dt;
        l.y += l.vy * dt;

        if (l.x > 1290) l.x = -10;
        if (l.y > 730) {
          l.y = -10;
          l.x = Math.random() * 1280;
        }
      }
    }

    // Spawn water sparkles on central pond (~(779, 409))
    this.sparkleTimer += dt;
    if (this.sparkleTimer > 0.4) {
      this.sparkleTimer = 0;
      if (this.sparkles.length < 5) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 0.75;
        const sx = 779 + Math.cos(angle) * (140 * dist);
        const sy = 409 + Math.sin(angle) * (95 * dist);
        this.sparkles.push({
          x: sx,
          y: sy,
          life: 0,
          maxLife: 0.6 + Math.random() * 0.4,
        });
      }
    }

    // Update sparkles
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const s = this.sparkles[i];
      s.life += dt;
      if (s.life >= s.maxLife) {
        this.sparkles.splice(i, 1);
      }
    }

    // Player footstep dust
    if (playerMoving) {
      this.dustTimer += dt;
      if (this.dustTimer > 0.14) {
        this.dustTimer = 0;
        this.addDust(playerPos.x, playerPos.y);
      }
    }

    // Update dust particles
    for (let i = this.dust.length - 1; i >= 0; i--) {
      const d = this.dust[i];
      d.life -= dt;
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.alpha = Math.max(0, (d.life / d.maxLife) * 0.6);
      if (d.life <= 0) {
        this.dust.splice(i, 1);
      }
    }

    // Update click target marker
    if (this.targetMarker) {
      this.targetMarker.time += dt;
      if (this.targetMarker.time > 1.2) {
        this.targetMarker = null;
      }
    }
  }

  // Draw ground-level effects (dust, pond sparkles, target marker)
  drawGround(ctx) {
    // 1. Draw footstep dust (fast batched pixel squares)
    if (this.dust.length > 0) {
      ctx.fillStyle = '#bfa576';
      for (const d of this.dust) {
        ctx.globalAlpha = d.alpha;
        ctx.fillRect(Math.round(d.x), Math.round(d.y), d.size, d.size);
      }
      ctx.globalAlpha = 1;
    }

    // 2. Draw pond water sparkles
    for (const s of this.sparkles) {
      const progress = s.life / s.maxLife;
      const alpha = Math.sin(progress * Math.PI) * 0.75;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#ffffff';

      // 4-point pixel star
      const px = Math.round(s.x);
      const py = Math.round(s.y);
      ctx.fillRect(px, py, 2, 2);
      ctx.fillRect(px - 2, py, 1, 1);
      ctx.fillRect(px + 3, py, 1, 1);
      ctx.fillRect(px, py - 2, 1, 1);
      ctx.fillRect(px, py + 3, 1, 1);
    }
    ctx.globalAlpha = 1;

    // 3. Draw click target marker (RPG style pulsing ring)
    if (this.targetMarker) {
      const t = this.targetMarker.time;
      const alpha = Math.max(0, 1 - t / 1.2);
      const radius = 6 + (t * 8) % 10;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = '#ffe4a0';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(this.targetMarker.x, this.targetMarker.y, radius, radius * 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Small center cross
      ctx.fillStyle = '#ffe4a0';
      ctx.fillRect(Math.round(this.targetMarker.x) - 1, Math.round(this.targetMarker.y) - 1, 3, 3);
      ctx.restore();
    }
  }

  // Draw air-level effects (fireflies, leaves)
  drawAir(ctx, isNight) {
    if (isNight) {
      // Draw fireflies (fast pixel glow, zero arcs)
      for (const f of this.fireflies) {
        const pulse = 0.4 + Math.sin(f.phase * 3) * 0.45;
        if (pulse <= 0.05) continue;

        ctx.globalAlpha = pulse;

        const px = Math.round(f.x);
        const py = Math.round(f.y);

        // Outer soft glow (square pixel)
        ctx.fillStyle = f.color;
        ctx.fillRect(px - 2, py - 2, 4, 4);

        // Bright pixel core
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px - 1, py - 1, 2, 2);
      }
      ctx.globalAlpha = 1;
    } else {
      // Draw drifting leaves (clean pixel rectangles, zero matrix rotation)
      for (const l of this.leaves) {
        ctx.fillStyle = l.color;
        ctx.fillRect(Math.round(l.x), Math.round(l.y), l.size, l.size * 1.4);
      }
    }
  }
}
