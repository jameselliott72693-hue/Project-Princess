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
    { id: "halo", label: "Halo braid" },
    { id: "pigtails", label: "Pigtails" },
    { id: "halfup", label: "Half up" }
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
    { id: "spark", label: "Spark suit", color: "#f29a4a", accent: "#5c6bc0", length: "short", sleeve: "fitted" }
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
    { id: "dragon", label: "Dragon" }
  ];
  const EXTRAS = [
    { id: "none", label: "None" },
    { id: "bow", label: "Bow" },
    { id: "flower", label: "Flower" }
  ];
  const NAMES = ["Sunny", "Pip", "Luna", "Clover", "Birdie", "Nia", "Amina", "Hana", "Rosa", "Willa", "Noor", "Imani", "Lila", "Bea", "June", "Poppy", "Freya", "Marigold", "Tess", "Goldie", "Asha", "Mei", "Leila", "Sora", "Nell", "Priya", "Elise", "Noa", "Zuri", "Alma"];
  const CROWN_Y = {
    long: 100, wavy: 98, curly: 84, coily: 70, braids: 100, sidebraid: 100,
    bun: 92, buns: 96, bob: 104, pixie: 108, pony: 96, twists: 102, halo: 78,
    pigtails: 100, halfup: 88
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
      pet: Math.random() < 0.72 ? pick(["cat", "pup", "dragon"]) : "none",
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

  function hairInk(uid, color) {
    const id = uid + "hf";
    return {
      defs: '<linearGradient id="' + id + '" x1="0.1" y1="0" x2="0.55" y2="1">' +
        '<stop offset="0" stop-color="' + Paint.lighten(color, 0.26) + '"/>' +
        '<stop offset="0.42" stop-color="' + color + '"/>' +
        '<stop offset="1" stop-color="' + Paint.darken(color, 0.2) + '"/></linearGradient>',
      fill: "url(#" + id + ")",
      c: color,
      d: Paint.darken(color, 0.2),
      m: Paint.darken(color, 0.1),
      l: Paint.lighten(color, 0.28)
    };
  }

  function hairCap(fill) {
    return '<path d="M124 178 C118 132 152 96 200 92 C248 96 282 132 276 178 C258 156 230 146 200 148 C170 146 142 156 124 178 Z" fill="' + fill + '"/>';
  }

  function bangsSoft(fill) {
    return '<path d="M154 164 C160 126 182 108 200 112 C218 108 240 126 246 164 C228 148 214 156 200 146 C186 156 172 148 154 164 Z" fill="' + fill + '"/>';
  }

  function bangsFull(fill) {
    return '<path d="M146 168 C148 124 172 106 200 106 C228 106 252 124 254 168 C236 150 218 160 200 148 C182 160 164 150 146 168 Z" fill="' + fill + '"/>';
  }

  function bangsSwept(fill) {
    return '<path d="M148 156 C162 118 198 104 238 126 C254 136 252 160 234 166 C210 150 184 160 164 154 C152 166 146 164 148 156 Z" fill="' + fill + '"/>';
  }

  function bangsShort(fill) {
    return '<path d="M160 152 C168 124 184 112 200 114 C216 112 232 124 240 152 C222 140 212 148 200 138 C188 148 178 140 160 152 Z" fill="' + fill + '"/>';
  }

  function lockStraight(side, fill) {
    if (side < 0) {
      return '<path d="M148 156 C134 188 122 232 126 292 C128 322 146 332 158 312 C168 274 160 214 166 174 C160 162 152 156 148 156 Z" fill="' + fill + '"/>';
    }
    return '<path d="M252 156 C266 188 278 232 274 292 C272 322 254 332 242 312 C232 274 240 214 234 174 C240 162 248 156 252 156 Z" fill="' + fill + '"/>';
  }

  function lockWavy(side, fill) {
    if (side < 0) {
      return '<path d="M146 158 C126 194 158 222 134 270 C114 312 142 340 128 378 C122 400 148 392 154 364 C162 326 136 304 152 258 C164 222 138 198 160 172 C154 162 148 158 146 158 Z" fill="' + fill + '"/>';
    }
    return '<path d="M254 158 C274 194 242 222 266 270 C286 312 258 340 272 378 C278 400 252 392 246 364 C238 326 264 304 248 258 C236 222 262 198 240 172 C246 162 252 158 254 158 Z" fill="' + fill + '"/>';
  }

  function longSheet(fill) {
    return '<path d="M138 168 C126 140 160 100 200 96 C240 100 274 140 262 168 C278 236 292 330 274 438 C262 496 234 518 200 514 C166 518 138 496 126 438 C108 330 122 236 138 168 Z" fill="' + fill + '"/>';
  }

  function wavySheet(fill) {
    return '<path d="M140 166 C124 142 162 102 200 98 C238 102 276 142 260 166 C286 214 246 248 274 312 C300 372 248 408 276 468 C292 508 236 526 200 514 C164 526 108 508 124 468 C152 408 100 372 126 312 C154 248 114 214 140 166 Z" fill="' + fill + '"/>';
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
      if (i === 0) {
        const x0 = cx + rx;
        const y0 = cy;
        d += "M " + x0.toFixed(1) + " " + y0.toFixed(1) + " ";
      }
      d += "Q " + x.toFixed(1) + " " + y.toFixed(1) + " " + x2.toFixed(1) + " " + y2.toFixed(1) + " ";
    }
    return '<path d="' + d + 'Z" fill="' + fill + '"/>';
  }

  function hairTie(x, y, color) {
    const hi = Paint.lighten(color, 0.34);
    return '<rect x="' + (x - 11) + '" y="' + (y - 5) + '" width="22" height="11" rx="5" fill="' + color + '"/>' +
      '<rect x="' + (x - 11) + '" y="' + (y - 5) + '" width="22" height="4" rx="2" fill="' + hi + '"/>';
  }

  function neatBraid(x0, y0, x1, y1, bend, ink, tie) {
    const midX = (x0 + x1) / 2 + bend;
    const midY = (y0 + y1) / 2;
    let out = '<path d="M ' + x0 + " " + y0 + " Q " + midX + " " + midY + " " + x1 + " " + y1 + '" fill="none" stroke="' + ink.fill + '" stroke-width="24" stroke-linecap="round"/>';
    const n = 8;
    for (let i = 0; i < n; i++) {
      const t = (i + 0.45) / n;
      const u = 1 - t;
      const x = u * u * x0 + 2 * u * t * midX + t * t * x1;
      const y = u * u * y0 + 2 * u * t * midY + t * t * y1;
      const rot = i % 2 ? 34 : -34;
      const fill = i % 2 ? ink.d : ink.m;
      const rx = 12 - t * 2;
      out += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' + rx.toFixed(1) + '" ry="6.2" fill="' + fill + '" transform="rotate(' + rot + " " + x.toFixed(1) + " " + y.toFixed(1) + ')"/>';
    }
    out += hairTie(x1, y1 + 4, tie);
    out += '<path d="M ' + (x1 - 7) + " " + (y1 + 6) + " Q " + x1 + " " + (y1 + 30) + " " + (x1 + 8) + " " + (y1 + 8) + " Q " + x1 + " " + (y1 + 16) + " " + (x1 - 7) + " " + (y1 + 6) + ' Z" fill="' + ink.c + '"/>';
    return out;
  }

  function haloRing(ink) {
    const cx = 200;
    const cy = 126;
    const rx = 76;
    const ry = 28;
    let out = '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="' + ink.c + '" stroke-width="18"/>';
    const count = 16;
    for (let i = 0; i < count; i++) {
      const a = -Math.PI / 2 + (Math.PI * 2 * i) / count;
      const x = cx + Math.cos(a) * rx;
      const y = cy + Math.sin(a) * ry;
      const deg = (a * 180) / Math.PI + 90;
      const fill = i % 3 === 1 ? ink.d : i % 3 === 2 ? ink.m : ink.c;
      out += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="11" ry="6.4" fill="' + fill + '" transform="rotate(' + deg.toFixed(1) + " " + x.toFixed(1) + " " + y.toFixed(1) + ')"/>';
    }
    return out;
  }

  function twistRibbon(x, y0, y1, ink, phase) {
    const steps = 7;
    let a = "";
    let b = "";
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = y0 + (y1 - y0) * t;
      const wave = Math.sin(t * Math.PI * 4 + phase) * 6;
      const cmd = i === 0 ? "M " : " L ";
      a += cmd + (x + wave).toFixed(1) + " " + y.toFixed(1);
      b += cmd + (x - wave).toFixed(1) + " " + y.toFixed(1);
    }
    return '<path d="' + a + '" fill="none" stroke="' + ink.c + '" stroke-width="7.5" stroke-linecap="round"/>' +
      '<path d="' + b + '" fill="none" stroke="' + ink.d + '" stroke-width="6.5" stroke-linecap="round"/>';
  }

  function curlFringe(ink) {
    return '<circle cx="170" cy="132" r="13" fill="' + ink.c + '"/>' +
      '<circle cx="200" cy="122" r="14" fill="' + ink.c + '"/>' +
      '<circle cx="230" cy="132" r="13" fill="' + ink.c + '"/>' +
      '<circle cx="186" cy="118" r="4" fill="' + ink.l + '"/><circle cx="214" cy="116" r="3.5" fill="' + ink.l + '"/>';
  }

  function layersOf(back, mid, front, defs) {
    return { back: back, mid: mid || "", front: front || "", defs: defs || "" };
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
          bangsSoft(ink.c),
          ink.defs
        );
      case "wavy":
        return layersOf(
          wavySheet(ink.fill),
          lockWavy(-1, ink.c) + lockWavy(1, ink.c),
          bangsSwept(ink.c),
          ink.defs
        );
      case "curly":
        return layersOf(
          cloud(200, 176, 92, 84, 13, 1.16, ink.fill) +
            '<circle cx="118" cy="236" r="16" fill="' + ink.d + '"/><circle cx="282" cy="236" r="16" fill="' + ink.d + '"/>' +
            '<circle cx="156" cy="268" r="13" fill="' + ink.m + '"/><circle cx="244" cy="268" r="13" fill="' + ink.m + '"/>',
          "",
          curlFringe(ink),
          ink.defs
        );
      case "coily":
        return layersOf(
          cloud(200, 164, 100, 92, 16, 1.16, ink.fill),
          "",
          "",
          ink.defs
        );
      case "braids":
        return layersOf(
          cap,
          neatBraid(156, 188, 142, 430, -16, ink, tie) + neatBraid(244, 188, 258, 430, 16, ink, tie),
          bangsSoft(ink.c),
          ink.defs
        );
      case "sidebraid":
        return layersOf(
          cap + lockStraight(-1, ink.c),
          neatBraid(214, 176, 292, 392, 28, ink, tie),
          bangsSwept(ink.c),
          ink.defs
        );
      case "bun":
        return layersOf(
          cap +
            '<circle cx="200" cy="70" r="30" fill="' + ink.fill + '"/>' +
            '<path d="M176 64 C184 46 216 46 224 64 C210 56 190 56 176 64 Z" fill="' + ink.l + '"/>' +
            '<path d="M172 96 Q200 112 228 96" fill="none" stroke="' + ink.d + '" stroke-width="7" stroke-linecap="round"/>' +
            '<path d="' + capsule(138, 168, 126, 214, 5) + '" fill="' + ink.c + '"/>' +
            '<path d="' + capsule(262, 168, 274, 214, 5) + '" fill="' + ink.c + '"/>',
          "",
          bangsShort(ink.c),
          ink.defs
        );
      case "buns":
        return layersOf(
          cap +
            '<circle cx="132" cy="102" r="26" fill="' + ink.fill + '"/><circle cx="268" cy="102" r="26" fill="' + ink.fill + '"/>' +
            '<path d="M114 94 C120 78 144 78 150 94 C138 86 126 86 114 94 Z" fill="' + ink.l + '"/>' +
            '<path d="M250 94 C256 78 280 78 286 94 C274 86 262 86 250 94 Z" fill="' + ink.l + '"/>' +
            '<path d="M110 122 Q132 136 154 122" fill="none" stroke="' + ink.d + '" stroke-width="6" stroke-linecap="round"/>' +
            '<path d="M246 122 Q268 136 290 122" fill="none" stroke="' + ink.d + '" stroke-width="6" stroke-linecap="round"/>',
          "",
          bangsFull(ink.c),
          ink.defs
        );
      case "bob":
        return layersOf(
          '<path d="M126 168 C116 136 154 102 200 98 C246 102 284 136 274 168 C290 214 284 258 250 280 C230 294 214 270 200 266 C186 270 170 294 150 280 C116 258 110 214 126 168 Z" fill="' + ink.fill + '"/>',
          "",
          bangsFull(ink.c),
          ink.defs
        );
      case "pixie":
        return layersOf(
          '<path d="M140 176 C134 140 160 114 200 110 C240 114 266 140 260 176 C246 160 222 152 200 154 C178 152 154 160 140 176 Z" fill="' + ink.fill + '"/>' +
            '<path d="M178 186 C172 214 186 228 200 222 C214 228 228 214 222 186 C214 196 186 196 178 186 Z" fill="' + ink.c + '"/>' +
            '<path d="M248 140 C272 132 278 162 258 168 C248 156 246 148 248 140 Z" fill="' + ink.c + '"/>',
          "",
          bangsSwept(ink.c),
          ink.defs
        );
      case "pony":
        return layersOf(
          cap,
          '<path d="M206 114 C240 122 294 176 276 248 C264 308 292 342 270 374 C256 392 242 364 250 322 C258 268 230 214 218 164 C232 138 250 122 224 112 C214 106 206 108 206 114 Z" fill="' + ink.fill + '"/>' +
            hairTie(220, 122, tie),
          bangsShort(ink.c),
          ink.defs
        );
      case "twists": {
        let mid = "";
        for (let i = 0; i < 7; i++) {
          const x = 154 + i * 15;
          const extra = i % 2 ? 18 : 0;
          mid += twistRibbon(x, 196, 372 + extra, ink, i * 0.7);
        }
        return layersOf(cap, mid, bangsShort(ink.c), ink.defs);
      }
      case "halo":
        return layersOf(
          hairCap(ink.c) + haloRing(ink),
          "",
          "",
          ink.defs
        );
      case "pigtails":
        return layersOf(
          cap,
          '<path d="M156 164 C132 184 112 214 116 268 C120 318 108 336 124 328 C146 316 150 276 146 236 C144 206 156 186 168 170 C162 164 158 162 156 164 Z" fill="' + ink.fill + '"/>' +
            '<path d="M244 164 C268 184 288 214 284 268 C280 318 292 336 276 328 C254 316 250 276 254 236 C256 206 244 186 232 170 C238 164 242 162 244 164 Z" fill="' + ink.fill + '"/>' +
            hairTie(138, 206, tie) + hairTie(262, 206, tie),
          bangsSoft(ink.c),
          ink.defs
        );
      case "halfup":
        return layersOf(
          '<path d="M136 176 C124 210 112 260 124 318 C136 356 164 372 186 358 C200 348 214 358 236 372 C264 356 288 318 276 260 C288 210 264 176 236 164 C220 196 180 196 164 164 C152 168 142 172 136 176 Z" fill="' + ink.fill + '"/>' +
            '<circle cx="200" cy="86" r="22" fill="' + ink.fill + '"/>' +
            '<path d="M184 78 C190 64 210 64 216 78 C206 70 194 70 184 78 Z" fill="' + ink.l + '"/>' +
            hairTie(200, 104, tie),
          '<path d="' + capsule(152, 170, 134, 246, 6) + '" fill="' + ink.c + '"/><path d="' + capsule(248, 170, 266, 246, 6) + '" fill="' + ink.c + '"/>',
          bangsShort(ink.c),
          ink.defs
        );
      default:
        return layersOf(wavySheet(ink.fill), lockWavy(-1, ink.c) + lockWavy(1, ink.c), bangsSwept(ink.c), ink.defs);
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

  const DRAW = {
    gown: drawGown, tea: drawTea, petal: drawPetal, adventure: drawAdventure, explorer: drawExplorer,
    knight: drawKnight, pastel: drawPastel, star: drawStar, picnic: drawPicnic, coat: drawCoat,
    garden: drawGarden, royal: drawRoyal, sailor: drawSailor, spark: drawSpark
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
    if (style === "coily") return [292, 104];
    if (style === "bun") return [232, 58];
    if (style === "buns") return [294, 90];
    if (style === "curly") return [286, 148];
    if (style === "pony") return [246, 132];
    if (style === "sidebraid") return [304, 188];
    if (style === "halo") return [272, 108];
    if (style === "pigtails") return [262, 198];
    if (style === "halfup") return [230, 78];
    if (style === "pixie") return [262, 148];
    if (style === "braids") return [168, 168];
    if (style === "twists") return [274, 176];
    return [270, 158];
  }

  function hairExtra(p) {
    if (p.hairExtra === "none") return "";
    const anchor = extraAnchor(p.hair);
    if (p.hairExtra === "flower") return flowerShape(anchor[0], anchor[1], 11, p.extraColor, "#f2c14e");
    const x = anchor[0];
    const y = anchor[1];
    const color = p.extraColor;
    const d = Paint.darken(color, 0.15);
    return '<ellipse cx="' + (x - 12) + '" cy="' + y + '" rx="12" ry="8" fill="' + color + '"/><ellipse cx="' + (x + 12) + '" cy="' + y + '" rx="12" ry="8" fill="' + color + '"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="5" fill="' + d + '"/>' +
      '<path d="M ' + (x - 4) + " " + (y + 4) + " L " + (x - 14) + " " + (y + 20) + " L " + (x - 2) + " " + (y + 12) + ' Z" fill="' + color + '"/>' +
      '<path d="M ' + (x + 4) + " " + (y + 4) + " L " + (x + 14) + " " + (y + 20) + " L " + (x + 2) + " " + (y + 12) + ' Z" fill="' + color + '"/>';
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
    const showEars = p.hair === "pixie" || p.hair === "bob" || p.hair === "bun" || p.hair === "buns" || p.hair === "halo";
    const arm = arms(p, outfit);
    const winkRight = p.expression === "wink";
    const shyShift = p.expression === "shy" ? 3 : 0;
    let view = "0 0 400 520";
    if (options.plain) view = "48 24 304 496";
    if (options.thumb) view = "78 36 244 482";
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
      '<defs><filter id="' + uid + 'sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="5" stdDeviation="2.5" flood-color="#6b3a4a" flood-opacity="0.16"/></filter>' + (layers.defs || "") + "</defs>" +
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
