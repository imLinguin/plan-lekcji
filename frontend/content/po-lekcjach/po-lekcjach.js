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
      out += `${count}. ${window.plan.tomorrow[lekcja]}` + "<br>" + "<br>"
      count++;
    }
  }
  clearInterval(intv);
  displayLekcje.innerHTML = out;
}

document.querySelector('.website-button').addEventListener('click', () => {
  require("electron").shell.openExternal("https://www.plan-lekcji-zse.pl")
})

document.querySelector('.github-button').addEventListener('click', () => {
  require("electron").shell.openExternal("https://github.com/imLinguin/plan-lekcji")
})

