const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");
const saveButton = document.querySelector(".save");
const restoreButton = document.querySelector(".restore");
const religiaCheck = document.querySelector("#_religia");
const klasaBox = document.querySelector(".klasa");
const grupyBox = document.querySelector(".grupa");
const themeSelect = document.querySelector(".motyw");
const klasypath = path.join(__dirname, "klasy.json");
let klasy;
let cache = ipcRenderer.sendSync("get-preferences", null);
async function pobierzKlasy() {
  const d = await fetch("http://localhost:8080/klasy")
    .then(async (d) => await d.json())
    .catch(() => {
      let klasypath = path.join(__dirname, "klasy.json");
      if (fs.existsSync(klasypath)) {
        let data = fs.readFileSync(klasypath);
        return JSON.parse(data);
      }
    });
  klasy = d;
  //backup klas w szkole na wypadek braku internetu w przyszłości i chęci zmiany ustawień
  fs.writeFileSync(klasypath, JSON.stringify(klasy));
}

pobierzKlasy().then(() => {
  if (cache) SetPreferences(cache);
  saveButton.addEventListener("click", () => {
    if (klasaBox.value && grupyBox.value) {
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
    data.klasa = Object.keys(klasy)[parseInt(data.klasa) - 1];
    religiaCheck.checked = data.religia || "";
    klasaBox.value = data.klasa || "";
    grupyBox.value = data.grupa || "";
    themeSelect.checked = data.motyw|| false;
  }
});
