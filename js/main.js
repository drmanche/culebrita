//Obtiene canvas y canvas context del html
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

//Inicializa las variables de la serpiente y la comida
var snake = [{x: -10, y: 0}];
var food = {x: (Math.floor(Math.random() * (canvas.width/10 - 1)) * 10), y: (Math.floor(Math.random() * (canvas.width/10 - 1)) * 10)};

//Inicializa las variables de direccion
var dx = 10;
var dy = 0;

//Inicializa la variable score
var score = 0;

//Inicializa el gameLoop
var gameLoop = setInterval(update,50);

//Permite saber cuando quiero cambiar de direccion la serpiente
document.addEventListener("keydown", changeDirection);

//Cambia la direccion de la culebra
function changeDirection(event) {
  if(event.code === "ArrowLeft" && dx === 0) {
    dx = -10;
    dy = 0;
  }
  else if(event.code === "ArrowUp" && dy === 0) {
    dy = -10;
    dx = 0;
  }
  else if(event.code === "ArrowRight" && dx === 0) {
    dx = 10;
    dy = 0;
  }
  else if(event.code === "ArrowDown" && dy === 0) {
    dy = 10;
    dx = 0;
  }
}

//Funcion para saber cuando la serpiente come
function eatFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      // Agrega un nuevo elemento a la lista serpiente
      var tail = {x: snake[snake.length - 1].x, y: snake[snake.length - 1].y};
      snake.push(tail);
      //Mueve la comida a una posicion aleatoria
      food.x = Math.floor(Math.random() * (canvas.width/10 - 1)) * 10;
      food.y = Math.floor(Math.random() * (canvas.height/10 - 1)) * 10;
      score++;
      document.getElementById("score").innerHTML = score;
    }
  }

//Funcion que verifica colision con paredes
function checkCollision() {
    if (snake[0].x < 0 || snake[0].x > canvas.width - 10 || snake[0].y < 0 || snake[0].y > canvas.height - 10) {
      // Activa la colision con paredes
      clearInterval(gameLoop);
    }
}

//Funcion que mueve la serpiente y actualiza el canvas
function update() {
  //Mueve la serpiente en dx y dy
  var head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  //Invoca la funcion eatFood() y checkCollision()
  eatFood()
  checkCollision();

  //Borra el ultimo elemento de la serpiente
  snake.pop();

  //Limpia el canvas
  ctx.clearRect(0, 0, canvas.width=650, canvas.height=650);

  //Color de la cabeza
  ctx.fillStyle = "black";
  ctx.fillRect(snake[0].x, snake[0].y, 10, 10);

  //Dibuja la serpiente y la comida
  for(var i = 1; i < snake.length; i++) {
    ctx.fillStyle = "#3c3c3c";
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
  ctx.fillStyle = "#3c3c3c";
  ctx.fillRect(food.x, food.y, 10, 10);
}

//Funcion para refrescar
function reload(){
    window.location.reload();
}
