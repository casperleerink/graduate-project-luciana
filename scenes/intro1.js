function Intro() {
    this.scale = 0.05;
    // this.mainGrid = this.sceneManager.mainGrid;
    this.gridAmount = 8;
    this.started = false;
    this.blackTextOpacity = 255;
    this.introGrids = new Group();
    this.textGroup = new Group();
    this.rndSec = random([0, 2, 4, 6, 8, 10]);
    console.log(this.rndSec);
    
    this.launchTimes = [
        //friday 5:30pm
        new Date(Date.UTC(2020, 5, 27, 0, 30, )),
        new Date(Date.UTC(2020, 5, 27, 0, 45, 0)),
        new Date(Date.UTC(2020, 5, 27, 0, 55, 0)),
        new Date(Date.UTC(2020, 5, 27, 0, 57, 0)),
        new Date(Date.UTC(2020, 5, 27, 0, 59, 0)),
        //friday 8pm
        new Date(Date.UTC(2020, 5, 27, 3, 2, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 3, 4, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 3, 6, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 3, 8, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 3, 10, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 3, 12, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 3, 14, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 3, 15, this.rndSec)),
        //saturday 2pm
        new Date(Date.UTC(2020, 5, 27, 21, 0, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 21, 2, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 21, 4, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 21, 6, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 21, 8, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 21, 10, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 21, 12, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 21, 14, this.rndSec)),
        new Date(Date.UTC(2020, 5, 27, 21, 15, this.rndSec)),
    ];
    this.saturdayTime = new Date(Date.UTC(2020, 5, 27, 4, 0, 0));
    this.startDate;
    this.ttlText = "";
    
    this.setup = () => {
        clear();
        background(0);
        console.log("intro");
        // alert("Please use a new browser to watch this performance!");
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



        //SETUP the start time and automatic start.
        for (let i = 0; i < this.launchTimes.length; i++) {
            const lt = this.launchTimes[i];
            const ttl = Math.floor((lt - Date.now())/1000);
            if (ttl > 10) {
                this.startDate = lt;
                break;
            }
        }
        if (this.startDate) {
            //in case of friday show
            //create text sprites
            const whiteLeft = createSprite(width * 0.2, height * 0.5, width*0.4, height*0.97);
            whiteLeft.draw = () => {
                push();
                // fill(255);
                image(this.sceneManager.landing1, 0, 0, width * 0.4, height*0.97);
                pop();
            }
            whiteLeft.immovable = true;
            const whiteRight = createSprite(width * 0.8, height * 0.5, width*0.4, height*0.97);
            whiteRight.draw = () => {
                push();
                fill(255);
                image(this.sceneManager.landing2, 0, 0, width * 0.4, height*0.97);
                pop();
            }
            whiteRight.immovable = true;

            this.textGroup.add(whiteLeft);
            this.textGroup.add(whiteRight);

            //check and display time till launch every second
            const interval = setInterval(() => {
                const ttl = Math.floor((this.startDate - Date.now())/1000);
                this.ttlText = `The show will start in:\n${secondsToDhms(ttl)}`;
                if (ttl <= 0) {
                    this.ttlText = "";
                    clearInterval(interval);
                    this.launch();
                }
            }, 1000);

            //add zoom link if saturday time
            if (Date.now() > this.saturdayTime) {
                const b = createButton('Join zoom call!');
                b.position(windowWidth*0.5 - b.size().width/2, (windowHeight*0.5 - b.size().height/2) + height*0.25);
                b.mousePressed(() => {
                    window.open('https://sfu.zoom.us/j/98405089150?pwd=NThHS0dIdUNXYkZSQXoyYkQ1NlRhUT09', "_blank");
                });
                b.style('z-index', 10);
            }
        } else {
            //in case of saturday show:
            this.ttlText = "Thank you for your interest in Figure 8!\n Now the live shows are done, this website will soon be updated so the show can be viewed on demand.";
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
        text(this.ttlText, width*0.5, height*0.6);
        pop();
        
    }
    this.launch = () => {
        if (!this.started) {
            this.started = true;
            window.onbeforeunload = () => {
                return 'Are you sure you want to leave? You might not be able to join the performance again.';
            }
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
    this.mousePressed = () => {
        this.launch();
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