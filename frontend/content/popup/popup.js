const {
  ipcRenderer,
} = require("electron");
const saveButton = document.querySelector(".save");
const restoreButton = document.querySelector(".restore");
const religiaCheck = document.querySelector("#_religia");
const klasaBox = document.querySelector(".klasa");
const grupyBox = document.querySelector(".grupa");
const themeSelect = document.querySelector(".motyw");
let klasy;
let cache = ipcRenderer.sendSync("get-preferences");
async function pobierzKlasy() {
  const d = await fetch("http://localhost:8080/klasy")
    .then(async (d) => await d.json());
  klasy = d;
}

pobierzKlasy().then(() => {
  if (cache) SetPreferences(cache);
  saveButton.addEventListener("click", () => {
    klasaBox.value = klasaBox.value.trim();
    grupyBox.value = grupyBox.value.trim();
    if (
      klasaBox.value &&
      grupyBox.value &&
      klasaBox.value.match(/[1-4](\w)/gm) &&
      !grupyBox.value.match(/\s/)
    ) {
      klasaBox.value = klasaBox.value.toLowerCase().trim();
      klasaBox.value = klasy[klasaBox.value];
      grupyBox.value = grupyBox.value.trim();

      ipcRenderer.send("closensave-popup", {
        religia: religiaCheck.checked,
        klasa: klasaBox.value,
        grupa: grupyBox.value,
        motyw: themeSelect.checked,
      });
    }
  });

  restoreButton.addEventListener("click", () => {
    SetPreferences(cache);
  });

  function SetPreferences(data) {
    let tempk = Object.keys(klasy)[parseInt(data.klasa) - 1];
    religiaCheck.checked = data.religia || "";
    klasaBox.value = tempk || "";
    grupyBox.value = data.grupa || "";
    themeSelect.checked = data.motyw || false;
  }
});
