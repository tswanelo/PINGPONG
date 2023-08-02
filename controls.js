// listen to keyboard events to move the paddles
document.addEventListener('keydown', function(e) {
    // up arrow key
    if (e.which === 38) {
      rightPaddle.dy = -paddleSpeed;
    }
    // down arrow key
    else if (e.which === 40) {
      rightPaddle.dy = paddleSpeed;
    }
  
    // w key
    if (e.which === 87) {
      leftPaddle.dy = -paddleSpeed;
    }
    // s key
    else if (e.which === 83) {
      leftPaddle.dy = paddleSpeed;
    }
  });
  
  // listen to keyboard events to stop the paddle if key is released
  document.addEventListener('keyup', function(e) {
    if (e.which === 38 || e.which === 40) {
      rightPaddle.dy = 0;
    }
  
    if (e.which === 83 || e.which === 87) {
      leftPaddle.dy = 0;
    }
  });
  