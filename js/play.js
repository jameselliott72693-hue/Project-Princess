(function (root) {
  const BALL = ["banner", "flower", "lantern"];

  function gardenArt(grown) {
    if (!grown) {
      return '<rect x="18" y="70" width="84" height="28" rx="10" fill="#c4844a"/>' +
        '<rect x="28" y="78" width="64" height="14" rx="6" fill="#8d5a34"/>';
    }
    return '<rect x="18" y="78" width="84" height="22" rx="8" fill="#c4844a"/>' +
      '<path d="M60 78 V40" stroke="#3e9a6a" stroke-width="4"/>' +
      '<circle cx="46" cy="40" r="10" fill="#f2849a"/>' +
      '<circle cx="74" cy="40" r="10" fill="#f2849a"/>' +
      '<circle cx="60" cy="28" r="10" fill="#e26d7a"/>' +
      '<circle cx="60" cy="42" r="6" fill="#f2c14e"/>';
  }

  function ballArt(kind) {
    if (kind === "banner") {
      return '<path d="M48 24 V96" stroke="#8d5a34" stroke-width="4"/>' +
        '<path d="M48 28 H92 L80 46 H48 Z" fill="#e25b7a"/>';
    }
    if (kind === "flower") {
      return '<circle cx="60" cy="48" r="10" fill="#f2c14e"/>' +
        '<circle cx="44" cy="48" r="12" fill="#f2849a"/><circle cx="76" cy="48" r="12" fill="#e26d7a"/>' +
        '<circle cx="60" cy="34" r="12" fill="#d96bb3"/><circle cx="60" cy="62" r="12" fill="#f2849a"/>';
    }
    if (kind === "lantern") {
      return '<path d="M60 18 V30" stroke="#8d5a34" stroke-width="3"/>' +
        '<rect x="42" y="30" width="36" height="40" rx="8" fill="#f2c14e"/>' +
        '<rect x="50" y="38" width="20" height="22" rx="4" fill="#ffe08a"/>';
    }
    return '<circle cx="60" cy="52" r="16" fill="none" stroke="#f0c6d2" stroke-width="4" stroke-dasharray="6 6"/>';
  }

  function plotButton(index, grown) {
    return '<button type="button" class="plot' + (grown ? " is-grown" : "") + '" data-act="water" data-id="' + index + '" aria-label="' + (grown ? "Flower" : "Dry patch") + '">' +
      '<svg viewBox="0 0 120 110" aria-hidden="true">' + gardenArt(grown) + "</svg></button>";
  }

  function hookButton(index, kind) {
    const label = kind ? kind : "Empty place";
    return '<button type="button" class="hook" data-act="decorate" data-id="' + index + '" aria-label="' + label + '">' +
      '<svg viewBox="0 0 120 110" aria-hidden="true"><rect width="120" height="110" rx="16" fill="#fff6ea"/>' + ballArt(kind) + "</svg></button>";
  }

  root.Play = {
    ballOrder: BALL,
    garden: function (flags) {
      return '<div class="play-grid">' + flags.map(function (flag, index) {
        return plotButton(index, !!flag);
      }).join("") + "</div>";
    },
    ballroom: function (kinds) {
      return '<div class="ballroom"><div class="play-grid">' + kinds.map(function (kind, index) {
        return hookButton(index, kind);
      }).join("") + "</div></div>";
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
