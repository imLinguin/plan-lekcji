async function fetchData({ religia, grupa, klasa }) {
  window.plan = await fetch(
    `http://localhost:8080/plan/${klasa}?group=${grupa}&rel=${religia}`
  )
    .then(async (d) => d.json())
    .then((d) => d.array);
}

window.refreshPrefs = function () {
  window.preferences = require("electron").ipcRenderer.sendSync(
    "get-preferences"
  );
};
window.refreshPrefs();
if (window.preferences) {
  fetchData(window.preferences);
}
