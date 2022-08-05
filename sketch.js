var spaceShip;
var spaceShipImage;
var bg,bgImage;
var astronaut,astronautImage,astronautGroup;
var asteroid,asteroidImage,asteroidGroup;
var explosionImg;
var gameover,gameoverImg;
var bgSound;
var beepSound;
var blastSound;
var gameState="play"
var score=0;      

function preload(){
    spaceShipImage=loadImage("./spaceship.png")
    bgImage=loadImage("./spaceBG.jpg")
    astronautImage=loadImage("./Astronaut.png")
    asteroidImage=loadImage("./Asteroid.png")
    explosionImg=loadImage("./explosion.png")
    gameoverImg=loadImage("./gameover.png")
    bgSound=loadSound("./bg-music.mp3")
    blastSound=loadSound("./Blast.mp3")
    beepSound=loadSound("./Beep.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  bg=createSprite(width/2,height/2,width,height);
  bg.addImage(bgImage);
  bg.velocityY=4

  spaceShip=createSprite(width/2,height-200);
  spaceShip.addImage("spaceShip",spaceShipImage);
  spaceShip.addImage("explosion",explosionImg);
  spaceShip.scale=0.5
  spaceShip.debug=false
  spaceShip.setCollider("circle",0,0,200)

  gameover=createSprite(width/2,height/2);
  gameover.addImage(gameoverImg);
  gameover.visible=false;

  astronautGroup=new Group()
  asteroidGroup=new Group()
  bgSound.play()
  bgSound.loop()

  
}

function draw() {
  if (gameState === "play"){
    if (bg.y>height){
      bg.y=height/2
    }
  
    if (keyDown("left")&& spaceShip.x>0 && gameState === "play"){
      spaceShip.x-=15
  
    }
  
    if (keyDown("right")&& spaceShip.x<width && gameState === "play"){
      spaceShip.x+=15
  
    }
  
    if (spaceShip.isTouching(astronautGroup)){
      for(var i=0; i<astronautGroup.length; i++){
        if(spaceShip.isTouching(astronautGroup[i])){
          astronautGroup[i].destroy()
          beepSound.play()
        }
      }
      score+=10
    }
  
    if (spaceShip.isTouching(asteroidGroup)){
      spaceShip.changeImage("explosion")
      bg.velocityY=0
      astronautGroup.setVelocityYEach(0)
      asteroidGroup.setVelocityYEach(0)
      gameState="end"
      gameover.visible=true;
      blastSound.play()
    }
  
    spawnAstronaut()
    spawnAsteroid()

  }
  
  drawSprites()
  fill("white")
  textSize(30)
  text("Score : "+score,width/3-500,50)
  text("Please Save The Astronauts!",width/2-200,50)
 
}


function spawnAstronaut(){
    var randomFrames=Math.round(random(100,200));
    if (frameCount%randomFrames==0){ 
        astronaut=createSprite(random(100,width-100),-50)
        astronaut.addImage(astronautImage)
        astronaut.velocityY=2;
        astronaut.lifetime=height/2
        astronaut.scale=0.2;
        astronautGroup.add(astronaut)
    }
    
}

function spawnAsteroid(){
  var randomFrames=Math.round(random(100,200));
  if (frameCount%randomFrames==0){ 
      asteroid=createSprite(random(100,width-100),-50)
      asteroid.addImage(asteroidImage)
      asteroid.velocityY=4;
      asteroid.lifetime=height/4
      asteroid.scale=0.2;
      asteroidGroup.add(asteroid)
  }
}

