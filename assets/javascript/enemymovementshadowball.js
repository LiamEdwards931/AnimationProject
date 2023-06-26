/** @type{HTMLCanvasElement}; */
const canvas = document.getElementById('canvas3');
const ctx = canvas.getContext('2d');
canvasWidth = canvas.width = 500;
canvasHeight = canvas.height = 1000;

//variable number of enemies + array to hold them.
const numberOfEnemies = 70;
const enemyArray = [];

//Variable to control the animation speed
let gameFrame = 10;

//Create class for all enemies that will be created, random spawn points with Math.random();
class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'assets/enemyimages/enemy4.png';
        this.spriteWidth = 213; // spritesheet width/ sprite rows
        this.spriteHeight = 213; // spritesheet height/ sprite columns
        this.width = this.spriteWidth / 2.5;   //use this to scale enemies to a better size.
        this.height = this.spriteHeight / 2.5; //use this to scale the enemies to a better size.
        this.x = Math.random() * (canvasWidth - this.width); // keeps the enemy sprites in the canvas width
        this.y = Math.random() * (canvasHeight - this.height);// keeps the enemy sprites in the canvas height
        this.newX = Math.random() * (canvasWidth - this.width);
        this.newY = Math.random() * (canvasHeight * this.height);
        this.speed = Math.random() * 4 + 1;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 250); // random amounts to divide from the gameFrame to adjust the reset rate of sprites.
       
    }
    update() {
        //this.x = 0;
        //this.y = 0;
        if(gameFrame % this.interval === 0){ // every this.interval of the gameframe the x and y on sprites will reposition
            this.newX = Math.random() * (canvasWidth - this.width);
            this.newY = Math.random() * (canvasHeight - this.height);
        }
        let dx = this.x - this.newX; // gets the distance between  x and new x 
        let dy = this.y - this.newY; // gets this distance between y and new Y
        this.x -= dx/70;
        this.y -= dy/70;
    
       if(this.x + this.width < 0) this.x = canvas.width;
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