(function (root) {
  const KEY = "petal-palace-v1";
  const memory = { raw: null };

  function dbGet() {
    try {
      return localStorage.getItem(KEY);
    } catch (err) {
      return memory.raw;
    }
  }

  function dbSet(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (err) {
      memory.raw = value;
    }
  }

  function freshKingdom() {
    const castle = root.Realm.template("castle");
    return {
      name: "Little Castle",
      cells: castle.cells.slice(),
      cols: castle.cols,
      rows: castle.rows,
      theme: castle.theme
    };
  }

  function kingdomFrom(raw) {
    const packed = root.Realm.pack(raw || {});
    packed.name = root.Paint.cleanName(raw && raw.name) || "Little Castle";
    return packed;
  }

  function fresh() {
    return {
      v: 1,
      mute: false,
      helpSeen: false,
      princess: root.Princess.normalize(null),
      savedPrincesses: [],
      kingdom: freshKingdom(),
      savedKingdoms: []
    };
  }

  function sanitizePrincessList(list) {
    if (!Array.isArray(list)) return [];
    return list.slice(0, 18).map(function (item) {
      const p = root.Princess.normalize(item);
      p.id = item && item.id ? String(item.id) : root.Paint.cleanName(Math.random().toString(36).slice(2));
      p.savedAt = item && item.savedAt ? Number(item.savedAt) : Date.now();
      return p;
    });
  }

  function sanitizeKingdomList(list) {
    if (!Array.isArray(list)) return [];
    return list.slice(0, 12).map(function (item) {
      const packed = kingdomFrom(item);
      return {
        id: item && item.id ? String(item.id) : String(Date.now()),
        name: packed.name,
        cells: packed.cells,
        cols: packed.cols,
        rows: packed.rows,
        theme: packed.theme,
        savedAt: item && item.savedAt ? Number(item.savedAt) : Date.now()
      };
    });
  }

  const Store = {
    data: null,
    load: function () {
      let parsed = null;
      try {
        parsed = JSON.parse(dbGet() || "null");
      } catch (err) {
        parsed = null;
      }
      const base = fresh();
      if (!parsed || typeof parsed !== "object") {
        this.data = base;
        return this.data;
      }
      base.mute = !!parsed.mute;
      base.helpSeen = !!parsed.helpSeen;
      base.princess = root.Princess.normalize(parsed.princess);
      base.savedPrincesses = sanitizePrincessList(parsed.savedPrincesses);
      if (parsed.kingdom && typeof parsed.kingdom === "object") {
        base.kingdom = kingdomFrom(parsed.kingdom);
      }
      base.savedKingdoms = sanitizeKingdomList(parsed.savedKingdoms);
      this.data = base;
      return this.data;
    },
    persist: function () {
      dbSet(JSON.stringify(this.data));
    },
    setMute: function (muted) {
      this.data.mute = !!muted;
      this.persist();
    },
    setHelpSeen: function () {
      this.data.helpSeen = true;
      this.persist();
    },
    savePrincess: function (princess) {
      const copy = root.Princess.normalize(princess);
      const sig = root.Princess.signature(copy);
      const list = this.data.savedPrincesses;
      if (list.some(function (item) { return root.Princess.signature(item) === sig; })) {
        return { ok: false, reason: "same" };
      }
      if (list.length >= 18) return { ok: false, reason: "full" };
      copy.id = Math.random().toString(36).slice(2, 8) + Date.now().toString(36);
      copy.savedAt = Date.now();
      list.unshift(copy);
      this.persist();
      return { ok: true };
    },
    deletePrincess: function (id) {
      this.data.savedPrincesses = this.data.savedPrincesses.filter(function (item) {
        return item.id !== id;
      });
      this.persist();
    },
    saveKingdom: function (kingdom) {
      const packed = kingdomFrom(kingdom);
      const name = root.Paint.cleanName(kingdom && kingdom.name) || "My kingdom";
      const sig = name + "|" + packed.theme + "|" + packed.cols + "x" + packed.rows + "|" + packed.cells.join(",");
      const list = this.data.savedKingdoms;
      if (list.some(function (item) {
        const itemPacked = kingdomFrom(item);
        const itemSig = itemPacked.name + "|" + itemPacked.theme + "|" + itemPacked.cols + "x" + itemPacked.rows + "|" + itemPacked.cells.join(",");
        return itemSig === sig;
      })) {
        return { ok: false, reason: "same" };
      }
      if (list.length >= 12) return { ok: false, reason: "full" };
      list.unshift({
        id: Math.random().toString(36).slice(2, 8) + Date.now().toString(36),
        name: name,
        cells: packed.cells,
        cols: packed.cols,
        rows: packed.rows,
        theme: packed.theme,
        savedAt: Date.now()
      });
      this.persist();
      return { ok: true };
    },
    deleteKingdom: function (id) {
      this.data.savedKingdoms = this.data.savedKingdoms.filter(function (item) {
        return item.id !== id;
      });
      this.persist();
    }
  };

  root.Store = Store;
})(typeof globalThis !== "undefined" ? globalThis : this);
