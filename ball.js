// Ball object
const ball = {
    x: canvas.width / 2, // Start in the middle of the game
    y: canvas.height / 2,
    width: grid,
    height: grid,
    resetting: false, // Keep track of when the ball needs to reset its position
    dx: ballSpeed, // Ball velocity (start going to the top-right corner)
    dy: -ballSpeed
  };

