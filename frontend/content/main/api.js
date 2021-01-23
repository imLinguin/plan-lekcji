async function fetchData({ religia, grupa, klasa }) {
  window.plan = await fetch(
    `http://localhost:8080/plan/${klasa}?group=${grupa}&rel=${religia}`
  )
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then((d) => d.json())
    .catch(() => {
      ipcRenderer.send(
        "fetch-error",
        "Nie możemy uzystkać połączenia z serwerem, sprawdź połączenie sieciowe i poprawność preferencji planu."
      );
    });
  ipcRenderer.send("plan-fetched");
}

window.refreshPrefs = function () {
  window.preferences = ipcRenderer.sendSync("get-preferences");
};
window.refreshPrefs();
if (window.preferences) {
  fetchData(window.preferences);
}
