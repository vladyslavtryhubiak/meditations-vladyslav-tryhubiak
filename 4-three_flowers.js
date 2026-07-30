//"In trying to collect it all, we might miss the effervescent truth that will slip through our limited mind. \nWe can go infinetely describing things, and never getting to what they were about.⊳  ▶";

let angle = 0;
let extraCanvas;

let message = " We want to collect, to describe it all, but in\ndoing so, we might miss what it truly is about.";
let current = 0;


// ---------- TIMING ----------
const FLOWERS_DELAY = 0; // Flowers appear after 5 seconds

const TEXT_DELAY = 5500;     // Text appears after 0.5 seconds
const TEXT_VISIBLE = 10000;  // Stay visible for 7 seconds
const TEXT_FADE = 2000;      // Fade duration (2 seconds)
// ----------------------------



function setup() {
  createCanvas(windowWidth, windowHeight);

  // Flowers layer
  extraCanvas = createGraphics(windowWidth, windowHeight);
  extraCanvas.clear();

  textSize(20);
  textFont("Arial");
}

function draw() {

  let t = millis();

//-----------------------------------------
// CANVA 1 - FLOWERS
//-----------------------------------------

  let spacing = 400;
  let centerX = width / 2;
  let centerY = height * 0.45;  //adjust number for flowers Y position  /\ it impacts also text!

  let leftX = centerX - spacing;
  let rightX = centerX + spacing;

  // Flowers only start growing after x seconds
  if (t >= FLOWERS_DELAY) {
    flower(leftX, centerY, 0.01, 0.4, 0.4);
    flower(centerX, centerY, 0.01, 0.4, 0.6);
    flower(rightX, centerY, 0.01, 0.1, 0.9);
  }

  // Rectangle only on flowers layer
  if (mouseIsPressed) {
    extraCanvas.noStroke();
    extraCanvas.fill(240);
    extraCanvas.rect(20, 20, width, height);
  }

  //-----------------------------------------
  // CANVA 2 - TEXT
  //-----------------------------------------

  background(240);

  // Display flowers underneath the text
  image(extraCanvas, 0, 0);

  // Timing
  let textStart = TEXT_DELAY;
  let textFadeStart = TEXT_DELAY + TEXT_VISIBLE;
  let textEnd = textFadeStart + TEXT_FADE;

  // Draw text only during its lifetime
  if (t >= textStart && t <= textEnd) {

    // Typewriter effect starts only after the delay
    if (frameCount % 2 == 0 && current < message.length) {
      current++;
    }

    // Compute alpha
    let alpha = 255;
    if (t >= textFadeStart) {
      alpha = map(t, textFadeStart, textEnd, 255, 0, true);
    }

    fill(50, alpha);
    textFont("Arial");

    let displayed = message.substring(0, current);
    let totalW = textWidth(message);
    let startX = centerX - totalW / 2;

    textAlign(LEFT);
    text(displayed, startX, centerY + height * 0.4);
  }
}

function flower(cx, cy, fcount, ang, seed) {
  let rayon = map(noise(frameCount * fcount * seed), 0, 2, 5, 350);  //()?, general size, inner radius, outer radius)

  let x = cx + cos(angle) * rayon;
  let y = cy + sin(angle) * rayon;

  extraCanvas.noStroke();
  extraCanvas.fill(80, 80, 80);
  extraCanvas.circle(x, y, 3); //circle size

  angle += ang;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  let old = extraCanvas;
  extraCanvas = createGraphics(windowWidth, windowHeight);
  extraCanvas.image(old, 0, 0);
}
