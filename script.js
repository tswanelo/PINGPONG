// Get the canvas and its context
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// Constants for the game
const grid = 15;
const barHeight = grid * 10; // 80
const maxbarY = canvas.height - grid - barHeight;
const barSpeed = 6;
const ballSpeed = 5;





// Check for collision between two objects using axis-aligned bounding box (AABB)
function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}


// Game loop
function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Move bars by their velocity
  leftbar.y += leftbar.dy;
  rightbar.y += rightbar.dy;

  // Prevent bars from going through walls
  leftbar.y = Math.max(grid, Math.min(leftbar.y, maxbarY));
  rightbar.y = Math.max(grid, Math.min(rightbar.y, maxbarY));

  // Draw bars
  context.fillStyle = 'white';
  context.fillRect(leftbar.x, leftbar.y, leftbar.width, leftbar.height);
  context.fillRect(rightbar.x, rightbar.y, rightbar.width, rightbar.height);

  // Move ball by its velocity
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Prevent ball from going through walls by changing its velocity
  if (ball.y < grid || ball.y + grid > canvas.height - grid) {
    ball.dy *= -1;
  }

  // Reset ball if it goes past the paddle (but only if we haven't already done so)
  if ((ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
    ball.resetting = true;

    // Give some time for the player to recover before launching the ball again
    setTimeout(() => {
      ball.resetting = false;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
    }, 400);
  }


  // Check to see if the ball collides with a paddle. If they do, change the x velocity
  if (collides(ball, leftbar)) {
    ball.dx *= -1;
    ball.x = leftbar.x + leftbar.width; // Move ball next to the paddle to avoid repeated collision
  } else if (collides(ball, rightbar)) {
    ball.dx *= -1;
    ball.x = rightbar.x - ball.width; // Move ball next to the paddle to avoid repeated collision
  }

  // Draw ball
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // Draw walls
  context.fillStyle = 'lightgrey';
  context.fillRect(0, 0, canvas.width, grid);
  context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

  // Draw dotted line down the middle
  for (let i = grid; i < canvas.height - grid; i += grid * 2) {
    context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
  }
}

// Listen to keyboard events to move the paddles
document.addEventListener('keydown', function (e) {
  // Up arrow key
  if (e.which === 38) {
    rightbar.dy = -barSpeed;
  }
  // Down arrow key
  else if (e.which === 40) {
    rightbar.dy = barSpeed;
  }

  // W key
  if (e.which === 87) {
    leftbar.dy = -barSpeed;
  }
  // A key
  else if (e.which === 83) {
    leftbar.dy = barSpeed;
  }
});

// Listen to keyboard events to stop the paddle if the key is released
document.addEventListener('keyup', function (e) {
  if (e.which === 38 || e.which === 40) {
    rightbar.dy = 0;
  }

  if (e.which === 83 || e.which === 87) {
    leftbar.dy = 0;
  }
});

// Start the game
requestAnimationFrame(loop);