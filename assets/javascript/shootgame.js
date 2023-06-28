const canvas = document.getElementById('canvas5');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//collision canvas
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0; // variable score that will increase when ravens are hit
ctx.font = '50px Imperial';
let timeToNextRaven = 0; //This works with the timestamp in the animate function to check when to push the next raven by checking how many ms between raven frames
let ravenInterval = 1000; // variable for ms between spawn times.
let lastTime = 0;

let ravens = [];

class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.4; // variable to change the size of the sprites
        this.width = this.spriteWidth * this.sizeModifier; // spritesheet width; - ensure the variable you are '*' is above the code here e.g sizeMod needs to above this to work.
        this.height = this.spriteHeight * this.sizeModifier; // spritesheet Height.
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height); // creates raven at random y co-ordinates on the page
        this.directionX = Math.random() * 5 + 3; // Move speed of the ravens
        this.directionY = Math.random() * 5 - 2.5; // bounces of ravens
        this.image = new Image();
        this.image.src = "assets/enemyimages/raven.png";
        this.markForDelete = false;
        this.frame = 0; // first animation frame for the raven.
        this.maxFrame = 4; //last animation frame for the raven.
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50; // randomises the flapping speeds of the birds. 
        this.randomColors = [];
    }
    update(deltatime) {
        if (this.y < 0 || this.y > canvas.height - this.height) { // if statement to make birds bounce off the top and bottom of screen
            this.directionY = this.directionY * -1;
        }

        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markForDelete = true; // if position is less than 0 set value to true so can be removed in the filter in animate.

        this.timeSinceFlap += deltatime; //unifies flapping speed across all speed devices.

        this.timeSinceFlap += deltatime; //unifies flapping speed across all speed devices. delta time is the time between last frame and current frame.
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0; // resets the loops on the spritesheet to animate.
            else this.frame++;
            this.timeSinceFlap = 0; //resets the flap time back to 0;
        }


    }
    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
/**
 * Draws the scores for the game
 */
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score:' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score:' + score, 53, 78);
}
/**
 * 
 * Function that continuously loops ravens on to the screen and deletes the ones that leave the screen.
 */
function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
    }
    drawScore();
    [...ravens].forEach(object => object.update(deltatime));
    [...ravens].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.markForDelete);
    requestAnimationFrame(animate);
}

animate(0); // the 0 is here because timestamp needs a starting value to run the IF correctly otherwise it starts as undefined.