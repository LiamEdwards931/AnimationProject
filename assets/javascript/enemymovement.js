/** @type{HTMLCanvasElement}; */
const canvas = document.getElementById('canvas3');
const ctx = canvas.getContext('2d');
canvasWidth = canvas.width = 500;
canvasHeight = canvas.height = 1000;

const enemyImage = new Image();
enemyImage.src = 'assets/enemyimages/enemy1.png'
//variable number of enemies + array to hold them.
const numberOfEnemies = 100;
const enemyArray = [];

//Create class for all enemies that will be created, random spawn points with Math.random();
class Enemy{
    constructor(){
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.spriteWidth = 293; // spritesheet width/ sprite rows
        this.spriteHeight = 153; // spritesheet height/ sprite columns
        this.width = this.spriteWidth / 2.5;   //use this to scale enemies to a better size.
        this.height = this.spriteHeight / 2.5; //use this to scale the enemies to a better size.
        this.speed = Math.random() * 4 - 2
    }
    update(){
        this.x += this.speed;
        this.y += this.speed;
        //animate the sprites
         
    }
    draw(){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(enemyImage, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);//draws the sprite sheet
    }
}   

// loop array to create 100 enemies from the "number of enemies variable and is pushed into the empty "enemyArray" with constructor blueprints.
for(i=0; i<numberOfEnemies; i++){
    enemyArray.push(new Enemy());
}

//function to draw the enemies to the canvas.
function animate(){
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    enemyArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    requestAnimationFrame(animate);
}

animate();