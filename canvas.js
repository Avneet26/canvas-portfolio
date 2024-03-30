const canvas = document.querySelector("#canvas-banner");
const ctx = canvas.getContext("2d");
const colorArr = [
    "#E6F7FF", "#CCF0FF", "#B3E8FF", "#99E0FF", "#80D9FF",
    "#66D1FF", "#4DC9FF", "#33C2FF", "#1ABAFF", "#00B2FF",
    "#FFE6CC", "#FFD1A3", "#FFBD7A", "#FFA853", "#FF9430",
    "#FF8000", "#FF9933", "#FFA64D", "#FFB366", "#FFC080"
];

canvas.width = window.innerWidth;
canvas.height = 500;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
});
 
let mousePos = {
    x: undefined,
    y: undefined
}

let topOffset = canvas.getBoundingClientRect().top;

window.addEventListener('scroll', () => {
    topOffset = canvas.getBoundingClientRect().top;
});

class Ball{
    constructor(x, y, dx, dy, radius, color){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.originalRadius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    update() {
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy
        } else if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (this.x > mousePos.x - 50 && this.x < mousePos.x + 50
        && this.y > mousePos.y - (50 + topOffset)  && this.y < mousePos.y + (50 - topOffset) && this.radius < 5) {
            this.radius += 1;
        } else if (this.radius > this.originalRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
};

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

const ballArray = [];

for (let i = 0; i < 1000; i++) {
    let radius = getRandom(2, 3);
    let x = getRandom(radius, canvas.width - radius);
    let y = getRandom(radius, canvas.height - radius);
    let dx = getRandom(-0.2, 0.2);
    let dy = getRandom(-0.2, 0.2);
    let color = colorArr[Math.floor(Math.random() * colorArr.length)]
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
}

canvas.addEventListener('mousemove', (eve) => {
    mousePos.x = eve.clientX;
    mousePos.y = eve.clientY;
});

canvas.addEventListener('mouseleave', () => {
    mousePos.x = undefined;
    mousePos.y = undefined;
})

function animate(currentTime) {
    let lastFrameTime = 0;
    const fps = 60;

    const elapsedTime = currentTime - lastFrameTime;
    const interval = 1000 / fps;

    if (elapsedTime > interval) {
        lastFrameTime = currentTime - (elapsedTime % interval);

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();

        for (let i = 0; i < ballArray.length; i++) {
            ballArray[i].update();
        }
    }
    requestAnimationFrame(animate);
    
}
animate(0);
