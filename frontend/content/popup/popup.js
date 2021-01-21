const { ipcRenderer } = require("electron");
const saveButton = document.querySelector(".save");
const restoreButton = document.querySelector(".restore");
const religiaCheck = document.querySelector(".religia");
const klasaBox = document.querySelector(".klasa");
const grupyBox = document.querySelector(".grupa");
const themeSelect = document.querySelector(".motyw")
let cache = ipcRenderer.sendSync("get-preferences", null);
if (cache) SetPreferences(cache);
saveButton.addEventListener("click", () => {
  if(klasaBox.value && klasaBox.value)
  ipcRenderer.send("closensave-popup", {
    religia: religiaCheck.checked,
    klasa: klasaBox.value,
    grupa: grupyBox.value,
    motyw: themeSelect.value,
  });
});

restoreButton.addEventListener("click", () => {
  SetPreferences(cache);
});
function SetPreferences(data) {
  religiaCheck.checked = data.religia;
  klasaBox.value = data.klasa;
  grupyBox.value = data.grupa;
  themeSelect.value = data.motyw;
}
