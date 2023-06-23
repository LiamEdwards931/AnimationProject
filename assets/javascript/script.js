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
//
let gameFrame = 0;
// this value changes to speed up or slow down animation (higher number = slower animation)
let staggerFrame = 5;
/**
 * Animates the main "dog character"
 */
function animate(){
    ctx.clearRect(0, 0, canvas_Width, canvas_Height);
    // code below uses integers to calculate the frame - value 6 changes based on how many sprites are in the row.
    let position = Math.floor(gameFrame/staggerFrame) % 6;
    frameX = spriteWidth * position;
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) - (image src variable, sx&y position of crop, sw & sh width and height of crop tool, d's are the same but for the cropped image)
    ctx.drawImage(playerImage, frameX, frameY * spriteHeight , spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++
    requestAnimationFrame(animate);
};
animate();

