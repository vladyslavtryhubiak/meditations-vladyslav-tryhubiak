let x = 400;
let speed = 5;
let yVar = 40;
let yYvar = 290;

let oldX;
let oldY;

let extraCanvas;
let animationFinished = false;

let current = 0;
let message = "Despite all the knowledge, there is something there,\n     which can be discovered only on your own.";

// ---------- TIMING ----------
const ANIMATION_DELAY = 4000;   // mountain starts after 8 s
const TEXT_DELAY = 400;       // text starts after 0.4 s
const TEXT_VISIBLE = 8000;   // visible for 10 s
const TEXT_FADE = 2000;       // fade for 2 s
// ----------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);

  extraCanvas = createGraphics(windowWidth, windowHeight);
  textSize(20);
  textFont("Arial");

  resetSketch();
}

function draw() {

  let t = millis();

  let centerX = width / 2;
  let centerY = height * 0.45;

  //-----------------------------------------
  // CANVAS 1 - MOUNTAIN
  //-----------------------------------------

  if (t >= ANIMATION_DELAY && !animationFinished) {

    extraCanvas.stroke(70, 70, 80);
    extraCanvas.strokeWeight(3);

    noiseDetail(4);

    let y = map(
      noise(frameCount * 0.04),
      0,
      1.2,
      yVar,
      yYvar
    );

    x += speed;

    if (x > width - 300 || x < 300) {
      speed *= -1;
      yVar += 100;
      yYvar += 20;
    }

    if (oldX !== undefined) {
      extraCanvas.line(oldX, oldY, x, y);
    }

    oldX = x;
    oldY = y;

    if (y > height - 200) {
      animationFinished = true;
    }
  }

  //-----------------------------------------
  // CANVAS 2 - TEXT
  //-----------------------------------------

  background(220);

  // draw mountain underneath
  image(extraCanvas, 0, 0);

  let textStart = TEXT_DELAY;
  let textFadeStart = TEXT_DELAY + TEXT_VISIBLE;
  let textEnd = textFadeStart + TEXT_FADE;

  if (t >= textStart && t <= textEnd) {

    if (frameCount % 2 == 0 && current < message.length) {
      current++;
    }

    let alpha = 255;

    if (t >= textFadeStart) {
      alpha = map(
        t,
        textFadeStart,
        textEnd,
        255,
        0,
        true
      );
    }

    fill(50, alpha);
    noStroke();

    let displayed = message.substring(0, current);
    let totalW = textWidth(message);
    let startX = centerX - totalW / 2;

    textAlign(LEFT);
    text(displayed, startX, centerY + height * 0.4);
  }
}

function resetSketch() {

  extraCanvas.background(220);

  x = 300;
  speed = 5;
  yVar = 40;
  yYvar = 290;

  oldX = undefined;
  oldY = undefined;

  current = 0;
  animationFinished = false;
}

function mousePressed() {
  resetSketch();
}

function keyPressed() {
  if (key === "f" || key === "F") {
    fullscreen(!fullscreen());
  }
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

  let old = extraCanvas;
  extraCanvas = createGraphics(windowWidth, windowHeight);
  extraCanvas.image(old, 0, 0);
}
