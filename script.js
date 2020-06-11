let canvas = document.getElementById("snake"); //seleciona a id que utilizamos no html
let pontuacao = document.getElementById("pont"); //seleciona a id que utilizamos no html
let context = canvas.getContext("2d"); //o contexto renderiza o desenho do canvas, aqui o contexto vai passar a tratar o arquivo como um plano 2D
let box= 32;
let snake = []; //a cobra será um conjunto de arrays
//define a posição inicial da cobrinha
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; //começa indo pra direita
let pont=0;

//cria a comida que é gerada aleatoriamente
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//cria o quadrado
function criarBG(){
    context.fillStyle = "black"; //o fillStyle define a cor do quadrado
    context.fillRect(0,0,16*box, 16*box); //o fillRect desenha o quadrado do jogo
}

//Cria a cobra
function criarSnake(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "red"; //a cobra será vermelha
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//faz a comida aparecer
function drawFood(){
    context.fillStyle= "blue";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); //ele pega o evento do clique e chama a função update

function update(event){

    //vê as setas que o usuário pressionou 
    if(event.key === "ArrowLeft" && direction != "right") direction = "left";
    if(event.key === "ArrowUp" && direction != "down") direction = "up";
    if(event.key === "ArrowRight" && direction != "left") direction = "right";
    if(event.key === "ArrowDown" && direction != "up") direction = "down";

}


function iniciarJogo(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y <0  && direction == "up") snake[0].y = 16 * box;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
   
    //define o game over
    for(i=1; i < snake.length; i++)
    {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
           clearInterval(jogo);
           alert('Game Over :('); 
        }
    }

    criarBG(); //chama a função de criar o quadrado
    criarSnake();//chama a função de criar a cobra
    drawFood(); //chama a função de chamar a comida

    let snakeX= snake[0].x;
    let snakeY= snake[0].y;

    //criando as coordenadas da cobrinha
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //se a cobrinha não pegar a comida
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //retira o último elemnto do array para dar a impressão que ela está andando
    }
    //se ela pegar
    else{
        //gera uma nova comida
       food.x= Math.floor(Math.random() * 15 + 1) * box;
       food.y = Math.floor(Math.random() * 15 + 1) * box;
       pontuacao.innerHTML = pont + 1;
       pont++;
    }

    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //acrescenta um quadrado na frente da cobrinha

}

let jogo = setInterval(iniciarJogo, 100); //passa um intervalo de 100milisegundos para iniciar o jogo

