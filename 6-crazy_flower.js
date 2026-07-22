//let petalSlider;
petalNumber = 8;

let current = 0;
let message = "Knowledge isn't what is found, but what keeps unfolding.";

const TEXT_DELAY = 0;       // text starts after 0.4 s
const TEXT_VISIBLE = 8000;   // visible for 10 s
const TEXT_FADE = 2000;       // fade for 2 s
// ----------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  //petalSlider = createSlider(10, 100, 50);
  //petalSlider.position(10, 10);
}

function draw() {

  push();
  background(20);
  stroke(200);
  strokeWeight(1.);
  noFill();

  translate(width/2, height/2);

beginShape()

for (let i = 0; i < 360; i += 3) {
  let r = 100 + sin(i * mouseX) * mouseX*9;

  let x = r * cos(i)
  let y = r * sin(i)

  vertex(x, y)
}
endShape(CLOSE)
  pop();

     // -------- TEXT --------
  let t = millis();

  let centerX = width / 2;
  let centerY = height / 2 +50;

  let textStart = TEXT_DELAY;
  let textFadeStart = TEXT_DELAY + TEXT_VISIBLE;
  let textEnd = textFadeStart + TEXT_FADE;

  if (t >= textStart && t <= textEnd) {

    if (frameCount % 2 == 0 && current < message.length) {
      current++;
    }

    let alpha = 255;

    if (t >= textFadeStart) {
      alpha = map(t, textFadeStart,textEnd, 255, 0, true);
    }

    textFont("Arial");
    textStyle(NORMAL);
    textSize(20);
    fill(200, alpha);
    noStroke();

    let displayed = message.substring(0, current);
    let totalW = textWidth(message);
    let startX = centerX - totalW / 2;

    textAlign(LEFT);
    text(displayed, startX, centerY + height * 0.3);
  }
}

// resize automatique
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
