function Intro1() {
    this.scale = 0.1;
    // this.mainGrid = this.sceneManager.mainGrid;
    this.gridAmount = 8;
    this.started = false;
    this.introGrids = new Group();
    this.textGroup = new Group();
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
                width * random(0, 1), 
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
        const welcome = createSprite(width * random(0, 1), height * random(0, 1), 30, 10);
        welcome.draw = () => {
            push();
            fill(255);
            textAlign(CENTER);
            textSize(16);
            text("Welcome to my graduate project!", 0, 0);
            pop();
        }
        welcome.velocity.x = random(-1, 1);
        welcome.velocity.y = random(-1, 1);
        const helpText = createSprite(width * random(0, 1), height * random(0, 1), 30, 10);
        helpText.draw = () => {
            push();
            fill(255);
            textAlign(CENTER);
            textSize(16);
            text("Press anywhere to start!", 0, 0);
            pop();
        }
        helpText.velocity.x = random(-1, 1);
        helpText.velocity.y = random(-1, 1);

        this.textGroup.add(welcome);
        this.textGroup.add(helpText);
    }
    this.draw = () => {
        clear();
        background(0);
        this.introGrids.bounce(this.introGrids);
        this.sceneManager.mainGrid.appearance();
        
        this.introGrids.bounce(this.introGrids);
        this.introGrids.bounce(this.sceneManager.mainGrid.s);
        bounceEdges(this.introGrids);
        bounceEdges(this.textGroup);
        drawSprites(this.introGrids);
        drawSprite(this.sceneManager.mainGrid.s);
        if (!this.started) {
            this.introGrids.bounce(this.textGroup);
            this.textGroup.bounce(this.sceneManager.mainGrid.s);
            drawSprites(this.textGroup);
        }
    }
    this.mousePressed = () => {
        if (!this.started) {
            this.started = true;
            ramp(8, 0, 16000, 2000, (curr) => {
                //on  instance
                this.introGrids.length = curr;
            }, (curr) => {
                //on end of ramp
                this.introGrids.removeSprites();
                this.sceneManager.showScene(Main);
            });
        }
    }
}
