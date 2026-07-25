let angle = 0;
let extraCanvas;

let message = "Knowledge is the matter, wisdom is the space to hold it.\nWithout enough space, even the brightest knowledge exhausts itself.";
let current = 0;


// ---------- TIMING ----------
const FLOWERS_DELAY = 0; // Flowers appear after 5 seconds

const TEXT_DELAY = 5000;     // Text appears after 0.5 seconds
const TEXT_VISIBLE = 8000;  // Stay visible for 7 seconds
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

  let spacing = 350;
  let centerX = width / 2;
  let centerY = height * 0.45;  //adjust number for flowers Y position  /\ it impacts also text!

  let leftX = centerX - spacing;
  let rightX = centerX + spacing;

  // Flowers only start growing after x seconds
  if (t >= FLOWERS_DELAY) {
    flower();
  }

  // Rectangle only on flowers layer
  if (mouseIsPressed) {
    extraCanvas.noStroke();
    extraCanvas.fill(220);
    extraCanvas.rect(20, 20, width, height);
  }

  //-----------------------------------------
  // CANVA 2 - TEXT
  //-----------------------------------------

  background(220);

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

 function flower() {
      let rayon = map(noise(frameCount * 0.01),
    0, 1,
    10, 250  //inner radius, external radius
  );

  let x = width/2 + cos(angle) * rayon;
  let y = height/2-30 + sin(angle) * rayon;

  extraCanvas.noStroke();   // enlève le contour
  extraCanvas.fill(80, 80, 80);
  extraCanvas.circle(x, y, 4);

  angle += 0.7;  //0.7 for optimal result, but also 1.4, 1.6, 1.8, 2.5, 4.2, 150,
    // with inner and ext radius 10 & 250, and 0.9 it makes a very clear flower
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  let old = extraCanvas;
  extraCanvas = createGraphics(windowWidth, windowHeight);
  extraCanvas.image(old, 0, 0);
}
