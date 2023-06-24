// constant canvas structure
const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');
const canvas_Width = canvas.width = 800;
const canvas_Height = canvas.height = 700;
//game speed variable
let gameSpeed = 3;

//get your background images for the canvas
const backgroundLayer1 = new Image();
backgroundLayer1.src = "assets/backgroundimages/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "assets/backgroundimages/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "assets/backgroundimages/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "assets/backgroundimages/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "assets/backgroundimages/layer-5.png";

//slider for html
const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', function(e){
    console.log(e);
    gameSpeed = e.target.value;
}
//create a class for the object properties to be called when they need to be changed using "this" in a constructor. aka 'blueprint' for layers
class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        //all speed modifiers will be integers
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}
//gets the background image and constructs the properties
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const layerArray = [layer1, layer2, layer3, layer4, layer5,];

//create a function to run your background images on your canvas
function animate() {
    ctx.clearRect(0, 0, canvas_Width, canvas_Height);
    layerArray.forEach(object => {
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
};

animate();