const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 15;
const paddleHeight = grid * 10; //
const maxPaddleY = canvas.height - grid - paddleHeight;

const paddleSpeed = 6;
const ballSpeed = 5;


// check for collision between two objects using axis-aligned bounding box (AABB)
function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// game loop
function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0,0,canvas.width,canvas.height);

  // move paddles by their velocity
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;

  // prevent paddles from going through walls
  if (leftPaddle.y < grid) {
    leftPaddle.y = grid;
  }
  else if (leftPaddle.y > maxPaddleY) {
    leftPaddle.y = maxPaddleY;
  }

  if (rightPaddle.y < grid) {
    rightPaddle.y = grid;
  }
  else if (rightPaddle.y > maxPaddleY) {
    rightPaddle.y = maxPaddleY;
  }

  // draw paddles
  context.fillStyle = 'white';
  context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

  // move ball by its velocity
  ball.x += ball.dx;
  ball.y += ball.dy;

  // prevent ball from going through walls by changing its velocity
  if (ball.y < grid) {
    ball.y = grid;
    ball.dy *= -1;
  }
  else if (ball.y + grid > canvas.height - grid) {
    ball.y = canvas.height - grid * 2;
    ball.dy *= -1;
  }

  // reset ball if it goes past paddle (but only if we haven't already done so)
  if ((ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
    ball.resetting = true;

    // give some time for the player to recover before launching the ball again
    setTimeout(() => {
      ball.resetting = false;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
    }, 400);
  }

  // check to see if ball collides with paddle. if they do change x velocity
  if (collides(ball, leftPaddle)) {
    ball.dx *= -1;

    // move ball next to the paddle otherwise the collision will happen again
    // in the next frame
    ball.x = leftPaddle.x + leftPaddle.width;

    // increase left paddle's score
    leftPaddle.score += 1;
  }
  else if (collides(ball, rightPaddle)) {
    ball.dx *= -1;

    // move ball next to the paddle otherwise the collision will happen again
    // in the next frame
    ball.x = rightPaddle.x - ball.width;

    // increase right paddle's score
    rightPaddle.score += 1;
  }

  // draw ball
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // draw walls
  context.fillStyle = 'lightgrey';
  context.fillRect(0, 0, canvas.width, grid);
  context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

  // draw dotted line down the middle
  for (let i = grid; i < canvas.height - grid; i += grid * 2) {
    context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
  }

  // check if the game is won
  if (leftPaddle.score >= 5) {
    alert("Left paddle wins!");
    leftPaddle.score = 0;
    rightPaddle.score = 0;
  } else if (rightPaddle.score >= 5) {
    alert("Right paddle wins!");
    leftPaddle.score = 0;
    rightPaddle.score = 0;
  }

  // display the scores
  context.fillStyle = 'black';
  context.font = '20px Arial';
  context.fillText('Score: ' + leftPaddle.score, grid, 20);
  context.fillText('Score: ' + rightPaddle.score, canvas.width - grid * 7, 20);
}

// start the game
requestAnimationFrame(loop);