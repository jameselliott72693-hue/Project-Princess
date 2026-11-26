(function (root) {
  const Paint = root.Paint;

  const SKINS = ["#f6d3c2", "#f0c2a8", "#e8b99a", "#d4956c", "#c4845a", "#a86b45", "#8d5a3c", "#6e422c", "#5a3424", "#3c2418", "#f3d5b5", "#e6c39a", "#c9a27a", "#a67c52", "#7a5340", "#4a332c"];
  const HAIR_COLORS = ["#1c1a1a", "#3b2a24", "#5c3a2e", "#7a4b32", "#a15c38", "#c47a3a", "#e0b15a", "#f3e1b3", "#efe8e2", "#c45b6a", "#d4789a", "#8e6bb8", "#5b6fbf", "#3e8e86", "#6b2d3c", "#2c1810"];
  const EYE_COLORS = ["#3d2b1f", "#6b4423", "#2f6b3a", "#3e6f9a", "#6a5acd", "#8b6b4a", "#1f3a4d", "#7eb0c8", "#4a7c59", "#9a5a3c"];
  const DRESS_COLORS = ["#e25b7a", "#f2849a", "#f2a0c0", "#c77dff", "#7c6bf2", "#3e7cb1", "#5ebeb0", "#3e9a6a", "#f2c14e", "#f29a4a", "#e07a5f", "#fff6ea", "#5a3144", "#c23b4a", "#8e3d5b", "#7b4b8a"];
  const ACCENT_COLORS = ["#f2c14e", "#fff6ea", "#e25b7a", "#7ec8ea", "#c77dff", "#3e9a6a", "#c4844a", "#f7f3ee"];
  const SHOE_COLORS = ["#f2c14e", "#e25b7a", "#fff6ea", "#c4844a", "#7c6bf2", "#3e7cb1", "#5a3144", "#d7dee8", "#3e9a6a", "#f2849a"];
  const CROWN_COLORS = ["#e8b84a", "#f7e7a1", "#d7dee8", "#c0c7d1", "#f2a0c0", "#e25b7a", "#7ec8ea", "#c77dff", "#fff6ea", "#7bc67e"];
  const CAPE_COLORS = ["#7c4dff", "#e25b7a", "#c23b4a", "#3e7cb1", "#3e9a6a", "#f2c14e", "#5a3144", "#f2849a", "#6b4b3e", "#7eb6d6"];
  const WAND_COLORS = ["#e8b84a", "#f2849a", "#c77dff", "#7ec8ea", "#fff6ea", "#7bc67e", "#e25b7a", "#f7e7a1"];
  const GEM_COLORS = ["#7ec8ea", "#f2849a", "#c77dff", "#3e9a6a", "#e8b84a", "#fff6ea", "#e25b7a", "#5b6fbf"];
  const PET_COLORS = ["#e8a87c", "#f7f3ee", "#8a8f99", "#2c2430", "#c4844a", "#f2849a", "#7bc67e", "#c77dff", "#e8b84a", "#7ec8ea"];
  const EXTRA_COLORS = ["#e25b7a", "#f2c14e", "#7ec8ea", "#c77dff", "#fff6ea", "#7bc67e", "#f2849a", "#3e7cb1"];

  const FACES = [
    { id: "round", label: "Round" },
    { id: "oval", label: "Oval" },
    { id: "heart", label: "Heart" },
    { id: "soft", label: "Soft" }
  ];
  const EXPRESSIONS = [
    { id: "smile", label: "Smile" },
    { id: "grin", label: "Grin" },
    { id: "wink", label: "Wink" },
    { id: "calm", label: "Calm" },
    { id: "joy", label: "Joy" },
    { id: "shy", label: "Shy" }
  ];
  const HAIRS = [
    { id: "long", label: "Long" },
    { id: "wavy", label: "Wavy" },
    { id: "curly", label: "Curly" },
    { id: "coily", label: "Coily" },
    { id: "braids", label: "Braids" },
    { id: "sidebraid", label: "Side braid" },
    { id: "bun", label: "Bun" },
    { id: "buns", label: "Twin buns" },
    { id: "bob", label: "Bob" },
    { id: "pixie", label: "Pixie" },
    { id: "pony", label: "Ponytail" },
    { id: "twists", label: "Twists" },
    { id: "halo", label: "Halo braid" }
  ];
  const OUTFITS = [
    { id: "gown", label: "Ball gown", color: "#e25b7a", accent: "#f2c14e", length: "long", sleeve: "puff" },
    { id: "tea", label: "Tea dress", color: "#f2849a", accent: "#fff6ea", length: "medium", sleeve: "puff-big" },
    { id: "petal", label: "Petal gown", color: "#d96bb3", accent: "#f2c14e", length: "long", sleeve: "puff" },
    { id: "adventure", label: "Adventure", color: "#3e9a6a", accent: "#c4844a", length: "short", sleeve: "short" },
    { id: "explorer", label: "Explorer", color: "#c47a3a", accent: "#f4e3c8", length: "short", sleeve: "short" },
    { id: "knight", label: "Knight", color: "#c5d0dc", accent: "#e8b84a", length: "short", sleeve: "armor" },
    { id: "pastel", label: "Soft armor", color: "#e4c4f2", accent: "#f2c14e", length: "short", sleeve: "armor" },
    { id: "star", label: "Star robe", color: "#5c6bc0", accent: "#f2c14e", length: "long", sleeve: "wide" },
    { id: "picnic", label: "Picnic", color: "#e25b7a", accent: "#fff6ea", length: "medium", sleeve: "puff" },
    { id: "coat", label: "Coat", color: "#7b4b8a", accent: "#f2b6c6", length: "long", sleeve: "long" },
    { id: "garden", label: "Garden", color: "#7bc67e", accent: "#fff6ea", length: "medium", sleeve: "puff" },
    { id: "royal", label: "Royal robe", color: "#8e3d5b", accent: "#f2c14e", length: "long", sleeve: "wide" },
    { id: "sailor", label: "Sailor", color: "#3e7cb1", accent: "#fff6ea", length: "medium", sleeve: "short" },
    { id: "spark", label: "Spark suit", color: "#f29a4a", accent: "#5c6bc0", length: "short", sleeve: "fitted" },
    { id: "blossom", label: "Blossom", color: "#f2849a", accent: "#f2c14e", length: "long", sleeve: "puff" },
    { id: "frost", label: "Frost", color: "#d7eef8", accent: "#7ec8ea", length: "long", sleeve: "long" },
    { id: "night", label: "Pajamas", color: "#5c6bc0", accent: "#f2c14e", length: "short", sleeve: "fitted" },
    { id: "festival", label: "Festival", color: "#e25b7a", accent: "#f2c14e", length: "long", sleeve: "puff" }
  ];
  const SHOES = [
    { id: "slippers", label: "Slippers" },
    { id: "boots", label: "Boots" },
    { id: "sandals", label: "Sandals" },
    { id: "walkers", label: "Shoes" },
    { id: "sabatons", label: "Armor" }
  ];
  const CROWNS = [
    { id: "none", label: "None" },
    { id: "tiara", label: "Tiara" },
    { id: "flowers", label: "Flowers" },
    { id: "tall", label: "Tall crown" },
    { id: "circlet", label: "Circlet" },
    { id: "star", label: "Star" }
  ];
  const PETS = [
    { id: "none", label: "None" },
    { id: "cat", label: "Cat" },
    { id: "pup", label: "Pup" },
    { id: "dragon", label: "Dragon" },
    { id: "bird", label: "Bird" },
    { id: "bunny", label: "Bunny" }
  ];
  const EXTRAS = [
    { id: "none", label: "None" },
    { id: "bow", label: "Bow" },
    { id: "flower", label: "Flower" }
  ];
  const NAMES = ["Sunny", "Pip", "Luna", "Clover", "Birdie", "Nia", "Amina", "Hana", "Rosa", "Willa", "Noor", "Imani", "Lila", "Bea", "June", "Poppy", "Freya", "Marigold", "Tess", "Goldie", "Asha", "Mei", "Leila", "Sora", "Nell", "Priya", "Elise", "Noa", "Zuri", "Alma"];
  const CROWN_Y = {
    long: 90, wavy: 88, curly: 64, coily: 40, braids: 90, sidebraid: 90,
    bun: 70, buns: 84, bob: 92, pixie: 100, pony: 86, twists: 92, halo: 56
  };
  const SIGN_FIELDS = ["name", "skin", "face", "expression", "eye", "hair", "hairColor", "hairExtra", "extraColor", "outfit", "outfitColor", "outfitAccent", "shoes", "shoeColor", "crown", "crownColor", "cape", "capeColor", "wand", "wandColor", "necklace", "earrings", "gemColor", "pet", "petColor"];

  const DEFAULT = {
    name: "Sunny",
    skin: "#d4956c",
    face: "round",
    expression: "smile",
    eye: "#3e6f9a",
    hair: "wavy",
    hairColor: "#3b2a24",
    hairExtra: "none",
    extraColor: "#e25b7a",
    outfit: "gown",
    outfitColor: "#e25b7a",
    outfitAccent: "#f2c14e",
    shoes: "slippers",
    shoeColor: "#f2c14e",
    crown: "tiara",
    crownColor: "#e8b84a",
    cape: false,
    capeColor: "#7c4dff",
    wand: false,
    wandColor: "#e8b84a",
    necklace: false,
    earrings: false,
    gemColor: "#7ec8ea",
    pet: "none",
    petColor: "#e8a87c"
  };

  let seq = 1;

  function oneOf(list, id, fallback) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return id;
    }
    return fallback;
  }

  function colorOf(value, fallback) {
    return Paint.validHex(value) ? value.toLowerCase() : fallback;
  }

  function normalize(raw) {
    const p = Object.assign({}, DEFAULT);
    const src = raw && typeof raw === "object" ? raw : {};
    if (typeof src.name === "string") p.name = src.name.replace(/[\r\n\t]/g, " ").slice(0, 20);
    p.skin = colorOf(src.skin, p.skin);
    p.face = oneOf(FACES, src.face, p.face);
    p.expression = oneOf(EXPRESSIONS, src.expression, p.expression);
    p.eye = colorOf(src.eye, p.eye);
    p.hair = oneOf(HAIRS, src.hair, p.hair);
    p.hairColor = colorOf(src.hairColor, p.hairColor);
    p.hairExtra = oneOf(EXTRAS, src.hairExtra, p.hairExtra);
    p.extraColor = colorOf(src.extraColor, p.extraColor);
    p.outfit = oneOf(OUTFITS, src.outfit, p.outfit);
    p.outfitColor = colorOf(src.outfitColor, p.outfitColor);
    p.outfitAccent = colorOf(src.outfitAccent, p.outfitAccent);
    p.shoes = oneOf(SHOES, src.shoes, p.shoes);
    p.shoeColor = colorOf(src.shoeColor, p.shoeColor);
    p.crown = oneOf(CROWNS, src.crown, p.crown);
    p.crownColor = colorOf(src.crownColor, p.crownColor);
    p.cape = !!src.cape;
    p.capeColor = colorOf(src.capeColor, p.capeColor);
    p.wand = !!src.wand;
    p.wandColor = colorOf(src.wandColor, p.wandColor);
    p.necklace = !!src.necklace;
    p.earrings = !!src.earrings;
    p.gemColor = colorOf(src.gemColor, p.gemColor);
    p.pet = oneOf(PETS, src.pet, p.pet);
    p.petColor = colorOf(src.petColor, p.petColor);
    return p;
  }

  function displayName(p) {
    const name = Paint.cleanName(p && p.name);
    return name || "Princess";
  }

  function signature(p) {
    const n = normalize(p);
    const slim = {};
    SIGN_FIELDS.forEach(function (key) { slim[key] = n[key]; });
    slim.name = Paint.cleanName(n.name);
    return JSON.stringify(slim);
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function randomize(current) {
    const outfit = pick(OUTFITS);
    const useOutfitColors = Math.random() < 0.7;
    return normalize({
      name: current && current.name ? current.name : DEFAULT.name,
      skin: pick(SKINS),
      face: pick(FACES).id,
      expression: pick(EXPRESSIONS).id,
      eye: pick(EYE_COLORS),
      hair: pick(HAIRS).id,
      hairColor: pick(HAIR_COLORS),
      hairExtra: Math.random() < 0.5 ? pick(["bow", "flower"]) : "none",
      extraColor: pick(EXTRA_COLORS),
      outfit: outfit.id,
      outfitColor: useOutfitColors ? outfit.color : pick(DRESS_COLORS),
      outfitAccent: useOutfitColors ? outfit.accent : pick(ACCENT_COLORS),
      shoes: pick(SHOES).id,
      shoeColor: pick(SHOE_COLORS),
      crown: pick(CROWNS).id,
      crownColor: pick(CROWN_COLORS),
      cape: Math.random() < 0.55,
      capeColor: pick(CAPE_COLORS),
      wand: Math.random() < 0.45,
      wandColor: pick(WAND_COLORS),
      necklace: Math.random() < 0.5,
      earrings: Math.random() < 0.4,
      gemColor: pick(GEM_COLORS),
      pet: Math.random() < 0.72 ? pick(["cat", "pup", "dragon", "bird", "bunny"]) : "none",
      petColor: pick(PET_COLORS)
    });
  }

  function capsule(x1, y1, x2, y2, r) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const px = (-dy / len) * r;
    const py = (dx / len) * r;
    return "M " + (x1 + px) + " " + (y1 + py) +
      " L " + (x2 + px) + " " + (y2 + py) +
      " A " + r + " " + r + " 0 0 1 " + (x2 - px) + " " + (y2 - py) +
      " L " + (x1 - px) + " " + (y1 - py) +
      " A " + r + " " + r + " 0 0 1 " + (x1 + px) + " " + (y1 + py) + " Z";
  }

  function sparkle(x, y, s, fill) {
    return '<path d="M ' + x + " " + (y - s) +
      " L " + (x + s * 0.28) + " " + (y - s * 0.28) +
      " L " + (x + s) + " " + y +
      " L " + (x + s * 0.28) + " " + (y + s * 0.28) +
      " L " + x + " " + (y + s) +
      " L " + (x - s * 0.28) + " " + (y + s * 0.28) +
      " L " + (x - s) + " " + y +
      " L " + (x - s * 0.28) + " " + (y - s * 0.28) +
      ' Z" fill="' + fill + '"/>';
  }

  function flowerShape(cx, cy, r, fill, center) {
    let out = "";
    for (let i = 0; i < 5; i++) {
      const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      out += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (r * 0.72).toFixed(1) + '" fill="' + fill + '"/>';
    }
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.55).toFixed(1) + '" fill="' + center + '"/>';
    return out;
  }

  function heart(x, y, s, fill) {
    return '<path d="M ' + x + " " + (y + s) +
      " C " + (x - s) + " " + y + " " + (x - s * 1.3) + " " + (y - s) + " " + x + " " + (y - s * 0.3) +
      " C " + (x + s * 1.3) + " " + (y - s) + " " + (x + s) + " " + y + " " + x + " " + (y + s) +
      ' Z" fill="' + fill + '"/>';
  }

  function faceLayout(face) {
    if (face === "oval") return { eyeY: 172, eyeDX: 22, mouthY: 208, blushY: 192 };
    if (face === "heart") return { eyeY: 170, eyeDX: 23, mouthY: 202, blushY: 188 };
    if (face === "soft") return { eyeY: 180, eyeDX: 28, mouthY: 210, blushY: 198 };
    return { eyeY: 176, eyeDX: 26, mouthY: 206, blushY: 194 };
  }

  function faceShape(p, skin, shadow) {
    if (p.face === "oval") {
      return '<ellipse cx="200" cy="176" rx="56" ry="80" fill="' + skin + '"/><ellipse cx="200" cy="206" rx="38" ry="26" fill="' + shadow + '" opacity="0.16"/>';
    }
    if (p.face === "soft") {
      return '<rect x="126" y="114" width="148" height="132" rx="58" fill="' + skin + '"/><ellipse cx="200" cy="214" rx="50" ry="20" fill="' + shadow + '" opacity="0.14"/>';
    }
    if (p.face === "heart") {
      return '<path d="M200 252 C148 220 126 178 146 148 C160 122 188 126 200 150 C212 126 240 122 254 148 C274 178 252 220 200 252 Z" fill="' + skin + '"/><ellipse cx="200" cy="214" rx="34" ry="16" fill="' + shadow + '" opacity="0.14"/>';
    }
    return '<ellipse cx="200" cy="178" rx="68" ry="72" fill="' + skin + '"/><ellipse cx="200" cy="214" rx="46" ry="22" fill="' + shadow + '" opacity="0.15"/>';
  }

  function eye(cx, cy, color, closed, shift) {
    if (closed) {
      return '<path d="M ' + (cx - 16) + " " + cy + " Q " + cx + " " + (cy + 12) + " " + (cx + 16) + " " + cy + '" fill="none" stroke="#4a3040" stroke-width="3.5" stroke-linecap="round"/>';
    }
    const dx = shift || 0;
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="15" ry="17" fill="#fff"/>' +
      '<ellipse cx="' + (cx + dx) + '" cy="' + (cy + 1) + '" rx="9" ry="11" fill="' + color + '"/>' +
      '<ellipse cx="' + (cx + dx) + '" cy="' + (cy + 2) + '" rx="4.6" ry="5.6" fill="#2c2430"/>' +
      '<circle cx="' + (cx + dx - 3.5) + '" cy="' + (cy - 5) + '" r="2.6" fill="#fff"/>' +
      '<path d="M ' + (cx - 15) + " " + (cy - 8) + " Q " + cx + " " + (cy - 18) + " " + (cx + 16) + " " + (cy - 6) + '" fill="none" stroke="#4a3040" stroke-width="2.3" stroke-linecap="round"/>';
  }

  function mouth(x, y, expression) {
    if (expression === "calm" || expression === "shy") {
      const w = expression === "shy" ? 10 : 12;
      return '<path d="M ' + (x - w) + " " + y + " Q " + x + " " + (y + 8) + " " + (x + w) + " " + y + '" fill="none" stroke="#a85a68" stroke-width="3" stroke-linecap="round"/>';
    }
    if (expression === "grin") {
      return '<path d="M ' + (x - 18) + " " + (y - 2) + " Q " + x + " " + (y + 22) + " " + (x + 18) + " " + (y - 2) + " Q " + x + " " + (y + 8) + " " + (x - 18) + " " + (y - 2) + ' Z" fill="#fff"/>' +
        '<path d="M ' + (x - 18) + " " + y + " Q " + x + " " + (y + 20) + " " + (x + 18) + " " + y + '" fill="none" stroke="#a85a68" stroke-width="3.2" stroke-linecap="round"/>';
    }
    if (expression === "joy") {
      return '<ellipse cx="' + x + '" cy="' + (y + 8) + '" rx="14" ry="11" fill="#c45b6c"/>' +
        '<ellipse cx="' + x + '" cy="' + (y + 12) + '" rx="8" ry="5" fill="#f0a0ae"/>' +
        '<path d="M ' + (x - 16) + " " + y + " Q " + x + " " + (y + 16) + " " + (x + 16) + " " + y + '" fill="none" stroke="#a85a68" stroke-width="3" stroke-linecap="round"/>';
    }
    return '<path d="M ' + (x - 16) + " " + y + " Q " + x + " " + (y + 16) + " " + (x + 16) + " " + y + '" fill="none" stroke="#a85a68" stroke-width="3.4" stroke-linecap="round"/>';
  }

  function brows(layout, expression) {
    const y = layout.eyeY - 26;
    const lift = expression === "joy" ? -4 : 0;
    const shy = expression === "shy" ? -3 : 0;
    return '<path d="M ' + (200 - layout.eyeDX - 12) + " " + (y + lift + shy) + " Q " + (200 - layout.eyeDX) + " " + (y - 6 + lift) + " " + (200 - layout.eyeDX + 12) + " " + (y + lift) + '" fill="none" stroke="#4a3040" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="M ' + (200 + layout.eyeDX - 12) + " " + (y + lift) + " Q " + (200 + layout.eyeDX) + " " + (y - 6 + lift) + " " + (200 + layout.eyeDX + 12) + " " + (y + lift) + '" fill="none" stroke="#4a3040" stroke-width="2.6" stroke-linecap="round"/>';
  }

  function hairTone(color) {
    return {
      c: color,
      d: Paint.mix(color, "#1a1210", 0.34),
      m: Paint.mix(color, "#1a1210", 0.16),
      l: Paint.lighten(color, 0.32)
    };
  }

  function hairInk(uid, color) {
    const id = uid + "hf";
    const tone = hairTone(color);
    return {
      defs: '<linearGradient id="' + id + '" x1="0.15" y1="0" x2="0.7" y2="1">' +
        '<stop offset="0" stop-color="' + Paint.lighten(color, 0.24) + '"/>' +
        '<stop offset="0.4" stop-color="' + color + '"/>' +
        '<stop offset="1" stop-color="' + tone.d + '"/></linearGradient>',
      fill: "url(#" + id + ")",
      c: tone.c,
      d: tone.d,
      m: tone.m,
      l: tone.l
    };
  }

  function hairCap(fill) {
    return '<path d="M122 190 C112 128 150 82 200 78 C250 82 288 128 278 190 C254 158 228 144 200 146 C172 144 146 158 122 190 Z" fill="' + fill + '"/>';
  }

  function bangsSoft(fill) {
    return '<path d="M156 132 C164 110 182 98 200 100 C218 98 236 110 244 132 C226 120 214 126 200 118 C186 126 174 120 156 132 Z" fill="' + fill + '"/>';
  }

  function bangsFull(fill) {
    return '<path d="M148 134 C154 106 176 94 200 94 C224 94 246 106 252 134 C232 120 218 128 200 118 C182 128 168 120 148 134 Z" fill="' + fill + '"/>';
  }

  function bangsSwept(fill) {
    return '<path d="M150 130 C164 104 196 92 230 112 C244 122 242 136 226 136 C206 122 184 132 164 126 C152 134 148 132 150 130 Z" fill="' + fill + '"/>';
  }

  function bangsShort(fill) {
    return '<path d="M166 128 C174 108 186 98 200 100 C214 98 226 108 234 128 C220 118 210 124 200 116 C190 124 180 118 166 128 Z" fill="' + fill + '"/>';
  }

  function lockStraight(side, fill) {
    if (side < 0) {
      return '<path d="M128 168 C112 198 98 246 100 306 C102 354 116 392 132 400 C148 406 158 386 150 360 C140 318 136 268 136 226 C136 196 140 176 128 168 Z" fill="' + fill + '"/>';
    }
    return '<path d="M272 168 C288 198 302 246 300 306 C298 354 284 392 268 400 C252 406 242 386 250 360 C260 318 264 268 264 226 C264 196 260 176 272 168 Z" fill="' + fill + '"/>';
  }

  function waveLock(side, fill) {
    const sign = side < 0 ? -1 : 1;
    const x0 = 200 + sign * 84;
    const y0 = 166;
    const y1 = 408;
    const amp = 22;
    const steps = 32;
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = y0 + (y1 - y0) * t;
      const x = x0 + sign * Math.sin(t * Math.PI * 2.5) * amp;
      pts.push([x, y]);
    }
    const left = [];
    const right = [];
    for (let i = 0; i < pts.length; i++) {
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      let dx = next[0] - prev[0];
      let dy = next[1] - prev[1];
      const len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;
      const w = 15 * (1 - (i / steps) * 0.28);
      left.push([pts[i][0] - dy * w, pts[i][1] + dx * w]);
      right.push([pts[i][0] + dy * w, pts[i][1] - dx * w]);
    }
    let d = "M " + left[0][0].toFixed(1) + " " + left[0][1].toFixed(1);
    for (let i = 1; i < left.length; i++) d += " L " + left[i][0].toFixed(1) + " " + left[i][1].toFixed(1);
    const tip = pts[pts.length - 1];
    d += " Q " + tip[0].toFixed(1) + " " + (tip[1] + 16).toFixed(1) + " " + right[right.length - 1][0].toFixed(1) + " " + right[right.length - 1][1].toFixed(1);
    for (let i = right.length - 2; i >= 0; i--) d += " L " + right[i][0].toFixed(1) + " " + right[i][1].toFixed(1);
    return '<path d="' + d + ' Z" fill="' + fill + '"/>';
  }

  function longSheet(fill) {
    return '<path d="M134 164 C118 132 158 86 200 82 C242 86 282 132 266 164 C282 236 294 332 278 424 C264 496 234 518 200 512 C166 518 136 496 122 424 C106 332 118 236 134 164 Z" fill="' + fill + '"/>';
  }

  function wavySheet(fill) {
    return '<path d="M132 166 C114 128 158 82 200 78 C242 82 286 128 268 166 C284 230 292 320 276 408 C264 478 236 514 200 510 C164 514 136 478 124 408 C108 320 116 230 132 166 Z" fill="' + fill + '"/>';
  }

  function cloud(cx, cy, rx, ry, bumps, puff, fill) {
    let d = "";
    for (let i = 0; i < bumps; i++) {
      const a1 = (Math.PI * 2 * (i + 0.5)) / bumps;
      const a2 = (Math.PI * 2 * (i + 1)) / bumps;
      const x = cx + Math.cos(a1) * rx * puff;
      const y = cy + Math.sin(a1) * ry * puff;
      const x2 = cx + Math.cos(a2) * rx;
      const y2 = cy + Math.sin(a2) * ry;
      if (i === 0) d += "M " + (cx + rx).toFixed(1) + " " + cy.toFixed(1) + " ";
      d += "Q " + x.toFixed(1) + " " + y.toFixed(1) + " " + x2.toFixed(1) + " " + y2.toFixed(1) + " ";
    }
    return '<path d="' + d + 'Z" fill="' + fill + '"/>';
  }

  function hairTie(x, y, color) {
    return '<rect x="' + (x - 11) + '" y="' + (y - 5) + '" width="22" height="10" rx="5" fill="' + color + '"/>';
  }

  function braid(x0, y0, x1, y1, bend, ink, tie) {
    const mx = (x0 + x1) / 2 + bend;
    const my = (y0 + y1) / 2;
    return '<path d="M ' + x0 + " " + y0 + " Q " + mx.toFixed(1) + " " + my.toFixed(1) + " " + x1 + " " + y1 + '" fill="none" stroke="' + ink.c + '" stroke-width="18" stroke-linecap="round"/>' +
      '<path d="M ' + (x1 - 7) + " " + (y1 + 1) + " Q " + x1 + " " + (y1 + 22) + " " + (x1 + 7) + " " + (y1 + 2) +
      " Q " + x1 + " " + (y1 + 12) + " " + (x1 - 7) + " " + (y1 + 1) + ' Z" fill="' + ink.c + '"/>' +
      hairTie(x1, y1, tie);
  }

  function twistRibbon(x, y0, y1, color, phase) {
    const span = y1 - y0;
    const yA = y0 + span * 0.33;
    const yB = y0 + span * 0.66;
    const a = Math.sin(phase) * 9;
    const b = Math.sin(phase + 1.6) * 9;
    return '<path d="M ' + x + " " + y0 + " C " + (x + a).toFixed(1) + " " + yA.toFixed(1) + " " + (x - b).toFixed(1) + " " + yB.toFixed(1) + " " + (x + a * 0.25).toFixed(1) + " " + y1 + '" fill="none" stroke="' + color + '" stroke-width="7" stroke-linecap="round"/>';
  }

  function haloBand(fill) {
    return '<path d="M134 116 C146 84 170 70 200 70 C230 70 254 84 266 116 C246 98 224 90 200 92 C176 90 154 98 134 116 Z" fill="' + fill + '"/>';
  }

  function sideWisp(side, fill) {
    if (side < 0) {
      return '<path d="M136 168 C126 188 128 208 140 214 C148 206 146 186 140 172 Z" fill="' + fill + '"/>';
    }
    return '<path d="M264 168 C274 188 272 208 260 214 C252 206 254 186 260 172 Z" fill="' + fill + '"/>';
  }

  function layersOf(back, mid, front, defs) {
    return { back: back || "", mid: mid || "", front: front || "", defs: defs || "" };
  }

  function hairLayers(p, uid) {
    const ink = hairInk(uid, p.hairColor);
    const tie = p.outfitAccent;
    const cap = hairCap(ink.fill);
    switch (p.hair) {
      case "long":
        return layersOf(
          longSheet(ink.fill),
          lockStraight(-1, ink.c) + lockStraight(1, ink.c),
          bangsFull(ink.c),
          ink.defs
        );
      case "wavy":
        return layersOf(
          wavySheet(ink.fill),
          waveLock(-1, ink.c) + waveLock(1, ink.c),
          bangsSwept(ink.c),
          ink.defs
        );
      case "curly":
        return layersOf(
          cloud(200, 156, 90, 80, 14, 1.12, ink.fill),
          "",
          bangsSoft(ink.c),
          ink.defs
        );
      case "coily":
        return layersOf(
          cloud(200, 150, 108, 98, 16, 1.1, ink.fill),
          "",
          bangsShort(ink.c),
          ink.defs
        );
      case "braids":
        return layersOf(
          cap +
            '<path d="M150 158 Q132 186 114 214" fill="none" stroke="' + ink.fill + '" stroke-width="16" stroke-linecap="round"/>' +
            '<path d="M250 158 Q268 186 286 214" fill="none" stroke="' + ink.fill + '" stroke-width="16" stroke-linecap="round"/>',
          braid(114, 210, 102, 430, -12, ink, tie) + braid(286, 210, 298, 430, 12, ink, tie),
          bangsSoft(ink.c),
          ink.defs
        );
      case "sidebraid":
        return layersOf(
          cap + '<path d="M228 146 Q266 172 292 208" fill="none" stroke="' + ink.fill + '" stroke-width="16" stroke-linecap="round"/>',
          braid(292, 204, 312, 418, 14, ink, tie),
          bangsSwept(ink.c),
          ink.defs
        );
      case "bun":
        return layersOf(
          cap +
            '<circle cx="200" cy="68" r="28" fill="' + ink.fill + '"/>' +
            '<path d="M174 94 Q200 108 226 94" fill="none" stroke="' + ink.c + '" stroke-width="7" stroke-linecap="round"/>' +
            sideWisp(-1, ink.c) + sideWisp(1, ink.c),
          "",
          bangsShort(ink.c),
          ink.defs
        );
      case "buns":
        return layersOf(
          cap +
            '<path d="M164 124 C148 108 136 96 128 98" fill="none" stroke="' + ink.fill + '" stroke-width="14" stroke-linecap="round"/>' +
            '<path d="M236 124 C252 108 264 96 272 98" fill="none" stroke="' + ink.fill + '" stroke-width="14" stroke-linecap="round"/>' +
            '<circle cx="128" cy="96" r="26" fill="' + ink.fill + '"/><circle cx="272" cy="96" r="26" fill="' + ink.fill + '"/>',
          "",
          bangsFull(ink.c),
          ink.defs
        );
      case "bob":
        return layersOf(
          '<path d="M126 164 C114 130 154 92 200 88 C246 92 286 130 274 164 C290 208 284 256 248 278 C226 294 212 262 200 256 C188 262 174 294 152 278 C116 256 110 208 126 164 Z" fill="' + ink.fill + '"/>',
          "",
          bangsFull(ink.c),
          ink.defs
        );
      case "pixie":
        return layersOf(
          '<path d="M144 178 C138 140 164 112 200 108 C236 112 262 140 256 178 C242 160 222 150 200 152 C178 150 158 160 144 178 Z" fill="' + ink.fill + '"/>' +
            '<path d="M248 136 C274 126 280 158 258 166 C248 154 246 144 248 136 Z" fill="' + ink.c + '"/>',
          "",
          bangsSwept(ink.c),
          ink.defs
        );
      case "pony":
        return layersOf(
          cap + '<path d="M222 118 C252 108 272 132 286 158" fill="none" stroke="' + ink.fill + '" stroke-width="18" stroke-linecap="round"/>',
          '<path d="M286 152 C312 170 326 222 310 288 C298 342 322 374 302 394 C284 410 270 382 280 342 C292 292 276 214 280 170 C286 156 278 148 286 152 Z" fill="' + ink.fill + '"/>' +
            hairTie(292, 164, tie),
          bangsShort(ink.c),
          ink.defs
        );
      case "twists": {
        let back = cap;
        [[100, 0.4, 22], [118, 1.7, 0]].forEach(function (item) {
          back += twistRibbon(item[0], 188, 360 + item[2], ink.c, item[1]);
        });
        [[282, 0.9, 0], [300, 2.2, 18]].forEach(function (item) {
          back += twistRibbon(item[0], 188, 368 + item[2], ink.c, item[1]);
        });
        return layersOf(back, "", bangsShort(ink.c), ink.defs);
      }
      case "halo":
        return layersOf(
          hairCap(ink.fill),
          "",
          haloBand(ink.fill),
          ink.defs
        );
      default:
        return layersOf(wavySheet(ink.fill), waveLock(-1, ink.c) + waveLock(1, ink.c), bangsSwept(ink.c), ink.defs);
    }
  }

  function legs(skin, length) {
    if (length === "long") return "";
    const y0 = length === "medium" ? 430 : 368;
    return '<path d="' + capsule(168, y0, 160, 482, 12) + '" fill="' + skin + '"/><path d="' + capsule(232, y0, 240, 482, 12) + '" fill="' + skin + '"/>';
  }

  function shoe(cx, kind, color, full) {
    const sole = Paint.darken(color, 0.28);
    const hi = Paint.lighten(color, 0.32);
    if (!full) {
      if (kind === "boots" || kind === "sabatons") {
        return '<path d="M ' + (cx - 14) + ' 486 Q ' + cx + " 476 " + (cx + 18) + " 490 Q " + (cx + 6) + " 504 " + (cx - 14) + ' 500 Z" fill="' + color + '"/>';
      }
      return '<ellipse cx="' + cx + '" cy="494" rx="16" ry="9" fill="' + color + '"/>' +
        (kind === "slippers" ? '<path d="M ' + (cx - 5) + " 486 Q " + cx + " 480 " + (cx + 5) + ' 486" fill="none" stroke="' + hi + '" stroke-width="2"/>' : "");
    }
    if (kind === "slippers") {
      return '<ellipse cx="' + cx + '" cy="490" rx="18" ry="11" fill="' + color + '"/><path d="M ' + (cx - 7) + " 478 Q " + cx + " 470 " + (cx + 7) + " 478 Q " + cx + " 484 " + (cx - 7) + ' 478 Z" fill="' + hi + '"/>';
    }
    if (kind === "boots") {
      return '<path d="M ' + (cx - 14) + " 428 H " + (cx + 14) + " Q " + (cx + 18) + " 468 " + (cx + 20) + " 494 H " + (cx - 18) + " Q " + (cx - 18) + " 456 " + (cx - 14) + ' 428 Z" fill="' + color + '"/><rect x="' + (cx - 14) + '" y="428" width="28" height="10" rx="4" fill="' + hi + '"/><path d="M ' + (cx - 18) + " 492 H " + (cx + 22) + " Q " + (cx + 8) + " 508 " + (cx - 16) + ' 502 Z" fill="' + sole + '"/>';
    }
    if (kind === "sandals") {
      return '<path d="M ' + (cx - 16) + " 494 H " + (cx + 18) + " Q " + (cx + 8) + " 506 " + (cx - 14) + ' 502 Z" fill="' + sole + '"/><path d="M ' + (cx - 10) + " 476 Q " + cx + " 492 " + (cx + 12) + ' 478" fill="none" stroke="' + color + '" stroke-width="3.2" stroke-linecap="round"/><path d="M ' + (cx - 4) + " 466 Q " + cx + " 486 " + (cx + 8) + ' 470" fill="none" stroke="' + color + '" stroke-width="3.2" stroke-linecap="round"/>';
    }
    if (kind === "sabatons") {
      return '<path d="M ' + (cx - 16) + " 446 H " + (cx + 14) + " Q " + (cx + 24) + " 478 " + (cx + 22) + " 498 H " + (cx - 16) + " Q " + (cx - 18) + " 470 " + (cx - 16) + ' 446 Z" fill="' + color + '"/><path d="M ' + (cx + 10) + " 468 Q " + (cx + 30) + " 478 " + (cx + 16) + ' 498" fill="none" stroke="' + hi + '" stroke-width="3" stroke-linecap="round"/><circle cx="' + cx + '" cy="458" r="3" fill="' + hi + '"/>';
    }
    return '<path d="M ' + (cx - 16) + " 468 H " + (cx + 12) + " Q " + (cx + 24) + " 478 " + (cx + 22) + " 498 H " + (cx - 16) + " Q " + (cx - 20) + " 480 " + (cx - 16) + ' 468 Z" fill="' + color + '"/><path d="M ' + (cx - 16) + " 492 H " + (cx + 24) + " Q " + (cx + 8) + " 508 " + (cx - 14) + ' 502 Z" fill="' + sole + '"/><circle cx="' + (cx - 4) + '" cy="478" r="1.7" fill="' + hi + '"/><circle cx="' + (cx + 3) + '" cy="478" r="1.7" fill="' + hi + '"/>';
  }

  function shoes(p, length) {
    const full = length !== "long";
    const centers = full ? [150, 250] : [176, 224];
    return shoe(centers[0], p.shoes, p.shoeColor, full) + shoe(centers[1], p.shoes, p.shoeColor, full);
  }

  function drawGown(p, uid) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    const g = uid + "g";
    return '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + Paint.lighten(c, 0.22) + '"/><stop offset="0.55" stop-color="' + c + '"/><stop offset="1" stop-color="' + Paint.darken(c, 0.18) + '"/></linearGradient></defs>' +
      '<path d="M158 332 C112 392 64 454 70 500 H330 C336 454 288 392 242 332 Q200 350 158 332 Z" fill="url(#' + g + ')"/>' +
      '<path d="M200 344 C236 400 276 452 304 500 H330 C300 444 252 384 230 338 Z" fill="' + Paint.darken(c, 0.2) + '" opacity="0.28"/>' +
      '<path d="M168 270 C164 304 166 324 160 338 H240 C234 324 236 304 232 270 Q200 296 168 270 Z" fill="' + c + '"/>' +
      '<path d="M176 282 Q200 306 224 282" fill="none" stroke="' + Paint.lighten(c, 0.3) + '" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M158 328 Q200 346 242 328" fill="none" stroke="' + a + '" stroke-width="8" stroke-linecap="round"/>' +
      sparkle(124, 430, 7, Paint.lighten(c, 0.45)) + sparkle(274, 458, 6, a) + sparkle(186, 472, 5, "#fff");
  }

  function drawTea(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    return '<path d="M150 338 C118 386 96 424 102 458 H298 C304 424 282 386 250 338 Q200 356 150 338 Z" fill="' + c + '"/>' +
      '<path d="M168 270 C164 304 168 328 156 344 H244 C232 328 236 304 232 270 Q200 296 168 270 Z" fill="' + c + '"/>' +
      '<path d="M158 292 Q200 318 242 292 Q200 270 158 292 Z" fill="' + a + '"/>' +
      '<path d="M148 334 Q200 352 252 334" fill="none" stroke="' + a + '" stroke-width="6" stroke-linecap="round"/>';
  }

  function drawPetal(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    return '<path d="M156 330 C118 392 70 450 66 472 Q98 502 130 474 Q162 504 194 474 Q226 504 258 474 Q290 504 322 472 C300 430 270 382 244 330 Q200 348 156 330 Z" fill="' + c + '"/>' +
      '<path d="M168 270 C164 304 166 324 160 338 H240 C234 324 236 304 232 270 Q200 296 168 270 Z" fill="' + c + '"/>' +
      '<path d="M158 326 Q200 344 242 326" fill="none" stroke="' + a + '" stroke-width="7" stroke-linecap="round"/>' +
      flowerShape(200, 322, 8, a, "#fff");
  }

  function drawAdventure(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    const leg = Paint.darken(c, 0.3);
    return '<path d="' + capsule(166, 392, 158, 484, 13) + '" fill="' + leg + '"/><path d="' + capsule(234, 392, 242, 484, 13) + '" fill="' + leg + '"/>' +
      '<path d="M164 268 L152 396 H190 L200 348 L210 396 H248 L236 268 Q200 292 164 268 Z" fill="' + c + '"/>' +
      '<rect x="156" y="332" width="88" height="12" rx="6" fill="' + a + '"/><circle cx="200" cy="338" r="5" fill="' + Paint.lighten(a, 0.25) + '"/>';
  }

  function drawExplorer(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    const pants = "#4d6280";
    return '<path d="' + capsule(166, 384, 158, 484, 13) + '" fill="' + pants + '"/><path d="' + capsule(234, 384, 242, 484, 13) + '" fill="' + pants + '"/>' +
      '<path d="M166 292 H234 L228 372 H172 Z" fill="' + a + '"/>' +
      '<path d="M174 266 L162 360 H190 L200 324 L210 360 H238 L226 266 Q200 288 174 266 Z" fill="' + c + '"/>' +
      '<path d="M188 300 H212 L206 360 H194 Z" fill="' + Paint.darken(c, 0.12) + '"/>' +
      '<ellipse cx="248" cy="348" rx="12" ry="16" fill="' + a + '"/><rect x="240" y="334" width="16" height="6" rx="2" fill="' + Paint.darken(a, 0.2) + '"/>';
  }

  function drawKnight(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    const d = Paint.darken(c, 0.16);
    const l = Paint.lighten(c, 0.2);
    return '<path d="' + capsule(164, 400, 158, 486, 13) + '" fill="' + d + '"/><path d="' + capsule(236, 400, 242, 486, 13) + '" fill="' + d + '"/>' +
      '<path d="M158 252 H242 L248 348 H152 Z" fill="' + c + '"/>' +
      '<path d="M170 270 H230 L224 332 H176 Z" fill="' + l + '"/>' +
      heart(200, 300, 9, a) +
      '<path d="M154 342 H202 L190 398 H150 Z" fill="' + c + '"/><path d="M246 342 H198 L210 398 H250 Z" fill="' + d + '"/>' +
      '<rect x="152" y="338" width="96" height="8" rx="3" fill="' + a + '"/>';
  }

  function drawPastel(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    const l = Paint.lighten(c, 0.16);
    return '<path d="' + capsule(164, 404, 158, 486, 14) + '" fill="' + Paint.darken(c, 0.08) + '"/><path d="' + capsule(236, 404, 242, 486, 14) + '" fill="' + Paint.darken(c, 0.08) + '"/>' +
      '<rect x="156" y="256" width="88" height="96" rx="30" fill="' + c + '"/><rect x="170" y="270" width="60" height="66" rx="22" fill="' + l + '"/>' +
      heart(200, 306, 11, a) +
      '<rect x="154" y="344" width="42" height="52" rx="14" fill="' + c + '"/><rect x="204" y="344" width="42" height="52" rx="14" fill="' + Paint.darken(c, 0.08) + '"/>';
  }

  function drawStar(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    return '<path d="M118 312 C84 384 76 466 102 506 H298 C324 466 316 384 282 312 L248 268 Q200 300 152 268 Z" fill="' + c + '"/>' +
      '<path d="M200 308 C238 366 270 440 286 506 H300 C312 440 280 352 250 304 Z" fill="' + Paint.darken(c, 0.2) + '" opacity="0.3"/>' +
      sparkle(200, 312, 16, a) +
      '<path d="M146 492 H254" stroke="' + a + '" stroke-width="8" stroke-linecap="round"/>';
  }

  function drawPicnic(p, uid) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    const id = uid + "st";
    return '<defs><pattern id="' + id + '" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="7" fill="' + c + '"/><rect y="7" width="14" height="7" fill="' + Paint.lighten(c, 0.28) + '"/></pattern></defs>' +
      '<path d="M148 342 C116 394 100 436 108 468 H292 C300 436 284 394 252 342 Q200 358 148 342 Z" fill="url(#' + id + ')"/>' +
      '<path d="M168 272 C164 306 168 330 158 346 H242 C232 330 236 306 232 272 Q200 296 168 272 Z" fill="url(#' + id + ')"/>' +
      '<path d="M156 292 Q200 320 244 292 Q200 268 156 292 Z" fill="' + a + '"/>' +
      '<path d="M148 338 Q200 356 252 338" fill="none" stroke="' + a + '" stroke-width="6" stroke-linecap="round"/>';
  }

  function drawCoat(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    return '<path d="M148 284 C116 366 108 456 126 504 H274 C292 456 284 366 252 284 Q200 308 148 284 Z" fill="' + c + '"/>' +
      '<path d="M184 306 L168 504 H232 L216 306 Q200 318 184 306 Z" fill="' + a + '"/>' +
      '<circle cx="200" cy="336" r="4.5" fill="' + Paint.darken(c, 0.25) + '"/><circle cx="200" cy="366" r="4.5" fill="' + Paint.darken(c, 0.25) + '"/><circle cx="200" cy="396" r="4.5" fill="' + Paint.darken(c, 0.25) + '"/><circle cx="200" cy="426" r="4.5" fill="' + Paint.darken(c, 0.25) + '"/>' +
      '<path d="M170 272 Q200 298 230 272 L224 314 Q200 294 176 314 Z" fill="' + c + '"/>';
  }

  function drawGarden(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    return '<path d="M150 340 C122 392 106 442 116 474 H284 C294 442 278 392 250 340 Q200 356 150 340 Z" fill="' + c + '"/>' +
      '<path d="M168 270 C164 306 168 328 158 344 H242 C232 328 236 306 232 270 Q200 294 168 270 Z" fill="' + c + '"/>' +
      '<path d="M176 332 H224 L238 470 H162 Z" fill="' + a + '"/>' +
      '<rect x="184" y="360" width="32" height="24" rx="6" fill="' + c + '"/>' +
      flowerShape(200, 372, 6, "#e25b7a", "#f2c14e") +
      '<path d="M160 290 Q200 312 240 290" fill="none" stroke="' + a + '" stroke-width="4" stroke-linecap="round"/>';
  }

  function drawRoyal(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    let dots = "";
    for (let i = 0; i < 8; i++) dots += '<circle cx="' + (128 + i * 20) + '" cy="496" r="4.5" fill="' + a + '"/>';
    return '<path d="M120 314 C88 392 82 470 108 508 H292 C318 470 312 392 280 314 L248 268 Q200 300 152 268 Z" fill="' + c + '"/>' +
      '<path d="M186 312 H214 V504 H186 Z" fill="' + a + '"/>' +
      '<circle cx="200" cy="334" r="8" fill="' + Paint.lighten(a, 0.18) + '"/>' + dots;
  }

  function drawSailor(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    return '<path d="M150 350 C122 404 110 444 120 474 H280 C290 444 278 404 250 350 Q200 366 150 350 Z" fill="' + c + '"/>' +
      '<path d="M168 350 L186 472 M200 362 L200 472 M232 350 L214 472" stroke="' + Paint.darken(c, 0.18) + '" stroke-width="4" opacity="0.35" stroke-linecap="round"/>' +
      '<path d="M168 286 C164 322 170 342 160 356 H240 C230 342 236 322 232 286 Q200 310 168 286 Z" fill="' + c + '"/>' +
      '<path d="M146 304 L200 364 L254 304 L236 286 L200 328 L164 286 Z" fill="' + a + '"/>' +
      '<path d="M164 306 L200 346 L236 306" fill="none" stroke="' + c + '" stroke-width="7" stroke-linecap="round"/>';
  }

  function drawSpark(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    return '<path d="' + capsule(164, 360, 156, 484, 14) + '" fill="' + c + '"/><path d="' + capsule(236, 360, 244, 484, 14) + '" fill="' + c + '"/>' +
      '<path d="M160 258 H240 L232 372 H168 Z" fill="' + c + '"/>' +
      '<path d="M176 276 H224 L216 340 H184 Z" fill="' + Paint.lighten(c, 0.16) + '"/>' +
      '<rect x="156" y="338" width="88" height="12" rx="6" fill="' + a + '"/>' +
      sparkle(200, 304, 11, a);
  }

  function drawBlossomDress(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    const l = Paint.lighten(c, 0.22);
    return '<path d="M168 268 Q200 300 232 268 L246 348 H154 Z" fill="' + c + '"/>' +
      '<ellipse cx="152" cy="430" rx="40" ry="68" fill="' + c + '"/>' +
      '<ellipse cx="200" cy="448" rx="46" ry="76" fill="' + l + '"/>' +
      '<ellipse cx="248" cy="430" rx="40" ry="68" fill="' + c + '"/>' +
      '<circle cx="200" cy="312" r="8" fill="' + a + '"/>' +
      '<circle cx="164" cy="400" r="7" fill="' + a + '"/><circle cx="236" cy="392" r="7" fill="' + a + '"/>';
  }

  function drawFrost(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    return '<path d="M150 280 C120 360 112 450 130 506 H270 C288 450 280 360 250 280 Q200 304 150 280 Z" fill="' + c + '"/>' +
      '<path d="M176 304 L200 358 L224 304 L200 290 Z" fill="' + a + '"/>' +
      sparkle(168, 400, 10, a) + sparkle(232, 420, 10, a) + sparkle(200, 450, 12, a) +
      '<path d="M158 478 H242" stroke="' + a + '" stroke-width="6" stroke-linecap="round"/>';
  }

  function drawNight(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    return '<path d="' + capsule(168, 360, 160, 470, 16) + '" fill="' + c + '"/><path d="' + capsule(232, 360, 240, 470, 16) + '" fill="' + c + '"/>' +
      '<path d="M158 258 H242 L234 368 H166 Z" fill="' + c + '"/>' +
      '<path d="M158 304 H242" stroke="' + a + '" stroke-width="8" stroke-linecap="round"/>' +
      sparkle(184, 278, 8, a) + sparkle(216, 278, 8, a);
  }

  function drawFestival(p) {
    const c = p.outfitColor;
    const a = p.outfitAccent;
    return '<path d="M146 332 C118 392 108 452 120 502 H280 C292 452 282 392 254 332 Q200 354 146 332 Z" fill="' + c + '"/>' +
      '<path d="M166 266 Q200 298 234 266 L242 340 H158 Z" fill="' + c + '"/>' +
      '<path d="M148 346 H252" stroke="' + a + '" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M200 352 L216 392 L184 392 Z" fill="' + a + '"/>' +
      '<circle cx="172" cy="404" r="6" fill="' + a + '"/><circle cx="228" cy="424" r="6" fill="' + a + '"/>';
  }

  const DRAW = {
    gown: drawGown, tea: drawTea, petal: drawPetal, adventure: drawAdventure, explorer: drawExplorer,
    knight: drawKnight, pastel: drawPastel, star: drawStar, picnic: drawPicnic, coat: drawCoat,
    garden: drawGarden, royal: drawRoyal, sailor: drawSailor, spark: drawSpark,
    blossom: drawBlossomDress, frost: drawFrost, night: drawNight, festival: drawFestival
  };

  function armPoints(p, outfit) {
    if (p.wand) return { left: [158, 308, 130, 412], right: [244, 296, 318, 228] };
    if (outfit.sleeve === "wide") return { left: [156, 340, 108, 436], right: [244, 340, 292, 436] };
    if (outfit.length === "short") return { left: [156, 306, 134, 404], right: [244, 306, 266, 404] };
    return { left: [164, 308, 114, 424], right: [236, 308, 286, 424] };
  }

  function arms(p, outfit) {
    const skin = p.skin;
    const color = p.outfitColor;
    const sleeve = outfit.sleeve;
    const pts = armPoints(p, outfit);
    const armColor = sleeve === "long" || sleeve === "fitted" || sleeve === "armor" ? color : skin;
    let out = "";
    if (sleeve !== "wide") {
      out += '<path d="' + capsule(pts.left[0], pts.left[1], pts.left[2], pts.left[3], 12) + '" fill="' + armColor + '"/>';
      out += '<path d="' + capsule(pts.right[0], pts.right[1], pts.right[2], pts.right[3], 12) + '" fill="' + armColor + '"/>';
    } else {
      out += '<path d="' + capsule(pts.left[2] + 8, pts.left[3] - 28, pts.left[2], pts.left[3], 11) + '" fill="' + skin + '"/>';
      out += '<path d="' + capsule(pts.right[2] - 8, pts.right[3] - 28, pts.right[2], pts.right[3], 11) + '" fill="' + skin + '"/>';
    }
    const lh = [pts.left[2], pts.left[3] + 6];
    const rh = [pts.right[2] + (p.wand ? 6 : 0), pts.right[3] + (p.wand ? -2 : 6)];
    out += '<circle cx="' + lh[0] + '" cy="' + lh[1] + '" r="11" fill="' + skin + '"/>';
    out += '<circle cx="' + rh[0] + '" cy="' + rh[1] + '" r="11" fill="' + skin + '"/>';
    if (sleeve === "puff" || sleeve === "puff-big") {
      const r = sleeve === "puff-big" ? 24 : 16;
      const hi = Paint.lighten(color, 0.28);
      out += '<circle cx="148" cy="300" r="' + r + '" fill="' + color + '"/><circle cx="252" cy="300" r="' + r + '" fill="' + color + '"/>';
      out += '<circle cx="142" cy="294" r="' + (r * 0.35).toFixed(1) + '" fill="' + hi + '" opacity="0.8"/><circle cx="246" cy="294" r="' + (r * 0.35).toFixed(1) + '" fill="' + hi + '" opacity="0.8"/>';
    } else if (sleeve === "short") {
      out += '<path d="' + capsule(164, 300, 148, 342, 14) + '" fill="' + color + '"/><path d="' + capsule(236, 300, 252, 342, 14) + '" fill="' + color + '"/>';
    } else if (sleeve === "armor") {
      const edge = Paint.darken(color, 0.22);
      const plate = Paint.lighten(color, 0.12);
      out += '<circle cx="146" cy="294" r="18" fill="' + plate + '"/><circle cx="254" cy="294" r="18" fill="' + plate + '"/>';
      out += '<circle cx="146" cy="294" r="18" fill="none" stroke="' + edge + '" stroke-width="3"/><circle cx="254" cy="294" r="18" fill="none" stroke="' + edge + '" stroke-width="3"/>';
    }
    return { svg: out, wandHand: rh };
  }

  function wand(p, hand) {
    const c = p.wandColor;
    const x2 = hand[0] + 24;
    const y2 = hand[1] - 48;
    return '<line x1="' + hand[0] + '" y1="' + hand[1] + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + Paint.darken(c, 0.25) + '" stroke-width="5" stroke-linecap="round"/>' +
      sparkle(x2, y2, 14, c) + '<circle cx="' + x2 + '" cy="' + y2 + '" r="3.2" fill="#fff"/>';
  }

  function cape(p) {
    if (!p.cape) return "";
    const c = p.capeColor;
    return '<path d="M156 284 C70 324 46 430 88 508 H312 C354 430 330 324 244 284 Q200 304 156 284 Z" fill="' + c + '"/>' +
      '<path d="M200 296 C252 348 286 430 304 508 H314 C336 424 304 336 242 292 Z" fill="' + Paint.darken(c, 0.22) + '" opacity="0.35"/>' +
      '<circle cx="200" cy="292" r="7" fill="' + p.crownColor + '"/>';
  }

  function crown(p) {
    if (p.crown === "none") return "";
    const y = CROWN_Y[p.hair] || 110;
    const c = p.crownColor;
    const d = Paint.darken(c, 0.18);
    const gem = "#7ec8ea";
    if (p.crown === "tiara") {
      return '<path d="M ' + (200 - 64) + " " + (y + 24) + " L " + (200 - 46) + " " + y + " L " + (200 - 24) + " " + (y + 16) + " L 200 " + (y - 16) + " L " + (200 + 24) + " " + (y + 16) + " L " + (200 + 46) + " " + y + " L " + (200 + 64) + " " + (y + 24) + ' Z" fill="' + c + '"/>' +
        '<circle cx="200" cy="' + (y + 2) + '" r="6" fill="' + gem + '"/><circle cx="' + (200 - 40) + '" cy="' + (y + 10) + '" r="3.5" fill="' + gem + '"/><circle cx="' + (200 + 40) + '" cy="' + (y + 10) + '" r="3.5" fill="' + gem + '"/>';
    }
    if (p.crown === "tall") {
      let out = '<rect x="148" y="' + (y + 10) + '" width="104" height="16" rx="5" fill="' + c + '"/>';
      for (let i = 0; i < 5; i++) {
        const x = 156 + i * 22;
        const h = i === 2 ? 30 : 18;
        out += '<path d="M ' + x + " " + (y + 12) + " L " + (x + 8) + " " + (y + 12 - h) + " L " + (x + 16) + " " + (y + 12) + ' Z" fill="' + (i % 2 ? d : c) + '"/>';
      }
      out += '<circle cx="200" cy="' + (y - 10) + '" r="5" fill="' + gem + '"/>';
      return out;
    }
    if (p.crown === "flowers") {
      let out = "";
      for (let i = 0; i < 5; i++) {
        const x = 150 + i * 25;
        const yy = y + (i === 2 ? -4 : 8);
        out += flowerShape(x, yy, 8, i % 2 ? "#f2849a" : "#fff", "#f2c14e");
      }
      return out;
    }
    if (p.crown === "circlet") {
      return '<path d="M 146 ' + (y + 20) + " Q 200 " + y + " 254 " + (y + 20) + '" fill="none" stroke="' + c + '" stroke-width="8" stroke-linecap="round"/>' +
        '<circle cx="200" cy="' + (y + 6) + '" r="6" fill="' + gem + '"/>';
    }
    return '<path d="M 154 ' + (y + 18) + " Q 200 " + (y + 4) + " 246 " + (y + 18) + '" fill="none" stroke="' + c + '" stroke-width="8" stroke-linecap="round"/>' + sparkle(200, y - 4, 12, c);
  }

  function extraAnchor(style) {
    const spots = {
      long: [278, 154],
      wavy: [286, 166],
      curly: [292, 118],
      coily: [286, 86],
      braids: [118, 198],
      sidebraid: [304, 186],
      bun: [236, 74],
      buns: [284, 90],
      bob: [276, 164],
      pixie: [260, 140],
      pony: [152, 158],
      twists: [108, 188],
      halo: [268, 100]
    };
    return spots[style] || [278, 154];
  }

  function bowShape(x, y, color) {
    const knot = Paint.mix(color, "#1a1210", 0.22);
    const hi = Paint.lighten(color, 0.34);
    function loop(sign) {
      return '<path d="M ' + x + " " + y +
        " C " + (x + sign * 8) + " " + (y - 12) + " " + (x + sign * 28) + " " + (y - 14) + " " + (x + sign * 26) + " " + y +
        " C " + (x + sign * 28) + " " + (y + 14) + " " + (x + sign * 8) + " " + (y + 12) + " " + x + " " + y +
        ' Z" fill="' + color + '"/>';
    }
    function tail(sign) {
      return '<path d="M ' + (x + sign * 2) + " " + (y + 4) +
        " Q " + (x + sign * 14) + " " + (y + 16) + " " + (x + sign * 8) + " " + (y + 28) +
        " Q " + (x + sign * 3) + " " + (y + 16) + " " + (x + sign) + " " + (y + 6) +
        ' Z" fill="' + color + '"/>';
    }
    return loop(-1) + loop(1) + tail(-1) + tail(1) +
      '<ellipse cx="' + x + '" cy="' + y + '" rx="5.4" ry="6.2" fill="' + knot + '"/>' +
      '<ellipse cx="' + (x - 1.2) + '" cy="' + (y - 1.8) + '" rx="1.8" ry="2" fill="' + hi + '"/>';
  }

  function hairExtra(p) {
    if (p.hairExtra === "none") return "";
    const anchor = extraAnchor(p.hair);
    if (p.hairExtra === "flower") return flowerShape(anchor[0], anchor[1], 10, p.extraColor, "#f2c14e");
    return bowShape(anchor[0], anchor[1], p.extraColor);
  }

  function jewels(p) {
    let out = "";
    if (p.necklace) {
      out += '<path d="M172 252 Q200 282 228 252" fill="none" stroke="' + p.crownColor + '" stroke-width="3.2" stroke-linecap="round"/>' +
        '<circle cx="200" cy="278" r="8" fill="' + p.gemColor + '"/><circle cx="197" cy="275" r="2.2" fill="#fff" opacity="0.85"/>';
    }
    if (p.earrings) {
      out += '<circle cx="126" cy="204" r="5" fill="' + p.gemColor + '"/><circle cx="274" cy="204" r="5" fill="' + p.gemColor + '"/>' +
        '<circle cx="126" cy="214" r="3.4" fill="' + p.gemColor + '"/><circle cx="274" cy="214" r="3.4" fill="' + p.gemColor + '"/>';
    }
    return out;
  }

  function pet(p) {
    if (p.pet === "none") return "";
    const c = p.petColor;
    const d = Paint.darken(c, 0.22);
    const l = Paint.lighten(c, 0.28);
    if (p.pet === "cat") {
      return '<ellipse cx="338" cy="478" rx="24" ry="8" fill="rgba(90,49,68,0.13)"/>' +
        '<path d="M354 452 Q384 430 374 398 Q360 424 348 438" fill="none" stroke="' + c + '" stroke-width="6" stroke-linecap="round"/>' +
        '<ellipse cx="330" cy="458" rx="22" ry="16" fill="' + c + '"/>' +
        '<circle cx="316" cy="432" r="14" fill="' + c + '"/>' +
        '<path d="M306 424 L302 406 L316 420 Z" fill="' + c + '"/><path d="M326 422 L334 406 L332 422 Z" fill="' + c + '"/>' +
        '<path d="M308 420 L306 410 L316 418 Z" fill="' + l + '"/><path d="M324 418 L330 408 L330 418 Z" fill="' + l + '"/>' +
        '<circle cx="311" cy="430" r="2.1" fill="#2c2430"/><circle cx="322" cy="430" r="2.1" fill="#2c2430"/>' +
        '<path d="M314 436 Q318 439 322 436" fill="none" stroke="' + d + '" stroke-width="1.5" stroke-linecap="round"/>' +
        '<ellipse cx="310" cy="434" rx="3" ry="1.8" fill="#f2a0b0" opacity="0.75"/>';
    }
    if (p.pet === "pup") {
      return '<ellipse cx="332" cy="480" rx="26" ry="8" fill="rgba(90,49,68,0.13)"/>' +
        '<ellipse cx="336" cy="456" rx="24" ry="18" fill="' + c + '"/>' +
        '<circle cx="316" cy="430" r="15" fill="' + c + '"/>' +
        '<ellipse cx="302" cy="438" rx="8" ry="13" fill="' + d + '"/><ellipse cx="330" cy="436" rx="8" ry="12" fill="' + d + '"/>' +
        '<ellipse cx="316" cy="438" rx="8" ry="6" fill="' + l + '"/>' +
        '<circle cx="310" cy="428" r="2.2" fill="#2c2430"/><circle cx="322" cy="428" r="2.2" fill="#2c2430"/>' +
        '<ellipse cx="316" cy="436" rx="3" ry="2" fill="#2c2430" opacity="0.35"/>' +
        '<path d="M312 440 Q316 446 322 440" fill="#f2a0b0"/>';
    }
    if (p.pet === "bird") {
      return '<ellipse cx="336" cy="472" rx="16" ry="5" fill="rgba(90,49,68,0.12)"/>' +
        '<ellipse cx="334" cy="452" rx="16" ry="11" fill="' + c + '"/>' +
        '<circle cx="318" cy="440" r="9" fill="' + c + '"/>' +
        '<path d="M310 440 L296 444 L310 448 Z" fill="' + d + '"/>' +
        '<circle cx="314" cy="438" r="1.7" fill="#2c2430"/>' +
        '<ellipse cx="340" cy="448" rx="10" ry="6" fill="' + l + '" transform="rotate(-20 340 448)"/>' +
        '<path d="M326 462 L322 472 M340 462 L344 472" stroke="' + d + '" stroke-width="2" stroke-linecap="round"/>';
    }
    if (p.pet === "bunny") {
      return '<ellipse cx="334" cy="478" rx="18" ry="6" fill="rgba(90,49,68,0.12)"/>' +
        '<ellipse cx="330" cy="458" rx="18" ry="15" fill="' + c + '"/>' +
        '<circle cx="316" cy="440" r="12" fill="' + c + '"/>' +
        '<ellipse cx="308" cy="422" rx="4" ry="12" fill="' + c + '"/><ellipse cx="324" cy="422" rx="4" ry="12" fill="' + c + '"/>' +
        '<ellipse cx="308" cy="424" rx="2" ry="7" fill="' + l + '"/><ellipse cx="324" cy="424" rx="2" ry="7" fill="' + l + '"/>' +
        '<circle cx="311" cy="438" r="1.7" fill="#2c2430"/><circle cx="321" cy="438" r="1.7" fill="#2c2430"/>' +
        '<ellipse cx="316" cy="444" rx="2.2" ry="1.5" fill="' + d + '"/>';
    }
    return '<ellipse cx="328" cy="482" rx="28" ry="8" fill="rgba(90,49,68,0.13)"/>' +
      '<ellipse cx="300" cy="436" rx="16" ry="10" fill="' + l + '" transform="rotate(-28 300 436)"/>' +
      '<ellipse cx="352" cy="434" rx="16" ry="10" fill="' + l + '" transform="rotate(28 352 434)"/>' +
      '<ellipse cx="328" cy="456" rx="26" ry="20" fill="' + c + '"/>' +
      '<ellipse cx="328" cy="462" rx="14" ry="12" fill="' + l + '"/>' +
      '<circle cx="308" cy="428" r="14" fill="' + c + '"/>' +
      '<circle cx="300" cy="416" r="4" fill="' + d + '"/><circle cx="316" cy="414" r="3.5" fill="' + d + '"/>' +
      '<circle cx="303" cy="426" r="2.3" fill="#2c2430"/><circle cx="314" cy="426" r="2.3" fill="#2c2430"/>' +
      '<circle cx="302" cy="425" r="0.9" fill="#fff"/><circle cx="313" cy="425" r="0.9" fill="#fff"/>' +
      '<path d="M304 434 Q308 438 314 434" fill="none" stroke="' + d + '" stroke-width="1.7" stroke-linecap="round"/>' +
      '<ellipse cx="298" cy="432" rx="3" ry="2" fill="#f2a0b0" opacity="0.8"/>' +
      '<path d="M350 462 Q376 456 370 478" fill="none" stroke="' + c + '" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="370" cy="478" r="4" fill="' + l + '"/>';
  }

  function backdrop(id) {
    return '<defs><linearGradient id="' + id + 'sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#ffe4f1"/><stop offset="0.5" stop-color="#fff6ea"/><stop offset="1" stop-color="#ddf3c4"/>' +
      '</linearGradient></defs>' +
      '<rect width="400" height="520" fill="url(#' + id + 'sky)"/>' +
      '<circle cx="332" cy="68" r="26" fill="#ffe08a"/><circle cx="322" cy="60" r="7" fill="#fff8d0"/>' +
      '<g fill="#fff"><ellipse cx="78" cy="64" rx="26" ry="14"/><ellipse cx="98" cy="58" rx="16" ry="12"/><ellipse cx="58" cy="68" rx="14" ry="10"/>' +
      '<ellipse cx="250" cy="96" rx="16" ry="9" opacity="0.8"/><ellipse cx="266" cy="92" rx="11" ry="7" opacity="0.8"/></g>' +
      '<ellipse cx="200" cy="560" rx="280" ry="84" fill="#b6e28c"/>' +
      '<ellipse cx="78" cy="508" rx="46" ry="16" fill="#c8eda6"/><ellipse cx="330" cy="512" rx="54" ry="18" fill="#a6d67a"/>' +
      flowerShape(28, 492, 6, "#f2849a", "#f2c14e") + flowerShape(374, 488, 6, "#cdb4db", "#f2c14e");
  }

  function ears(skin) {
    const inner = Paint.darken(skin, 0.12);
    return '<ellipse cx="132" cy="188" rx="10" ry="14" fill="' + skin + '"/><ellipse cx="268" cy="188" rx="10" ry="14" fill="' + skin + '"/>' +
      '<ellipse cx="132" cy="188" rx="5" ry="8" fill="' + inner + '"/><ellipse cx="268" cy="188" rx="5" ry="8" fill="' + inner + '"/>';
  }

  function svg(raw, opts) {
    const p = normalize(raw);
    const options = opts || {};
    const uid = "s" + (seq++);
    const outfit = OUTFITS.filter(function (item) { return item.id === p.outfit; })[0];
    const skin = p.skin;
    const shadow = Paint.darken(skin, 0.18);
    const layers = hairLayers(p, uid);
    const layout = faceLayout(p.face);
    const showEars = p.hair === "pixie" || p.hair === "bun" || p.hair === "buns" || p.hair === "halo";
    const arm = arms(p, outfit);
    const winkRight = p.expression === "wink";
    const shyShift = p.expression === "shy" ? 3 : 0;
    let view = "0 0 400 520";
    if (options.focus === "head") view = "64 8 272 312";
    else if (options.plain) view = "48 24 304 496";
    else if (options.thumb) view = "78 36 244 482";
    const size = options.export ? ' width="800" height="1040"' : "";
    const body = (options.plain ? "" : backdrop(uid)) +
      '<ellipse cx="200" cy="496" rx="78" ry="12" fill="rgba(90,49,68,0.12)"/>' +
      '<g filter="url(#' + uid + 'sh)">' +
      cape(p) +
      layers.back +
      legs(skin, outfit.length) +
      shoes(p, outfit.length) +
      '<path d="M178 236 Q200 258 222 236 L226 286 Q200 298 174 286 Z" fill="' + skin + '"/>' +
      faceShape(p, skin, shadow) +
      (showEars ? ears(skin) : "") +
      '<ellipse cx="184" cy="150" rx="16" ry="9" fill="#fff" opacity="0.2"/>' +
      (DRAW[p.outfit] ? DRAW[p.outfit](p, uid) : drawGown(p, uid)) +
      arm.svg +
      layers.mid +
      layers.front +
      brows(layout, p.expression) +
      eye(200 - layout.eyeDX, layout.eyeY, p.eye, false, shyShift) +
      eye(200 + layout.eyeDX, layout.eyeY, p.eye, winkRight, shyShift) +
      '<path d="M196 190 Q200 198 204 190" fill="none" stroke="' + shadow + '" stroke-width="2" stroke-linecap="round" opacity="0.7"/>' +
      mouth(200, layout.mouthY, p.expression) +
      '<ellipse cx="' + (200 - layout.eyeDX - 6) + '" cy="' + layout.blushY + '" rx="12" ry="7" fill="#f2a0b0" opacity="0.4"/>' +
      '<ellipse cx="' + (200 + layout.eyeDX + 6) + '" cy="' + layout.blushY + '" rx="12" ry="7" fill="#f2a0b0" opacity="0.4"/>' +
      hairExtra(p) +
      crown(p) +
      jewels(p) +
      (p.wand ? wand(p, arm.wandHand) : "") +
      pet(p) +
      "</g>";
    return '<svg xmlns="http://www.w3.org/2000/svg"' + size + ' viewBox="' + view + '" role="img" aria-label="' + Paint.esc(displayName(p)) + '">' +
      '<defs><filter id="' + uid + 'sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="5" stdDeviation="2.5" flood-color="#6b3a4a" flood-opacity="0.16"/></filter>' +
      (layers.defs || "") + "</defs>" +
      body + "</svg>";
  }

  root.Princess = {
    DEFAULT: DEFAULT,
    SKINS: SKINS,
    HAIR_COLORS: HAIR_COLORS,
    EYE_COLORS: EYE_COLORS,
    DRESS_COLORS: DRESS_COLORS,
    ACCENT_COLORS: ACCENT_COLORS,
    SHOE_COLORS: SHOE_COLORS,
    CROWN_COLORS: CROWN_COLORS,
    CAPE_COLORS: CAPE_COLORS,
    WAND_COLORS: WAND_COLORS,
    GEM_COLORS: GEM_COLORS,
    PET_COLORS: PET_COLORS,
    EXTRA_COLORS: EXTRA_COLORS,
    FACES: FACES,
    EXPRESSIONS: EXPRESSIONS,
    HAIRS: HAIRS,
    OUTFITS: OUTFITS,
    SHOES: SHOES,
    CROWNS: CROWNS,
    PETS: PETS,
    EXTRAS: EXTRAS,
    NAMES: NAMES,
    normalize: normalize,
    toJSON: function (p) {
      const n = normalize(p);
      const out = {};
      SIGN_FIELDS.forEach(function (key) { out[key] = n[key]; });
      return out;
    },
    svg: svg,
    randomize: randomize,
    displayName: displayName,
    signature: signature
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
