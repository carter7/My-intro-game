const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player object
const player = {
  x: 100,
  y: 100,
  width: 40,
  height: 40,
  speed: 5,
  color: "lime"
};

// Keyboard controls
const keys = {};

window.addEventListener("keydown", function(event) {
  keys[event.key] = true;
});

window.addEventListener("keyup", function(event) {
  keys[event.key] = false;
});

// Move player
function movePlayer() {
  if (keys["ArrowUp"] || keys["w"]) {
    player.y -= player.speed;
  }

  if (keys["ArrowDown"] || keys["s"]) {
    player.y += player.speed;
  }

  if (keys["ArrowLeft"] || keys["a"]) {
    player.x -= player.speed;
  }

  if (keys["ArrowRight"] || keys["d"]) {
    player.x += player.speed;
  }

  // Keep player inside canvas
  if (player.x < 0) player.x = 0;
  if (player.y < 0) player.y = 0;
  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
  }
}

// Draw player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Clear screen
function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Main game loop
function gameLoop() {
  clearScreen();
  movePlayer();
  drawPlayer();

  requestAnimationFrame(gameLoop);
}

gameLoop();