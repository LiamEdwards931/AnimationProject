const canvas = document.getElementById('canvas4');
const ctx = canvas.getContext('2d');
canvas.height = 500;
canvas.width = 700;
//Calculates the position of the canvas so mouse clicks can be accurate for the boom animation.
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);
//Add variable empty array for a specific animation type 
const explosions = [];
//class constructor for Explosion animation
class Explosion {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7; //keep the values the same for aspect ratio - increases/decreases size of animation
        this.height = this.spriteHeight * 0.7 ;
        this.image = new Image(); // creates new html img elements
        this.image.src = "assets/spritesheets/boom.png";
        this.frame = 0; // amount the spritesheet jumps to the right by for animation
        this.timer = 0; // variable for the animation speed on click.
    }
    update(){
        this.timer++ // increments timer speed
        if(this.timer % 15 === 0){// code for run this every 10 frames - higher number slows the animation speed.
            this.frame++ // increments the spritesheet 
        }
    }
       
    draw(){//multiply this.spriteWidth by this frame to trigger the animation loop
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
// event listener to call the class 'explosion' - offset the x and y to account for margin/padding on the page with the variable above
window.addEventListener('click', function(b){
    let positionX = b.x - canvasPosition.left;
    let positionY = b.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
});
//function for clearing the canvas and calling the explosion array.
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < explosions.length; i++){
        explosions[i].update();
        explosions[i].draw();
    }
    console.log(explosions);
    requestAnimationFrame(animate);
}
animate();