function Main() {
    this.showMainGrid = true;
    this.showThanks = false;
    this.scale = 0.8;
    this.innerOpacity = 255;
    this.outerOpacity = 255;
    this.video = new Video("431645794");
    this.buttons = [];
    this.sections = [
        "Begin",
        "Phase1",
        "Transition1",
        "Phase2",
        "Transition2",
        "Phase3",
        "Transition3",
        "Static1",
        "Static2",
        "Static3",
        "Intersession",
        "Silence",
        "Gilda",
        "Final",
    ];
    this.sectionTimes = [
        0, //begin
        8, //p1
        convertTime(3, 46),
        convertTime(4, 4), //p2
        convertTime(14, 28),
        convertTime(14, 44), //p3
        convertTime(20, 25),
        convertTime(20, 40), //static
        convertTime(20, 48),
        convertTime(20, 56),
        convertTime(21, 4), //intersession
        convertTime(21, 40), //silence
        convertTime(22, 4), //gilda
        convertTime(34, 10), //final
    ];

    //Initial setup
    this.setup = () => {
        console.log("Main");
        
        this.sceneManager.mainGrid.update(this.scale, 1/3, 255, 255);
        this.video.iframe.addCuePoint(0.1, "start");
        this.video.iframe.ready().then(() => {
            console.log("Play!");
            
            this.video.iframe.play();
        });
        this.video.iframe.on('play', () => {
            console.log("Playing!");
            
            // if (data === "start") {
                this.video.setOpacity(0);
                this.video.show(); 
                setVideoSizeAndPosition(this.video, width*0.8, width * 0.5, height * 0.5);
                ramp(255, 0, 3000, deltaTime, (current) => {
                    this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, current);
                    this.video.setOpacity(map(current, 255, 0, 0.0, 1.0));
                }, () => {
                    ramp(255, 0, 5000, deltaTime, (current) => {
                        const innerScale = map(current, 255, 0, 1/3, 1);
                        this.sceneManager.mainGrid.innerRectScale = innerScale;
                        this.sceneManager.mainGrid.update(this.scale, 1/3, current, 0);
                    }, () => {
                        this.showMainGrid = false;
                    });
                });
            // }
        });
        
        this.video.iframe.on('ended', () => {
            this.showMainGrid = true;
            // this.sceneManager.mainGrid.innerRectScale = 1;
            this.sceneManager.mainGrid.update(this.scale, 1/3, 255, 0);
            this.video.div.hide();
            this.newVideo();
            setTimeout(() => {
                this.sceneManager.mainGrid.update(this.scale, 1/3, 0, 0);
            }, 1500);
            setTimeout(() => {
                this.video.iframe.play(); //start the second video
            }, 3000);
        });

        // const b = createButton("Go to end video");
        // b.mousePressed(() => {
        //     this.video.iframe.setCurrentTime(convertTime(34, 10));
        //     this.video.iframe.play();
        // });
    }

    this.draw = () => {
        clear();
        if (this.showMainGrid) {
            this.sceneManager.mainGrid.appearance();
            drawSprite(this.sceneManager.mainGrid.s);      
        }
        if (this.showThanks) {
            image(this.sceneManager.thankYou, width/2, height/2, width*this.scale, height);
        }
    }

    this.newVideo = () => {
        this.video.iframe.off('play');
        this.video.iframe.off('ended');
        this.video.iframe.getCuePoints().then((cuePoints) => {
            cuePoints.forEach((cue) => {
                this.video.iframe.removeCuePoint(cue.id);
            });
        });

        this.video.iframe.loadVideo("431648577");
        this.video.iframe.ready().then(() => {
            this.video.setOpacity(0);
            this.video.div.show();
        });
        this.video.iframe.on('play', () => {
            ramp(0.0, 1.0, 1500, deltaTime, (current) => {
                this.video.setOpacity(current);
            })
        });
        this.video.iframe.on('ended', () => {
            this.video.div.hide();
            this.showThanks = true;
            setTimeout(() => {
                window.location.href = '/ending.html';
            }, 4000);
        });
    }
}


function setVideoSizeAndPosition(video, size, x, y) {
    video.setSize(size);
    video.setPosition(x, y);
}