const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
const player = {
  x: 100,
  y: 100,
  width: 40,
  height: 40,
  speed: 5,
  color: "lime"
};

// Coin
const coin = {
  x: 300,
  y: 200,
  size: 20,
  color: "gold"
};

// Enemy
const enemy = {
  x: 500,
  y: 250,
  width: 40,
  height: 40,
  speed: 3,
  color: "red"
};

let score = 0;
let gameOver = false;

const keys = {};

// Keyboard controls
window.addEventListener("keydown", function(event) {
  keys[event.key.toLowerCase()] = true;

  // Restart game with Space
  if (event.code === "Space" && gameOver === true) {
    restartGame();
  }
});

window.addEventListener("keyup", function(event) {
  keys[event.key.toLowerCase()] = false;
});

// Restart game
function restartGame() {
  player.x = 100;
  player.y = 100;

  enemy.x = 500;
  enemy.y = 250;
  enemy.speed = 3;

  coin.x = 300;
  coin.y = 200;

  score = 0;
  gameOver = false;
}

// Move player
function movePlayer() {
  if (keys["arrowup"] || keys["w"]) player.y -= player.speed;
  if (keys["arrowdown"] || keys["s"]) player.y += player.speed;
  if (keys["arrowleft"] || keys["a"]) player.x -= player.speed;
  if (keys["arrowright"] || keys["d"]) player.x += player.speed;

  if (player.x < 0) player.x = 0;
  if (player.y < 0) player.y = 0;

  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }

  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
  }
}

// Move enemy toward player
function moveEnemy() {
  if (enemy.x < player.x) enemy.x += enemy.speed;
  if (enemy.x > player.x) enemy.x -= enemy.speed;
  if (enemy.y < player.y) enemy.y += enemy.speed;
  if (enemy.y > player.y) enemy.y -= enemy.speed;
}

// Collision check
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Coin collision
function checkCoinCollision() {
  const coinBox = {
    x: coin.x - coin.size,
    y: coin.y - coin.size,
    width: coin.size * 2,
    height: coin.size * 2
  };

  if (isColliding(player, coinBox)) {
    score += 1;

    coin.x = Math.random() * (canvas.width - coin.size);
    coin.y = Math.random() * (canvas.height - coin.size);

    enemy.speed += 0.3;
  }
}

// Enemy collision
function checkEnemyCollision() {
  if (isColliding(player, enemy)) {
    gameOver = true;
  }
}

// Draw player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw coin
function drawCoin() {
  ctx.fillStyle = coin.color;
  ctx.beginPath();
  ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
  ctx.fill();
}

// Draw enemy
function drawEnemy() {
  ctx.fillStyle = enemy.color;
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

// Draw score
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 20, 35);
}

// Draw game over
function drawGameOver() {
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText("GAME OVER", 250, 230);

  ctx.font = "24px Arial";
  ctx.fillText("Press SPACE to restart", 270, 280);
}

// Clear screen
function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Main game loop
function gameLoop() {
  clearScreen();

  if (!gameOver) {
    movePlayer();
    moveEnemy();
    checkCoinCollision();
    checkEnemyCollision();
  }

  drawPlayer();
  drawCoin();
  drawEnemy();
  drawScore();

  if (gameOver) {
    drawGameOver();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();