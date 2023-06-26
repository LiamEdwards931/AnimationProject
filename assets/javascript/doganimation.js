let playerState = "idle";
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function (e) {
    playerState = e.target.value;
});
//create the canvas and set it's context to 2D
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvas_Width = canvas.width = 600;
const canvas_Height = canvas.height = 600;
//import the spritesheet
const playerImage = new Image();
playerImage.src = 'assets/spritesheets/shadow_dog.png';
//divide sprite sheet pixel width by the columns for width & rows for the height
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
// this value changes to speed up or slow down animation (higher number = slower animation)
let staggerFrame = 8;
// array to store the animation frames
const spriteAnimation = [];
//array of objects containing the animation types
const animationState = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'sprint',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 10,
    },
    {
        name: 'lieDown',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 10,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];

/**
 * Names each object 'state' and gets it's index, each one is bumped by one with the 'a++'
 * pushes the calculated positions back into the frames.loc array and adds to the objects
 * gives the spriteAnimation variable the value of the objects in the frames Array.
 */
animationState.forEach((state, index) => {
    let frames = {
        loc: [],
    };
    for (let a = 0; a < state.frames; a++) {
        let positionX = a * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimation[state.name] = frames;
});
console.log(spriteAnimation);
/**
 * Animates the main "dog character"
 */
function animate() {
    ctx.clearRect(0, 0, canvas_Width, canvas_Height);
    // code below uses integers to calculate the frame - value 6 changes based on how many sprites are in the row.
    let position = Math.floor(gameFrame / staggerFrame) % spriteAnimation[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimation[playerState].loc[position].y;

    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) - (image src variable, sx&y position of crop, sw & sh width and height of crop tool, d's are the same but for the cropped image)
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
};
animate();

