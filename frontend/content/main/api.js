async function fetchData({ religia, grupa, klasa }) {
  window.plan = await fetch(
    `http://localhost:8080/plan/${13}?group=${"1/2"}&rel=${true}`
  )
    .then((d) => d.json())
    .then(async (d) => await d.array)
    .catch((er) => {
      alert(
        "Wystąpił błąd w połączeniu z serwerem, sprawdź połączenie z internetem lub skontaktuj się z autorem w celu uzyskania wsparcia."
      );
    });
  require("electron").ipcRenderer.send("plan-fetched");
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
