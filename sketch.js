var ball;
var database;
var pos;

function setup()
{
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();
    console.log(database); 

    var ball_position = database.ref('ball/position');
    ball_position.on("values",readPosition,showError);
}

function draw(){
    background("white");

    if(pos !== undefined)
    {

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
}


/*function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}*/

function showError()
{
    console.log("error in reading data from the db");
}

function readPosition(data)
{
  pos = data.val();
  console.log(pos);

  ball.x = pos.x;
  ball.y = pos.y;
}

function writePosition(x,y)
{
    database.ref('ball/position').set({
        'x': pos.x,
        'y': pos.y
    })
}