let canvas = document.getElementById('canvaaas');
let c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouse = {
    x: undefined,
    y: undefined
};
canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

function Bgcircles(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'white';
        c.stroke();
        c.fill();
    }
    this.update = function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function Circles(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    }
    this.update = function () {
        if (mouse.x !== undefined && mouse.y !== undefined) {
            this.x += (mouse.x - this.x) * 0.05;
            this.y += (mouse.y - this.y) * 0.05;
        }
        this.draw();
    }
}

let bgcircles = [];
for (let i = 0; i < 100; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = (Math.random() - 0.5) * 8;
    let dy = (Math.random() - 0.5) * 8;
    let radius = 5 + Math.random() * 15;
    bgcircles.push(new Bgcircles(x, y, dx, dy, radius));
}

let circles = [];
for (let i = 0; i < 25; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = (Math.random() - 0.5) * 15;
    let dy = (Math.random() - 0.5) * 15;
    let radius = 20 + Math.random() * 30;
    let color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    circles.push(new Circles(x, y, radius, color));
}

function animation() {
    requestAnimationFrame(animation);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bgcircles.length; i++) {
        bgcircles[i].update();
    }
    let targetX = mouse.x !== undefined ? mouse.x : canvas.width / 2;
    let targetY = mouse.y !== undefined ? mouse.y : canvas.height / 2;
    for (let i = 0; i < circles.length; i++) {
        circles[i].x += (targetX - circles[i].x) * 0.2; 
        circles[i].y += (targetY - circles[i].y) * 0.2;
        circles[i].draw();
        targetX = circles[i].x;
        targetY = circles[i].y;
    }
}
animation();