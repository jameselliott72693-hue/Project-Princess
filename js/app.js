(function () {
  const main = document.getElementById("main");
  const modal = document.getElementById("modal");
  const ICONS = {
    home: '<path fill="currentColor" d="M4 11 L12 4 L20 11 V20 H15 V14 H9 V20 H4 Z"/>',
    help: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.2 9.2a2.8 2.8 0 1 1 3.6 2.7c-.7.3-1.1.8-1.1 1.6V14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17" r="1.2" fill="currentColor"/>',
    sound: '<path fill="currentColor" d="M4 9 H8 L13 5 V19 L8 15 H4 Z"/><path d="M16 9.2c1.4 1.1 1.4 4.5 0 5.6M18.2 7.2c2.4 2 2.4 7.6 0 9.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    mute: '<path fill="currentColor" d="M4 9 H8 L13 5 V19 L8 15 H4 Z"/><path d="M16 10 L20 14 M20 10 L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    dice: '<rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.3" fill="currentColor"/>',
    spark: '<path fill="currentColor" d="M12 2 L13.7 8.2 L20 10 L13.7 11.8 L12 18 L10.3 11.8 L4 10 L10.3 8.2 Z"/>',
    undo: '<path d="M8 8 H14.5 a4.5 4.5 0 1 1 0 9 H11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 4.5 L4 8 L8 11.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    save: '<path fill="currentColor" d="M6 3 H18 V21 L12 17 L6 21 Z"/>',
    picture: '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="10" r="1.5" fill="currentColor"/><path d="M4 16.5 L9 12 L13 15 L16.5 12 L20.5 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    walk: '<circle cx="12" cy="5" r="2.2" fill="currentColor"/><path fill="currentColor" d="M9 21 L11 13 L8.5 10.5 H15.5 L13 13 L15 21 H12.2 L11.2 16 H10.6 L9.8 21 Z"/>',
    erase: '<path fill="currentColor" d="M14.5 4.5 L19.5 9.5 L9.5 19.5 H4.5 V14.5 Z"/><path d="M12 7 L17 12" stroke="#fff" stroke-width="1.6"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor"/>',
    close: '<path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    up: '<path fill="currentColor" d="M12 5 L19 16 H5 Z"/>',
    down: '<path fill="currentColor" d="M12 19 L5 8 H19 Z"/>',
    left: '<path fill="currentColor" d="M5 12 L16 5 V19 Z"/>',
    right: '<path fill="currentColor" d="M19 12 L8 19 V5 Z"/>',
    castle: '<path fill="currentColor" d="M3 21 V11 H7 V7 H10 V11 H14 V6 H17 V11 H21 V21 Z"/>',
    dress: '<path fill="currentColor" d="M9 3 H15 L14 8 L19 21 H5 L10 8 Z"/>',
    plus: '<path d="M12 5 V19 M5 12 H19" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'
  };

  const DIRS = { n: { c: 0, r: -1 }, s: { c: 0, r: 1 }, w: { c: -1, r: 0 }, e: { c: 1, r: 0 } };
  const KEY_DIR = {
    ArrowUp: "n", KeyW: "n", ArrowDown: "s", KeyS: "s",
    ArrowLeft: "w", KeyA: "w", ArrowRight: "e", KeyD: "e"
  };

  let view = "home";
  let working = null;
  let designTab = "skin";
  let designUndo = [];
  let buildUndo = [];
  let buildTool = "flowers";
  let buildGroup = "nature";
  let buildSliding = false;
  let buildBig = false;
  let exploreSource = "working";
  let pos = { c: 0, r: 0, facing: "s" };
  let visual = { c: 0, r: 0, phase: 0 };
  let move = null;
  let path = [];
  let afterMove = null;
  let dirQueue = [];
  let particles = [];
  let react = {};
  let gateOpen = {};
  let loop = 0;
  let lastFrame = 0;
  let lastBump = 0;
  let boardCtx = null;
  let painting = false;
  let strokeBase = null;
  let strokeChanged = false;
  let toastTimer = 0;

  function ico(name) {
    return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + "</svg>";
  }

  function reduceMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function toast(message) {
    const el = document.getElementById("toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 1700);
  }

  function fileBase(name) {
    const clean = String(name || "princess").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return clean || "princess";
  }

  function updateChrome() {
    const titles = { home: "Petal Palace", design: "Design", build: "Build", explore: "Explore" };
    document.getElementById("title").textContent = titles[view] || "Petal Palace";
    const homeBtn = document.getElementById("btn-home");
    homeBtn.innerHTML = ico(view === "home" ? "spark" : "home") + "<span>Home</span>";
    homeBtn.disabled = view === "home";
    document.getElementById("btn-help").innerHTML = ico("help") + "<span>Help</span>";
    const mute = Store.data.mute;
    const muteBtn = document.getElementById("btn-mute");
    muteBtn.innerHTML = ico(mute ? "mute" : "sound") + "<span>" + (mute ? "Muted" : "Sound") + "</span>";
    muteBtn.setAttribute("aria-pressed", mute ? "true" : "false");
    muteBtn.setAttribute("aria-label", mute ? "Sound is off" : "Sound is on");
  }

  function stopLoop() {
    if (loop) cancelAnimationFrame(loop);
    loop = 0;
  }

  function startLoop() {
    if (loop) return;
    lastFrame = 0;
    const tick = function (now) {
      loop = requestAnimationFrame(tick);
      const dt = Math.min(40, lastFrame ? now - lastFrame : 16);
      lastFrame = now;
      if (view === "explore") stepExplore(dt);
      if (boardCtx) paintBoard();
    };
    loop = requestAnimationFrame(tick);
  }

  function show(next) {
    view = next;
    stopLoop();
    painting = false;
    particles = [];
    move = null;
    path = [];
    afterMove = null;
    if (next === "home") renderHome();
    if (next === "design") renderDesigner();
    if (next === "build") {
      renderBuilder();
      startLoop();
    }
    if (next === "explore") {
      const start = Realm.startTile(Store.data.kingdom.cells);
      pos = { c: start.c, r: start.r, facing: "s" };
      visual = { c: pos.c, r: pos.r, phase: 0 };
      renderExplore();
      startLoop();
    }
    updateChrome();
    window.scrollTo(0, 0);
  }

  function heroCastle() {
    return '<svg viewBox="0 0 280 210" aria-hidden="true">' +
      '<circle cx="40" cy="46" r="18" fill="#ffe08a"/>' +
      '<ellipse cx="140" cy="196" rx="120" ry="18" fill="#b6e28c"/>' +
      '<rect x="78" y="108" width="124" height="74" rx="10" fill="#f0d2ae"/>' +
      '<rect x="46" y="78" width="48" height="104" rx="24" fill="#e7c4a0"/>' +
      '<rect x="186" y="64" width="50" height="118" rx="25" fill="#e7c4a0"/>' +
      '<path d="M46 86 L70 40 L94 86 Z" fill="#7eb6d6"/>' +
      '<path d="M186 74 L211 30 L236 74 Z" fill="#e26d7a"/>' +
      '<path d="M78 112 L140 62 L202 112 Z" fill="#e26d7a"/>' +
      '<rect x="120" y="140" width="40" height="42" rx="20" fill="#8c4e34"/>' +
      '<circle cx="70" cy="120" r="7" fill="#9fd7f2"/>' +
      '<circle cx="210" cy="112" r="7" fill="#9fd7f2"/>' +
      '<rect x="208" y="16" width="3" height="20" fill="#8d6e63"/>' +
      '<path d="M211 16 L228 22 L211 30 Z" fill="#f2c14e"/>' +
      "</svg>";
  }

  function savedPrincessCards() {
    const list = Store.data.savedPrincesses;
    if (!list.length) return '<p class="empty-note">Saved princesses show up here.</p>';
    return '<div class="saved-row">' + list.map(function (item) {
      return '<div class="saved-card"><button type="button" class="icon-x" data-act="delete-princess" data-id="' + Paint.esc(item.id) + '" aria-label="Erase ' + Paint.esc(Princess.displayName(item)) + '">' + ico("close") + '</button>' +
        '<button type="button" class="load" data-act="load-princess" data-id="' + Paint.esc(item.id) + '">' +
        Princess.svg(item, { thumb: true }) + '<span class="who">' + Paint.esc(Princess.displayName(item)) + "</span></button></div>";
    }).join("") + "</div>";
  }

  function savedKingdomCards() {
    const list = Store.data.savedKingdoms;
    if (!list.length) return '<p class="empty-note">Saved kingdoms show up here.</p>';
    return '<div class="saved-row" id="kingdom-cards">' + list.map(function (item) {
      return '<div class="saved-card"><button type="button" class="icon-x" data-act="delete-kingdom" data-id="' + Paint.esc(item.id) + '" aria-label="Erase ' + Paint.esc(item.name) + '">' + ico("close") + '</button>' +
        '<button type="button" class="load" data-act="load-kingdom" data-id="' + Paint.esc(item.id) + '">' +
        '<canvas data-mini="' + Paint.esc(item.id) + '" width="192" height="140"></canvas><span class="who">' + Paint.esc(item.name) + "</span></button></div>";
    }).join("") + "</div>";
  }

  function paintMinis(rootEl) {
    const scope = rootEl || document;
    scope.querySelectorAll("canvas[data-mini]").forEach(function (canvas) {
      const item = Store.data.savedKingdoms.filter(function (k) { return k.id === canvas.dataset.mini; })[0];
      if (!item) return;
      const ctx = canvas.getContext("2d");
      const scale = canvas.width / Realm.WORLD_W;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      Realm.draw(ctx, item.cells, { anim: 0, showGrid: false, now: 0 });
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    });
  }

  function renderHome() {
    main.innerHTML = '<section class="hero"><div class="hero-castle">' + heroCastle() + '</div><div class="hero-princess">' +
      Princess.svg(working, { thumb: true }) + "</div></section>" +
      '<h2 class="home-lead">A little kingdom</h2>' +
      '<div class="home-grid">' +
      '<button type="button" class="home-card design" data-act="go-design">' + ico("dress").replace('class="ico"', 'class="ico big-ico"') + "<span>Design</span></button>" +
      '<button type="button" class="home-card build" data-act="go-build">' + ico("castle").replace('class="ico"', 'class="ico big-ico"') + "<span>Build</span></button>" +
      "</div>" +
      '<h3 class="section-label">Princesses</h3>' + savedPrincessCards() +
      '<h3 class="section-label">Kingdoms</h3>' + savedKingdomCards();
    paintMinis(main);
  }

  function swatches(colors, key, current) {
    return '<div class="swatch-row">' + colors.map(function (color) {
      const on = color.toLowerCase() === String(current || "").toLowerCase();
      return '<button type="button" class="swatch' + (on ? " is-on" : "") + '" style="background:' + color + '" data-act="swatch" data-key="' + key + '" data-value="' + color + '" aria-label="Color" aria-pressed="' + (on ? "true" : "false") + '"></button>';
    }).join("") + "</div>";
  }

  function colorAny(key, current) {
    const value = Paint.validHex(current) ? current : "#e25b7a";
    return '<label class="anycolor">Any<input type="color" data-color="' + key + '" value="' + value + '" aria-label="Any color"></label>';
  }

  function choiceButton(act, id, label, art, on) {
    return '<button type="button" class="choice' + (on ? " is-on" : "") + '" data-act="' + act + '" data-id="' + id + '" aria-pressed="' + (on ? "true" : "false") + '">' +
      '<span class="choice-art">' + art + '</span><span class="choice-label">' + Paint.esc(label) + "</span></button>";
  }

  function preview(overrides) {
    return Princess.svg(Object.assign({}, working, overrides), { thumb: true });
  }

  function panelHtml() {
    const p = working;
    if (designTab === "skin") {
      return '<h3 class="panel-title">Skin</h3>' + swatches(Princess.SKINS, "skin", p.skin);
    }
    if (designTab === "face") {
      return '<h3 class="panel-title">Face</h3><div class="choice-grid">' +
        Princess.FACES.map(function (item) {
          return choiceButton("set-face", item.id, item.label, preview({ face: item.id }), p.face === item.id);
        }).join("") + "</div><h3 class=\"panel-title\">Look</h3><div class=\"choice-grid\">" +
        Princess.EXPRESSIONS.map(function (item) {
          return choiceButton("set-expression", item.id, item.label, preview({ expression: item.id }), p.expression === item.id);
        }).join("") + '</div><h3 class="panel-title">Eyes</h3>' + swatches(Princess.EYE_COLORS, "eye", p.eye) + colorAny("eye", p.eye);
    }
    if (designTab === "hair") {
      return '<h3 class="panel-title">Hair</h3><div class="choice-grid">' +
        Princess.HAIRS.map(function (item) {
          return choiceButton("set-hair", item.id, item.label, preview({ hair: item.id }), p.hair === item.id);
        }).join("") + '</div><h3 class="panel-title">Hair color</h3>' +
        swatches(Princess.HAIR_COLORS, "hairColor", p.hairColor) + colorAny("hairColor", p.hairColor) +
        '<h3 class="panel-title">Clip</h3><div class="choice-grid">' +
        Princess.EXTRAS.map(function (item) {
          return choiceButton("set-extra", item.id, item.label, preview({ hairExtra: item.id, extraColor: p.extraColor }), p.hairExtra === item.id);
        }).join("") + '</div><h3 class="panel-title">Clip color</h3>' +
        swatches(Princess.EXTRA_COLORS, "extraColor", p.extraColor) + colorAny("extraColor", p.extraColor);
    }
    if (designTab === "dress") {
      return '<h3 class="panel-title">Dress</h3><div class="choice-grid">' +
        Princess.OUTFITS.map(function (item) {
          return choiceButton("set-outfit", item.id, item.label, preview({ outfit: item.id, outfitColor: item.color, outfitAccent: item.accent }), p.outfit === item.id);
        }).join("") + '</div><h3 class="panel-title">Color</h3>' +
        swatches(Princess.DRESS_COLORS, "outfitColor", p.outfitColor) + colorAny("outfitColor", p.outfitColor) +
        '<h3 class="panel-title">Trim</h3>' + swatches(Princess.ACCENT_COLORS, "outfitAccent", p.outfitAccent) + colorAny("outfitAccent", p.outfitAccent);
    }
    if (designTab === "shoes") {
      return '<h3 class="panel-title">Shoes</h3><div class="choice-grid">' +
        Princess.SHOES.map(function (item) {
          return choiceButton("set-shoes", item.id, item.label, preview({ shoes: item.id }), p.shoes === item.id);
        }).join("") + '</div><h3 class="panel-title">Color</h3>' +
        swatches(Princess.SHOE_COLORS, "shoeColor", p.shoeColor) + colorAny("shoeColor", p.shoeColor);
    }
    if (designTab === "crown") {
      return '<h3 class="panel-title">Crown</h3><div class="choice-grid">' +
        Princess.CROWNS.map(function (item) {
          return choiceButton("set-crown", item.id, item.label, preview({ crown: item.id }), p.crown === item.id);
        }).join("") + '</div><h3 class="panel-title">Color</h3>' +
        swatches(Princess.CROWN_COLORS, "crownColor", p.crownColor) + colorAny("crownColor", p.crownColor);
    }
    return '<h3 class="panel-title">More</h3>' +
      '<div class="toggle-row">' +
      toggle("toggle-cape", "Cape", p.cape) + toggle("toggle-wand", "Wand", p.wand) +
      toggle("toggle-necklace", "Necklace", p.necklace) + toggle("toggle-earrings", "Earrings", p.earrings) +
      "</div>" +
      '<h3 class="panel-title">Cape color</h3>' + swatches(Princess.CAPE_COLORS, "capeColor", p.capeColor) + colorAny("capeColor", p.capeColor) +
      '<h3 class="panel-title">Wand color</h3>' + swatches(Princess.WAND_COLORS, "wandColor", p.wandColor) + colorAny("wandColor", p.wandColor) +
      '<h3 class="panel-title">Gem</h3>' + swatches(Princess.GEM_COLORS, "gemColor", p.gemColor) + colorAny("gemColor", p.gemColor) +
      '<h3 class="panel-title">Pet</h3><div class="choice-grid">' +
      Princess.PETS.map(function (item) {
        return choiceButton("set-pet", item.id, item.label, preview({ pet: item.id }), p.pet === item.id);
      }).join("") + '</div><h3 class="panel-title">Pet color</h3>' +
      swatches(Princess.PET_COLORS, "petColor", p.petColor) + colorAny("petColor", p.petColor);
  }

  function toggle(act, label, on) {
    return '<button type="button" class="btn' + (on ? " primary" : "") + '" data-act="' + act + '" aria-pressed="' + (on ? "true" : "false") + '">' + Paint.esc(label) + "</button>";
  }

  function updateUndoBtn() {
    const btn = document.getElementById("undo-design");
    if (btn) btn.disabled = designUndo.length === 0;
    const mapBtn = document.getElementById("undo-build");
    if (mapBtn) mapBtn.disabled = buildUndo.length === 0;
  }

  function updateStage() {
    const stage = document.getElementById("stage");
    if (stage) stage.innerHTML = Princess.svg(working);
  }

  function refreshPanel() {
    const panel = document.getElementById("panel");
    if (!panel) return;
    const top = panel.scrollTop;
    panel.innerHTML = panelHtml();
    panel.scrollTop = top;
  }

  function refreshSavedPrincesses() {
    const el = document.getElementById("saved-princesses");
    if (el) el.innerHTML = savedPrincessCards();
  }

  function pushDesignUndo() {
    designUndo.push(JSON.stringify(working));
    if (designUndo.length > 40) designUndo.shift();
    updateUndoBtn();
  }

  function commitWorking() {
    Store.data.princess = working;
    Store.persist();
  }

  function renderDesigner() {
    const tabs = [["skin", "Skin"], ["face", "Face"], ["hair", "Hair"], ["dress", "Dress"], ["shoes", "Shoes"], ["crown", "Crown"], ["more", "More"]];
    main.innerHTML = '<section class="studio"><div class="stage-card"><div class="nameplate"><label for="pname">Name</label>' +
      '<input id="pname" maxlength="20" value="' + Paint.esc(working.name) + '" placeholder="Princess" autocomplete="off">' +
      '<button type="button" class="btn tiny" data-act="dice" aria-label="Pick a name">' + ico("dice") + "</button></div>" +
      '<div class="stage-art" id="stage"></div>' +
      '<div class="stage-tools">' +
      '<button type="button" class="btn" data-act="random">' + ico("spark") + "<span>Random</span></button>" +
      '<button type="button" class="btn" id="undo-design" data-act="undo-design">' + ico("undo") + "<span>Undo</span></button>" +
      '<button type="button" class="btn" data-act="new-princess">' + ico("plus") + "<span>New</span></button>" +
      '<button type="button" class="btn primary" data-act="save-princess">' + ico("save") + "<span>Save</span></button>" +
      '<button type="button" class="btn" data-act="picture">' + ico("picture") + "<span>Picture</span></button>" +
      '<button type="button" class="btn" data-act="go-explore">' + ico("walk") + "<span>Walk</span></button>" +
      "</div></div><div class=\"panel-card\"><div class=\"tabs\">" +
      tabs.map(function (tab) {
        return '<button type="button" class="tab' + (designTab === tab[0] ? " is-on" : "") + '" data-act="tab" data-id="' + tab[0] + '">' + tab[1] + "</button>";
      }).join("") + '</div><div class="panel" id="panel"></div></div></section>' +
      '<h3 class="section-label">Saved</h3><div id="saved-princesses"></div>';
    updateStage();
    refreshPanel();
    refreshSavedPrincesses();
    updateUndoBtn();
  }

  function renderBuilder() {
    main.innerHTML = '<section class="builder"><div class="map-column"><div class="nameplate"><label for="kname">Name</label>' +
      '<input id="kname" class="name-field" maxlength="20" value="' + Paint.esc(Store.data.kingdom.name) + '" autocomplete="off"></div>' +
      '<div class="map-tools">' +
      '<button type="button" class="btn primary" data-act="go-explore">' + ico("walk") + "<span>Explore</span></button>" +
      '<button type="button" class="btn" id="undo-build" data-act="undo-build">' + ico("undo") + "<span>Undo</span></button>" +
      '<button type="button" class="btn' + (buildTool === "grass" ? " primary" : "") + '" id="erase-tool" data-act="erase">' + ico("erase") + "<span>Erase</span></button>" +
      '<button type="button" class="btn seg' + (buildSliding ? "" : " is-on") + '" id="mode-place" data-act="mode-place">Place</button>' +
      '<button type="button" class="btn seg' + (buildSliding ? " is-on" : "") + '" id="mode-slide" data-act="mode-slide">Slide</button>' +
      '<button type="button" class="btn" data-act="zoom">' + (buildBig ? "Fit" : "Bigger") + "</button>" +
      '<button type="button" class="btn" data-act="templates">' + ico("grid") + "<span>Starters</span></button>" +
      '<button type="button" class="btn" data-act="save-kingdom">' + ico("save") + "<span>Save</span></button>" +
      '<button type="button" class="btn" data-act="kingdom-picture">' + ico("picture") + "<span>Picture</span></button>" +
      "</div>" +
      '<div class="board-wrap" id="board-wrap"><canvas class="board' + (buildSliding ? " slide-mode" : " place-mode") + (buildBig ? " is-big" : "") + '" id="board"></canvas></div>' +
      '<p class="empty-note" id="tool-label"></p></div>' +
      '<div class="palette"><div class="group-tabs">' +
      Realm.GROUPS.map(function (group) {
        return '<button type="button" class="group-tab' + (buildGroup === group.id ? " is-on" : "") + '" data-act="group" data-id="' + group.id + '">' + group.label + "</button>";
      }).join("") + '</div><div class="tool-grid" id="tools"></div></div></section>' +
      '<h3 class="section-label">Saved</h3><div id="saved-kingdoms"></div>';
    renderTools();
    refreshSavedKingdoms();
    bindBoard();
    updateUndoBtn();
    updateToolLabel();
  }

  function renderTools() {
    const box = document.getElementById("tools");
    if (!box) return;
    const tiles = Realm.TILES.filter(function (tile) { return tile.group === buildGroup; });
    box.innerHTML = tiles.map(function (tile) {
      const on = buildTool === tile.id;
      return '<button type="button" class="tool' + (on ? " is-on" : "") + '" data-act="tool" data-id="' + tile.id + '" aria-pressed="' + (on ? "true" : "false") + '">' +
        '<canvas data-tile="' + tile.id + '" width="96" height="96"></canvas><span>' + tile.label + "</span></button>";
    }).join("");
    box.querySelectorAll("canvas[data-tile]").forEach(function (canvas) {
      Realm.paintPreview(canvas, canvas.dataset.tile);
    });
  }

  function refreshSavedKingdoms() {
    const el = document.getElementById("saved-kingdoms");
    if (!el) return;
    el.innerHTML = savedKingdomCards();
    paintMinis(el);
  }

  function updateToolLabel() {
    const el = document.getElementById("tool-label");
    if (!el) return;
    if (buildTool === "grass") el.textContent = "Erasing";
    else {
      const tile = Realm.TILES.filter(function (item) { return item.id === buildTool; })[0];
      el.textContent = tile ? "Placing " + tile.label : "";
    }
    const erase = document.getElementById("erase-tool");
    if (erase) erase.classList.toggle("primary", buildTool === "grass");
  }

  function bindBoard() {
    const canvas = document.getElementById("board");
    if (!canvas) return;
    boardCtx = fitCanvas(canvas);
    canvas.classList.toggle("slide-mode", buildSliding);
    canvas.classList.toggle("place-mode", !buildSliding);
    canvas.classList.toggle("is-big", buildBig);
    paintBoard();
  }

  function fitCanvas(canvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(Realm.WORLD_W * dpr);
    canvas.height = Math.round(Realm.WORLD_H * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }

  function paintBoard() {
    if (!boardCtx) return;
    const exploring = view === "explore";
    Realm.draw(boardCtx, Store.data.kingdom.cells, {
      anim: performance.now(),
      showGrid: view === "build",
      pose: exploring ? { c: visual.c, r: visual.r, facing: pos.facing, phase: visual.phase || 0 } : null,
      princess: exploring ? currentExplorer() : null,
      particles: particles,
      react: react,
      gateOpen: gateOpen,
      now: performance.now()
    });
  }

  function tileFromEvent(event) {
    const canvas = document.getElementById("board");
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * Realm.WORLD_W;
    const y = ((event.clientY - rect.top) / rect.height) * Realm.WORLD_H - Realm.PAD;
    const c = Math.floor(x / Realm.TILE);
    const r = Math.floor(y / Realm.TILE);
    if (c < 0 || r < 0 || c >= Realm.COLS || r >= Realm.ROWS) return null;
    return { c: c, r: r };
  }

  function pushBuildUndo() {
    buildUndo.push(Store.data.kingdom.cells.slice());
    if (buildUndo.length > 40) buildUndo.shift();
    updateUndoBtn();
  }

  function paintCell(event) {
    if (buildSliding || view !== "build") return;
    const tile = tileFromEvent(event);
    if (!tile) return;
    const cells = Store.data.kingdom.cells;
    const idx = tile.r * Realm.COLS + tile.c;
    if (cells[idx] === buildTool) return;
    if (!strokeChanged) {
      buildUndo.push(strokeBase);
      if (buildUndo.length > 40) buildUndo.shift();
      strokeChanged = true;
      updateUndoBtn();
      Sfx.place();
    }
    cells[idx] = buildTool;
    paintBoard();
  }

  function currentExplorer() {
    if (exploreSource !== "working") {
      const found = Store.data.savedPrincesses.filter(function (item) { return item.id === exploreSource; })[0];
      if (found) return Princess.normalize(found);
    }
    return Princess.normalize(working);
  }

  function renderExplore() {
    const people = [{ id: "working", name: Princess.displayName(working), princess: working }].concat(
      Store.data.savedPrincesses.filter(function (item) {
        return Princess.signature(item) !== Princess.signature(working);
      }).map(function (item) {
        return { id: item.id, name: Princess.displayName(item), princess: item };
      })
    );
    main.innerHTML = '<section><div class="map-tools">' +
      '<button type="button" class="btn" data-act="go-build">' + ico("castle") + "<span>Build</span></button>" +
      '<button type="button" class="btn" data-act="zoom">' + (buildBig ? "Fit" : "Bigger") + "</button>" +
      "</div>" +
      '<div class="board-wrap" id="board-wrap"><canvas class="board slide-mode' + (buildBig ? " is-big" : "") + '" id="board"></canvas></div>' +
      '<div class="dpad">' +
      '<button type="button" class="pad up" data-dir="n" aria-label="Up">' + ico("up") + "</button>" +
      '<button type="button" class="pad left" data-dir="w" aria-label="Left">' + ico("left") + "</button>" +
      '<button type="button" class="pad down" data-dir="s" aria-label="Down">' + ico("down") + "</button>" +
      '<button type="button" class="pad right" data-dir="e" aria-label="Right">' + ico("right") + "</button>" +
      "</div>" +
      '<div class="who-row">' + people.map(function (person) {
        const on = exploreSource === person.id;
        return '<button type="button" class="who-chip' + (on ? " is-on" : "") + '" data-act="explorer" data-id="' + Paint.esc(person.id) + '">' +
          Princess.svg(person.princess, { thumb: true }) + "<span>" + Paint.esc(person.name) + "</span></button>";
      }).join("") + "</div></section>";
    bindBoard();
    document.querySelectorAll(".pad").forEach(bindPad);
    const canvas = document.getElementById("board");
    let down = null;
    canvas.addEventListener("pointerdown", function (event) {
      down = { x: event.clientX, y: event.clientY, t: performance.now() };
    });
    canvas.addEventListener("pointerup", function (event) {
      if (!down || view !== "explore") return;
      const dx = event.clientX - down.x;
      const dy = event.clientY - down.y;
      down = null;
      if (dx * dx + dy * dy > 144) return;
      const tile = tileFromEvent(event);
      if (tile) onTap(tile.c, tile.r);
    });
  }

  function bindPad(btn) {
    const dir = btn.dataset.dir;
    const start = function (event) {
      event.preventDefault();
      if (btn.setPointerCapture) btn.setPointerCapture(event.pointerId);
      setDir(dir, true);
      tryStep(dir);
    };
    const stop = function () { setDir(dir, false); };
    btn.addEventListener("pointerdown", start);
    btn.addEventListener("pointerup", stop);
    btn.addEventListener("pointercancel", stop);
    btn.addEventListener("contextmenu", function (event) { event.preventDefault(); });
  }

  function setDir(dir, down) {
    dirQueue = dirQueue.filter(function (item) { return item !== dir; });
    if (down) dirQueue.push(dir);
  }

  function activeDir() {
    return dirQueue.length ? dirQueue[dirQueue.length - 1] : null;
  }

  function beginMove(next) {
    move = { from: { c: pos.c, r: pos.r }, to: next, age: 0, dur: reduceMotion() ? 0 : 230 };
    const dc = next.c - pos.c;
    const dr = next.r - pos.r;
    if (dc > 0) pos.facing = "e";
    else if (dc < 0) pos.facing = "w";
    else if (dr > 0) pos.facing = "s";
    else if (dr < 0) pos.facing = "n";
    if (!reduceMotion()) Sfx.step();
  }

  function finishMove() {
    pos.c = move.to.c;
    pos.r = move.to.r;
    move = null;
    const id = Realm.cell(Store.data.kingdom.cells, pos.c, pos.r);
    const kind = Realm.interactKind(id);
    if (kind === "animal") triggerAnimal(pos.c, pos.r);
    if (kind === "flowers") spawnSparkle(pos.c, pos.r, 7);
    if (path.length === 0 && afterMove) {
      const fn = afterMove;
      afterMove = null;
      fn();
    }
    advance();
  }

  function advance() {
    if (move || view !== "explore" || !modal.hidden) return;
    if (path.length) {
      beginMove(path.shift());
      return;
    }
    const dir = activeDir();
    if (dir) tryStep(dir);
  }

  function tryStep(dir) {
    if (view !== "explore" || !modal.hidden) return;
    path = [];
    afterMove = null;
    if (move) {
      pos.facing = dir;
      return;
    }
    const delta = DIRS[dir];
    const nc = pos.c + delta.c;
    const nr = pos.r + delta.r;
    pos.facing = dir;
    const cells = Store.data.kingdom.cells;
    if (!Realm.walkable(cells, nc, nr)) {
      const now = performance.now();
      if (now - lastBump > 450) {
        lastBump = now;
        Sfx.bump();
        const kind = Realm.interactKind(Realm.cell(cells, nc, nr));
        if (kind && kind !== "flowers") interact(nc, nr);
      }
      return;
    }
    beginMove({ c: nc, r: nr });
  }

  function onTap(c, r) {
    if (!modal.hidden) return;
    const cells = Store.data.kingdom.cells;
    const id = Realm.cell(cells, c, r);
    const kind = Realm.interactKind(id);
    path = [];
    afterMove = null;
    if (!Realm.walkable(cells, c, r)) {
      if (!kind) {
        Sfx.bump();
        return;
      }
      const near = Realm.nearestStand(cells, pos, { c: c, r: r });
      if (!near) {
        Sfx.bump();
        return;
      }
      path = near.path.slice();
      afterMove = function () { interact(c, r); };
      if (!path.length) interact(c, r);
      else advance();
      return;
    }
    const route = Realm.astar(cells, pos, { c: c, r: r });
    if (!route) {
      Sfx.bump();
      return;
    }
    const onArrival = kind === "animal" || kind === "flowers";
    if (kind && !onArrival) afterMove = function () { interact(c, r); };
    if (!route.length) {
      if (kind) interact(c, r);
      return;
    }
    path = route;
    advance();
  }

  function interact(c, r) {
    const id = Realm.cell(Store.data.kingdom.cells, c, r);
    const kind = Realm.interactKind(id);
    if (!kind) return;
    if (kind === "fountain" || kind === "flowers") {
      spawnSparkle(c, r, kind === "fountain" ? 16 : 8);
      Sfx.chime();
      return;
    }
    if (kind === "animal") {
      triggerAnimal(c, r);
      return;
    }
    if (kind === "castle") gateOpen[c + "," + r] = performance.now() + 1600;
    openInterior(kind === "castle" ? "castle" : kind);
    Sfx.open();
  }

  function triggerAnimal(c, r) {
    react[c + "," + r] = performance.now() + 700;
    const spot = Realm.foot(c, r);
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: spot.x + (i - 1) * 8,
        y: spot.y - 28,
        vx: (i - 1) * 8,
        vy: -36,
        age: 0,
        life: 800,
        color: "#f2849a",
        size: 6,
        kind: "heart"
      });
    }
    Sfx.animal();
  }

  function spawnSparkle(c, r, count) {
    const x = c * Realm.TILE + Realm.TILE / 2;
    const y = Realm.PAD + r * Realm.TILE + Realm.TILE / 2;
    const colors = ["#fff", "#ffe27a", "#ffb3c7", "#bde7ff"];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 16 + Math.random() * 42;
      particles.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 20,
        age: 0,
        life: 650 + Math.random() * 350,
        color: colors[i % colors.length],
        size: 3 + Math.random() * 3,
        kind: "star"
      });
    }
  }

  function stepExplore(dt) {
    if (move) {
      move.age += dt;
      const u = move.dur <= 0 ? 1 : Math.min(1, move.age / move.dur);
      const eased = u * u * (3 - 2 * u);
      visual.c = move.from.c + (move.to.c - move.from.c) * eased;
      visual.r = move.from.r + (move.to.r - move.from.r) * eased;
      visual.phase = u;
      if (u >= 1) finishMove();
    } else {
      visual.c = pos.c;
      visual.r = pos.r;
      visual.phase = 0;
      advance();
    }
    const sec = dt / 1000;
    particles = particles.filter(function (item) {
      item.age += dt;
      item.x += item.vx * sec;
      item.y += item.vy * sec;
      item.vy += 28 * sec;
      return item.age < item.life;
    });
    keepVisible();
  }

  function keepVisible() {
    const wrap = document.getElementById("board-wrap");
    const canvas = document.getElementById("board");
    if (!wrap || !canvas) return;
    const scale = canvas.getBoundingClientRect().width / Realm.WORLD_W;
    const spot = Realm.foot(visual.c, visual.r);
    const px = spot.x * scale;
    const py = spot.y * scale;
    const margin = 70;
    const left = px - wrap.scrollLeft;
    const top = py - wrap.scrollTop;
    if (left < margin) wrap.scrollLeft -= margin - left;
    else if (left > wrap.clientWidth - margin) wrap.scrollLeft += left - (wrap.clientWidth - margin);
    if (top < margin) wrap.scrollTop -= margin - top;
    else if (top > wrap.clientHeight - margin) wrap.scrollTop += top - (wrap.clientHeight - margin);
  }

  function hideModal() {
    if (modal.dataset.kind === "help") Store.setHelpSeen();
    modal.hidden = true;
    modal.innerHTML = "";
    modal.dataset.kind = "";
    modal.dataset.dismiss = "";
  }

  function showModal(html, kind, dismiss) {
    modal.dataset.kind = kind || "";
    modal.dataset.dismiss = dismiss ? "1" : "";
    modal.innerHTML = html;
    modal.hidden = false;
    const focus = modal.querySelector("button");
    if (focus) focus.focus();
  }

  function confirmModal(message, yesLabel, onYes) {
    showModal('<div class="modal-card" role="dialog" aria-modal="true"><p class="modal-lead">' + Paint.esc(message) + '</p><div class="row">' +
      '<button type="button" class="btn" id="modal-no">No</button><button type="button" class="btn primary" id="modal-yes">' + Paint.esc(yesLabel) + "</button></div></div>", "confirm", false);
    document.getElementById("modal-no").onclick = hideModal;
    document.getElementById("modal-yes").onclick = function () {
      hideModal();
      onYes();
    };
  }

  function openHelp() {
    showModal('<div class="modal-card" role="dialog" aria-modal="true"><h2>How to play</h2><div class="help-steps">' +
      helpStep("a", "dress", "Design", "Tap a look. Give her a name.") +
      helpStep("b", "save", "Save", "Keep her on this device.") +
      helpStep("c", "castle", "Build", "Tap a piece. Tap the map.") +
      helpStep("d", "walk", "Explore", "Tap the ground, the arrows, or the keyboard.") +
      '</div><button type="button" class="btn primary" id="help-go">Let\'s go</button></div>', "help", true);
    document.getElementById("help-go").onclick = hideModal;
  }

  function helpStep(tone, icon, title, text) {
    return '<div class="help-step"><div class="help-art ' + tone + '">' + ico(icon) + "</div><div><strong>" + title + "</strong><p>" + text + "</p></div></div>";
  }

  function openInterior(kind) {
    const scenes = {
      castle: ["Throne room", sceneCastle()],
      house: ["Cozy room", sceneHouse()],
      bakery: ["Bakery", sceneBakery()],
      stall: ["Market", sceneMarket()]
    };
    const scene = scenes[kind] || scenes.castle;
    showModal('<div class="modal-card" role="dialog" aria-modal="true"><h2>' + scene[0] + '</h2><div class="interior-scene">' +
      scene[1] + '<div class="interior-person">' + Princess.svg(currentExplorer(), { plain: true }) + "</div></div>" +
      '<div class="row" style="margin-top:12px"><button type="button" class="btn primary" id="close-room">Close</button></div></div>', "room", true);
    document.getElementById("close-room").onclick = hideModal;
  }

  function sceneCastle() {
    return '<svg viewBox="0 0 640 380" aria-hidden="true"><rect width="640" height="380" fill="#f6e2c8"/>' +
      '<rect y="250" width="640" height="130" fill="#e7c9a4"/>' +
      '<rect x="70" y="36" width="100" height="130" rx="10" fill="#9fd7f2"/><rect x="470" y="36" width="100" height="130" rx="10" fill="#9fd7f2"/>' +
      '<rect x="82" y="48" width="76" height="106" fill="#dff3ff"/><rect x="482" y="48" width="76" height="106" fill="#dff3ff"/>' +
      '<ellipse cx="320" cy="320" rx="130" ry="28" fill="#e25b7a" opacity="0.28"/>' +
      '<path d="M250 300 H390 V170 H250 Z" fill="#c4844a"/><path d="M236 170 H404 L374 132 H266 Z" fill="#e8b84a"/>' +
      '<rect x="292" y="210" width="56" height="40" rx="10" fill="#f2849a"/>' +
      '<circle cx="120" cy="300" r="18" fill="#7bc67e"/><circle cx="520" cy="300" r="18" fill="#7bc67e"/>' +
      '<path d="M150 70 H190 L170 110 Z" fill="#e26d7a"/><path d="M450 70 H490 L470 110 Z" fill="#7eb6d6"/></svg>';
  }

  function sceneHouse() {
    return '<svg viewBox="0 0 640 380" aria-hidden="true"><rect width="640" height="380" fill="#fff0df"/>' +
      '<circle cx="80" cy="70" r="16" fill="#ffd0de"/><circle cx="140" cy="90" r="10" fill="#ffe08a"/><circle cx="540" cy="80" r="18" fill="#d9f2c2"/>' +
      '<rect y="250" width="640" height="130" fill="#e7c9a4"/><ellipse cx="320" cy="330" rx="150" ry="36" fill="#f2849a" opacity="0.35"/>' +
      '<rect x="80" y="150" width="150" height="90" rx="16" fill="#fff"/><rect x="100" y="168" width="110" height="54" rx="10" fill="#c7e7ff"/>' +
      '<rect x="420" y="190" width="130" height="70" rx="12" fill="#e7c4a0"/><rect x="436" y="150" width="98" height="50" rx="16" fill="#fff"/>' +
      '<rect x="450" y="164" width="70" height="22" fill="#f2849a"/></svg>';
  }

  function sceneBakery() {
    return '<svg viewBox="0 0 640 380" aria-hidden="true"><rect width="640" height="380" fill="#fff1df"/>' +
      '<rect y="230" width="640" height="150" fill="#e7c29a"/>' +
      '<rect x="70" y="150" width="500" height="90" rx="12" fill="#c4844a"/>' +
      '<ellipse cx="160" cy="140" rx="36" ry="20" fill="#f2c14e"/><ellipse cx="250" cy="136" rx="30" ry="18" fill="#e8a87c"/>' +
      '<ellipse cx="340" cy="142" rx="28" ry="16" fill="#f7e7a1"/><circle cx="450" cy="130" r="28" fill="#fff6ea"/><circle cx="450" cy="130" r="16" fill="#f2849a"/>' +
      '<path d="M80 70 L140 100 L200 70 L260 100 L320 70 L380 100 L440 70 L500 100 L560 70" fill="none" stroke="#e25b7a" stroke-width="8"/>' +
      "</svg>";
  }

  function sceneMarket() {
    return '<svg viewBox="0 0 640 380" aria-hidden="true"><rect width="640" height="380" fill="#e7f6ff"/>' +
      '<rect y="250" width="640" height="130" fill="#e6c79a"/>' +
      '<path d="M60 150 L180 90 L300 150 Z" fill="#f2849a"/><path d="M340 150 L460 90 L580 150 Z" fill="#7eb6d6"/>' +
      '<rect x="90" y="150" width="180" height="80" fill="#fff6ea"/><rect x="370" y="150" width="180" height="80" fill="#fff6ea"/>' +
      '<circle cx="130" cy="190" r="16" fill="#e25b7a"/><circle cx="170" cy="196" r="14" fill="#f2c14e"/><circle cx="210" cy="190" r="15" fill="#7bc67e"/>' +
      '<circle cx="420" cy="194" r="14" fill="#c77dff"/><circle cx="460" cy="188" r="16" fill="#ff9f1c"/><circle cx="500" cy="196" r="13" fill="#f2849a"/>' +
      "</svg>";
  }

  function openTemplates() {
    const cards = Realm.TEMPLATES.map(function (tpl) {
      return '<button type="button" class="template-card" data-act="template" data-id="' + tpl.id + '"><canvas data-template="' + tpl.id + '" width="240" height="180"></canvas><span>' + Paint.esc(tpl.label) + "</span></button>";
    }).join("");
    showModal('<div class="modal-card" role="dialog" aria-modal="true"><h2>Starters</h2><div class="template-grid">' + cards + '</div><div class="row" style="margin-top:12px"><button type="button" class="btn" id="close-templates">Close</button></div></div>', "templates", true);
    document.getElementById("close-templates").onclick = hideModal;
    modal.querySelectorAll("canvas[data-template]").forEach(function (canvas) {
      const tpl = Realm.TEMPLATES.filter(function (item) { return item.id === canvas.dataset.template; })[0];
      const ctx = canvas.getContext("2d");
      const scale = canvas.width / Realm.WORLD_W;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      Realm.draw(ctx, tpl.cells, { anim: 0, now: 0 });
    });
  }

  function applyTemplate(id) {
    const tpl = Realm.TEMPLATES.filter(function (item) { return item.id === id; })[0];
    if (!tpl) return;
    if (Realm.same(Store.data.kingdom.cells, tpl.cells)) {
      hideModal();
      return;
    }
    confirmModal("Use this starter?", "Yes", function () {
      pushBuildUndo();
      Store.data.kingdom.cells = tpl.cells.slice();
      Store.data.kingdom.name = tpl.label;
      const input = document.getElementById("kname");
      if (input) input.value = tpl.label;
      Store.persist();
      paintBoard();
      Sfx.open();
    });
  }

  async function downloadPortrait() {
    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
    } catch (err) { /* canvas text can fall back */ }
    const svg = Princess.svg(working, { export: true });
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 1140;
      const ctx = canvas.getContext("2d");
      const sky = ctx.createLinearGradient(0, 0, 0, 1140);
      sky.addColorStop(0, "#ffe4f1");
      sky.addColorStop(0.7, "#fff6ea");
      sky.addColorStop(1, "#e7f6d4");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, 800, 1140);
      ctx.drawImage(img, 0, 0, 800, 1040);
      ctx.fillStyle = "#5a3144";
      ctx.textAlign = "center";
      ctx.font = '700 56px Fredoka, "Trebuchet MS", sans-serif';
      ctx.fillText(Princess.displayName(working), 400, 1100);
      URL.revokeObjectURL(url);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = fileBase(Princess.displayName(working)) + ".png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast("Picture ready");
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      toast("Picture did not work");
    };
    img.src = url;
  }

  function downloadKingdom() {
    const canvas = document.getElementById("board");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = fileBase(Store.data.kingdom.name || "kingdom") + ".png";
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast("Picture ready");
  }

  function onClick(event) {
    const btn = event.target.closest("[data-act]");
    if (!btn || modal.contains(btn) && btn.dataset.act !== "template") {
      if (btn && modal.contains(btn) && btn.dataset.act === "template") {
        applyTemplate(btn.dataset.id);
      }
      return;
    }
    const act = btn.dataset.act;
    if (act === "go-design") { Sfx.tap(); show("design"); return; }
    if (act === "go-build") { Sfx.tap(); show("build"); return; }
    if (act === "go-explore") { Sfx.tap(); show("explore"); return; }
    if (act === "tab") {
      designTab = btn.dataset.id;
      document.querySelectorAll(".tab").forEach(function (tab) {
        tab.classList.toggle("is-on", tab.dataset.id === designTab);
      });
      refreshPanel();
      Sfx.tap();
      return;
    }
    if (act === "group") {
      buildGroup = btn.dataset.id;
      document.querySelectorAll(".group-tab").forEach(function (tab) {
        tab.classList.toggle("is-on", tab.dataset.id === buildGroup);
      });
      renderTools();
      Sfx.tap();
      return;
    }
    if (act === "tool") {
      buildTool = btn.dataset.id;
      buildSliding = false;
      setSlideMode(false);
      renderTools();
      updateToolLabel();
      Sfx.pop();
      return;
    }
    if (act === "erase") {
      buildTool = "grass";
      renderTools();
      updateToolLabel();
      Sfx.tap();
      return;
    }
    if (act === "swatch") {
      pushDesignUndo();
      working[btn.dataset.key] = btn.dataset.value;
      commitWorking();
      updateStage();
      refreshPanel();
      Sfx.pop();
      return;
    }
    if (act === "set-face" || act === "set-expression" || act === "set-hair" || act === "set-shoes" || act === "set-crown" || act === "set-extra" || act === "set-pet") {
      const field = {
        "set-face": "face", "set-expression": "expression", "set-hair": "hair",
        "set-shoes": "shoes", "set-crown": "crown", "set-extra": "hairExtra", "set-pet": "pet"
      }[act];
      pushDesignUndo();
      working[field] = btn.dataset.id;
      commitWorking();
      updateStage();
      refreshPanel();
      Sfx.pop();
      return;
    }
    if (act === "set-outfit") {
      const outfit = Princess.OUTFITS.filter(function (item) { return item.id === btn.dataset.id; })[0];
      pushDesignUndo();
      working.outfit = outfit.id;
      working.outfitColor = outfit.color;
      working.outfitAccent = outfit.accent;
      commitWorking();
      updateStage();
      refreshPanel();
      Sfx.pop();
      return;
    }
    if (act === "toggle-cape" || act === "toggle-wand" || act === "toggle-necklace" || act === "toggle-earrings") {
      const field = act.replace("toggle-", "");
      pushDesignUndo();
      working[field] = !working[field];
      commitWorking();
      updateStage();
      refreshPanel();
      Sfx.pop();
      return;
    }
    if (act === "random") {
      pushDesignUndo();
      const name = working.name;
      working = Princess.randomize(working);
      working.name = name;
      commitWorking();
      const input = document.getElementById("pname");
      if (input) input.value = working.name;
      updateStage();
      refreshPanel();
      Sfx.surprise();
      return;
    }
    if (act === "dice") {
      pushDesignUndo();
      let name = Princess.NAMES[Math.floor(Math.random() * Princess.NAMES.length)];
      if (name === Paint.cleanName(working.name)) name = Princess.NAMES[(Princess.NAMES.indexOf(name) + 1) % Princess.NAMES.length];
      working.name = name;
      commitWorking();
      const input = document.getElementById("pname");
      if (input) input.value = name;
      Sfx.pop();
      return;
    }
    if (act === "undo-design") { undoDesign(); return; }
    if (act === "undo-build") { undoBuild(); return; }
    if (act === "new-princess") {
      confirmModal("Start a new princess?", "Yes", function () {
        pushDesignUndo();
        working = Princess.normalize(null);
        commitWorking();
        const input = document.getElementById("pname");
        if (input) input.value = working.name;
        updateStage();
        refreshPanel();
        Sfx.tap();
      });
      return;
    }
    if (act === "save-princess") {
      const result = Store.savePrincess(working);
      if (!result.ok && result.reason === "same") toast("Already saved");
      else if (!result.ok) toast("Full. Erase one first.");
      else { toast("Saved"); Sfx.save(); refreshSavedPrincesses(); }
      return;
    }
    if (act === "picture") { downloadPortrait(); Sfx.pop(); return; }
    if (act === "save-kingdom") {
      const result = Store.saveKingdom(Store.data.kingdom);
      if (!result.ok && result.reason === "same") toast("Already saved");
      else if (!result.ok) toast("Full. Erase one first.");
      else { toast("Saved"); Sfx.save(); refreshSavedKingdoms(); }
      return;
    }
    if (act === "kingdom-picture") { downloadKingdom(); Sfx.pop(); return; }
    if (act === "templates") { openTemplates(); Sfx.tap(); return; }
    if (act === "mode-place") { setSlideMode(false); Sfx.tap(); return; }
    if (act === "mode-slide") { setSlideMode(true); Sfx.tap(); return; }
    if (act === "zoom") {
      buildBig = !buildBig;
      const canvas = document.getElementById("board");
      if (canvas) canvas.classList.toggle("is-big", buildBig);
      const button = event.target.closest("[data-act='zoom']");
      if (button) button.textContent = buildBig ? "Fit" : "Bigger";
      Sfx.tap();
      return;
    }
    if (act === "load-princess") {
      const item = Store.data.savedPrincesses.filter(function (p) { return p.id === btn.dataset.id; })[0];
      if (!item) return;
      if (view !== "design") show("design");
      pushDesignUndo();
      working = Princess.normalize(item);
      commitWorking();
      const input = document.getElementById("pname");
      if (input) input.value = working.name;
      updateStage();
      refreshPanel();
      Sfx.pop();
      return;
    }
    if (act === "delete-princess") {
      const id = btn.dataset.id;
      confirmModal("Erase this princess?", "Erase", function () {
        Store.deletePrincess(id);
        toast("Erased");
        if (view === "home") renderHome();
        else refreshSavedPrincesses();
      });
      return;
    }
    if (act === "load-kingdom") {
      const item = Store.data.savedKingdoms.filter(function (k) { return k.id === btn.dataset.id; })[0];
      if (!item) return;
      confirmModal("Open this kingdom?", "Open", function () {
        if (view !== "build") show("build");
        pushBuildUndo();
        Store.data.kingdom = { name: item.name, cells: item.cells.slice() };
        Store.persist();
        const input = document.getElementById("kname");
        if (input) input.value = item.name;
        paintBoard();
        Sfx.open();
      });
      return;
    }
    if (act === "delete-kingdom") {
      const id = btn.dataset.id;
      confirmModal("Erase this kingdom?", "Erase", function () {
        Store.deleteKingdom(id);
        toast("Erased");
        if (view === "home") renderHome();
        else refreshSavedKingdoms();
      });
      return;
    }
    if (act === "explorer") {
      exploreSource = btn.dataset.id;
      document.querySelectorAll(".who-chip").forEach(function (chip) {
        chip.classList.toggle("is-on", chip.dataset.id === exploreSource);
      });
      Sfx.pop();
    }
  }

  function setSlideMode(sliding) {
    buildSliding = sliding;
    const canvas = document.getElementById("board");
    if (canvas && view === "build") {
      canvas.classList.toggle("slide-mode", sliding);
      canvas.classList.toggle("place-mode", !sliding);
    }
    const place = document.getElementById("mode-place");
    const slide = document.getElementById("mode-slide");
    if (place) place.classList.toggle("is-on", !sliding);
    if (slide) slide.classList.toggle("is-on", sliding);
  }

  function undoDesign() {
    const prev = designUndo.pop();
    if (!prev) return;
    working = JSON.parse(prev);
    commitWorking();
    const input = document.getElementById("pname");
    if (input) input.value = working.name;
    updateStage();
    refreshPanel();
    updateUndoBtn();
    Sfx.undo();
  }

  function undoBuild() {
    const prev = buildUndo.pop();
    if (!prev) return;
    Store.data.kingdom.cells = prev;
    Store.persist();
    paintBoard();
    updateUndoBtn();
    Sfx.undo();
  }

  function onInput(event) {
    if (event.target.id === "pname") {
      if (event.target.dataset.undo !== "0") {
        pushDesignUndo();
        event.target.dataset.undo = "0";
      }
      working.name = event.target.value.replace(/[\r\n]/g, "").slice(0, 20);
      if (event.target.value !== working.name) event.target.value = working.name;
      commitWorking();
      return;
    }
    if (event.target.id === "kname") {
      Store.data.kingdom.name = event.target.value.replace(/[\r\n]/g, "").slice(0, 20);
      Store.persist();
      return;
    }
    if (event.target.dataset.color) {
      if (event.target.dataset.undo !== "0") {
        pushDesignUndo();
        event.target.dataset.undo = "0";
      }
      if (Paint.validHex(event.target.value)) working[event.target.dataset.color] = event.target.value.toLowerCase();
      commitWorking();
      updateStage();
    }
  }

  function boot() {
    Store.load();
    working = Store.data.princess;
    Sfx.setMuted(Store.data.mute);
    document.getElementById("btn-home").addEventListener("click", function () {
      if (view !== "home") { Sfx.tap(); show("home"); }
    });
    document.getElementById("btn-help").addEventListener("click", function () { Sfx.tap(); openHelp(); });
    document.getElementById("btn-mute").addEventListener("click", function () {
      const muted = !Store.data.mute;
      Store.setMute(muted);
      Sfx.setMuted(muted);
      if (!muted) Sfx.unlock();
      updateChrome();
    });
    document.addEventListener("pointerdown", function () { Sfx.unlock(); }, { passive: true });
    main.addEventListener("click", onClick);
    main.addEventListener("input", onInput);
    main.addEventListener("change", function (event) {
      if (event.target.dataset && event.target.dataset.color) refreshPanel();
    });
    main.addEventListener("focusout", function (event) {
      if (event.target.id === "pname") {
        working.name = Paint.cleanName(working.name);
        event.target.value = working.name;
        commitWorking();
      }
      if (event.target.id === "kname") {
        Store.data.kingdom.name = Paint.cleanName(Store.data.kingdom.name) || "My kingdom";
        event.target.value = Store.data.kingdom.name;
        Store.persist();
      }
    });
    main.addEventListener("focusin", function (event) {
      if (event.target.id === "pname" || event.target.dataset.color) event.target.dataset.undo = "1";
    });
    main.addEventListener("pointerdown", function (event) {
      const canvas = document.getElementById("board");
      if (!canvas || event.target !== canvas || view !== "build" || buildSliding) return;
      painting = true;
      strokeBase = Store.data.kingdom.cells.slice();
      strokeChanged = false;
      if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
      paintCell(event);
    });
    main.addEventListener("pointermove", function (event) {
      if (!painting) return;
      paintCell(event);
    });
    window.addEventListener("pointerup", function () {
      if (!painting) return;
      painting = false;
      if (strokeChanged) Store.persist();
    });
    modal.addEventListener("click", function (event) {
      if (event.target === modal && modal.dataset.dismiss === "1") hideModal();
      const btn = event.target.closest("[data-act='template']");
      if (btn) applyTemplate(btn.dataset.id);
    });
    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) {
        hideModal();
        return;
      }
      if ((event.ctrlKey || event.metaKey) && (event.key === "z" || event.key === "Z")) {
        if (view === "design") { event.preventDefault(); undoDesign(); }
        if (view === "build") { event.preventDefault(); undoBuild(); }
        return;
      }
      const dir = KEY_DIR[event.code] || KEY_DIR[event.key];
      if (!dir || view !== "explore" || !modal.hidden) return;
      const tag = event.target && event.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      event.preventDefault();
      if (!event.repeat) {
        setDir(dir, true);
        tryStep(dir);
      }
    });
    window.addEventListener("keyup", function (event) {
      const dir = KEY_DIR[event.code] || KEY_DIR[event.key];
      if (dir) setDir(dir, false);
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopLoop();
      else if (view === "build" || view === "explore") startLoop();
    });
    show("home");
    if (!Store.data.helpSeen) openHelp();
  }

  boot();
})();
