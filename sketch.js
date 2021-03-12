var balloon;
var database;
var backIg,position;
var bIg



function preload() {

  backIg = loadImage("cityImage.png")

  bIg = loadAnimation("HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-03.png")
}

function setup() {
  database = firebase.database();

  createCanvas(800,400);

  balloon = createSprite(100, 350, 50, 50);
  balloon.addAnimation("ballooon",bIg);
  balloon.scale = 0.5;

  var ballposition = database.ref('balloon/position');
    ballposition.on("value", readPosition, showError);

}


function draw() {
  background(backIg); 

  text("use arrow keys",50,50);
  
  if(keyDown(LEFT_ARROW)){
    updateHeight(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(1,0);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+1);
  } 

  drawSprites();


}

function updateHeight(x,y){
  database.ref('balloon/position').set(
{ 'x': position.x + x,
  'y': position.y + y
}
) 
}

function readPosition(data){

  position=data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}