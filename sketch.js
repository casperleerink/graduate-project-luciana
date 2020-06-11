let staticImg;
let div; 
let iframe;
let xToCenter = 0;
let yToCenter = 0;
let c;
let font;

function preload() {
    staticImg = loadImage('assets/images/static-noise.jpg');
    font = loadFont('assets/bodoni/BodoniFLF-Roman.ttf');
}

function setup() {
    //create canvas
    if (windowWidth * (720/1280) > windowHeight) {
        c = createCanvas(windowHeight * (1280/720), windowHeight);
    } else {
        c = createCanvas(windowWidth, windowWidth * (720/1280));
    }
    xToCenter = (windowWidth - width) / 2;
    yToCenter = (windowHeight - height) / 2;
    c.position(xToCenter, yToCenter);
    c.style('z-index', 5);
    c.style('position', "fixed");
    rectMode(CENTER);
    imageMode(CENTER);
    textFont(font);
    //SCENE MANAGER
    const mgr = new SceneManager();
    mgr.staticImg = staticImg;
    mgr.mainGrid = new MainGrid(staticImg);
    mgr.wire();
    mgr.showScene(Intro1);
}

function windowResized() {
    if (windowWidth * (720/1280) > windowHeight) {
        resizeCanvas(windowHeight * (1280/720), windowHeight);
    } else {
        resizeCanvas(windowWidth, windowWidth * (720/1280));
    }
    xToCenter = (windowWidth - width) / 2;
    yToCenter = (windowHeight - height) / 2;
    c.position(xToCenter, yToCenter);
}

