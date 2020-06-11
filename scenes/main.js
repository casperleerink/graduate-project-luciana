function Main() {
    this.showMainGrid = true;
    this.scale = 1;
    this.innerOpacity = 0;
    this.outerOpacity = 127;
    this.video = new Video("422917757");
    setCuePoints(this.video);
    this.setup = () => {
        // this.video.setSize(0);
        // this.video.iframe.play();
        // this.video.iframe.setCurrentTime(convertTime(20, 20));
        this.video.iframe.play()
        this.video.iframe.on('cuepoint', ({data}) => {
            this.video.show();
            if (data === "Intro2") {
                this.outerOpacity = 127;
                this.innerOpacity = 0;
                this.scale = 1;
                this.video.setSize(width);
                this.video.setPosition(width * 0.5, height * 0.5);
                this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity);
            }
            if (data === "Phase1") {
                this.scale = 1;
                this.video.setSize(width * 1/3);
                this.video.setPosition(width * 5/6, height*1/6);
                this.outerOpacity = 160;
                this.innerOpacity = 255;
                this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity);
            }
            if (data === "Transition1" || data === "Transition2" || data === "Transition3") {
                this.scale = 1;
                this.video.setSize(width * (1/3));
                this.video.setPosition(width * 0.5, height * 0.5);
                this.outerOpacity = 255;
                this.innerOpacity = 10;
                this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity);
            }
            if (data === "Phase2") {
                this.scale = 1;
                this.video.setSize(width);
                this.video.setPosition(width * 0.5, height * 0.5);
                this.outerOpacity = 90;
                this.innerOpacity = 255;
                this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity);
            }
            if (data === "Phase3") {
                this.scale = 1;
                this.video.setSize(width);
                this.video.setPosition(width * 0.5, height * 0.5);
                this.outerOpacity = 60;
                this.innerOpacity = 255;
                this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity);
            }
            if (data === "Intersession1") {
                this.video.setSize(width);
                this.video.setPosition(width * 0.5, height * 0.5);
                this.scale = 1;
                this.innerOpacity = 255;
                this.outerOpacity = 127;
                this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity, true);
            }
            if (data === "Intersession2") {
                this.video.setSize(width);
                this.video.setPosition(width * 0.5, height * 0.5);
                this.scale = 1;
                this.innerOpacity = 255;
                this.outerOpacity = 127;
                this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity, false);

                //set colors to move to middle rect one by one
                const interval = 13500;
                let i = -1;
                const timer = setInterval(() => {
                    i++;
                    if (i > 7) {
                        clearInterval(timer);
                    }
                    this.sceneManager.mainGrid.updateRectEmpty(i, true);
                    setTimeout(() => { this.sceneManager.mainGrid.middleRectColor = i}, interval*0.05);
                    // this.sceneManager.mainGrid.middleRectColor = i;
                    setTimeout(() => { this.sceneManager.mainGrid.middleRectColor = -1}, interval*0.25);
                }, interval);
            }
            if (data === "Intersession3") {
                this.video.setSize(width);
                this.video.setPosition(width * 0.5, height * 0.5);
                this.scale = 1;
                ramp(255, 0, 7500, 33, (c) => {
                    this.innerOpacity = c;
                    this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity, false, -1);
                });
            }
            if (data === "Transition4") {
                this.scale = 1;
                this.video.setSize(width);
                this.video.setPosition(width * 0.5, height * 0.5);
                this.innerOpacity = 0;
                this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity, false, -1);
                for (let i = 0; i < 8; i++) {
                    this.sceneManager.mainGrid.updateRectEmpty(i, true);
                }
                ramp(0.5, 0, 40000, 200, (c) => {
                    this.sceneManager.mainGrid.updateStrokeWeight(c);
                });
            }
            if (data === "Final") {
                this.scale = 1;
                this.video.setSize(width);
                this.video.setPosition(width * 0.5, height * 0.5);
                for (let i = 0; i < 8; i++) {
                    this.sceneManager.mainGrid.updateRectEmpty(i, true);
                }
                this.sceneManager.mainGrid.innerRectScale = 1;
                this.innerOpacity = 127;
                this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity, false, 0);
                let i = 0;
                const timer = setInterval(() => {
                    i++;
                    this.sceneManager.mainGrid.middleRectColor = i;
                    if (i > 7) {
                        clearInterval(timer);
                        this.innerOpacity = 255;
                        this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity, false, 0);
                        this.sceneManager.mainGrid.middleRectColor = -1;
                    }
                }, 1750);
            }

            if (data === 1) {
                this.video.setSize(width * 1/3);
                this.video.setPosition(width * 5/6, height*1/6);
            }
            if (data === 2) {
                this.video.setSize(width * 1/3);
                this.video.setPosition(width * 3/6, height*1/6);
            }
            if (data === 3) {
                this.video.setSize(width * 1/3);
                this.video.setPosition(width * 1/6, height*1/6);
            }
            if (data === 4) {
                this.video.setSize(width * 1/3);
                this.video.setPosition(width * 1/6, height*3/6);
            }
            if (data === 5) {
                this.video.setSize(width * 1/3);
                this.video.setPosition(width * 1/6, height*5/6);
            }
            if (data === 6) {
                this.video.setSize(width * 1/3);
                this.video.setPosition(width * 3/6, height*5/6);
            }
            if (data === 7) {
                this.video.setSize(width * 1/3);
                this.video.setPosition(width * 5/6, height*5/6);
            }
            if (data === 8) {
                this.video.setSize(width * 1/3);
                this.video.setPosition(width * 5/6, height*3/6);
            }
            console.log(data);
            
        });
        this.video.iframe.on('ended', () => {
            this.video.div.hide();
            ramp(255, 0, 2000, 33, (c) => {
                this.sceneManager.mainGrid.innerOpacity = c;
            }, (c) => {
                this.showMainGrid = false;
            });
        });
    }

    this.draw = () => {
        clear();
        if (this.showMainGrid) {
            this.sceneManager.mainGrid.appearance();
            drawSprite(this.sceneManager.mainGrid.s);
        } else {
            fill(255);
            textSize(24);
            textAlign(CENTER);
            text('The end!', width * 0.5, height * 0.5);
        }
    }
}

function setCuePoints(video) {
    video.setCuePoint(0, "Intro2");
    video.setCuePoint(8, "Phase1");
    video.setCuePoint(convertTime(3, 46), "Transition1");
    video.setCuePoint(convertTime(4, 4), "Phase2");
    video.setCuePoint(convertTime(14, 28), "Transition2");
    video.setCuePoint(convertTime(14, 44), "Phase3");
    video.setCuePoint(convertTime(20, 25), "Transition3");
    video.setCuePoint(convertTime(20, 40), "Intersession1");
    video.setCuePoint(convertTime(20, 48), "Intersession2");
    video.setCuePoint(convertTime(22, 52), "Intersession3");
    video.setCuePoint(convertTime(23, 0), "Phase4");
    video.setCuePoint(convertTime(26, 9), "Transition4");
    video.setCuePoint(convertTime(26, 54), "Final");

    // video.setCuePoint(8, 1);
    video.setCuePoint(10, 2);
    video.setCuePoint(20, 3);
    video.setCuePoint(22, 4);
    video.setCuePoint(24, 5);
    video.setCuePoint(26, 6);
    video.setCuePoint(28, 7);
    video.setCuePoint(30, 8);
}