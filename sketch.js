var trex;
var ground;
var invisibleground;
var trexAnimation,groundImg,trexDeadAnimation,cloudImg;
var cloudGroup;
var obsGroup;
var count=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg;
var restartImg;
var gameOver;
var restart;
var obsImg1,obsImg2,obsImg3,obsImg4,obsImg5,obsImg6;

var jumpSound,scoreSound,deadSound;

function preload(){
  trexAnimation=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  groundImg=loadImage("ground2.png");
  
  trexDeadAnimation=loadAnimation("trex_collided.png");
  cloudImg=loadImage("cloud.png");
  
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  
  obsImg1=loadImage("obstacle1.png");
  obsImg2=loadImage("obstacle2.png");
  obsImg3=loadImage("obstacle3.png");
  obsImg4=loadImage("obstacle4.png");
  obsImg5=loadImage("obstacle5.png");
  obsImg6=loadImage("obstacle6.png");
  
  //jumpSound=loadSound("jump.mp3");
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(40,170);
  trex.scale=0.6;
  trex.addAnimation("trex walking",trexAnimation);
  trex.addAnimation("dead trex",trexDeadAnimation);
  
  ground=createSprite(300,180);
  
  ground.addImage("ground image",groundImg);
  
  invisibleground=createSprite(300,195,600,20);
  invisibleground.visible=false;
  
  cloudGroup=new Group();
  obsGroup=new Group();
  
  gameOver=createSprite(300,100);
  gameOver.addImage("game Image",gameOverImg);
  
  
  restart=createSprite(300,150);
  restart.addImage("restart Image",restartImg);
  restart.scale=0.5;
}

function draw() {
  background(180);
 
  if(gameState===PLAY){
  
  
  if(keyDown("space")&& trex.y > 120){
    trex.velocityY=-10;
    //jumpSound.play();
    
  }
  if(World.frameCount % 35 ===0){
  count++; }
    
    ground.velocityX=-3;
  trex.velocityY+=0.8;
  trex.collide(invisibleground);
  
if(ground.x <0){
  ground.x=ground.width/2;
}
    spawnClouds();
  spawnobs();
    
    
    if(obsGroup.isTouching(trex)){
      gameState = END;
     // playSound("die.mp3");
    }
    
    gameOver.visible=false;
    restart.visible=false;
  
  }
  
  else if(gameState===END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    obsGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.scale=0.5;
    trex.changeAnimation("dead trex");
     obsGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    
    if(mousePressedOver(restart)){
       reset();
      cloudGroup.destroyEach();
      obsGroup.destroyEach();
      trex.changeAnimation("trex walking");
      count=0;
      
       }
  }
  
  
  drawSprites();
  
  stroke ("white");
textSize (15);
  textFont("Arial Black");
  text ("Score: "+count,500,20); 

}

   
  


function spawnClouds(){
  if(frameCount% 60 ===0){
  var cloud = createSprite(600,100,20,20);
  cloud.addImage("cloud",cloudImg);
  cloud.scale=0.5;
  cloud.velocityX=-5;
  cloud.y=random(100,130);
  cloud.lifetime=124;
  cloud.depth=trex.depth;
    trex.depth++;
    cloudGroup.add(cloud);
  }
}

function spawnobs(){
  if(frameCount% 90 ===0){
  var obstacles = createSprite(600,165,20,20);
    
    var number=Math.round(random(1,6));
    //console.log(number);
    //decision making- switch
    
    switch(number){
      case 1: obstacles.addImage(obsImg1);
        break;
      case 2:obstacles.addImage(obsImg2);
        break;
      case 3:obstacles.addImage(obsImg3);
        break;
      case 4:obstacles.addImage(obsImg4);
        break;
      case 5:obstacles.addImage(obsImg5);
        break;
      case 6:obstacles.addImage(obsImg6);
        break;
        default:break; 
    }
    obstacles.scale=0.5;
    
    
    
    
  //obstacles.addImage("cloud",cloudImg);
  // obstacles.scale=0.5;
  obstacles.velocityX=-5;
  //obstacles.y=random(100,130);
  obstacles.lifetime=124;
  //obstacles.depth=trex.depth;
   // trex.depth++;
    obsGroup.add(obstacles);
  }
}

function reset(){
 gameState=PLAY;
  
}


