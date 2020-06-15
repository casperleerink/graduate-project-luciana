function Intro() {
    this.scale = 0.05;
    // this.mainGrid = this.sceneManager.mainGrid;
    this.gridAmount = 8;
    this.started = false;
    this.blackTextOpacity = 255;
    this.introGrids = new Group();
    this.textGroup = new Group();
    this.launchTimes = [
        new Date(Date.UTC(2020, 5, 27, 3, 0, 0)),
        new Date(Date.UTC(2020, 5, 27, 3, 4, 0)),
        new Date(Date.UTC(2020, 5, 27, 3, 8, 0)),
        new Date(Date.UTC(2020, 5, 27, 3, 12, 0)),
        new Date(Date.UTC(2020, 5, 27, 21, 0, 0)),
        new Date(Date.UTC(2020, 5, 27, 21, 4, 0)),
        new Date(Date.UTC(2020, 5, 27, 21, 8, 0)),
        new Date(Date.UTC(2020, 5, 27, 21, 12, 0)),
    ];
    this.startDate = new Date(2020, 5, 10, 15, 26, 0);
    this.ttlText = "";
    
    this.setup = () => {
        clear();
        background(0);
        console.log("intro1");
        const velocity = {
            x: random(1, 3),
            y: random(1, 3),
        }
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

        //create text sprites
        const whiteLeft = createSprite(width * 0.18, height * 0.5, width*0.36, height*0.97);
        whiteLeft.draw = () => {
            push();
            // fill(255);
            image(this.sceneManager.landing2, 0, 0, width * 0.36, height*0.97);
            pop();
        }
        whiteLeft.immovable = true;
        const whiteRight = createSprite(width * 0.82, height * 0.5, width*0.36, height*0.97);
        whiteRight.draw = () => {
            push();
            fill(255);
            image(this.sceneManager.landing1, 0, 0, width * 0.36, height*0.97);
            pop();
        }
        whiteRight.immovable = true;

        this.textGroup.add(whiteLeft);
        this.textGroup.add(whiteRight);
        // this.textGroup.add(helpText);


        //SETUP the start time and automatic start.
        for (let i = 0; i < this.launchTimes.length; i++) {
            const lt = this.launchTimes[i];
            const ttl = Math.floor((lt - Date.now())/1000);
            if (ttl > 15) {
                this.startDate = lt;
                break;
            }
        }
        const interval = setInterval(() => {
            const ttl = Math.floor((this.startDate - Date.now())/1000);
            this.ttlText = `The show will start in:\n${ttl} seconds`;
            if (ttl <= 0) {
                this.ttlText = "";
                clearInterval(interval);
                this.launch();
            }
        }, 1000);
    }
    this.draw = () => {
        clear();
        background(0);
        this.introGrids.bounce(this.introGrids);
        this.sceneManager.mainGrid.appearance();
        
        this.introGrids.bounce(this.introGrids);
        this.introGrids.bounce(this.sceneManager.mainGrid.s);
        bounceEdges(this.introGrids);
        // bounceEdges(this.textGroup);
        drawSprites(this.introGrids);
        drawSprite(this.sceneManager.mainGrid.s);
        this.introGrids.bounce(this.textGroup);
        this.textGroup.bounce(this.sceneManager.mainGrid.s);
        drawSprites(this.textGroup);

        const t = "Presented by the SFU School for the Contemporary Arts.\n\nPresented in partial fulfillment of the requirements of the Degree of Master of Fine Arts at Simon Fraser University.\n\nThis work will be presented and has been developed on the unceded traditional territories of the Coast Salish peoples of the xʷməθkwəy̓əm (Musqueam), Skwxwú7mesh (Squamish), and Səl̓ílwətaɬ (Tsleil-Waututh) Nations.;"
        push();
        const c = color(255);
        c.setAlpha(this.blackTextOpacity);
        fill(c);
        textSize(16);
        text(t, width*0.5, height*0.55, width*0.25, height);
        textAlign(CENTER);
        text(this.ttlText, width*0.5, height*0.6);
        pop();
        
    }
    this.launch = () => {
        if (!this.started) {
            this.started = true;
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
                ramp(0.05, 1.0, 8000, deltaTime, (c) => {
                    this.sceneManager.mainGrid.update(c, 1/3, 255, 255);
                }, () => {
                    this.sceneManager.showScene(Main);
                })
            });
        }
    }
    this.mousePressed = () => {
        this.launch();
    }
}
