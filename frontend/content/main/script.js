//ustawienie dzisiejszej daty
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

//Otwieranie preferencji
const { ipcRenderer } = require("electron");
const prefButton = document.querySelector(".pref-button");
prefButton.addEventListener("click", () => {
  ipcRenderer.send("open-preferences", null);
});

//Aktualizowanie aktualnej lekcji
const currentLesson = document.querySelector(".current-lesson");
const lekcje = {
  0: "7:10-7:55",
  1: "8:00-8:45",
  2: "8:50-9:35",
  3: "9:40-10:25",
  4: "10:45-11:30",
  5: "11:35-12:20",
  6: "12:25-13:10",
  7: "13:15-14:00",
  8: "14:05-14:50",
  9: "14:55-15:40",
  10: "15:45-16:30",
  11: "16:45-17:30",
  12: "17:35-18:20",
  13: "18:25-19:10",
};

currentLesson.innerHTML = lekcje[2];
