window.nextLessonNotify = (lekcja) => {
  let n = new Notification("Następna lekcja", {
    icon: "../images/exclamation-mark.png",
    body: `Za chwilę ${lekcja} nie spóźnij się`,
  });
};
