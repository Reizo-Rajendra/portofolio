const fs = require('fs');
const { PNG } = require('pngjs');

// Always read from the original pristine logo
fs.createReadStream('public/assets/entry-screen/title-logo-original.png')
  .pipe(new PNG())
  .on('parsed', function() {
    const W = this.width;
    const H = this.height;

    // Helper: is pixel dark text (dark brown text color: r < 110, g < 90, b < 70)
    function isDark(data, x, y) {
      if (x < 0 || x >= W || y < 0 || y >= H) return false;
      const idx = (W * y + x) << 2;
      return data[idx] < 110 && data[idx + 1] < 90 && data[idx + 2] < 70 && data[idx + 3] > 200;
    }

    function getPixel(data, x, y) {
      const idx = (W * y + x) << 2;
      return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
    }

    function setPixel(data, x, y, rgba) {
      if (x < 0 || x >= W || y < 0 || y >= H) return;
      const idx = (W * y + x) << 2;
      data[idx] = rgba[0];
      data[idx + 1] = rgba[1];
      data[idx + 2] = rgba[2];
      data[idx + 3] = rgba[3];
    }

    // 1. Extract Letter R (x: 578..712, y: 319..459)
    const letterR = [];
    for (let y = 319; y <= 459; y++) {
      for (let x = 578; x <= 712; x++) {
        if (isDark(this.data, x, y)) {
          letterR.push({ x: x - 578, y: y - 319, rgba: getPixel(this.data, x, y) });
        }
      }
    }

    // 2. Extract Letter i (x: 724..779, y: 322..459)
    const letterI = [];
    for (let y = 322; y <= 459; y++) {
      for (let x = 724; x <= 779; x++) {
        if (isDark(this.data, x, y)) {
          letterI.push({ x: x - 724, y: y - 322, rgba: getPixel(this.data, x, y) });
        }
      }
    }

    // 3. Extract Letter z (x: 791..886, y: 362..459)
    const letterZ = [];
    for (let y = 362; y <= 459; y++) {
      for (let x = 791; x <= 886; x++) {
        if (isDark(this.data, x, y)) {
          letterZ.push({ x: x - 791, y: y - 362, rgba: getPixel(this.data, x, y) });
        }
      }
    }

    // 4. Extract apostrophe ' (x: 1078..1118, y: 320..381)
    const letterApos = [];
    for (let y = 320; y <= 381; y++) {
      for (let x = 1078; x <= 1118; x++) {
        if (isDark(this.data, x, y)) {
          letterApos.push({ x: x - 1078, y: y - 320, rgba: getPixel(this.data, x, y) });
        }
      }
    }

    // 5. Extract Letter s (x: 1122..1204, y: 362..459)
    const letterS = [];
    for (let y = 362; y <= 459; y++) {
      for (let x = 1122; x <= 1204; x++) {
        if (isDark(this.data, x, y)) {
          letterS.push({ x: x - 1122, y: y - 362, rgba: getPixel(this.data, x, y) });
        }
      }
    }

    // 6. Extract FULL Letter e from line 2 (x: 1234..1368, y: 528..679, height: 152)
    // Scale it down to height 98 (scale factor: 97 / 151 = 0.64238)
    const rawE = [];
    for (let y = 528; y <= 679; y++) {
      for (let x = 1234; x <= 1368; x++) {
        if (isDark(this.data, x, y)) {
          rawE.push({ x: x - 1234, y: y - 528, rgba: getPixel(this.data, x, y) });
        }
      }
    }

    const scaleE = 97 / 151;
    const gridE = {};
    const letterE = [];
    for (const p of rawE) {
      const nx = Math.round(p.x * scaleE);
      const ny = Math.round(p.y * scaleE);
      const key = nx + ',' + ny;
      if (!gridE[key]) {
        gridE[key] = true;
        letterE.push({ x: nx, y: ny, rgba: p.rgba });
      }
    }

    // 7. Create Letter o from e (close loop on right side and hollow out inner crossbar)
    const maxEX = Math.max(...letterE.map(p => p.x));
    const gridO = { ...gridE };

    // Remove inner crossbar of 'e' (y: 36..54, x: 22..maxEX - 18)
    for (let y = 36; y <= 54; y++) {
      for (let x = 22; x <= maxEX - 18; x++) {
        delete gridO[x + ',' + y];
      }
    }

    // Complete the right arch of 'o' from y=35 to y=75
    for (let y = 35; y <= 75; y++) {
      const thickness = 16;
      const inset = (y > 45 && y < 65) ? 0 : 2;
      for (let x = maxEX - thickness - inset; x <= maxEX - inset; x++) {
        gridO[x + ',' + y] = true;
      }
    }

    const letterO = [];
    for (const key of Object.keys(gridO)) {
      const [x, y] = key.split(',').map(Number);
      letterO.push({ x, y, rgba: [54, 20, 4, 255] });
    }

    // 8. Clean line 1 parchment area (y: 310..470, x: 550..1225)
    // Fill with natural subtle parchment wood grain
    for (let y = 310; y <= 470; y++) {
      for (let x = 550; x <= 1225; x++) {
        const noise = ((x * 7 + y * 13) % 4) - 2;
        // Warm parchment palette
        const r = 252 + noise;
        const g = 224 + noise;
        const b = 175 + noise;
        setPixel(this.data, x, y, [r, g, b, 255]);
      }
    }

    // 9. Helper to stamp letters WITH proper drop-shadow and highlight
    function stampWithShadow(targetData, letterList, ox, oy) {
      const letterGrid = {};
      for (const p of letterList) {
        letterGrid[p.x + ',' + p.y] = true;
      }

      // Stamp letter pixels
      for (const p of letterList) {
        setPixel(targetData, ox + p.x, oy + p.y, p.rgba);

        // If bottom edge of letter: add warm drop shadow and highlight
        if (!letterGrid[p.x + ',' + (p.y + 1)]) {
          // Warm shadow
          setPixel(targetData, ox + p.x, oy + p.y + 1, [155, 121, 90, 255]);
          // Highlight edge
          if (!letterGrid[p.x + ',' + (p.y + 2)]) {
            setPixel(targetData, ox + p.x, oy + p.y + 2, [255, 249, 207, 255]);
          }
        }
      }
    }

    // Layout coordinates (perfectly centered on wooden sign):
    // Center of sign is x = 887
    stampWithShadow(this.data, letterR, 574, 319);
    stampWithShadow(this.data, letterE, 714, 362);
    stampWithShadow(this.data, letterI, 812, 322);
    stampWithShadow(this.data, letterZ, 878, 362);
    stampWithShadow(this.data, letterO, 982, 362);
    stampWithShadow(this.data, letterApos, 1076, 320);
    stampWithShadow(this.data, letterS, 1120, 362);

    const out = fs.createWriteStream('public/assets/entry-screen/title-logo.png');
    this.pack().pipe(out);
    out.on('finish', () => {
      console.log('Successfully generated Reizo\'s Village title logo with uncropped, natural curves!');
    });
  });
