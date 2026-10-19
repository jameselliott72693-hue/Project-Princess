(function (root) {
  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function validHex(value) {
    return typeof value === "string" && /^#[0-9A-Fa-f]{6}$/.test(value);
  }

  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function rgbToHex(r, g, b) {
    const h = function (v) {
      return clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0");
    };
    return "#" + h(r) + h(g) + h(b);
  }

  function mix(hex, target, t) {
    const a = hexToRgb(hex);
    const b = hexToRgb(target);
    return rgbToHex(
      a.r + (b.r - a.r) * t,
      a.g + (b.g - a.g) * t,
      a.b + (b.b - a.b) * t
    );
  }

  function lighten(hex, t) {
    return mix(hex, "#ffffff", t);
  }

  function darken(hex, t) {
    return mix(hex, "#3a2a28", t);
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function cleanName(value) {
    return String(value == null ? "" : value).replace(/[\r\n\t]/g, " ").replace(/\s+/g, " ").trim().slice(0, 20);
  }

  function hash(c, r) {
    let n = (c * 374761393 + r * 668265263) | 0;
    n = (n ^ (n >> 13)) * 1274126177;
    return (n >>> 0) % 1000;
  }

  root.Paint = {
    clamp: clamp,
    validHex: validHex,
    lighten: lighten,
    darken: darken,
    mix: mix,
    esc: esc,
    cleanName: cleanName,
    hash: hash
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
