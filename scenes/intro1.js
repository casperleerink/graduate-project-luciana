function Intro() {
    this.scale = 0.05;
    // this.mainGrid = this.sceneManager.mainGrid;
    this.gridAmount = 8;
    this.started = false;
    this.blackTextOpacity = 255;
    this.introGrids = new Group();
    this.textGroup = new Group();
    // this.launchTimes = [
    //     //saturday 2pm
    //     new Date(Date.UTC(2020, 5, 27, 21, 0, 0)),
    // ];
    this.saturdayTime = new Date(Date.UTC(2020, 5, 27, 4, 0, 0));
    this.startDate = new Date(Date.UTC(2020, 5, 27, 21, 0, 0));
    this.ttlText = "";
    this.interval;
    this.launchReady = false;
    this.zoomButton;
    
    this.setup = () => {
        clear();
        background(0);
        console.log("intro");
        for (let i = 0; i < this.gridAmount; i++) {
            new IntroGrid(
                width * random(0.36, 0.64), 
                height * random(0, 1), 
                this.scale, 
                this.introGrids, 
                {x:random(-3, 3), y:random(-3,3)}, 
                this.sceneManager.staticImg);
        }
        this.sceneManager.mainGrid.update(
            this.scale, //main scale
            1/3, //gap (deviation from centre for outer rects)
            255,
            255,
        );

        //create images on sides
        createTextSprites(this.textGroup, this.sceneManager.landing1, this.sceneManager.landing2);

        //check and display time till launch every second
        this.interval = setInterval(() => {
            const ttl = Math.floor((this.startDate - Date.now())/1000);
            this.ttlText = `The show will start in:\n${secondsToDhms(ttl)}`;
            if (ttl <= 0) {
                this.ttlText = "Click in the center rectangle to begin";
                clearInterval(this.interval);
                this.launchReady = true;
            }
        }, 1000);

        //add zoom link if saturday time
        // this.zoomButton = createButton('Join zoom call!');
        // this.zoomButton.position(windowWidth*0.5 - this.zoomButton.size().width/2, (windowHeight*0.5 - this.zoomButton.size().height/2) + height*0.25);
        // this.zoomButton.mousePressed(() => {
        //     window.open('https://sfu.zoom.us/j/98405089150?pwd=NThHS0dIdUNXYkZSQXoyYkQ1NlRhUT09', "_blank");
        // });
        // this.zoomButton.style('z-index', 10);

        this.sceneManager.mainGrid.s.onMousePressed = () => {
            if (this.launchReady) {
                this.launch();   
            }
        }
    }
    this.draw = () => {
        clear();
        background(0);
        this.introGrids.bounce(this.introGrids);
        this.sceneManager.mainGrid.appearance();
        
        this.introGrids.bounce(this.introGrids);
        this.introGrids.bounce(this.sceneManager.mainGrid.s);
        bounceEdges(this.introGrids);
        drawSprites(this.introGrids);
        drawSprite(this.sceneManager.mainGrid.s);
        this.introGrids.bounce(this.textGroup);
        this.textGroup.bounce(this.sceneManager.mainGrid.s);
        drawSprites(this.textGroup);

        push();
        const c = color(255);
        c.setAlpha(this.blackTextOpacity);
        fill(c);
        textSize(18);
        textAlign(CENTER);
        text(this.ttlText, width*0.5, height*0.65, width*0.2, height*0.2);
        pop();
        
    }
    this.launch = () => {
        if (!this.started) {
            this.started = true;
            window.addEventListener('beforeunload', unloadEvent);
            this.textGroup.forEach((s) => {
                s.immovable = false;
            });
            ramp(255, 0, 2000, 33, (c) => {
                this.blackTextOpacity = c;
            });
            ramp(8, 0, 16000, 2000, (curr) => {
                //on  instance
                this.introGrids.length = Math.round(curr);
            }, (curr) => {
                //on end of ramp
                this.introGrids.removeSprites();
                ramp(0.05, 0.8, Math.floor(random(7000, 9000)), deltaTime, (c) => {
                    this.sceneManager.mainGrid.update(c, 1/3, 255, 255);
                }, () => {
                    this.sceneManager.showScene(Main);
                })
            });
        }
    }

    //only in test version
    // this.mousePressed = () => {
    //     if (this.launchReady) {
    //         this.launch();   
    //     }
    // }
    this.keyTyped = () => {
        if (key === " ") {
            this.launchReady = true;
            this.ttlText = "Click in the center rectangle to begin";
            clearInterval(this.interval);
        }
    }
}



function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") + "\n" : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") + "\n" : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") + "\n" : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") + "\n" : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

function unloadEvent(e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = 'Are you sure you want to leave the performance?';
}

function createTextSprites(textGroup, landing1, landing2) {
    //create text sprites
    const whiteLeft = createSprite(width * 0.2, height * 0.5, width*0.4, height*0.97);
    whiteLeft.draw = () => {
        push();
        image(landing1, 0, 0, width * 0.4, height*0.97);
        pop();
    }
    whiteLeft.immovable = true;
    const whiteRight = createSprite(width * 0.8, height * 0.5, width*0.4, height*0.97);
    whiteRight.draw = () => {
        push();
        image(landing2, 0, 0, width * 0.4, height*0.97);
        pop();
    }
    whiteRight.immovable = true;

    textGroup.add(whiteLeft);
    textGroup.add(whiteRight);
}