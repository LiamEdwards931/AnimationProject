const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvas_Width = canvas.width = 600;
const canvas_Height = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'assets/spritesheets/shadow_dog.png';
//divide sprite sheet pixel width by the columns for width & rows for the height
const spriteWidth = 575;
const spriteHeight = 523;

//variables to change the location of the crop on the spritesheet
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
let staggerFrame = 5;
/**
 * line 1 clears the canvas.
 * line 2 draws the sprite sheet
 * line 3 requests it be drawn over and over.
 */
function animate(){
    ctx.clearRect(0, 0, canvas_Width, canvas_Height);
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight , spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    
    
    //cycles through the columns of the sheet to create the animation
    if(gameFrame % staggerFrame === 0){
        if (frameX < 6) frameX++
        else frameX = 0;
    }
    gameFrame++
    requestAnimationFrame(animate);
};
animate();

//Continue tutorial from 19:51.