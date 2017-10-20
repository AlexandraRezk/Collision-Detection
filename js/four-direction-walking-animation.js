//canvas set up
var canvasWidth = 650;
var canvasHeight = 350;
//width and height of spritesheet
var spriteWidth = 576;
var spriteHeight = 256;
//Number of rows and columns in current spritesheet
var rows = 4;
var cols = 9;
//Tracking Sprite Direction on Sheet
var trackUp = 0;
var trackLeft = 1;
var trackDown = 2;
var trackRight = 3;
//Width of single sprite is width of spritesheet divided by number of columns
var width = spriteWidth/cols;
//Height of single sprite is height of spritesheet divided by number of rows
var height = spriteHeight/rows;
//First frame of each row
var currentFrame = 0;
//Total number of frams
var frameCount = 9;
//x and y coordinates to render the sprite on the canvas
var x = 0;
var y = 0;
//x and y coordinates for the sprite frame from the spritesheet
var srcX = 0;
var srcY = 0;
//tracking the character movement
var left = false;
var right = false;
var up = false;
var down = false;
//Speed of movement
var speed = 12;

//Getting the canvas
var canvas = document.getElementById('canvas');
//Setting width and height of the canvas
canvas.width = canvasWidth;
canvas.height = canvasHeight;
//Establishing a context to the canvas
var ctx = canvas.getContext("2d");
//Creating an Image object for character
var character = new Image();
//Setting the source to the iamge file
character.src ="images/professor_walk_cycle_no_hat.png";

//Even Listners for mouse and arrow key controls
			document.addEventListener("keydown", keyDownHandler, false);
			document.addEventListener("keyup", keyUpHandler, false);

//detects when the arrow keys are pressed
function keyDownHandler(e) {
				if (e.keyCode == 39){
					right = true;
				}
				else if(e.keyCode == 37){
					left = true;
				}
                else if (e.keyCode == 38){
                    up = true;
                }
                else if (e.keyCode == 40){
                    down = true;
                }
			}
function keyUpHandler(e){
				if(e.keyCode == 39) {
					right = false;
				}
				else if(e.keyCode == 37){
					left = false;
				}
                else if (e.keyCode == 38){
                    up = false;
                }
                else if (e.keyCode == 40){
                    down = false;
                }
			}

function updateFrame(){
    //Updates the frame index
    currentFrame = ++currentFrame % frameCount;
    //Calculating the x coordinate for spritesheet
    srcX = currentFrame * width;
    ctx.clearRect(x, y, width, height);
    
    if(!left && !right && !up && !down){
        srcY = trackUp * height;
       x == speed;
    } 
    //if left is true and the character has not reached the left edge
    if(left && x > 0){
        //Calculate srcY
        srcY = trackLeft*height;
        //decreasing the x coordinate
        x -= speed;
    }
    //if the right is true and the characher has not reached the right edge
    if(right && x < canvasWidth - width){
        //calculate srcY
        srcY = trackRight * height;
        //increase the speed
        x += speed;
    }
    //if down is true and the character has not reached the bottom edge
    if(down && y < canvasHeight - height){
        //calculate srcX
        srcY = trackDown * height;
        //increase the speed
        y += speed;
    }
    //if up is true and the character has not reached the upper edge
    if(up && y > 0 ){
        //calculate srcX
        srcY = trackUp * height;
        //decrease speed
        y -= speed;
    }
     if(x < 200 && x + width > 100 && y < 350 && height + y > 250){
        alert("You've made a collision!");
    }
}

function drawSquare(){
				ctx.beginPath();
				ctx.rect(100, 250, 100, 100);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
function draw() {
    //Updating the frame
    updateFrame();
     drawSquare();
    //Draw the image
    ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
   
}

setInterval(draw, 100);