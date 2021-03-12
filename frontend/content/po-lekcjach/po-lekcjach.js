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
const shortlekcje = {
  0: "7:10-7:40",
  1: "7:45-8:15",
  2: "8:20-8:50",
  3: "8:55-9:25",
  4: "9:45-10:15",
  5: "10:20-10:50",
  6: "10:55-11:25",
  7: "11:30-12:00",
  8: "12:05-12:35",
  9: "12:40-13:10",
  10: "13:15-13:45",
  11: "14:00-14:30",
  12: "14:35-15:05",
  13: "15:10-15:40",
}


let intv = setInterval(() => {
  if (window.plan)
    listLessons();
}, 1000);

function listLessons() {
  const displayLekcje = document.querySelector(".lessons-plan");
  let count = 1;
  let out = "";
  for (lekcja in window.plan.tomorrow) {
    if (window.plan.tomorrow[lekcja]) {
      if(window.plan.short)
      {
        out += `${count}. ${window.plan.tomorrow[lekcja]} <a style="opacity:0.3">${shortlekcje[lekcja]}</a>` + "<br>" + "<br>"
      }
      else{
        out += `${count}. ${window.plan.tomorrow[lekcja]} <a style="opacity:0.3">${lekcje[lekcja]}</a>` + "<br>" + "<br>"
      }
      count++;
    }
  }
  clearInterval(intv);
  displayLekcje.innerHTML = out;
}

document.querySelector('.github-button').addEventListener('click', () => {
  require("electron").shell.openExternal("https://github.com/imLinguin/plan-lekcji")
})

