(function (root) {
  function nameOf(princess) {
    return root.Princess.displayName(princess);
  }

  function petWord(princess) {
    if (princess.pet === "cat") return "cat";
    if (princess.pet === "pup") return "pup";
    if (princess.pet === "dragon") return "dragon";
    if (princess.pet === "bird") return "bird";
    if (princess.pet === "bunny") return "bunny";
    return "";
  }

  function kingdomFeel() {
    const theme = root.Store && root.Store.data && root.Store.data.kingdom
      ? root.Store.data.kingdom.theme
      : "meadow";
    if (theme === "winter") return "soft and snowy";
    if (theme === "seaside") return "sunny beside the sea";
    return "green and quiet";
  }

  function pagesFor(princess) {
    const name = nameOf(princess);
    const pet = petWord(princess);
    const friend = pet
      ? "Her " + pet + " was waiting by the door, ready to come along."
      : "A small butterfly waited by the door, ready to come along.";
    return [
      {
        id: "cover",
        title: "The story of " + name,
        text: "This is a gentle story about " + name + " and her kingdom."
      },
      {
        id: "morning",
        title: "Morning",
        text: name + " woke up in the castle. The window was bright, and the day felt new."
      },
      {
        id: "friend",
        title: "A friend",
        text: friend
      },
      {
        id: "garden",
        title: "The garden",
        text: "They walked past flowers that nodded in the breeze."
      },
      {
        id: "kingdom",
        title: "The kingdom",
        text: "Outside, the kingdom looked " + kingdomFeel() + ". Little paths led past trees and houses."
      },
      {
        id: "picnic",
        title: "Sharing",
        text: "They sat on a picnic cloth and shared warm bread."
      },
      {
        id: "kind",
        title: "A kind day",
        text: "They helped a little bird find the path back to its tree."
      },
      {
        id: "end",
        title: "The end",
        text: "Then " + name + " went home, happy and sleepy. The end."
      }
    ];
  }

  function sky(top, bottom) {
    return '<defs><linearGradient id="story-sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + bottom + '"/>' +
      "</linearGradient></defs>" +
      '<rect width="800" height="1000" fill="url(#story-sky)"/>';
  }

  function castle() {
    return '<path d="M70 620 L150 430 L190 500 L250 360 L310 500 L360 420 L470 620 Z" fill="#e8b84a"/>' +
      '<rect x="120" y="620" width="360" height="150" rx="16" fill="#f4d7c4"/>' +
      '<rect x="250" y="680" width="90" height="90" rx="12" fill="#c73b64"/>' +
      '<rect x="160" y="660" width="60" height="70" rx="8" fill="#9fd7f2"/>' +
      '<rect x="380" y="660" width="60" height="70" rx="8" fill="#9fd7f2"/>';
  }

  function flower(x, y, color) {
    return '<g transform="translate(' + x + " " + y + ')">' +
      '<path d="M0 0 V48" stroke="#3e9a6a" stroke-width="4"/>' +
      '<circle cx="-10" cy="-6" r="8" fill="' + color + '"/>' +
      '<circle cx="10" cy="-6" r="8" fill="' + color + '"/>' +
      '<circle cx="0" cy="-16" r="8" fill="' + color + '"/>' +
      '<circle cx="0" cy="0" r="6" fill="#f2c14e"/></g>';
  }

  function scene(id, princess) {
    if (id === "cover") {
      return sky("#ffe4f1", "#fff6ea") +
        '<circle cx="640" cy="140" r="54" fill="#ffe08a"/>' +
        castle() +
        '<rect y="760" width="800" height="240" fill="#e7f6d4"/>' +
        flower(90, 760, "#f2849a") + flower(180, 790, "#f2c14e") + flower(620, 770, "#e26d7a");
    }
    if (id === "morning") {
      return sky("#fff1df", "#f6e2c8") +
        '<rect x="80" y="80" width="220" height="180" rx="16" fill="#9fd7f2"/>' +
        '<circle cx="190" cy="160" r="36" fill="#ffe08a"/>' +
        '<rect x="430" y="520" width="280" height="120" rx="24" fill="#f7c9d6"/>' +
        '<rect x="450" y="470" width="240" height="70" rx="20" fill="#fff"/>' +
        '<rect y="760" width="800" height="240" fill="#e7c9a4"/>';
    }
    if (id === "friend") {
      return sky("#e7f6ff", "#fff6ea") +
        '<rect y="760" width="800" height="240" fill="#d9f2c2"/>' +
        '<rect x="90" y="430" width="160" height="330" rx="18" fill="#c4844a"/>' +
        '<circle cx="170" cy="430" r="70" fill="#8d5a34"/>' +
        (princess.pet === "none" ? '<ellipse cx="560" cy="280" rx="18" ry="10" fill="#f2c14e"/><ellipse cx="590" cy="270" rx="16" ry="8" fill="#fff6ea"/>' : "");
    }
    if (id === "garden") {
      return sky("#e7f6ff", "#fffaf4") +
        '<rect y="740" width="800" height="260" fill="#b7e39a"/>' +
        flower(80, 700, "#f2849a") + flower(170, 680, "#e26d7a") +
        flower(560, 690, "#f2c14e") + flower(660, 710, "#d96bb3") + flower(720, 670, "#f2849a");
    }
    if (id === "kingdom") {
      const theme = root.Store && root.Store.data && root.Store.data.kingdom
        ? root.Store.data.kingdom.theme
        : "meadow";
      if (theme === "winter") {
        return sky("#e7f4ff", "#fff") +
          '<circle cx="140" cy="140" r="40" fill="#fff"/>' +
          '<rect y="760" width="800" height="240" fill="#eef7ff"/>' +
          '<path d="M80 760 L140 620 L200 760 Z" fill="#2f6f4e"/>' +
          '<path d="M600 760 L670 600 L740 760 Z" fill="#2f6f4e"/>';
      }
      if (theme === "seaside") {
        return sky("#d7f3ff", "#fff6ea") +
          '<circle cx="650" cy="130" r="48" fill="#ffe08a"/>' +
          '<rect y="700" width="800" height="120" fill="#7ec8ea"/>' +
          '<rect y="800" width="800" height="200" fill="#f4e3c8"/>' +
          '<path d="M90 800 Q140 740 190 800" fill="none" stroke="#3aa0c8" stroke-width="8"/>';
      }
      return sky("#d7f3ff", "#fff6ea") +
        '<rect y="760" width="800" height="240" fill="#c9e8a4"/>' +
        '<path d="M40 760 L120 560 L200 760 Z" fill="#3e9a6a"/>' +
        '<circle cx="120" cy="560" r="46" fill="#2f6f4e"/>' +
        '<path d="M560 760 L650 540 L740 760 Z" fill="#3e9a6a"/>' +
        '<circle cx="650" cy="540" r="50" fill="#2f6f4e"/>' +
        '<rect x="300" y="640" width="120" height="120" rx="8" fill="#e26d7a"/>' +
        '<path d="M280 640 L360 560 L440 640 Z" fill="#c4844a"/>';
    }
    if (id === "picnic") {
      return sky("#fff1df", "#e7f6d4") +
        '<rect y="760" width="800" height="240" fill="#d9f2c2"/>' +
        '<ellipse cx="560" cy="820" rx="120" ry="36" fill="#e25b7a"/>' +
        '<ellipse cx="520" cy="800" rx="28" ry="16" fill="#e0b15a"/>' +
        '<ellipse cx="600" cy="808" rx="16" ry="16" fill="#f2849a"/>';
    }
    if (id === "kind") {
      return sky("#e7f6ff", "#fffaf4") +
        '<rect y="760" width="800" height="240" fill="#c9e8a4"/>' +
        '<path d="M560 760 L650 480 L740 760 Z" fill="#3e9a6a"/>' +
        '<circle cx="650" cy="470" r="54" fill="#2f6f4e"/>' +
        '<ellipse cx="620" cy="430" rx="14" ry="8" fill="#5c6bc0"/>' +
        '<circle cx="612" cy="428" r="2" fill="#2c2430"/>';
    }
    return sky("#2a3d66", "#6b4c7a") +
      '<circle cx="160" cy="150" r="46" fill="#fff6ea"/>' +
      '<circle cx="620" cy="120" r="3" fill="#fff"/><circle cx="680" cy="200" r="2" fill="#fff"/>' +
      '<circle cx="540" cy="90" r="2.4" fill="#fff"/><circle cx="400" cy="70" r="2" fill="#fff"/>' +
      '<rect y="780" width="800" height="220" fill="#24324a"/>' +
      castle();
  }

  function person(princess) {
    const svg = root.Princess.svg(princess, { plain: true }).replace("<svg ", '<svg width="304" height="496" ');
    return '<g transform="translate(248 500)">' + svg + "</g>";
  }

  function svg(index, princess) {
    const page = pagesFor(princess)[index];
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000" role="img" aria-label="' +
      root.Paint.esc(page.title) + '">' + scene(page.id, princess) + person(princess) + "</svg>";
  }

  function speak(text) {
    stop();
    if (!root.speechSynthesis || typeof root.SpeechSynthesisUtterance !== "function") return false;
    const utter = new root.SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.95;
    utter.pitch = 1.04;
    const voices = root.speechSynthesis.getVoices ? root.speechSynthesis.getVoices() : [];
    const voice = voices.filter(function (item) { return /^en/i.test(item.lang); })[0];
    if (voice) utter.voice = voice;
    root.speechSynthesis.speak(utter);
    return true;
  }

  function stop() {
    if (root.speechSynthesis && root.speechSynthesis.cancel) root.speechSynthesis.cancel();
  }

  root.Story = {
    count: function () { return 8; },
    page: function (index, princess) { return pagesFor(princess)[index]; },
    svg: svg,
    speak: speak,
    stop: stop
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
