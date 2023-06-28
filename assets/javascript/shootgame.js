const canvas = document.getElementById('canvas5');
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextRaven = 0; //This works with the timestamp in the animate function to check when to push the next raven by checking how many ms between raven frames
let ravenInterval = 1000; // variable for ms between spawn times.
let lastTime = 0;

let ravens = [];

class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.width = this.spriteWidth * this.sizeModifier; // spritesheet width;
        this.height = this.spriteHeight * this.sizeModifier; // spritesheet Height.
        this.sizeModifier = Math.random() * 0.6 + 0.4; // variable to change the size of the sprites
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height); // creates raven at random y co-ordinates on the page
        this.directionX = Math.random() * 5 + 3; // Move speed of the ravens
        this.directionY = Math.random() * 5 - 2.5; // bounces of ravens
        this.image = new Image();
        this.image.src = "assets/enemyimages/raven.png";
        this.markForDelete = false;
        this.frame = 0;
    }
    update() {
        this.x -= this.directionX;
        if (this.x < 0 - this.width) this.markForDelete = true; // if position is less than 0 set value to true so can be removed in the filter in animate.
    }
    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
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
    [...ravens].forEach(object => object.update());
    [...ravens].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.markForDelete);
    requestAnimationFrame(animate);
}

animate(0); // the 0 is here because timestamp needs a starting value to run the IF correctly otherwise it starts as undefined.