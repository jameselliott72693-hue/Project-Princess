(function (root) {
  const Paint = root.Paint;
  let cols = 12;
  let rows = 8;
  let theme = "meadow";
  const TILE = 64;
  const PAD = 44;

  const SIZES = [
    { id: "cozy", label: "Cozy", cols: 12, rows: 8 },
    { id: "wide", label: "Wide", cols: 18, rows: 12 },
    { id: "grand", label: "Grand", cols: 24, rows: 16 }
  ];

  const THEMES = {
    meadow: { id: "meadow", label: "Meadow", ground: "grass", sky: "#d7f3ff" },
    winter: { id: "winter", label: "Winter", ground: "snow", sky: "#e7f2ff" },
    seaside: { id: "seaside", label: "Seaside", ground: "sand", sky: "#d4f6ff" }
  };

  const LEGEND = {
    ".": "grass", p: "path", w: "water", b: "bridge", g: "garden", f: "flowers",
    W: "wall", T: "tower", G: "gate", H: "throne", t: "tree", u: "bush",
    F: "fountain", h: "house", k: "bakery", m: "stall", l: "lamp", n: "bench",
    a: "banner", r: "bunny", d: "duck", i: "bird", e: "deer", c: "kitten",
    o: "snow", I: "ice", q: "pine", y: "snowman", z: "sand", O: "sea",
    j: "palm", s: "shell", v: "boat"
  };

  const BLOCK = {
    water: 1, sea: 1, wall: 1, tower: 1, throne: 1, tree: 1, pine: 1, palm: 1,
    fountain: 1, house: 1, bakery: 1, stall: 1, boat: 1
  };
  const ANIMALS = { bunny: 1, duck: 1, bird: 1, deer: 1, kitten: 1 };

  const GROUPS = [
    { id: "castle", label: "Castle" },
    { id: "nature", label: "Nature" },
    { id: "town", label: "Town" },
    { id: "animals", label: "Animals" },
    { id: "extra", label: "Extra" }
  ];

  const TILES = [
    { id: "wall", label: "Wall", group: "castle" },
    { id: "tower", label: "Tower", group: "castle" },
    { id: "gate", label: "Gate", group: "castle" },
    { id: "throne", label: "Throne", group: "castle" },
    { id: "path", label: "Path", group: "nature" },
    { id: "water", label: "Water", group: "nature" },
    { id: "bridge", label: "Bridge", group: "nature" },
    { id: "tree", label: "Tree", group: "nature" },
    { id: "garden", label: "Garden", group: "nature" },
    { id: "flowers", label: "Flowers", group: "nature" },
    { id: "bush", label: "Bush", group: "nature" },
    { id: "snow", label: "Snow", group: "nature", theme: "winter" },
    { id: "ice", label: "Ice", group: "nature", theme: "winter" },
    { id: "pine", label: "Pine", group: "nature", theme: "winter" },
    { id: "snowman", label: "Snowman", group: "nature", theme: "winter" },
    { id: "sand", label: "Sand", group: "nature", theme: "seaside" },
    { id: "sea", label: "Sea", group: "nature", theme: "seaside" },
    { id: "palm", label: "Palm", group: "nature", theme: "seaside" },
    { id: "shell", label: "Shell", group: "nature", theme: "seaside" },
    { id: "boat", label: "Boat", group: "nature", theme: "seaside" },
    { id: "house", label: "House", group: "town" },
    { id: "bakery", label: "Bakery", group: "town" },
    { id: "stall", label: "Market", group: "town" },
    { id: "bunny", label: "Bunny", group: "animals" },
    { id: "duck", label: "Duck", group: "animals" },
    { id: "bird", label: "Bird", group: "animals" },
    { id: "deer", label: "Deer", group: "animals" },
    { id: "kitten", label: "Kitten", group: "animals" },
    { id: "fountain", label: "Fountain", group: "extra" },
    { id: "lamp", label: "Lamp", group: "extra" },
    { id: "bench", label: "Bench", group: "extra" },
    { id: "banner", label: "Flag", group: "extra" }
  ];

  const KNOWN = { grass: 1 };
  TILES.forEach(function (tile) { KNOWN[tile.id] = 1; });

  function parse(rows) {
    const width = rows[0].length;
    const cells = [];
    rows.forEach(function (row) {
      if (row.length !== width) throw new Error("Bad realm row: " + row);
      for (let i = 0; i < row.length; i++) {
        const id = LEGEND[row.charAt(i)];
        if (!id) throw new Error("Bad tile " + row.charAt(i));
        cells.push(id);
      }
    });
    return { cols: width, rows: rows.length, cells: cells };
  }

  const TEMPLATE_ROWS = {
    meadow: [
      "t..........t",
      "..f..t..f...",
      "..........r.",
      "...t....t...",
      ".c...F......",
      "..........d.",
      ".f...n...f..",
      "t..........t"
    ],
    castle: [
      "t.t......t.t",
      ".TWWWWWWWT..",
      ".Wg..H..gW..",
      ".W.f...f.W.t",
      ".Wg.....gW..",
      ".TWWWGWWT...",
      "....pp...r..",
      "tf..p..c..ft"
    ],
    river: [
      "h.t..k..t.mm",
      ".pppppppp...",
      "..f......e..",
      "wwwwbwwwwbww",
      "wwwwbwwwwbww",
      ".d.....r...t",
      "..h.F.....k.",
      "t..n...c...t"
    ],
    garden: [
      "tf...F...f.t",
      ".fggpppgpf..",
      "..g.pFp.g...",
      "l.ppp.ppp..t",
      "..g.pFp.g...",
      ".fggpppgpf.e",
      "...n...n.r..",
      "t..........t"
    ]
  };

  const WINTER_ROWS = [
    "qq..oy..oo..oo..qq",
    "qTooooooooooooooT.",
    "qWooooHoooooooooWq",
    "qWooofffooooooooW.",
    "qWooooooooooooooW.",
    "qTWWWWGWWWWWWWWT..",
    "ooooooppoooo.r.oo.",
    "oqq..ppo..c.y..qoo",
    "oooooooooooooooooo",
    ".h.ooo.k.oooo.m..o",
    "oooIIIIooooooooooo",
    "qqooooooooooooooqq"
  ];

  const SEASIDE_ROWS = [
    "jj..zzzzzzzzzz..jj",
    "j.zzzzzzzzzzzzzz.j",
    "zzzzsszzzzFzzzzzzz",
    "zzzzzzzzppzzzzzz.e",
    "OOOOObOOOOObOOOOOO",
    "OOOOObOOOOObOOOOOO",
    "zzzzppzzzzzz..d..z",
    ".hz.pp..c....k..mz",
    "zzzzzzzzzzzzzzzzzz",
    "..v..zzzzznzzzzz.j",
    "zzzzsszzzzzzzzsszz",
    "jjzzzzzzzzzzzzzzjj"
  ];

  function sizedTemplate(id, label, themeId, parsed) {
    return {
      id: id,
      label: label,
      theme: themeId,
      cols: parsed.cols,
      rows: parsed.rows,
      cells: parsed.cells
    };
  }

  const cozyCastle = parse(TEMPLATE_ROWS.castle);

  function embedTemplate(id, label, themeId, base, wide, tall) {
    const ground = THEMES[themeId].ground;
    const edge = themeId === "winter" ? "pine" : themeId === "seaside" ? "palm" : "tree";
    const cells = [];
    const ox = Math.floor((wide - base.cols) / 2);
    const oy = Math.floor((tall - base.rows) / 2);
    for (let r = 0; r < tall; r++) {
      for (let c = 0; c < wide; c++) {
        const sc = c - ox;
        const sr = r - oy;
        if (sc >= 0 && sr >= 0 && sc < base.cols && sr < base.rows) cells.push(base.cells[sr * base.cols + sc]);
        else if (r === 0 || c === 0 || r === tall - 1 || c === wide - 1) cells.push(edge);
        else cells.push(ground);
      }
    }
    return { id: id, label: label, theme: themeId, cols: wide, rows: tall, cells: cells };
  }

  const TEMPLATES = [
    sizedTemplate("meadow", "Meadow", "meadow", parse(TEMPLATE_ROWS.meadow)),
    sizedTemplate("castle", "Little castle", "meadow", cozyCastle),
    sizedTemplate("river", "Riverside", "meadow", parse(TEMPLATE_ROWS.river)),
    sizedTemplate("garden", "Royal garden", "meadow", parse(TEMPLATE_ROWS.garden)),
    sizedTemplate("winter", "Snow castle", "winter", parse(WINTER_ROWS)),
    sizedTemplate("seaside", "Sunny shore", "seaside", parse(SEASIDE_ROWS)),
    embedTemplate("grand", "Grand meadow", "meadow", cozyCastle, 24, 16)
  ];

  function templateById(id) {
    return TEMPLATES.filter(function (item) { return item.id === id; })[0] || TEMPLATES[1];
  }

  function templateCells(id) {
    return templateById(id).cells.slice();
  }

  function sizeOk(c, r) {
    return SIZES.some(function (size) { return size.cols === c && size.rows === r; });
  }

  function pack(raw) {
    const src = raw && Array.isArray(raw.cells) ? raw.cells : (Array.isArray(raw) ? raw : []);
    let c = raw && Number(raw.cols);
    let r = raw && Number(raw.rows);
    let nextTheme = raw && THEMES[raw.theme] ? raw.theme : "meadow";
    if (!sizeOk(c, r)) {
      if (src.length === 18 * 12) { c = 18; r = 12; }
      else if (src.length === 24 * 16) { c = 24; r = 16; }
      else { c = 12; r = 8; }
    }
    const ground = THEMES[nextTheme].ground;
    const cells = [];
    for (let y = 0; y < r; y++) {
      for (let x = 0; x < c; x++) {
        const id = src[y * c + x];
        cells.push(KNOWN[id] ? id : ground);
      }
    }
    return { cells: cells, cols: c, rows: r, theme: nextTheme };
  }

  function use(map) {
    const packed = pack(map);
    cols = packed.cols;
    rows = packed.rows;
    theme = packed.theme;
    publish();
    return packed;
  }

  function resize(map, nextCols, nextRows) {
    const src = pack(map);
    const ground = THEMES[src.theme].ground;
    const cells = [];
    for (let y = 0; y < nextRows; y++) {
      for (let x = 0; x < nextCols; x++) {
        if (x < src.cols && y < src.rows) cells.push(src.cells[y * src.cols + x]);
        else cells.push(ground);
      }
    }
    return { cells: cells, cols: nextCols, rows: nextRows, theme: src.theme };
  }

  function normalize(cells) {
    return pack(cells).cells;
  }

  function cell(cells, c, r) {
    if (c < 0 || r < 0 || c >= cols || r >= rows) return null;
    return cells[r * cols + c];
  }

  function walkable(cells, c, r) {
    const id = cell(cells, c, r);
    if (!id) return false;
    return !BLOCK[id];
  }

  function interactKind(id) {
    if (id === "gate" || id === "throne") return "castle";
    if (id === "fountain") return "fountain";
    if (id === "house") return "house";
    if (id === "bakery") return "bakery";
    if (id === "stall") return "stall";
    if (ANIMALS[id]) return "animal";
    if (id === "flowers") return "flowers";
    if (id === "snowman" || id === "shell") return "sparkle";
    return null;
  }

  function same(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  function astar(cells, start, goal) {
    if (!start || !goal) return null;
    if (start.c === goal.c && start.r === goal.r) return [];
    if (!walkable(cells, goal.c, goal.r)) return null;
    const key = function (c, r) { return c + "," + r; };
    const startK = key(start.c, start.r);
    const goalK = key(goal.c, goal.r);
    const open = [{ c: start.c, r: start.r }];
    const g = {};
    g[startK] = 0;
    const prev = {};
    const seen = new Set();
    function heur(node) { return Math.abs(node.c - goal.c) + Math.abs(node.r - goal.r); }
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    while (open.length) {
      open.sort(function (a, b) {
        return (g[key(a.c, a.r)] + heur(a)) - (g[key(b.c, b.r)] + heur(b));
      });
      const cur = open.shift();
      const ck = key(cur.c, cur.r);
      if (seen.has(ck)) continue;
      seen.add(ck);
      if (ck === goalK) {
        const path = [];
        let k = ck;
        while (k && k !== startK) {
          const parts = k.split(",");
          path.push({ c: Number(parts[0]), r: Number(parts[1]) });
          k = prev[k];
        }
        path.reverse();
        return path;
      }
      for (let i = 0; i < dirs.length; i++) {
        const nc = cur.c + dirs[i][0];
        const nr = cur.r + dirs[i][1];
        if (!walkable(cells, nc, nr)) continue;
        const nk = key(nc, nr);
        const ng = g[ck] + 1;
        if (g[nk] == null || ng < g[nk]) {
          g[nk] = ng;
          prev[nk] = ck;
          open.push({ c: nc, r: nr });
        }
      }
    }
    return null;
  }

  function nearestStand(cells, from, target) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let best = null;
    for (let i = 0; i < dirs.length; i++) {
      const c = target.c + dirs[i][0];
      const r = target.r + dirs[i][1];
      if (!walkable(cells, c, r)) continue;
      if (c === from.c && r === from.r) return { stand: { c: c, r: r }, path: [] };
      const path = astar(cells, from, { c: c, r: r });
      if (!path) continue;
      if (!best || path.length < best.path.length) best = { stand: { c: c, r: r }, path: path };
    }
    return best;
  }

  function startTile(cells) {
    let best = null;
    let bestScore = Infinity;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!walkable(cells, c, r)) continue;
        const score = Math.abs(c - (cols - 1) / 2) + (rows - 1 - r) * 0.35;
        if (score < bestScore) {
          bestScore = score;
          best = { c: c, r: r };
        }
      }
    }
    return best || { c: 0, r: 0 };
  }

  function foot(c, r) {
    return { x: c * TILE + TILE / 2, y: PAD + (r + 1) * TILE - 10 };
  }

  function roundRect(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function blossom(ctx, x, y, r, color) {
    ctx.fillStyle = color;
    for (let i = 0; i < 5; i++) {
      const a = (Math.PI * 2 * i) / 5;
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7, r * 0.55, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#f2c14e";
    ctx.beginPath();
    ctx.arc(x, y, r * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  function shadow(ctx, x, y, rx, ry) {
    ctx.fillStyle = "rgba(80,50,40,0.14)";
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function groundKind(id) {
    if (id === "water" || id === "bridge" || id === "sea") return id === "sea" ? "sea" : "water";
    if (id === "path") return "path";
    if (id === "garden") return "garden";
    if (id === "snow" || id === "ice" || id === "sand") return id;
    return "grass";
  }

  function visualKind(kind) {
    if (theme === "winter") {
      if (kind === "grass") return "snow";
      if (kind === "water") return "ice";
      if (kind === "path") return "snowpath";
    }
    if (theme === "seaside") {
      if (kind === "grass") return "sand";
      if (kind === "water" || kind === "sea") return "sea";
      if (kind === "path") return "board";
    }
    return kind;
  }

  function drawGround(ctx, x, y, kind, c, r, anim) {
    kind = visualKind(kind);
    if (kind === "water" || kind === "sea" || kind === "ice") {
      ctx.fillStyle = kind === "ice" ? "#d7f1ff" : kind === "sea" ? "#3aa0c8" : "#7ec8ea";
      ctx.fillRect(x, y, TILE, TILE);
      if (kind === "ice") {
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 18);
        ctx.lineTo(x + 28, y + 30);
        ctx.lineTo(x + 22, y + 48);
        ctx.moveTo(x + 40, y + 12);
        ctx.lineTo(x + 48, y + 36);
        ctx.stroke();
        return;
      }
      ctx.strokeStyle = "rgba(255,255,255,0.75)";
      ctx.lineWidth = 2;
      const shift = (anim / 18 + c * 8) % TILE;
      for (let band = 0; band < 2; band++) {
        ctx.beginPath();
        for (let i = 0; i <= TILE; i += 8) {
          const yy = y + 18 + band * 22 + Math.sin((i + shift) / 10 + band) * 3;
          if (i === 0) ctx.moveTo(x + i, yy);
          else ctx.lineTo(x + i, yy);
        }
        ctx.stroke();
      }
      return;
    }
    const even = (c + r) % 2 === 0;
    const fill = kind === "path" || kind === "board" ? "#e6c79a"
      : kind === "snowpath" ? "#f4fbff"
      : kind === "garden" ? "#d7e7a8"
      : kind === "snow" ? (even ? "#f7fbff" : "#e7f3fb")
      : kind === "sand" ? (even ? "#f6d7a2" : "#f0c98a")
      : even ? "#8fcb67" : "#84c25d";
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, TILE, TILE);
    if (kind === "path" || kind === "board" || kind === "snowpath" || kind === "sand") {
      ctx.fillStyle = kind === "sand" ? "rgba(255,255,255,0.35)" : kind === "snowpath" ? "rgba(180,210,230,0.45)" : "#f6e4c6";
      const h = Paint.hash(c, r);
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(x + 12 + ((h >> (i * 2)) % 36), y + 12 + ((h >> (i + 3)) % 34), kind === "sand" ? 3 : 8, kind === "sand" ? 2 : 6, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }
    if (kind === "snow") return;
    ctx.strokeStyle = "rgba(70,130,50,0.35)";
    ctx.lineWidth = 2;
    const h = Paint.hash(c, r);
    for (let i = 0; i < 3; i++) {
      const tx = x + 8 + ((h >> i) + i * 18) % 48;
      const ty = y + 12 + ((h >> (i + 2)) + i * 14) % 40;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx - 2, ty - 7);
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + 3, ty - 6);
      ctx.stroke();
    }
  }

  function joined(cells, c, r) {
    const id = cell(cells, c, r);
    return id === "wall" || id === "tower" || id === "gate";
  }

  function drawWall(ctx, x, y, cells, c, r) {
    const left = joined(cells, c - 1, r) ? x - 1 : x + 8;
    const right = joined(cells, c + 1, r) ? x + TILE + 1 : x + TILE - 8;
    const top = y + 18;
    const bot = y + TILE - 4;
    ctx.fillStyle = "#e7cba6";
    ctx.fillRect(left, top, right - left, bot - top);
    ctx.fillStyle = "#f4dcc0";
    ctx.fillRect(left, top, right - left, 6);
    ctx.strokeStyle = "rgba(150,100,60,0.28)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 2; i++) {
      const yy = top + ((bot - top) * i) / 3;
      ctx.beginPath();
      ctx.moveTo(left, yy);
      ctx.lineTo(right, yy);
      ctx.stroke();
    }
    ctx.fillStyle = "#f3d7b4";
    const span = Math.max(12, right - left);
    const mw = span / 5;
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(left + 3 + i * mw * 1.45, y + 6, Math.max(6, mw * 0.85), 16);
    }
  }

  function drawTower(ctx, x, y, anim) {
    const cx = x + TILE / 2;
    shadow(ctx, cx, y + TILE - 6, 16, 5);
    ctx.fillStyle = "#e7cba6";
    roundRect(ctx, cx - 16, y + 20, 32, 40, 8);
    ctx.fill();
    ctx.fillStyle = "#6aa6d8";
    ctx.beginPath();
    ctx.moveTo(cx - 20, y + 24);
    ctx.lineTo(cx, y - 6);
    ctx.lineTo(cx + 20, y + 24);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#8fd0f2";
    ctx.beginPath();
    ctx.moveTo(cx - 8, y + 16);
    ctx.lineTo(cx, y + 2);
    ctx.lineTo(cx + 6, y + 16);
    ctx.fill();
    const wave = Math.sin(anim / 320 + x / 20) * 3;
    ctx.strokeStyle = "#8d6e63";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, y - 6);
    ctx.lineTo(cx, y - 22);
    ctx.stroke();
    ctx.fillStyle = "#e26d7a";
    ctx.beginPath();
    ctx.moveTo(cx, y - 22);
    ctx.lineTo(cx + 14, y - 17 + wave);
    ctx.lineTo(cx, y - 12);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#9fd7f2";
    ctx.beginPath();
    ctx.arc(cx, y + 38, 5, 0, Math.PI * 2);
    ctx.fill();
  }

