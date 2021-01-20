let target;
function updateTimer(h, m) {
  target = new Date();
  target.setHours(h);
  target.setMinutes(m);
  target.setSeconds(0);
  console.log(target)
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
  frameRate(1);
  background("#202225");
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
  if (target) {
    let now = new Date();
    let distance = target.getTime() - now.getTime();
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector(".countdown-lesson-break").innerHTML = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    if (distance <= 0) {
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
  endShape()
}

ipcRenderer.on("plan-ready", () => updateLesson());
//Aktualizowanie aktualnej lekcji

function updateLesson() {
  let hours = hour();
  let minutes = minute();
  const currentLesson = document.querySelector(".current-lesson");
  let lekcje = {
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
  for (let i = 0; i < Object.keys(lekcje).length; i++) {
    let temp = lekcje[i].split("-");
    let [od_godzina, od_minuta] = temp[0].split(":");
    let [do_godzina, do_minuta] = temp[1].split(":");
    //Sprawdzanie przedziału czy nie jest zbyt wcześnie
    //Sprawdzanie czy nie jest zbyt późno
    if (
      (hours > parseInt(od_godzina) ||
      (hours === parseInt(od_godzina)) && minutes >= od_minuta) &&
      (hours <= do_godzina || (hours === do_godzina && minutes < do_minuta))
    ) {
      
      currentLesson.innerHTML = window.plan[i];
      updateTimer(do_godzina, do_minuta);
      break;
    } else if (hours >= parseInt(od_godzina) && minutes <= parseInt(od_minuta)){
      let temp1 = lekcje[i + 2].split("-");
      console.log(temp1);
      let [od_godzina1, od_minuta1] = temp1[0].split(":");
      currentLesson.innerHTML = "Przerwa";
      updateTimer(parseInt(od_godzina1), parseInt(od_minuta1));
    }
  }
}
