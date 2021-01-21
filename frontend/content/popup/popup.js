const { ipcRenderer } = require("electron");
const saveButton = document.querySelector(".save");
const restoreButton = document.querySelector(".restore");
const religiaCheck = document.querySelector(".religia");
let cache = ipcRenderer.sendSync("get-preferences", null);
if (cache) SetPreferences(cache);
saveButton.addEventListener("click", () => {
  ipcRenderer.send("closensave-popup", {
    religia: religiaCheck.checked,
  });
});

restoreButton.addEventListener("click", () => {
  SetPreferences(cache);
});
function SetPreferences(data) {
  console.log(data.religia);
  religiaCheck.checked = data.religia;
}
