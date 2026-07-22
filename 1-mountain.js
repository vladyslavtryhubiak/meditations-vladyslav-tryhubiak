let x = 200;

let oldX;
let oldY;

let current = 0;
let message =
  "     Our knowledge about the world is just a mere simplification of it.\nWe discover just enough to use it, but never enough to truly understand.";

let extraCanvas;
let animationFinished = false;

let bg;


// ---------- TIMING ----------
const ANIMATION_DELAY = 0;
const TEXT_DELAY = 5500;
const TEXT_VISIBLE = 8000;
const TEXT_FADE = 2000;
// ----------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);

  extraCanvas = createGraphics(windowWidth, windowHeight);
  textSize(20);

  resetSketch();
}

function draw() {

  let t = millis();

  background(220);
  //-----------------------------------------
  // CANVAS 1 - ANIMATION
  //-----------------------------------------

  if (t >= ANIMATION_DELAY && !animationFinished) {

    extraCanvas.stroke(70, 70, 80);
    extraCanvas.strokeWeight(3);

    noiseDetail(5);
    let y = map(noise(frameCount * 0.02), 0, 1, 200, 400);

    x += 4;

    if (oldX !== undefined) {
      extraCanvas.line(oldX, oldY, x, y);
    }

    oldX = x;
    oldY = y;

    if (x > width - 200) {
      animationFinished = true;
    }
  }

  image(extraCanvas, 0, 0);

  //-----------------------------------------
  // CANVAS 2 - TEXT
  //-----------------------------------------

  let centerX = width / 2;
  let centerY = height / 2;

  let textStart = TEXT_DELAY;
  let textFadeStart = textStart + TEXT_VISIBLE;
  let textEnd = textFadeStart + TEXT_FADE;

  if (t >= textStart && t <= textEnd) {

    // Typewriter
    if (frameCount % 2 == 0 && current < message.length) {
      current++;
    }

    // Fade out
    let alpha = 255;

    if (t >= textFadeStart) {
      alpha = map(t, textFadeStart, textEnd, 255, 0, true);
    }

    fill(50, 50, 60, alpha);
    noStroke();

    textFont("Arial");
    textStyle(NORMAL);
    textAlign(LEFT);

    let displayed = message.substring(0, current);
    let totalW = textWidth(message);
    let startX = centerX - totalW / 2;

    text(displayed, startX, centerY + height * 0.35);
  }
}

function mousePressed() {
  resetSketch();
}

function resetSketch() {

 extraCanvas.background(220);

  x = 200;
  oldX = undefined;
  oldY = undefined;

  animationFinished = false;

  // restart millis()
  loop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  let old = extraCanvas;
  extraCanvas = createGraphics(windowWidth, windowHeight);
  extraCanvas.image(old, 0, 0);
}
