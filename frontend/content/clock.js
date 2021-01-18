function setup() {
    createCanvas(170, 170);
    let radius = min(width, height) / 2;
    secondsRadius = radius * 0.71;
    minutesRadius = radius * 0.6;
    hoursRadius = radius * 0.5;
    clockDiameter = radius * 1.7;
  
    cx = width / 2;
    cy = height / 2;
  }
  
  function draw() {
    background("#202225");
    stroke("#D3293C");
    strokeWeight(4);
    noFill();
    ellipse(width / 2, height / 2, 150);
    stroke("#35BEF9");
    let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
    document.querySelector(".clock").innerHTML = `${hour()}:${minute()}`;
    strokeWeight(1);
    line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
    strokeWeight(2.3);
    line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
    strokeWeight(5);
    line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
  }
  