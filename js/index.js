window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  const player = {
    x: 250,
    y: 600,
    w: 40,
    h: 80,
  };

  const obstacle = {
    x: 200,
    y: 0,
    w: 140,
    h: 20,
    score: 0,
  };

  class Obstacle {
    constructor() {
      this.x = Math.random() * 400;
      this.y = 0;
      this.w = Math.random() * 300;
      this.h = 20;
    }
  }
  let obstacleArr = [];
  player.score = 0;

  function addObstacle() {
    obstacleArr.push(new Obstacle());
    // player.score++;
    console.log(player.score);
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 700;
  const h = canvas.height;
  const w = canvas.width;
  const car = new Image();
  car.src = "images/car.png";
  car.onload = function () {
    ctx.drawImage(car, player.x, player.y, player.w, player.h);
  };

  //This variable is the reference for how we stop adding blocks to the array when the game ends
  let int;

  //This gets called when the "StartGame" button is pressed
  function startGame() {
    console.log("START");
    int = setInterval(addObstacle, 2000);
    animate();
  }

  ctx.fillStyle = "maroon";

  //This variable is the reference to the animation loop. This is called to cease animations when the game ends
  let game;

  function animate() {
    game = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.fillText(`Score: ${player.score}`, 70, 30);
    ctx.drawImage(car, player.x, player.y, player.w, player.h);
    //draw obstacle

    ctx.fillStyle = "maroon";
    for (let i = 0; i < obstacleArr.length; i++) {
      ctx.fillRect(
        obstacleArr[i].x,
        obstacleArr[i].y,
        obstacleArr[i].w,
        obstacleArr[i].h
      );
      // obstacleArr[i].y += 10;
      obstacleArr[i].y += 4;
      //this will evaluate to true or false
      let didCollide = detectCollision(player, obstacleArr[i]);
      if (didCollide) {
        gameOver();
        break;
      }
    }
    player.score++;
  }

  function gameOver() {
    console.log("You Dead Boi");
    window.cancelAnimationFrame(game);
    clearInterval(int);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "red";
    ctx.font = "50px sans-serif";
    ctx.fillText("GAME OVER", 100, 100);
    ctx.fillStyle = "white";
    ctx.font = "22px sans-serif";
    ctx.fillText(`You Dead Boi, Final Score: ${player.score}`, 100, 300);
  }

  function move(e) {
    switch (e.key) {
      case "ArrowLeft":
        if (player.x - 10 < 0) {
          player.x = 0;
        } else {
          player.x -= 15;
        }
        break;
      case "ArrowRight":
        if (player.x + player.w + 10 > w) {
          player.x = w - player.w;
        } else {
          player.x += 15;
        }
        break;
    }
  }
  document.addEventListener("keydown", move);
  function detectCollision(player, obj) {
    if (
      player.x < obj.x + obj.w &&
      player.x + player.w > obj.x &&
      player.y < obj.y + obj.h &&
      player.y + player.h > obj.y
    ) {
      return true;
    } else {
      return false;
    }
  }
};