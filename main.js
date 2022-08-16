let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage,
  spaceshuttleImage,
  bulletImage,
  fighterImage,
  gameOverImage;

let spaceshuttlex = canvas.width / 2 - 30;
let spaceshuttley = canvas.width + 225;
let bulletList = [];

// 클래스로 바꿀 수 있으니 해보는 것도 나쁘지 않을듯
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshuttlex;
    this.y = spaceshuttley;

    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };
}

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/bg.jpg";

  spaceshuttleImage = new Image();
  spaceshuttleImage.src = "images/spaceshuttle.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  fighterImage = new Image();
  fighterImage.src = "images/fighter.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/game_over.png";
}

let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
  });
  document.addEventListener("keyup", function (event) {
    delete keysDown[event.key];

    if (event.key == " ") {
      createBullet();
    }
  });
}

function createBullet() {
  let b = new Bullet();
  b.init();
}

function update() {
  if ("ArrowRight" in keysDown) {
    spaceshuttlex += 3;
  }
  if ("ArrowLeft" in keysDown) {
    spaceshuttlex -= 3;
  }

  if (spaceshuttlex <= 0) {
    spaceshuttlex = 0;
  }
  if (spaceshuttlex >= canvas.width - 60) {
    spaceshuttlex = canvas.width - 60;
  }
  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshuttleImage, spaceshuttlex, spaceshuttley);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
  }
}

function main() {
  update();
  render();
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();
