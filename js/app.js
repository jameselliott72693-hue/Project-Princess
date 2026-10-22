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
  let storyPage = 0;
  let storyVoice = false;
  let buildSliding = false;
  let buildBig = false;
  let exploreSource = "working";
  let pos = { c: 0, r: 0, facing: "s" };
  let visual = { c: 0, r: 0, phase: 0 };
  let move = null;
  let pet = null;
  let petVisual = { c: 0, r: 0, phase: 0 };
  let petMove = null;
  let petTrail = [];
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
    const titles = { home: "Petal Palace", design: "Design", build: "Build", explore: "Explore", story: "Story" };
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
    if (view === "story" && next !== "story") Story.stop();
    view = next;
    stopLoop();
    painting = false;
    particles = [];
    move = null;
    path = [];
    afterMove = null;
    if (next === "home") renderHome();
    if (next === "story") renderStory();
    if (next === "design") renderDesigner();
    if (next === "build" || next === "explore") Realm.use(Store.data.kingdom);
    if (next === "build") {
      renderBuilder();
      startLoop();
    }
    if (next === "explore") {
      const start = Realm.startTile(Store.data.kingdom.cells);
      pos = { c: start.c, r: start.r, facing: "s" };
      visual = { c: pos.c, r: pos.r, phase: 0 };
      placePet();
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
      const map = Realm.pack(item);
      const ctx = canvas.getContext("2d");
      const scale = canvas.width / (map.cols * Realm.TILE);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      Realm.draw(ctx, map.cells, { cols: map.cols, rows: map.rows, theme: map.theme, anim: 0, showGrid: false, now: 0 });
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    });
  }

  function renderStory() {
    const page = Story.page(storyPage, working);
    const last = Story.count() - 1;
    main.innerHTML = '<section class="book"><div class="book-stage" id="book-stage">' + Story.svg(storyPage, working) + "</div>" +
      '<div class="book-copy"><h2 id="book-title">' + Paint.esc(page.title) + '</h2><p id="book-text">' + Paint.esc(page.text) + "</p></div>" +
      '<div class="book-nav">' +
      '<button type="button" class="btn" data-act="story-prev"' + (storyPage === 0 ? " disabled" : "") + ">Back</button>" +
      '<span class="book-count">' + (storyPage + 1) + " of " + Story.count() + "</span>" +
      '<button type="button" class="btn" data-act="story-next"' + (storyPage === last ? " disabled" : "") + ">Next</button>" +
      "</div>" +
      '<div class="book-tools">' +
      '<button type="button" class="btn' + (storyVoice ? " primary" : "") + '" id="story-read" data-act="story-read" aria-pressed="' + (storyVoice ? "true" : "false") + '">' +
      (storyVoice ? "Quiet" : "Read") + "</button>" +
      '<button type="button" class="btn" data-act="story-save">' + ico("picture") + "<span>Save</span></button>" +
      '<button type="button" class="btn" data-act="story-print">' + ico("save") + "<span>Print</span></button>" +
      "</div></section>";
  }

  function storyLine() {
    const page = Story.page(storyPage, working);
    return page.title + ". " + page.text;
  }

  function storySpeak() {
    if (!storyVoice || Store.data.mute) {
      Story.stop();
      return;
    }
    if (!Story.speak(storyLine())) toast("This browser has no read-aloud");
  }

  function turnStory(step) {
    const next = storyPage + step;
    if (next < 0 || next >= Story.count()) return;
    storyPage = next;
    renderStory();
    storySpeak();
  }

  function rasterStory(index, done, fail) {
    const page = Story.page(index, working);
    const blob = new Blob([Story.svg(index, working)], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 1120;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fffaf4";
      ctx.fillRect(0, 0, 800, 1120);
      ctx.drawImage(img, 0, 0, 800, 1000);
      ctx.fillStyle = "#5a3144";
      ctx.textAlign = "center";
      ctx.font = '700 36px Fredoka, "Trebuchet MS", sans-serif';
      ctx.fillText(page.title, 400, 1048);
      ctx.font = '500 22px Fredoka, "Trebuchet MS", sans-serif';
      wrapCanvasText(ctx, page.text, 400, 1084, 720, 28);
      URL.revokeObjectURL(url);
      done(canvas);
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      fail();
    };
    img.src = url;
  }

  function wrapCanvasText(ctx, text, x, y, width, line) {
    const words = String(text).split(" ");
    let row = "";
    let top = y;
    words.forEach(function (word) {
      const trial = row ? row + " " + word : word;
      if (ctx.measureText(trial).width > width) {
        ctx.fillText(row, x, top);
        row = word;
        top += line;
      } else row = trial;
    });
    if (row) ctx.fillText(row, x, top);
  }

  function saveStory() {
    rasterStory(storyPage, function (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = fileBase(Princess.displayName(working)) + "-story-" + (storyPage + 1) + ".png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast("Page saved");
    }, function () { toast("Picture did not work"); });
  }

  function printStory() {
    const pages = [];
    for (let i = 0; i < Story.count(); i++) {
      const page = Story.page(i, working);
      pages.push('<article class="print-page">' + Story.svg(i, working) +
        "<h2>" + Paint.esc(page.title) + "</h2><p>" + Paint.esc(page.text) + "</p></article>");
    }
    document.getElementById("print-sheet").innerHTML = pages.join("");
    window.print();
  }

  function renderHome() {
    main.innerHTML = '<section class="hero"><div class="hero-castle">' + heroCastle() + '</div><div class="hero-princess">' +
      Princess.svg(working, { thumb: true }) + "</div></section>" +
      '<h2 class="home-lead">A little kingdom</h2>' + badgeRow() +
      '<div class="home-grid">' +
      '<button type="button" class="home-card design" data-act="go-design">' + ico("dress").replace('class="ico"', 'class="ico big-ico"') + "<span>Design</span></button>" +
      '<button type="button" class="home-card build" data-act="go-build">' + ico("castle").replace('class="ico"', 'class="ico big-ico"') + "<span>Build</span></button>" +
      '<button type="button" class="home-card story" data-act="go-story">' + ico("picture").replace('class="ico"', 'class="ico big-ico"') + "<span>Story</span></button>" +
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
      '<button type="button" class="btn" data-act="color-princess">' + ico("spark") + "<span>Color</span></button>" +
      '<button type="button" class="btn" data-act="share-princess">' + ico("save") + "<span>Share</span></button>" +
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
      '<div class="choice-row">' + Realm.SIZES.map(function (size) {
        const on = Store.data.kingdom.cols === size.cols && Store.data.kingdom.rows === size.rows;
        return '<button type="button" class="btn seg' + (on ? " is-on" : "") + '" data-act="size" data-cols="' + size.cols + '" data-rows="' + size.rows + '">' + size.label + "</button>";
      }).join("") + Object.keys(Realm.THEMES).map(function (id) {
        const on = Store.data.kingdom.theme === id;
        return '<button type="button" class="btn seg' + (on ? " is-on" : "") + '" data-act="theme" data-id="' + id + '">' + Realm.THEMES[id].label + "</button>";
      }).join("") + "</div>" +
      '<div class="map-tools">' +
      '<button type="button" class="btn primary" data-act="go-explore">' + ico("walk") + "<span>Explore</span></button>" +
      '<button type="button" class="btn" id="undo-build" data-act="undo-build">' + ico("undo") + "<span>Undo</span></button>" +
      '<button type="button" class="btn' + (buildTool === Realm.groundId() ? " primary" : "") + '" id="erase-tool" data-act="erase">' + ico("erase") + "<span>Erase</span></button>" +
      '<button type="button" class="btn seg' + (buildSliding ? "" : " is-on") + '" id="mode-place" data-act="mode-place">Place</button>' +
      '<button type="button" class="btn seg' + (buildSliding ? " is-on" : "") + '" id="mode-slide" data-act="mode-slide">Slide</button>' +
      '<button type="button" class="btn" data-act="zoom">' + (buildBig ? "Fit" : "Bigger") + "</button>" +
      '<button type="button" class="btn" data-act="templates">' + ico("grid") + "<span>Starters</span></button>" +
      '<button type="button" class="btn" data-act="save-kingdom">' + ico("save") + "<span>Save</span></button>" +
      '<button type="button" class="btn" data-act="kingdom-picture">' + ico("picture") + "<span>Picture</span></button>" +
      '<button type="button" class="btn" data-act="color-kingdom">' + ico("spark") + "<span>Color</span></button>" +
      '<button type="button" class="btn" data-act="share-kingdom">' + ico("save") + "<span>Share</span></button>" +
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
    const tiles = Realm.TILES.filter(function (tile) { return tile.group === buildGroup; }).slice().sort(function (a, b) {
      function rank(tile) {
        if (!tile.theme) return 1;
        return tile.theme === Store.data.kingdom.theme ? 0 : 2;
      }
      return rank(a) - rank(b);
    });
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
    if (buildTool === Realm.groundId()) el.textContent = "Erasing";
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
    layoutBoard();
    paintBoard();
  }

  function layoutBoard() {
    const canvas = document.getElementById("board");
    const wrap = document.getElementById("board-wrap");
    if (!canvas || !wrap) return;
    const avail = wrap.clientWidth || 320;
    const cozy = Realm.COLS <= 12 && Realm.ROWS <= 8;
    const tilePx = cozy && !buildBig ? Math.max(36, Math.min(68, avail / Realm.COLS)) : (buildBig ? 68 : 52);
    const cssW = Realm.COLS * tilePx;
    canvas.style.width = cssW + "px";
    canvas.style.height = (cssW * (Realm.WORLD_H / Realm.WORLD_W)) + "px";
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
      pet: exploring && pet ? {
        c: petVisual.c,
        r: petVisual.r,
        facing: pet.facing,
        phase: petVisual.phase || 0,
        react: pet.happy > performance.now(),
        beside: -16
      } : null,
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

  function mapSnap() {
    const kingdom = Store.data.kingdom;
    return {
      cells: kingdom.cells.slice(),
      cols: kingdom.cols,
      rows: kingdom.rows,
      theme: kingdom.theme,
      name: kingdom.name
    };
  }

  function pushBuildUndo() {
    buildUndo.push(mapSnap());
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
      '<button type="button" class="btn" data-act="quests">' + ico("spark") + "<span>Quests</span></button>" +
      '<button type="button" class="btn" data-act="zoom">' + (buildBig ? "Fit" : "Bigger") + "</button>" +
      "</div><p class=\"quest-hint\" id=\"quest-hint\">" + Paint.esc(questHint()) + "</p>" +
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

  function placePet() {
    petMove = null;
    petTrail = [];
    const princess = currentExplorer();
    if (!princess.pet || princess.pet === "none") {
      pet = null;
      return;
    }
    const cells = Store.data.kingdom.cells;
    const dirs = [{ c: 0, r: 1 }, { c: -1, r: 0 }, { c: 1, r: 0 }, { c: 0, r: -1 }];
    let spot = null;
    for (let i = 0; i < dirs.length; i++) {
      const c = pos.c + dirs[i].c;
      const r = pos.r + dirs[i].r;
      if (Realm.walkable(cells, c, r)) { spot = { c: c, r: r }; break; }
    }
    if (!spot) spot = { c: pos.c, r: pos.r };
    pet = { c: spot.c, r: spot.r, facing: "n", happy: 0 };
    petVisual = { c: spot.c, r: spot.r, phase: 0 };
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
    if (pet) petTrail.push({ c: move.from.c, r: move.from.r });
    pos.c = move.to.c;
    pos.r = move.to.r;
    move = null;
    const id = Realm.cell(Store.data.kingdom.cells, pos.c, pos.r);
    const kind = Realm.interactKind(id);
    if (kind === "animal") {
      triggerAnimal(pos.c, pos.r);
      delightPet();
    }
    noteQuest(pos.c, pos.r, id);
    if (kind === "flowers") {
      spawnSparkle(pos.c, pos.r, 7);
      delightPet();
    }
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
    if ((id === "bakery" || id === "house" || id === "fountain") && noteQuest(c, r, id)) {
      if (id === "fountain") {
        spawnSparkle(c, r, 16);
        delightPet();
      }
      return;
    }
    if (!kind) return;
    if (kind === "fountain" || kind === "flowers" || kind === "sparkle") {
      spawnSparkle(c, r, kind === "fountain" ? 16 : 8);
      delightPet();
      Sfx.chime();
      return;
    }
    if (kind === "animal") {
      triggerAnimal(c, r);
      delightPet();
      return;
    }
    if (kind === "castle") gateOpen[c + "," + r] = performance.now() + 1600;
    openInterior(kind === "castle" ? "castle" : kind);
    Sfx.open();
  }

  function questState() {
    if (!Store.data.kingdom.quest) Store.data.kingdom.quest = Store.blankQuest();
    return Store.data.kingdom.quest;
  }

  function countTiles(id) {
    let n = 0;
    const cells = Store.data.kingdom.cells;
    for (let i = 0; i < cells.length; i++) if (cells[i] === id) n += 1;
    return n;
  }

  function questHint() {
    const quest = questState();
    if (!quest.kitten) return countTiles("kitten") ? "Find the kitten" : "Place a kitten";
    if (quest.bread === "need") return countTiles("bakery") ? "Visit the bakery" : "Place a bakery";
    if (quest.bread === "have") return countTiles("house") ? "Bring the bread home" : "Place a house";
    const goal = Math.min(3, countTiles("flowers"));
    if (!goal) return "Place some flowers";
    if (quest.flowers.length < goal) return "Pick flowers " + quest.flowers.length + "/" + goal;
    if (!quest.fountain) return countTiles("fountain") ? "Flowers for the fountain" : "Place a fountain";
    return "All quests done";
  }

  function refreshQuestHint() {
    const hint = document.getElementById("quest-hint");
    if (hint) hint.textContent = questHint();
  }

  function stickerSvg(id) {
    if (id === "kitten") return '<svg class="sticker" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="#ffe1ec"/><circle cx="24" cy="34" r="8" fill="#e8a87c"/><circle cx="40" cy="34" r="8" fill="#e8a87c"/><path d="M18 28 L22 18 L28 28 M36 28 L40 18 L46 28" fill="#e8a87c"/></svg>';
    if (id === "bread") return '<svg class="sticker" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="#fff1d6"/><ellipse cx="32" cy="34" rx="16" ry="10" fill="#e0b15a"/><path d="M20 34 H44" stroke="#c4844a" stroke-width="2"/></svg>';
    return '<svg class="sticker" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="#e7f6d8"/><circle cx="32" cy="34" r="8" fill="#f2849a"/><circle cx="22" cy="30" r="6" fill="#f2c14e"/><circle cx="42" cy="30" r="6" fill="#e26d7a"/></svg>';
  }

  function badgeRow() {
    const badges = Store.data.badges || [];
    if (!badges.length) return "";
    return '<div class="badge-row">' + badges.map(function (id) { return stickerSvg(id); }).join("") + "</div>";
  }

  function openSticker(id) {
    const titles = { kitten: "Paw sticker", bread: "Bread sticker", flowers: "Flower sticker" };
    showModal('<div class="modal-card" role="dialog" aria-modal="true"><h2>' + titles[id] + "</h2>" +
      stickerSvg(id) + '<p class="modal-lead">You did it.</p><div class="row"><button type="button" class="btn primary" id="close-sticker">Close</button></div></div>', "sticker", true);
    document.getElementById("close-sticker").onclick = hideModal;
    Sfx.chime();
  }

  function openQuests() {
    const quest = questState();
    const goal = Math.min(3, countTiles("flowers"));
    const rows = [
      ["Find the kitten", quest.kitten],
      ["Deliver the bread", quest.bread === "done"],
      ["Flowers for the fountain", quest.fountain]
    ];
    const body = rows.map(function (row) {
      return '<div class="quest-row"><span>' + row[0] + "</span><b>" + (row[1] ? "Done" : "Go") + "</b></div>";
    }).join("");
    const extra = quest.bread === "have" ? "<p class=\"modal-lead\">You are carrying bread.</p>" : "";
    const flowerNote = goal ? "<p class=\"modal-lead\">Flowers " + quest.flowers.length + " of " + goal + ".</p>" : "";
    showModal('<div class="modal-card" role="dialog" aria-modal="true"><h2>Quests</h2>' + body + extra + flowerNote +
      '<div class="row" style="margin-top:12px"><button type="button" class="btn primary" id="close-quests">Close</button></div></div>', "quests", true);
    document.getElementById("close-quests").onclick = hideModal;
  }

  function noteQuest(c, r, id) {
    const quest = questState();
    if (id === "kitten" && !quest.kitten) {
      quest.kitten = true;
      Store.persist();
      refreshQuestHint();
      if (Store.awardBadge("kitten")) openSticker("kitten");
      return true;
    }
    if (id === "bakery" && quest.bread === "need") {
      quest.bread = "have";
      Store.persist();
      refreshQuestHint();
      toast("Bread for a friend");
      Sfx.pop();
      return false;
    }
    if (id === "house" && quest.bread === "have") {
      quest.bread = "done";
      Store.persist();
      refreshQuestHint();
      if (Store.awardBadge("bread")) openSticker("bread");
      return true;
    }
    if (id === "flowers") {
      const key = c + "," + r;
      const goal = Math.min(3, countTiles("flowers"));
      if (goal && quest.flowers.indexOf(key) === -1 && quest.flowers.length < goal) {
        quest.flowers.push(key);
        Store.persist();
        refreshQuestHint();
        toast("Flower " + quest.flowers.length + " of " + goal);
        Sfx.pop();
      }
      return false;
    }
    if (id === "fountain" && !quest.fountain) {
      const goal = Math.min(3, countTiles("flowers"));
      if (goal && quest.flowers.length >= goal) {
        quest.fountain = true;
        Store.persist();
        refreshQuestHint();
        if (Store.awardBadge("flowers")) openSticker("flowers");
        return true;
      }
    }
    return false;
  }

  function delightPet() {
    if (!pet) return;
    pet.happy = performance.now() + 900;
  }

  function stepPet(dt) {
    if (!pet) return;
    if (petMove) {
      petMove.age += dt;
      const u = petMove.dur <= 0 ? 1 : Math.min(1, petMove.age / petMove.dur);
      const eased = u * u * (3 - 2 * u);
      petVisual.c = petMove.from.c + (petMove.to.c - petMove.from.c) * eased;
      petVisual.r = petMove.from.r + (petMove.to.r - petMove.from.r) * eased;
      petVisual.phase = u;
      if (u >= 1) {
        pet.c = petMove.to.c;
        pet.r = petMove.to.r;
        petMove = null;
        petVisual.c = pet.c;
        petVisual.r = pet.r;
        petVisual.phase = pet.happy > performance.now() ? 0.5 : 0;
      }
      return;
    }
    if (!petTrail.length) return;
    const next = petTrail[0];
    if (next.c === pet.c && next.r === pet.r) {
      petTrail.shift();
      return;
    }
    const cells = Store.data.kingdom.cells;
    let step = null;
    if (Math.abs(next.c - pet.c) + Math.abs(next.r - pet.r) === 1 && Realm.walkable(cells, next.c, next.r)) step = next;
    else {
      const route = Realm.astar(cells, pet, next);
      if (route && route[0]) step = route[0];
    }
    if (!step) {
      petTrail.shift();
      return;
    }
    if (step.c === next.c && step.r === next.r) petTrail.shift();
    const dc = step.c - pet.c;
    const dr = step.r - pet.r;
    if (dc > 0) pet.facing = "e";
    else if (dc < 0) pet.facing = "w";
    else if (dr > 0) pet.facing = "s";
    else pet.facing = "n";
    petMove = { from: { c: pet.c, r: pet.r }, to: step, age: 0, dur: reduceMotion() ? 0 : 200 };
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
    stepPet(dt);
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
    const maxL = Math.max(0, wrap.scrollWidth - wrap.clientWidth);
    const maxT = Math.max(0, wrap.scrollHeight - wrap.clientHeight);
    wrap.scrollLeft = Paint.clamp(px - wrap.clientWidth / 2, 0, maxL);
    wrap.scrollTop = Paint.clamp(py - wrap.clientHeight / 2, 0, maxT);
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
      helpStep("c", "castle", "Build", "Tap a piece. Tap the map. Try a bigger size or a new theme.") +
      helpStep("d", "walk", "Explore", "Walk around. Quests give a sticker.") +
      helpStep("a", "picture", "Story", "Read a little book about her. Tap Read to hear it.") +
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
      const scale = canvas.width / (tpl.cols * Realm.TILE);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      Realm.draw(ctx, tpl.cells, { cols: tpl.cols, rows: tpl.rows, theme: tpl.theme, anim: 0, now: 0 });
    });
  }

  function applyTemplate(id) {
    const tpl = Realm.TEMPLATES.filter(function (item) { return item.id === id; })[0];
    if (!tpl) return;
    const kingdom = Store.data.kingdom;
    if (kingdom.theme === tpl.theme && kingdom.cols === tpl.cols && kingdom.rows === tpl.rows && Realm.same(kingdom.cells, tpl.cells)) {
      hideModal();
      return;
    }
    confirmModal("Use this starter?", "Yes", function () {
      pushBuildUndo();
      Store.data.kingdom.cells = tpl.cells.slice();
      Store.data.kingdom.cols = tpl.cols;
      Store.data.kingdom.rows = tpl.rows;
      Store.data.kingdom.theme = tpl.theme;
      Store.data.kingdom.name = tpl.label;
      Store.data.kingdom.quest = Store.blankQuest();
      Realm.use(Store.data.kingdom);
      Store.persist();
      show("build");
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

  function encodeShare(obj) {
    const json = JSON.stringify(obj);
    return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function decodeShare(text) {
    try {
      const pad = text.length % 4 ? "====".slice(text.length % 4) : "";
      const b64 = String(text || "").replace(/-/g, "+").replace(/_/g, "/") + pad;
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    } catch (err) {
      return null;
    }
  }

  function shareUrl(prefix, obj) {
    return location.href.split("#")[0] + prefix + encodeShare(obj);
  }

  function openShareLink(url) {
    showModal('<div class="modal-card" role="dialog" aria-modal="true"><h2>Share</h2><p class="modal-lead">Copy this link.</p>' +
      '<input class="name-field" id="share-url" readonly value="' + Paint.esc(url) + '">' +
      '<div class="row" style="margin-top:12px"><button type="button" class="btn primary" id="copy-share">Copy</button><button type="button" class="btn" id="close-share">Close</button></div></div>', "share", true);
    document.getElementById("close-share").onclick = hideModal;
    document.getElementById("copy-share").onclick = function () {
      const input = document.getElementById("share-url");
      input.focus();
      input.select();
      const done = function () { toast("Copied"); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () {
          try { document.execCommand("copy"); done(); } catch (err) { toast("Select the link"); }
        });
        return;
      }
      try { document.execCommand("copy"); done(); } catch (err2) { toast("Select the link"); }
    };
  }

  function readShare() {
    const hash = location.hash || "";
    let kind = "";
    let data = null;
    if (hash.indexOf("#p=") === 0) { kind = "p"; data = decodeShare(hash.slice(3)); }
    else if (hash.indexOf("#k=") === 0) { kind = "k"; data = decodeShare(hash.slice(3)); }
    if (hash) history.replaceState(null, "", location.pathname + location.search);
    if (!data) return "";
    if (kind === "p") {
      working = Princess.normalize(data);
      Store.data.princess = working;
      Store.persist();
      toast("Opened a princess");
      return "p";
    }
    if (kind === "k" && data.g && data.c && data.r) {
      const count = Number(data.c) * Number(data.r);
      const next = Realm.pack({
        name: data.n,
        theme: data.t,
        cols: Number(data.c),
        rows: Number(data.r),
        cells: Realm.decodeCells(data.g, count)
      });
      next.name = Paint.cleanName(data.n) || "Shared";
      next.quest = Store.blankQuest();
      Store.data.kingdom = next;
      Realm.use(next);
      Store.persist();
      toast("Opened a kingdom");
      return "k";
    }
    return "";
  }

  function inkPage(source) {
    const scale = Math.min(1, 900 / source.width);
    const w = Math.max(2, Math.round(source.width * scale));
    const h = Math.max(2, Math.round(source.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(source, 0, 0, w, h);
    const src = ctx.getImageData(0, 0, w, h);
    const out = ctx.createImageData(w, h);
    function lum(x, y) {
      const i = (y * w + x) * 4;
      return src.data[i] * 0.3 + src.data[i + 1] * 0.59 + src.data[i + 2] * 0.11;
    }
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        let edge = false;
        if (x > 0 && y > 0 && x < w - 1 && y < h - 1) {
          const gx = lum(x + 1, y) - lum(x - 1, y);
          const gy = lum(x, y + 1) - lum(x, y - 1);
          edge = Math.abs(gx) + Math.abs(gy) > 36;
        }
        const v = edge ? 45 : 255;
        out.data[i] = v;
        out.data[i + 1] = v;
        out.data[i + 2] = v;
        out.data[i + 3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
    return canvas;
  }

  function presentColoring(canvas, filename) {
    const url = canvas.toDataURL("image/png");
    document.getElementById("print-sheet").innerHTML = '<img alt="Coloring page" src="' + url + '">';
    showModal('<div class="modal-card" role="dialog" aria-modal="true"><h2>Color</h2><img class="color-preview" alt="Coloring page" src="' + url + '">' +
      '<div class="row" style="margin-top:12px"><button type="button" class="btn primary" id="print-color">Print</button><button type="button" class="btn" id="save-color">Save</button><button type="button" class="btn" id="close-color">Close</button></div></div>', "color", true);
    document.getElementById("close-color").onclick = hideModal;
    document.getElementById("print-color").onclick = function () { window.print(); };
    document.getElementById("save-color").onclick = function () {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast("Coloring page ready");
    };
  }

  function colorPrincess() {
    const svg = Princess.svg(working, { plain: true, export: true });
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = function () {
      const src = document.createElement("canvas");
      src.width = 800;
      src.height = 1040;
      const ctx = src.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 800, 1040);
      ctx.drawImage(img, 0, 0, 800, 1040);
      URL.revokeObjectURL(url);
      presentColoring(inkPage(src), fileBase(Princess.displayName(working)) + "-color.png");
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      toast("Coloring page did not work");
    };
    img.src = url;
  }

  function colorKingdom() {
    const src = document.createElement("canvas");
    src.width = Realm.WORLD_W;
    src.height = Realm.WORLD_H;
    const ctx = src.getContext("2d");
    Realm.draw(ctx, Store.data.kingdom.cells, {
      cols: Store.data.kingdom.cols,
      rows: Store.data.kingdom.rows,
      theme: Store.data.kingdom.theme,
      anim: 0,
      now: 0
    });
    presentColoring(inkPage(src), fileBase(Store.data.kingdom.name || "kingdom") + "-color.png");
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
    if (act === "go-story") { Sfx.tap(); show("story"); return; }
    if (act === "story-prev") { turnStory(-1); Sfx.tap(); return; }
    if (act === "story-next") { turnStory(1); Sfx.tap(); return; }
    if (act === "story-read") {
      storyVoice = !storyVoice;
      if (storyVoice && Store.data.mute) toast("Sound is off");
      renderStory();
      storySpeak();
      Sfx.tap();
      return;
    }
    if (act === "story-save") { saveStory(); Sfx.pop(); return; }
    if (act === "story-print") { printStory(); Sfx.tap(); return; }
    if (act === "go-design") { Sfx.tap(); show("design"); return; }
    if (act === "go-build") { Sfx.tap(); show("build"); return; }
    if (act === "go-explore") { Sfx.tap(); show("explore"); return; }
    if (act === "quests") { openQuests(); Sfx.tap(); return; }
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
      buildTool = Realm.groundId();
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
    if (act === "color-princess") { colorPrincess(); Sfx.tap(); return; }
    if (act === "share-princess") {
      openShareLink(shareUrl("#p=", Princess.toJSON(working)));
      Sfx.tap();
      return;
    }
    if (act === "save-kingdom") {
      const result = Store.saveKingdom(Store.data.kingdom);
      if (!result.ok && result.reason === "same") toast("Already saved");
      else if (!result.ok) toast("Full. Erase one first.");
      else { toast("Saved"); Sfx.save(); refreshSavedKingdoms(); }
      return;
    }
    if (act === "kingdom-picture") { downloadKingdom(); Sfx.pop(); return; }
    if (act === "color-kingdom") { colorKingdom(); Sfx.tap(); return; }
    if (act === "share-kingdom") {
      const kingdom = Store.data.kingdom;
      openShareLink(shareUrl("#k=", {
        n: kingdom.name,
        t: kingdom.theme,
        c: kingdom.cols,
        r: kingdom.rows,
        g: Realm.encodeCells(kingdom.cells)
      }));
      Sfx.tap();
      return;
    }
    if (act === "templates") { openTemplates(); Sfx.tap(); return; }
    if (act === "size") {
      const nextCols = Number(btn.dataset.cols);
      const nextRows = Number(btn.dataset.rows);
      if (nextCols === Store.data.kingdom.cols && nextRows === Store.data.kingdom.rows) return;
      confirmModal("Change the map size?", "Yes", function () {
        pushBuildUndo();
        const next = Realm.resize(Store.data.kingdom, nextCols, nextRows);
        next.name = Store.data.kingdom.name;
        next.quest = Store.data.kingdom.quest || Store.blankQuest();
        Store.data.kingdom = next;
        Realm.use(next);
        Store.persist();
        show("build");
        Sfx.open();
      });
      return;
    }
    if (act === "theme") {
      const id = btn.dataset.id;
      if (!Realm.THEMES[id] || Store.data.kingdom.theme === id) return;
      pushBuildUndo();
      Store.data.kingdom.theme = id;
      Realm.use(Store.data.kingdom);
      if (buildTool === "grass" || buildTool === "snow" || buildTool === "sand") buildTool = Realm.groundId();
      Store.persist();
      show("build");
      Sfx.open();
      return;
    }
    if (act === "mode-place") { setSlideMode(false); Sfx.tap(); return; }
    if (act === "mode-slide") { setSlideMode(true); Sfx.tap(); return; }
    if (act === "zoom") {
      buildBig = !buildBig;
      const canvas = document.getElementById("board");
      if (canvas) canvas.classList.toggle("is-big", buildBig);
      layoutBoard();
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
        pushBuildUndo();
        const next = Realm.pack(item);
        next.name = item.name;
        next.quest = item.quest || Store.blankQuest();
        Store.data.kingdom = next;
        Realm.use(next);
        Store.persist();
        show("build");
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
      placePet();
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
    if (Array.isArray(prev)) {
      Store.data.kingdom.cells = prev;
    } else {
      Store.data.kingdom.cells = prev.cells;
      Store.data.kingdom.cols = prev.cols;
      Store.data.kingdom.rows = prev.rows;
      Store.data.kingdom.theme = prev.theme;
      Store.data.kingdom.name = prev.name;
    }
    Realm.use(Store.data.kingdom);
    Store.persist();
    if (view === "build") show("build");
    else {
      bindBoard();
      updateUndoBtn();
    }
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
    Realm.use(Store.data.kingdom);
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
      if (muted) Story.stop();
      else if (view === "story" && storyVoice) storySpeak();
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
      strokeBase = mapSnap();
      strokeChanged = false;
      if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
      paintCell(event);
    });
    main.addEventListener("pointermove", function (event) {
      if (!painting) return;
      paintCell(event);
    });
    window.addEventListener("resize", function () { layoutBoard(); });
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
      const tagName = event.target && event.target.tagName;
      if (view === "story" && modal.hidden && tagName !== "INPUT" && tagName !== "TEXTAREA") {
        if (event.key === "ArrowLeft") { event.preventDefault(); turnStory(-1); return; }
        if (event.key === "ArrowRight") { event.preventDefault(); turnStory(1); return; }
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
      if (document.hidden) {
        stopLoop();
        Story.stop();
      } else if (view === "build" || view === "explore") startLoop();
    });
    const shared = readShare();
    show(shared === "k" ? "build" : shared === "p" ? "design" : "home");
    window.addEventListener("hashchange", function () {
      const next = readShare();
      if (next === "k") show("build");
      else if (next === "p") show("design");
    });
    if (!Store.data.helpSeen) openHelp();
  }

  boot();
})();
