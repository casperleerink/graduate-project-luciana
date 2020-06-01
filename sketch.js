let staticImg;
let div; 
let iframe;

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
    const c = createCanvas(windowWidth, windowWidth * (720/1280));
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
    resizeCanvas(windowWidth, windowWidth * (720/1280));
}



function cuePointCallback() {

}