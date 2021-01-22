let lessonEndTime;
let now = new Date();
let poLekcjach = false;
const _minute = 1000 * 60;
const _hour = _minute * 60;
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
const allEnd = document.querySelector(".countdown-end");
function updateTimer(h, m) {
  lessonEndTime = new Date();
  lessonEndTime.setHours(h);
  lessonEndTime.setMinutes(m);
  lessonEndTime.setSeconds(0);
}
function setup() {
  createCanvas(130, 130);
  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.6;
  minutesRadius = radius * 0.485;
  hoursRadius = radius * 0.34;
  clockDiameter = radius * 1.7;

  cx = width / 2;
  cy = height / 2;
  document.querySelector(".clock").innerHTML = `${hour()}:${
    minute() < 10 ? "0" + minute() : minute()
  }`;
}

function draw() {
  clear();
  frameRate(1);
  background("rgba(1,1,1,0)");
  stroke("#D3293C");
  strokeWeight(4);
  noFill();
  ellipse(width / 2, height / 2, 100);
  stroke("#35BEF9");
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
  document.querySelector(".clock").innerHTML = `${hour()}:${
    minute() < 10 ? "0" + minute() : minute()
  }`;
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2.2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(3.8);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
  if (lessonEndTime) {
    //Koniec bierzącej lekcji
    now = new Date();
    let distance = lessonEndTime.getTime() - now.getTime();
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector(".countdown-lesson-break").innerHTML = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    if (distance < 0) {
      updateLesson();
      document.querySelector(".countdown-lesson-break").innerHTML = "00:00";
    }
  }
  //koniec dnia w szkole
  //allEnd
  if (window.plan) {
    let temp = lekcje[window.plan.last].split("-")[1];
    let [koniec_h, koniec_m] = temp.split(":");
    let end = new Date();
    end.setHours(koniec_h);
    end.setMinutes(koniec_m);
    end.setSeconds(0);
    distance = end.getTime() - now.getTime();
    if (distance > 0) {
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / _hour);
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
      allEnd.innerHTML = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    } else {
      allEnd.innerHTML = "0:00:00";
      poLekcjach = true;
      updateLesson();
    }
  }
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 90) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
}

ipcRenderer.on("plan-ready", () => updateLesson());
//Aktualizowanie aktualnej lekcji

function updateLesson() {
  const currentLesson = document.querySelector(".current-lesson");
  const countdownText = document.querySelector(".countdown-text");
  const fellfree = document.querySelector(".feel-free");
  for (let i = 0; i < window.plan.array.length; i++) {
    let temp = lekcje[i].split("-");
    let temp1 = lekcje[i + 1].split("-");
    let [od_godzina1, od_minuta1] = temp1[0].split(":");
    let [od_godzina, od_minuta] = temp[0].split(":");
    let [do_godzina, do_minuta] = temp[1].split(":");

    now = new Date();
    let nextPoczatek = new Date();
    let poczatek = new Date();
    let koniec = new Date();
    nextPoczatek.setHours(od_godzina1);
    nextPoczatek.setMinutes(od_minuta1);
    poczatek.setHours(od_godzina);
    poczatek.setMinutes(od_minuta);
    koniec.setHours(do_godzina);
    koniec.setMinutes(do_minuta);
    poczatek = poczatek.getTime();
    koniec = koniec.getTime();
    nextPoczatek = nextPoczatek.getTime();
    //Sprawdzanie przedziału czy nie jest zbyt wcześnie
    //Sprawdzanie czy nie jest zbyt późno
    if (!poLekcjach) {
      if (now >= poczatek && now < koniec) {
        currentLesson.innerHTML = window.plan.array[i] || "Brak lekcji";
        countdownText.innerHTML = "Lekcja kończy się za:";
        fellfree.style.display = "none";
        updateTimer(do_godzina, do_minuta);
        if (window.plan.array[i] && now - poczatek < 5000 * 60) {
          window.nextLessonNotify(window.plan.array[i]);
        }
      } else if (now >= koniec && now <= nextPoczatek) {
        currentLesson.innerHTML = "Przerwa";
        countdownText.innerHTML = "Przerwa kończy się za:";
        updateTimer(parseInt(od_godzina1), parseInt(od_minuta1));
        fellfree.style.display = "block";
      }
    } else {
      ipcRenderer.send("render-po-lekcjach");
    }
  }
}
