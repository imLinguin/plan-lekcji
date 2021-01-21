const { ipcRenderer } = require("electron");
const saveButton = document.querySelector(".save");
const restoreButton = document.querySelector(".restore");
const religiaCheck = document.querySelector(".religia");
const klasaBox = document.querySelector(".klasa");
const grupyBox = document.querySelector(".grupa");
const themeSelect = document.querySelector(".motyw")
let klasy;
let cache = ipcRenderer.sendSync("get-preferences", null);
async function pobierzKlasy()
{
  const d = await fetch("http://localhost:8080/klasy");
  const d_1 = await d.json();
  klasy = d_1;
}

pobierzKlasy().then(()=>{
  if (cache) SetPreferences(cache);
saveButton.addEventListener("click", () => {
  if(klasaBox.value && grupyBox.value)
  {
    klasaBox.value = klasaBox.value.toLowerCase().trim();
    klasaBox.value = klasy[klasaBox.value];
    console.log(klasy)
    grupyBox.value = grupyBox.value.trim();
  ipcRenderer.send("closensave-popup", {
    religia: religiaCheck.checked,
    klasa: klasaBox.value,
    grupa: grupyBox.value,
    motyw: themeSelect.value,
  });
}
});

restoreButton.addEventListener("click", () => {
  SetPreferences(cache);
});
function SetPreferences(data) {
  data.klasa = Object.keys(klasy)[parseInt(data.klasa)-1];
  religiaCheck.checked = data.religia || "";
  klasaBox.value = data.klasa || "";
  grupyBox.value = data.grupa || "";
  themeSelect.value = data.motyw || "";
}
})