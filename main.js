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

let gameOver = false;
let score = 0;
let spaceshuttlex = canvas.width / 2 - 30;
let spaceshuttley = canvas.width + 225;
let bulletList = [];
let enemyList = [];

// 클래스로 바꿀 수 있으니 해보는 것도 나쁘지 않을듯
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshuttlex;
    this.y = spaceshuttley;
    this.alive = true;
    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };

  this.checkHit = function () {
    for (i = 0; i < enemyList.length; i++) {
      if (
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x + 40
      ) {
        score++;
        this.alive = false;
        enemyList.splice(i, 1);
        console.log(enemyList);
      }
    }
  };
}

function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width - 48);
    enemyList.push(this);
  };
  this.update = function () {
    this.y += 3;

    if (this.y >= canvas.height - 48) {
      gameOver = true;
    }
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

function createEnemy() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init();
  }, 1000);
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
    if (bulletList[i].alive) {
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }
  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshuttleImage, spaceshuttlex, spaceshuttley);
  ctx.fillText(`Score:${score}`, 20, 20);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  }
  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(fighterImage, enemyList[i].x, enemyList[i].y);
  }
}

function main() {
  if (!gameOver) {
    update();
    render();
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 10, 100, 380, 380);
  }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();
