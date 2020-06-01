function setup() {
    createCanvas(windowWidth, windowWidth * (9/16));
    background('#000');
    rectMode(CENTER);
    push();
    fill(255, 0, 0);
    noStroke();
    var rectang = rect(width/2, height/2, 100, 100);
    pop();
    rect(100, 100, 100, 100);
    console.log(rectang);
    rectang.mousedown()
}