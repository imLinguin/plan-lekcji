sumCheck();
function sumCheck()
{
if(window.plan){
  listLessons();  
}
else{
  setTimeout(sumCheck(),2000);
}
}
function listLessons()
{
  const displayLekcje = document.querySelector(".lessons-plan");
  let count = 1;
  let out = "";
  for (lekcja in window.plan.tomorrow) {
    if (window.plan.tomorrow[lekcja]) {
      out += `${count}. ${window.plan.tomorrow[lekcja]}` + "<br>"
        count++;
     }
}
  displayLekcje.innerHTML = out;
}