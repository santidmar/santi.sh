let canvas;
let ctx;

const doggo = {
    x: 0,
    y: 0,
    xSpeed: 1,
    ySpeed: 1,
    image: new Image()
};

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    setCanvasDimensions();

    chooseDog();

    window.onresize = setCanvasDimensions;
    window.requestAnimationFrame(draw);
}

function setCanvasDimensions() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

function chooseDog() {
    const dogs = ['houdini', 'machito', 'atlas', 'cleo'];
    const randomDog = dogs[Math.floor(Math.random() * 4)];

    doggo.name = randomDog;
    document.title = `(っ◔◡◔)っ ♥ ${randomDog} ♥`;
    doggo.image.src = `images/${randomDog}.jpg`;

    doggo.image.onload = () => {
        const scale = 0.4;
        doggo.width = doggo.image.width * scale;
        doggo.height = doggo.image.height * scale;
    }
}

function draw() {
    ctx.drawImage(doggo.image, doggo.x, doggo.y,
                  doggo.width, doggo.height);

    updateDoggoModel();

    window.requestAnimationFrame(draw);
}

function updateDoggoModel() {
    doggo.x += doggo.xSpeed;
    doggo.y += doggo.ySpeed;

    const leftEdge = doggo.x;
    const rightEdge = doggo.x + doggo.width;
    if (leftEdge < 0 || rightEdge >= canvas.width) {
        doggo.xSpeed *= -1;
        doggo.x = (leftEdge < 0) ? 0
                                 : canvas.width - doggo.width - 1;
    }

    const topEdge = doggo.y;
    const bottomEdge = doggo.y + doggo.height;
    if (topEdge < 0 || bottomEdge >= canvas.height) {
        doggo.ySpeed *= -1;
        doggo.y = (topEdge < 0) ? 0
                                : canvas.height - doggo.height - 1;
    }
}

init();