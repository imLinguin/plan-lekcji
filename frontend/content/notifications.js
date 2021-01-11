const przycisk = document.querySelector(".notify");

przycisk.addEventListener("click", () => {
  let n = new Notification("Następna lekcja", {
    body: "Ogólnie to dzisiaj nie ma lekcji ale test jest",
  });
  n.onclick = () => {
    console.log("Kliknięto powiadomienie");
  };
});
