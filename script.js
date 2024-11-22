const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileCount = 20;
const tileSize = canvas.width / tileCount;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let gameOver = false;

// Draw the game
function drawGame() {
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Game Over! Press R to restart", 50, canvas.height / 2);
    return;
  }

  moveSnake();
  if (checkCollision()) {
    gameOver = true;
  }

  clearScreen();
  drawFood();
  drawSnake();
  checkEatFood();

  setTimeout(drawGame, 100);
}

// Clear the canvas
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach(part => {
    ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
  });
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  snake.pop();
}

// Check for collisions
function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

// Draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

// Check if the snake eats food
function checkEatFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    snake.push({});
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
  }
}

// Control the snake
document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
    case "r":
      if (gameOver) resetGame();
      break;
  }
});

// Reset the game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  food = { x: 5, y: 5 };
  gameOver = false;
  drawGame();
}

// Start the game
drawGame();
