var play=1;

var end=0;

var gameState="play";

var sword,swordImage,gameOverImage;

var knifeSwooshSound, gameoverSound;


function preload(){
   
 swordImage=loadImage("sword.png");
  
 fruit1=loadImage("fruit1.png");
  
 fruit2=loadImage("fruit2.png");
  
 fruit3=loadImage("fruit3.png");
  
 fruit4=loadImage("fruit4.png");
  
 alienImage=loadAnimation("alien1.png","alien2.png");
  
 gameOverImage=loadImage("gameover.png");
  
 knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  
 gameoverSound = loadSound("gameover.mp3")
  
}
function setup(){
  
  createCanvas(600,300)
  sword=createSprite(300,200,20,30);
  sword.addImage(swordImage);
  sword.setCollider("rectangle",30,-20,30,60);
  sword.debug = false;
  
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  score=0;
}
function draw(){
  
 textSize(25);
 textFont("Gabriola");
 text("Score = "+score,500, 30);
  
  
 if (gameState==="play"){
   background("lightgreen");
   sword.y=World.mouseY;
   sword.x=World.mouseX  ;
   fruits();
   enemy();
   
 if (fruitGroup.isTouching(sword)){
   fruitGroup.destroyEach();
   knifeSwooshSound.play();
   score=score+2;
      
 }else if(enemyGroup.isTouching(sword)){
   gameState="end";
   fruitGroup.destroyEach();
   enemyGroup.destroyEach();
   fruitGroup.setVelocityXEach(0);
   enemyGroup.setVelocityXEach(0);
   sword.addImage(gameOverImage);
   sword.x=300;
   sword.y=150;
   sword.scale = 1.7;
   gameoverSound.play();
   background ("blue");
   }  
       
}
  drawSprites();

}



function fruits(){
  if (frameCount%80===0){
   fruit=createSprite(600,250,40,30);
   fruit.velocityX=-3;
   var r=Math.round(random(1,4))
    if (r===1){
       fruit.addImage(fruit1);
    }else if(r===2){
       fruit.addImage(fruit2);
    }else if(r===3){
       fruit.addImage(fruit3);
    }else if(r===4){
       fruit.addImage(fruit4);
    }
   fruit.y=Math.round(random(50,300));
   fruitGroup.add(fruit);
   fruit.scale=0.2;
      }
  
}
function enemy(){
  if (frameCount%200===0){
    alien=createSprite(600,100,30,30);
    alien.addAnimation("alien1",alienImage);
    alien.velocityX=-5;
    alien.y=Math.round(random(90,300));
    enemyGroup.add(alien);
      
      }
  
}
