(function (root) {
  function choice() {
    const value = root.Store && root.Store.data ? root.Store.data.event : "auto";
    if (value === "snow" || value === "spring" || value === "off" || value === "auto") return value;
    return "auto";
  }

  function fromDate(date) {
    const month = date.getMonth();
    if (month === 11 || month <= 1) return "snow";
    if (month >= 2 && month <= 4) return "spring";
    return "none";
  }

  function current(date) {
    const picked = choice();
    if (picked === "off") return "none";
    if (picked === "snow" || picked === "spring") return picked;
    return fromDate(date || new Date());
  }

  root.Season = { choice: choice, current: current, fromDate: fromDate };
})(typeof globalThis !== "undefined" ? globalThis : this);
