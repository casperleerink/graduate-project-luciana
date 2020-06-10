let staticImg;
let div; 
let iframe;
let xToCenter = 0;
let yToCenter = 0;
let c;

function preload() {
    staticImg = loadImage('assets/images/static-noise.jpg');
    // testImg = loadImage('assets/images/test-img.jpeg');
    //create div for video player
    // d.style('opacity', 0.5);
    // d.hide();
    // d.style('background-color', "red");
    //VIDEO setup
    // div = createDiv();
    // div.id("player");
    // // this.div.size(width * 0.1, height * 0.1);
    // div.style('opacity', 0.0);
    // div.size(159, windowHeight);
    // div.hide();
    // iframe = new Vimeo.Player('player', {
    //     id: "422917757",
    //     width: windowWidth,
    //     controls: "false",
    // });
    // Promise.all([this.iframe.getVideoWidth(), this.iframe.getVideoHeight()]).then((dimensions) => {
    //     this.videoHeight = this.videoWidth * (dimensions[1]/dimensions[0]);
    //     this.div.size(this.videoWidth, this.videoHeight);
    //     this.div.position(this.mousePosition.x - this.videoWidth/2,this.mousePosition.y - this.videoHeight/2);
    // });

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

