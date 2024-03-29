//ustawienie dzisiejszej daty
const {ipcRenderer} = require("electron");
updateDate();
function updateDate() {
  let n = new Date();
  let y = n.getFullYear();
  let m = n.getMonth() + 1 >= 10 ? n.getMonth() + 1 : "0" + (n.getMonth() + 1);
  let d = n.getDate();
  document.querySelector(".date").innerHTML = d + "." + m + "." + y;

  const days = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  document.querySelector(".day-of-week").innerHTML = days[n.getDay()];
}

setInterval(updateDate, 12 * 1000 * 360);
const prefButton = document.querySelector(".pref-button");

prefButton.addEventListener("click", () => {
  ipcRenderer.send("open-preferences", null);
});

document.querySelector(".refresh-button")?.addEventListener("click", () => {
  ipcRenderer.send("refresh-main");
});
