/** @type{HTMLCanvasElement}; */
const canvas = document.getElementById('canvas3');
const ctx = canvas.getContext('2d');
canvasWidth = canvas.width = 500;
canvasHeight = canvas.height = 1000;

//variable number of enemies + array to hold them.
const numberOfEnemies = 50;
const enemyArray = [];

//Variable to control the animation speed
let gameFrame = 5;

//Create class for all enemies that will be created, random spawn points with Math.random();
class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'assets/enemyimages/enemy1.png';
        this.spriteWidth = 293; // spritesheet width/ sprite rows
        this.spriteHeight = 153; // spritesheet height/ sprite columns
        this.width = this.spriteWidth / 2.5;   //use this to scale enemies to a better size.
        this.height = this.spriteHeight / 2.5; //use this to scale the enemies to a better size.
        this.x = Math.random() * (canvasWidth - this.width); // keeps the enemy sprites in the canvas width
        this.y = Math.random() * (canvasHeight - this.height);// keeps the enemy sprites in the canvas height
        this.speed = Math.random() * 4 - 2;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }
    update() {
        this.x += Math.random() * 5 -2.5;
        this.y += Math.random() * 5 -2.5;
        //animate the sprites
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }

    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);//draws the sprite sheet
    }
}

// loop array to create 100 enemies from the "number of enemies variable and is pushed into the empty "enemyArray" with constructor blueprints.
for (i = 0; i < numberOfEnemies; i++) {
    enemyArray.push(new Enemy());
}

//function to draw the enemies to the canvas.
function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    enemyArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();