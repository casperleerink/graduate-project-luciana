let staticImg;
let div; 
let iframe;
let xToCenter = 0;
let yToCenter = 0;
let c;
let font;
let landing1;
let landing2;
let thankYou;
let warningBeforeUnload = true;
// window.addEventListener('beforeunload', function (e) {
//     // Cancel the event
//     e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
//     // Chrome requires returnValue to be set
//     e.returnValue = 'Are you sure you want to leave the performance?';
// });
// window.addEventListener('beforeunload', function (e) {
//     // the absence of a returnValue property on the event will guarantee the browser unload happens
//     delete e['returnValue'];
//   });

function preload() {
    staticImg = loadImage('assets/images/static-noise.png');
    landing1 = loadImage('assets/images/A1-font2.png');
    landing2 = loadImage('assets/images/A2-font2.png');
    thankYou = loadImage('assets/images/thank-you.png');
    // font = loadFont('assets/bodoni/BodoniFLF-Roman.ttf');
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
    // textFont(font);
    //SCENE MANAGER
    const mgr = new SceneManager();
    mgr.staticImg = staticImg;
    mgr.landing1 = landing1;
    mgr.landing2 = landing2;
    mgr.thankYou = thankYou;
    mgr.mainGrid = new MainGrid(staticImg);
    mgr.wire();
    mgr.showScene(Intro);
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

