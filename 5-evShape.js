petalNumber = 8
let waves = [];

let current = 0;
let message = "Our mind separates everything in distinct things,\nyet everything is a variation of the same source.";

const TEXT_DELAY = 0;       // text starts after 0.4 s
const TEXT_VISIBLE = 8000;   // visible for 10 s
const TEXT_FADE = 2000;       // fade for 2 s
// ----------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  let t = millis();

  background(20);

  if (mouseX > width / 2) {
    evFlower();
  } else if (mouseX < width / 2) {
    evShape();
  }

// draw waves
for (let i = waves.length - 1; i >= 0; i--) {

  drawWave(waves[i]);

  waves[i].scale += 0.02;
  waves[i].alpha -= 2;

  if (waves[i].alpha <= 0) {
    waves.splice(i, 1);
  }
}

     // -------- TEXT --------
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


function evShape(){
  push();

  stroke(255);
  noFill();

  translate(width/2, height/2);

  beginShape()
  for (var i = 0; i < 359; i += 360 / mouseX*30) {
    var r = 100; //mouseY/1.8
    var x = r * cos(i)
    var y = r * sin(i)
    vertex(x, y)
  }
  endShape(CLOSE)

  pop();
}

function evFlower(){
  push();

  stroke(255);
  noFill();

  translate(width/2, height/2);

  beginShape()
  for (let i = 0; i < 360; i += 3) {
    let mouseRange = max(0, mouseX - width / 2);
    let r = 100 + sin(i * petalNumber+mouseX*2) * mouseRange;

    let x = r * cos(i)
    let y = r * sin(i)
    vertex(x, y)
   }
    endShape(CLOSE)

  pop();
}

function thecursor(){
    // cursor glyph
  resetMatrix(); // ou push/pop autour du dessin principal
  noCursor();
  noStroke();
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("▶", mouseX, mouseY);
}


function mousePressed() {
  waves.push({
    mx: mouseX,   // shape at the moment of the click
    scale: 1,
    alpha: 255
  });
}

function drawWave(w) {

  push();

  translate(width/2, height/2);

  scale(w.scale);

  stroke(255, w.alpha);
  noFill();

  beginShape();

  let mx = max(0, w.mx - width/2);

  for (let i = 0; i < 360; i += 3) {

    let r = 100 + sin(i * petalNumber + mx*2) * mx;

    let x = r * cos(i);
    let y = r * sin(i);

    vertex(x, y);
  }

  endShape(CLOSE);

  pop();
}

// resize automatique
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