function drawGate(ctx, x, y, cells, c, r, open) {
  drawWall(ctx, x, y, cells, c, r);
    const cx = x + TILE / 2;
    ctx.fillStyle = open ? "#f6e2c4" : "#8c4e34";
    ctx.beginPath();
    ctx.moveTo(cx - 12, y + TILE - 6);
    ctx.lineTo(cx - 12, y + 28);
    ctx.quadraticCurveTo(cx, y + 12, cx + 12, y + 28);
    ctx.lineTo(cx + 12, y + TILE - 6);
    ctx.closePath();
    ctx.fill();
    if (!open) {
      ctx.fillStyle = "#c4844a";
      ctx.fillRect(cx - 10, y + 36, 8, 18);
      ctx.fillRect(cx + 2, y + 36, 8, 18);
      ctx.fillStyle = "#e8b84a";
      ctx.beginPath();
      ctx.arc(cx + 1, y + 46, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawTree(ctx, x, y, c, r) {
    const cx = x + TILE / 2;
    const base = y + TILE - 8;
    shadow(ctx, cx, base, 16, 5);
    ctx.fillStyle = "#a86b45";
    roundRect(ctx, cx - 5, base - 18, 10, 22, 3);
    ctx.fill();
    const greens = ["#3e9a4a", "#4eae58", "#2f8a3c", "#67c56a"];
    const h = Paint.hash(c, r);
    const blobs = [[0, -34, 18], [-12, -26, 14], [12, -24, 14], [0, -46, 12]];
    blobs.forEach(function (blob, i) {
      ctx.fillStyle = greens[(h + i) % greens.length];
      ctx.beginPath();
      ctx.arc(cx + blob[0], base + blob[1], blob[2], 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.beginPath();
    ctx.arc(cx - 6, base - 46, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPine(ctx, x, y) {
    const cx = x + TILE / 2;
    const base = y + TILE - 8;
    shadow(ctx, cx, base, 14, 5);
    ctx.fillStyle = "#8d5a34";
    ctx.fillRect(cx - 4, base - 16, 8, 18);
    ctx.fillStyle = "#245c45";
    ctx.beginPath();
    ctx.moveTo(cx, base - 54);
    ctx.lineTo(cx + 20, base - 18);
    ctx.lineTo(cx - 20, base - 18);
    ctx.fill();
    ctx.fillStyle = "#3d8f68";
    ctx.beginPath();
    ctx.moveTo(cx, base - 40);
    ctx.lineTo(cx + 14, base - 24);
    ctx.lineTo(cx - 14, base - 24);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.moveTo(cx - 8, base - 30);
    ctx.lineTo(cx, base - 36);
    ctx.lineTo(cx + 7, base - 28);
    ctx.closePath();
    ctx.fill();
  }

  function drawPalm(ctx, x, y) {
    const cx = x + TILE / 2;
    const base = y + TILE - 8;
    shadow(ctx, cx, base, 12, 4);
    ctx.strokeStyle = "#c4844a";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx, base);
    ctx.quadraticCurveTo(cx + 8, base - 22, cx - 2, base - 42);
    ctx.stroke();
    const topx = cx - 2;
    const topy = base - 42;
    ctx.fillStyle = "#2f9a4a";
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i - 2) * 0.5;
      ctx.beginPath();
      ctx.ellipse(topx + Math.cos(a) * 12, topy + Math.sin(a) * 8, 11, 4, a, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#e07a3d";
    ctx.beginPath();
    ctx.arc(topx + 8, topy + 10, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawSnowman(ctx, x, y) {
    const cx = x + TILE / 2;
    shadow(ctx, cx, y + TILE - 8, 12, 4);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx, y + 46, 14, 0, Math.PI * 2);
    ctx.arc(cx, y + 28, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5a3144";
    ctx.fillRect(cx - 3, y + 25, 2, 2);
    ctx.fillRect(cx + 3, y + 25, 2, 2);
    ctx.fillStyle = "#e26d7a";
    ctx.beginPath();
    ctx.moveTo(cx + 4, y + 29);
    ctx.lineTo(cx + 14, y + 31);
    ctx.lineTo(cx + 4, y + 33);
    ctx.fill();
    ctx.fillStyle = "#6aa6d8";
    ctx.fillRect(cx - 9, y + 16, 18, 4);
  }

  function drawShell(ctx, x, y) {
    const cx = x + TILE / 2;
    shadow(ctx, cx, y + 48, 10, 3);
    ctx.fillStyle = "#f7c9d4";
    ctx.beginPath();
    ctx.arc(cx, y + 42, 12, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = "#e7a0b4";
    ctx.lineWidth = 1.5;
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(cx, y + 42);
      ctx.lineTo(cx + i * 4, y + 32);
      ctx.stroke();
    }
  }

  function drawBoat(ctx, x, y) {
    const cx = x + TILE / 2;
    shadow(ctx, cx, y + TILE - 8, 16, 4);
    ctx.fillStyle = "#e26d7a";
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 40);
    ctx.lineTo(x + 54, y + 40);
    ctx.lineTo(x + 46, y + 52);
    ctx.lineTo(x + 18, y + 52);
    ctx.fill();
    ctx.strokeStyle = "#8d5a34";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, y + 40);
    ctx.lineTo(cx, y + 16);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(cx, y + 18);
    ctx.lineTo(cx + 16, y + 30);
    ctx.lineTo(cx, y + 36);
    ctx.fill();
  }

  function drawBush(ctx, x, y) {
    const cx = x + TILE / 2;
    shadow(ctx, cx, y + TILE - 12, 14, 4);
    ctx.fillStyle = "#3e9a4a";
    ctx.beginPath();
    ctx.arc(cx - 8, y + 40, 12, 0, Math.PI * 2);
    ctx.arc(cx + 8, y + 42, 12, 0, Math.PI * 2);
    ctx.arc(cx, y + 32, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawHouse(ctx, x, y, roof, mark) {
    const cx = x + TILE / 2;
    shadow(ctx, cx, y + TILE - 6, 20, 5);
    ctx.fillStyle = "#fff6ea";
    roundRect(ctx, x + 12, y + 30, 40, 28, 4);
    ctx.fill();
    ctx.fillStyle = roof;
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 34);
    ctx.lineTo(cx, y + 10);
    ctx.lineTo(x + 56, y + 34);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#8c4e34";
    roundRect(ctx, cx - 6, y + 42, 12, 16, 4);
    ctx.fill();
    ctx.fillStyle = "#9fd7f2";
    ctx.fillRect(x + 16, y + 38, 8, 8);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 16, y + 38, 8, 8);
    if (mark === "loaf") {
      ctx.fillStyle = "#e0b15a";
      roundRect(ctx, x + 40, y + 36, 10, 8, 3);
      ctx.fill();
    }
  }

  function drawBakery(ctx, x, y) {
    drawHouse(ctx, x, y, "#e07a5f", "loaf");
    ctx.fillStyle = "#fff6ea";
    ctx.fillRect(x + 14, y + 30, 36, 8);
    ctx.fillStyle = "#e25b7a";
    for (let i = 0; i < 4; i++) ctx.fillRect(x + 14 + i * 10, y + 30, 5, 8);
  }

  function drawStall(ctx, x, y) {
    const cx = x + TILE / 2;
    shadow(ctx, cx, y + TILE - 8, 18, 5);
    ctx.fillStyle = "#c4844a";
    ctx.fillRect(x + 14, y + 40, 36, 16);
    ctx.fillStyle = "#f2849a";
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 40);
    ctx.lineTo(cx, y + 18);
    ctx.lineTo(x + 56, y + 40);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillRect(x + 18, y + 30, 28, 6);
    const fruits = ["#e25b7a", "#f2c14e", "#7bc67e", "#f29a4a"];
    fruits.forEach(function (color, i) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x + 20 + i * 8, y + 46, 3.2, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawThrone(ctx, x, y) {
    const cx = x + TILE / 2;
    shadow(ctx, cx, y + TILE - 8, 16, 5);
    ctx.fillStyle = "#e8b84a";
    roundRect(ctx, cx - 16, y + 46, 32, 10, 3);
    ctx.fill();
    ctx.fillStyle = "#c4844a";
    roundRect(ctx, cx - 14, y + 22, 28, 28, 6);
    ctx.fill();
    ctx.fillStyle = "#e25b7a";
    roundRect(ctx, cx - 10, y + 28, 20, 16, 5);
    ctx.fill();
    ctx.fillStyle = "#f2c14e";
    ctx.beginPath();
    ctx.arc(cx, y + 20, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawFountain(ctx, x, y, anim) {
    const cx = x + TILE / 2;
    const cy = y + TILE / 2 + 4;
    shadow(ctx, cx, cy + 14, 18, 6);
    ctx.fillStyle = "#d7dee8";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 6, 20, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#7ec8ea";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#9fd7f2";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const wobble = Math.sin(anim / 200) * 3;
    ctx.moveTo(cx, cy + 2);
    ctx.quadraticCurveTo(cx + wobble, cy - 8, cx, cy - 16);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx - 4, cy + 2, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawLamp(ctx, x, y) {
    const cx = x + TILE / 2;
    ctx.strokeStyle = "#8d6e63";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, y + TILE - 10);
    ctx.lineTo(cx, y + 22);
    ctx.stroke();
    ctx.fillStyle = "#ffe08a";
    ctx.beginPath();
    ctx.arc(cx, y + 18, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,224,138,0.35)";
    ctx.beginPath();
    ctx.arc(cx, y + 18, 14, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawBench(ctx, x, y) {
    const cx = x + TILE / 2;
    shadow(ctx, cx, y + 46, 18, 4);
    ctx.fillStyle = "#c4844a";
    roundRect(ctx, x + 12, y + 30, 40, 10, 3);
    ctx.fill();
    ctx.fillRect(x + 16, y + 40, 4, 10);
    ctx.fillRect(x + 44, y + 40, 4, 10);
  }

  function drawBanner(ctx, x, y, anim) {
    const cx = x + 24;
    ctx.strokeStyle = "#8d6e63";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, y + TILE - 8);
    ctx.lineTo(cx, y + 12);
    ctx.stroke();
    const wave = Math.sin(anim / 280 + y) * 3;
    ctx.fillStyle = "#e26d7a";
    ctx.beginPath();
    ctx.moveTo(cx, y + 14);
    ctx.lineTo(cx + 26, y + 22 + wave);
    ctx.lineTo(cx, y + 32);
    ctx.closePath();
    ctx.fill();
  }

  function drawFlowers(ctx, x, y, c, r, count) {
    const colors = ["#ff8fab", "#ffd166", "#cdb4db", "#ffffff", "#ff9f1c", "#7ec8ea"];
    for (let i = 0; i < count; i++) {
      const h = Paint.hash(c + i * 3, r + 5);
      blossom(ctx, x + 12 + (h % 40), y + 16 + ((h >> 3) % 32), 5, colors[h % colors.length]);
    }
  }

  function hopOf(state, c, r) {
    const until = state.react && state.react[c + "," + r];
    if (!until || !state.now || state.now > until) return 0;
    const p = 1 - (until - state.now) / 700;
    return -Math.sin(Math.max(0, Math.min(1, p)) * Math.PI) * 12;
  }

  function drawBunny(ctx, x, y, hop) {
    const cx = x + TILE / 2;
    const cy = y + 40 + hop;
    shadow(ctx, cx, y + TILE - 12, 10, 4);
    ctx.fillStyle = "#f7f3ee";
    ctx.beginPath();
    ctx.ellipse(cx - 5, cy - 22, 4, 10, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx + 5, cy - 22, 4, 10, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f7b6c8";
    ctx.beginPath();
    ctx.ellipse(cx - 5, cy - 22, 2, 6, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx + 5, cy - 22, 2, 6, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f7f3ee";
    ctx.beginPath();
    ctx.ellipse(cx, cy, 12, 9, 0, 0, Math.PI * 2);
    ctx.arc(cx, cy - 10, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5a3144";
    ctx.fillRect(cx - 4, cy - 12, 2, 2);
    ctx.fillRect(cx + 2, cy - 12, 2, 2);
    ctx.fillStyle = "#f29aab";
    ctx.beginPath();
    ctx.arc(cx, cy - 8, 1.4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawDuck(ctx, x, y, hop) {
    const cx = x + 30;
    const cy = y + 42 + hop;
    shadow(ctx, cx, y + TILE - 12, 12, 4);
    ctx.fillStyle = "#f2c14e";
    ctx.beginPath();
    ctx.ellipse(cx, cy, 14, 9, 0, 0, Math.PI * 2);
    ctx.arc(cx + 10, cy - 8, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f29a4a";
    ctx.beginPath();
    ctx.ellipse(cx + 16, cy - 6, 5, 2.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5a3144";
    ctx.fillRect(cx + 12, cy - 10, 2, 2);
  }

  function drawBird(ctx, x, y, hop) {
    const cx = x + TILE / 2;
    const cy = y + 36 + hop;
    shadow(ctx, cx, y + TILE - 14, 8, 3);
    ctx.fillStyle = "#7eb6d6";
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f7f3ee";
    ctx.beginPath();
    ctx.ellipse(cx + 6, cy + 2, 6, 3, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f29a4a";
    ctx.beginPath();
    ctx.moveTo(cx + 6, cy - 1);
    ctx.lineTo(cx + 12, cy + 1);
    ctx.lineTo(cx + 6, cy + 3);
    ctx.fill();
    ctx.fillStyle = "#5a3144";
    ctx.fillRect(cx + 2, cy - 2, 2, 2);
  }

  function drawDeer(ctx, x, y, hop) {
    const cx = x + 34;
    const cy = y + 40 + hop;
    shadow(ctx, cx, y + TILE - 10, 14, 4);
    ctx.fillStyle = "#c4844a";
    ctx.beginPath();
    ctx.ellipse(cx, cy, 14, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 12, cy - 12, 7, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e0b08a";
    ctx.beginPath();
    ctx.ellipse(cx + 14, cy - 16, 2, 5, 0.3, 0, Math.PI * 2);
    ctx.ellipse(cx + 8, cy - 16, 2, 5, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5a3144";
    ctx.fillRect(cx + 14, cy - 12, 2, 2);
    ctx.strokeStyle = "#a86b45";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy + 6);
    ctx.lineTo(cx - 8, cy + 14);
    ctx.moveTo(cx + 6, cy + 6);
    ctx.lineTo(cx + 6, cy + 14);
    ctx.stroke();
  }

  function drawKitten(ctx, x, y, hop) {
    const cx = x + TILE / 2;
    const cy = y + 42 + hop;
    shadow(ctx, cx, y + TILE - 12, 10, 4);
    ctx.fillStyle = "#f7f3ee";
    ctx.beginPath();
    ctx.ellipse(cx, cy, 11, 8, 0, 0, Math.PI * 2);
    ctx.arc(cx - 2, cy - 10, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy - 14);
    ctx.lineTo(cx - 10, cy - 22);
    ctx.lineTo(cx - 2, cy - 14);
    ctx.moveTo(cx + 2, cy - 14);
    ctx.lineTo(cx + 6, cy - 22);
    ctx.lineTo(cx + 6, cy - 12);
    ctx.fill();
    ctx.fillStyle = "#5a3144";
    ctx.fillRect(cx - 5, cy - 12, 1.6, 1.6);
    ctx.fillRect(cx, cy - 12, 1.6, 1.6);
    ctx.strokeStyle = "#f7f3ee";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx + 8, cy);
    ctx.quadraticCurveTo(cx + 16, cy - 8, cx + 12, cy - 14);
    ctx.stroke();
  }

  function drawBridge(ctx, x, y) {
    ctx.fillStyle = "#c4844a";
    for (let i = 0; i < 4; i++) {
      roundRect(ctx, x + 8, y + 6 + i * 14, TILE - 16, 10, 3);
      ctx.fill();
    }
    ctx.fillStyle = "#8d5a34";
    ctx.fillRect(x + 6, y + 6, 6, TILE - 12);
    ctx.fillRect(x + TILE - 12, y + 6, 6, TILE - 12);
  }

  function drawProp(ctx, x, y, id, c, r, cells, state) {
    const hop = hopOf(state, c, r);
    if (id === "wall") drawWall(ctx, x, y, cells, c, r);
    else if (id === "tower") drawTower(ctx, x, y, state.anim || 0);
    else if (id === "gate") {
      const open = state.gateOpen && state.now && state.gateOpen[c + "," + r] > state.now;
      drawGate(ctx, x, y, cells, c, r, open);
    } else if (id === "tree") {
      if (theme === "winter") drawPine(ctx, x, y);
      else if (theme === "seaside") drawPalm(ctx, x, y);
      else drawTree(ctx, x, y, c, r);
    } else if (id === "pine") drawPine(ctx, x, y);
    else if (id === "palm") drawPalm(ctx, x, y);
    else if (id === "snowman") drawSnowman(ctx, x, y);
    else if (id === "shell") drawShell(ctx, x, y);
    else if (id === "boat") drawBoat(ctx, x, y);
    else if (id === "bush") drawBush(ctx, x, y);
    else if (id === "house") drawHouse(ctx, x, y, "#e26d7a");
    else if (id === "bakery") drawBakery(ctx, x, y);
    else if (id === "stall") drawStall(ctx, x, y);
    else if (id === "throne") drawThrone(ctx, x, y);
    else if (id === "fountain") drawFountain(ctx, x, y, state.anim || 0);
    else if (id === "lamp") drawLamp(ctx, x, y);
    else if (id === "bench") drawBench(ctx, x, y);
    else if (id === "banner") drawBanner(ctx, x, y, state.anim || 0);
    else if (id === "bridge") drawBridge(ctx, x, y);
    else if (id === "flowers") drawFlowers(ctx, x, y, c, r, 4);
    else if (id === "garden") drawFlowers(ctx, x, y, c, r, 3);
    else if (id === "bunny") drawBunny(ctx, x, y, hop);
    else if (id === "duck") drawDuck(ctx, x, y, hop);
    else if (id === "bird") drawBird(ctx, x, y, hop);
    else if (id === "deer") drawDeer(ctx, x, y, hop);
    else if (id === "kitten") drawKitten(ctx, x, y, hop);
  }

  function miniHair(ctx, style) {
    if (style === "coily" || style === "curly") {
      ctx.beginPath();
      ctx.arc(0, -30, 12, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (style === "buns" || style === "bun") {
      ctx.beginPath();
      ctx.arc(-7, -38, 4.5, 0, Math.PI * 2);
      ctx.arc(7, -38, 4.5, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (style === "pixie" || style === "bob" || style === "halo") {
      ctx.beginPath();
      ctx.arc(0, -30, 9, Math.PI, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (style === "braids" || style === "twists" || style === "sidebraid") {
      ctx.fillRect(-8, -36, 16, 8);
      ctx.fillRect(-7, -22, 3, 14);
      ctx.fillRect(4, -22, 3, 14);
      return;
    }
    ctx.beginPath();
    ctx.arc(0, -30, 9, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-8, -30, 4, 16);
    ctx.fillRect(4, -30, 4, 16);
  }

  function drawPet(ctx, pose, princess) {
    const spot = foot(pose.c, pose.r);
    const bob = Math.sin((pose.phase || 0) * Math.PI * 2) * 3;
    const flip = pose.facing === "w" ? -1 : 1;
    const color = princess.petColor || "#e8a87c";
    ctx.save();
    ctx.translate(spot.x + (pose.beside || -14), spot.y + bob);
    ctx.scale(flip, 1);
    shadow(ctx, 0, 2, 8, 3);
    ctx.fillStyle = color;
    if (princess.pet === "dragon") {
      ctx.beginPath();
      ctx.ellipse(0, -8, 9, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = Paint.mix(color, "#ffffff", 0.35);
      ctx.beginPath();
      ctx.ellipse(-6, -12, 5, 3, -0.6, 0, Math.PI * 2);
      ctx.ellipse(6, -12, 5, 3, 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(6, -10, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (princess.pet === "pup") {
      ctx.beginPath();
      ctx.ellipse(0, -6, 8, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-5, -12, 3, 4, -0.4, 0, Math.PI * 2);
      ctx.ellipse(5, -12, 3, 4, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = Paint.mix(color, "#5a3144", 0.35);
      ctx.beginPath();
      ctx.moveTo(-7, -4);
      ctx.quadraticCurveTo(-14, -10, -8, -1);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.ellipse(0, -6, 8, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-6, -10);
      ctx.lineTo(-3, -16);
      ctx.lineTo(0, -10);
      ctx.moveTo(2, -10);
      ctx.lineTo(5, -16);
      ctx.lineTo(8, -10);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-6, -4);
      ctx.quadraticCurveTo(-12, -12, -4, -8);
      ctx.stroke();
    }
    ctx.fillStyle = "#3a2a30";
    ctx.fillRect(2, -9, 2, 2);
    ctx.fillRect(6, -9, 2, 2);
    if (pose.react) {
      ctx.fillStyle = "#f2849a";
      ctx.beginPath();
      ctx.moveTo(10, -16);
      ctx.bezierCurveTo(6, -22, 14, -22, 10, -14);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawSprite(ctx, pose, princess) {
    const spot = foot(pose.c, pose.r);
    const bob = Math.sin((pose.phase || 0) * Math.PI * 2) * 2.4;
    const flip = pose.facing === "w" ? -1 : 1;
    ctx.save();
    ctx.translate(spot.x, spot.y + bob);
    ctx.scale(flip, 1);
    shadow(ctx, 0, 2, 10, 4);
    const armor = princess.outfit === "knight" || princess.outfit === "pastel";
    ctx.fillStyle = princess.outfitColor;
    ctx.beginPath();
    ctx.moveTo(-10, -10);
    ctx.lineTo(0, -22);
    ctx.lineTo(10, -10);
    ctx.lineTo(8, 0);
    ctx.lineTo(-8, 0);
    ctx.closePath();
    ctx.fill();
    if (armor) {
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillRect(-3, -16, 6, 12);
    }
    if (princess.cape) {
      ctx.fillStyle = princess.capeColor;
      ctx.beginPath();
      ctx.moveTo(-8, -16);
      ctx.lineTo(-14, 2);
      ctx.lineTo(14, 2);
      ctx.lineTo(8, -16);
      ctx.fill();
    }
    ctx.fillStyle = princess.hairColor;
    miniHair(ctx, princess.hair);
    ctx.fillStyle = princess.skin;
    ctx.beginPath();
    ctx.arc(0, -28, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#3a2a30";
    const look = pose.facing === "e" ? 1 : 0;
    ctx.fillRect(-4 + look, -30, 2, 2);
    ctx.fillRect(2 + look, -30, 2, 2);
    if (princess.crown && princess.crown !== "none") {
      ctx.fillStyle = princess.crownColor;
      ctx.fillRect(-6, -38, 12, 3);
      ctx.fillRect(-1.5, -43, 3, 6);
    }
    ctx.restore();
  }

  function drawParticles(ctx, particles) {
    (particles || []).forEach(function (p) {
      const fade = 1 - p.age / p.life;
      ctx.globalAlpha = Math.max(0, fade);
      ctx.fillStyle = p.color;
      if (p.kind === "heart") {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y + p.size);
        ctx.bezierCurveTo(p.x - p.size, p.y, p.x - p.size, p.y - p.size, p.x, p.y - p.size * 0.2);
        ctx.bezierCurveTo(p.x + p.size, p.y - p.size, p.x + p.size, p.y, p.x, p.y + p.size);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - p.size);
        ctx.lineTo(p.x + p.size * 0.3, p.y - p.size * 0.3);
        ctx.lineTo(p.x + p.size, p.y);
        ctx.lineTo(p.x + p.size * 0.3, p.y + p.size * 0.3);
        ctx.lineTo(p.x, p.y + p.size);
        ctx.lineTo(p.x - p.size * 0.3, p.y + p.size * 0.3);
        ctx.lineTo(p.x - p.size, p.y);
        ctx.lineTo(p.x - p.size * 0.3, p.y - p.size * 0.3);
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    });
  }

  function draw(ctx, cells, state) {
    const view = state || {};
    const saved = { cols: cols, rows: rows, theme: theme };
    if (view.cols) cols = view.cols;
    if (view.rows) rows = view.rows;
    if (view.theme && THEMES[view.theme]) theme = view.theme;
    const worldW = cols * TILE;
    const worldH = PAD + rows * TILE;
    try {
      ctx.clearRect(0, 0, worldW, worldH);
      ctx.fillStyle = THEMES[theme].sky;
      ctx.fillRect(0, 0, worldW, worldH);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const id = cells[r * cols + c];
          drawGround(ctx, c * TILE, PAD + r * TILE, groundKind(id), c, r, view.anim || 0);
        }
      }
      if (view.showGrid) {
        ctx.strokeStyle = "rgba(255,255,255,0.33)";
        ctx.lineWidth = 1;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            ctx.strokeRect(c * TILE + 0.5, PAD + r * TILE + 0.5, TILE - 1, TILE - 1);
          }
        }
      }
      let spriteRow = -1;
      let petRow = -1;
      if (view.pose) spriteRow = Math.max(0, Math.min(rows - 1, Math.floor(view.pose.r)));
      if (view.pet) petRow = Math.max(0, Math.min(rows - 1, Math.floor(view.pet.r)));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          drawProp(ctx, c * TILE, PAD + r * TILE, cells[r * cols + c], c, r, cells, view);
        }
        if (r === petRow && view.pet && view.princess && view.princess.pet && view.princess.pet !== "none") {
          drawPet(ctx, view.pet, view.princess);
        }
        if (r === spriteRow && view.princess) drawSprite(ctx, view.pose, view.princess);
      }
      drawParticles(ctx, view.particles);
    } finally {
      cols = saved.cols;
      rows = saved.rows;
      theme = saved.theme;
    }
  }

  function paintPreview(canvas, tileId) {
    const ctx = canvas.getContext("2d");
    canvas.width = 96;
    canvas.height = 96;
    ctx.clearRect(0, 0, 96, 96);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    const x = 16;
    const y = 24;
    const cells = new Array(cols * rows).fill(THEMES[theme].ground);
    const grounds = { grass: 1, path: 1, water: 1, snow: 1, ice: 1, sand: 1, sea: 1 };
    drawGround(ctx, x, y, groundKind(tileId), 1, 1, 0);
    if (!grounds[tileId]) drawProp(ctx, x, y, tileId, 1, 1, cells, { anim: 0, now: 0, react: {}, gateOpen: {} });
  }

  const api = {
    TILE: TILE,
    PAD: PAD,
    SIZES: SIZES,
    THEMES: THEMES,
    GROUPS: GROUPS,
    TILES: TILES,
    TEMPLATES: TEMPLATES,
    templateCells: templateCells,
    template: templateById,
    pack: pack,
    use: use,
    resize: resize,
    groundId: function () { return THEMES[theme].ground; },
    normalize: normalize,
    cell: cell,
    walkable: walkable,
    interactKind: interactKind,
    astar: astar,
    nearestStand: nearestStand,
    startTile: startTile,
    same: same,
    foot: foot,
    draw: draw,
    paintPreview: paintPreview
  };

  function publish() {
    api.COLS = cols;
    api.ROWS = rows;
    api.WORLD_W = cols * TILE;
    api.WORLD_H = PAD + rows * TILE;
    api.theme = theme;
  }

  publish();
  root.Realm = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
