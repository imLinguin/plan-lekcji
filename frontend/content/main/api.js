async function fetchData({ religia, grupa, klasa }) {
  window.plan = await fetch(
    `http://localhost:8080/plan/${klasa}?group=${grupa}&rel=${religia}`
  )
    .then((d) => d.json())
    .catch((er) => {
      alert(
        "Wystąpił błąd w połączeniu z serwerem, sprawdź połączenie z internetem lub skontaktuj się z autorem w celu uzyskania wsparcia lub sprawdź czy ustawienia są poprawne."
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
