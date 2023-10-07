var backgroundImg
var basketImg,brokenEggImg,chickenImg,eggImg,logImg
var gameState
var form
var player1,player2

function preload(){

 backgroundImg=loadImage("../Assets/bg8.jpg")
 basketImg=loadImage("../Assets/Basket.png") 
 brokenEggImg=loadImage("../Assets/Broken egg.png")
 chickenImg=loadImage("../Assets/Chicken.png")
 eggImg=loadImage("../Assets/Egg.png")
 logImg=loadImage("../Assets/log.png")
}
function setup() {
  createCanvas(1200, 800);

  database = firebase.database();
  form = new Form();
  gameState = 0;
  playerCount = 0; // Initialize playerCount if needed
  player = null; // Initialize player if needed

  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImg);
  //form=new Form()
  //form.display()
  
  if(playerCount===2){
   game.update(1)
  }

  if(gameState===1){
    clear()
    game.play()

  }

  if(gameState===2){
    console.log("game has ended")
  }
}