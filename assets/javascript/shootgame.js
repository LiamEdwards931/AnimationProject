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
let gameOver = false; // variable for triggering gameOver

//font for the score
ctx.font = '50px Imperial';
//Raven Code
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
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]; // gives random RGB values
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')'; //adds the 3 colors by index and creates a string
        this.hasTrail = Math.random() > 0.5;
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
            if (this.hasTrail) {
                for (let i = 0; i < 5; i++) { // adds 5 trails of particles with a for loop.
                    particles.push(new Particle(this.x, this.y, this.width, this.color));
                }

            };
        }
        if (this.x < 0 - this.width) gameOver = true; // if bird makes it to 0 co-ordinate of x gameOver will be true
    }
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height); // draws colored rectangles around the sprites for hitbox purposes
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
//explosion code
let explosions = [];
class Explosion {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = 'assets/spritesheets/boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = 'assets/sfx/Ice attack 2.wav';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 250; //animation speed of the explosion
        this.markForDelete = false;
    }
    // animates the explosons + plays sound when frame hits 0;
    update(deltatime) {
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
        }
        //deletes the explosion on frame 5
        if (this.frame > 5) this.markForDelete = true;
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.size, this.size);
    }
}
// create a trail of color behind each raven.
let particles = [];
class Particle {
    constructor(x, y, size, color) {
        this.size = size;
        this.x = x + this.size / 2; // positions the particle trail horizontal
        this.y = y + this.size / 3;
        this.radius = Math.random() * this.size / 10; // particle radius 
        this.maxRadius = Math.random() * 20 + 35; // maximum radius of the particles
        this.markForDelete = false; // deletes the particle if true
        this.speedX = Math.random() * 1 + 0.3; // speed of particles
        this.color = color; // color variable will be set by raven class
    }
    update() {
        this.x += this.speedX;
        this.radius += 0.5; // adds smaller particles into bigger radius
        if (this.radius > this.maxRadius - 5) { // will delete particles if they exceed the max particle radius 
            this.markForDelete = true;
        }
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = 1 - this.radius / this.maxRadius; // trails the particles from opaque to transparent
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
/**
 * Draws the scores for the game
 */
function drawScore() {
    ctx.textAlign = 'left';
    ctx.fillStyle = 'black';
    ctx.fillText('Score:' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score:' + score, 53, 78);
}

function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('Game Over, You Scored:' + score, canvas.width / 2, canvas.height / 2);
    ctx.fillText('click to restart', canvas.width / 2, canvas.height / 3);
    ctx.fillStyle = 'white';
    ctx.fillText('Game Over, You Scored:' + score, canvas.width / 2, canvas.height / 2 + 3);
    ctx.fillText('click to restart', canvas.width / 2, canvas.height / 3 + 3);
}

window.addEventListener('click', function (e) {
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    const pc = detectPixelColor.data;
    console.log(detectPixelColor);
    ravens.forEach(object => {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
            object.markForDelete = true;
            score++;
            explosions.push(new Explosion(object.x, object.y, object.width));
            console.log(explosions);
        } else if (gameOver) {
            restartGame();
        }

    });
});
/**
 * Restarts the game
 */
function restartGame() {
    gameOver = false;
    ravens = [];
    score = 0;
    animate(0);
};

/**
 * 
 * Function that continuously loops ravens on to the screen and deletes the ones that leave the screen.
 */
function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function (a, b) {
            return a.width - b.width; // sorts the ravens into size in the array;
        });
    }
    drawScore();
    [...particles, ...ravens, ...explosions].forEach(object => object.update(deltatime)); // calls each object
    [...particles, ...ravens, ...explosions].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.markForDelete);
    explosions = explosions.filter(object => !object.markForDelete);
    particles = particles.filter(object => !object.markForDelete);
    if (!gameOver) requestAnimationFrame(animate); // if to check if gameOver is false, if it's true game will end.
    else drawGameOver();

}


animate(0); // the 0 is here because timestamp needs a starting value to run the IF correctly otherwise it starts as undefined.